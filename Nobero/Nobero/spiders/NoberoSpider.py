import scrapy
import requests
from Nobero.items import Product
from urllib.parse import parse_qs, urlencode, urlunparse, urlparse, urljoin

class NoberoSpider(scrapy.Spider):
    """
    A web Scraper that can be used to crawl through 
    Nobero website and extracts product information.

    **@returns**
        it stores the scraped product information into a json file
        named "Scraped Data.json" to change this look into pipelines
    """
    name = "NoberoSpider"
    start_urls = [
        "https://nobero.com/pages/men", # Start with the men's category
    ]
    
    def __init__(self):
        self.base_domain = "https://nobero.com/"

    def parse(self, response):
        """
        This function parses each available category in the 
        specific section and begins the crawling process.
        """
        categories = response.css(".custom-page-season-grid-item > a::attr(href)").getall()

        for category in categories:
            yield response.follow(category, callback=self.handle_pagination, cb_kwargs={"category": category.replace("/collections/", "").strip()})        

    def handle_pagination(self, response, category):
        """
        A function to handle pagination and dynamic loading of products
        into the webpage. it keeps iterationg through the page order until
        every product. 
        """
        products = set(response.css(".product-card-container .product_link::attr(href)").getall())

        # Prepare the next page URL
        parsed_url = urlparse(response.url)
        query_params = parse_qs(parsed_url.query)
        next_page = int(query_params.get("page", [1])[0]) + 1
        query_params.update({"page": [str(next_page)]})
        new_query = urlencode(query_params, doseq=True)
        next_url = urlunparse(parsed_url._replace(query=new_query))

        if len(products) > 0:
            yield scrapy.Request(next_url, callback=self.handle_pagination, meta={'page': next_page}, cb_kwargs={"category": category})

        for product in products:
            yield scrapy.Request(urljoin(self.base_domain, product), callback=self.parse_product, cb_kwargs={"category": category})

    def parse_product(self, response, category):
        """
        A Function to parse the product page and retrieve the
        main required information. This function is responsible for
        building and yielding the Item information.
        """
        item = Product()
        item["category"] = category
        item["url"] = response.url
        item["title"] = response.css("h1::text").get().strip()
        item["price"] = int("".join(filter(str.isdigit, response.css("#variant-price *::text").get())))
        item['image'] = urljoin(self.base_domain, response.css(".image-placeholder-bg::attr(src)").get())

        mrp_price = response.css("#variant-compare-at-price *::text").get()
        item["mrp"] = int("".join(filter(str.isdigit, mrp_price))) if mrp_price else 0

        last_sale = response.css(".product_bought_count > span::text").get()
        item["last_7_day_sale"] = last_sale.strip().split(" ")[0] if last_sale else None
        
        available_skus = {}

        for option in response.css(".option-select option"):
            color, size, *_ = option.css("::attr(data-variant)").get().split("-")
            variant_id = option.css("::attr(value)").get()

            if color in available_skus:
                available_skus[color].append({"size": size, "url": requests.Request('GET', response.url, params=variant_id).prepare().url})
            else:
                available_skus[color] = [{"size": size, "url": requests.Request('GET', response.url, params=variant_id).prepare().url}]

        # Each product has various meta attributes 
        # So we cannot fix a key for them all hence a dynamic approach
        item["meta"] = []
        for meta_details in response.css(".product-metafields-values"):
            key = meta_details.css("h4::text").get().lower()
            value = meta_details.css("p::text").get()
            item["meta"].append({key: value})

        item["description"] = "".join(response.css("#description_content *::text").getall())

        yield item