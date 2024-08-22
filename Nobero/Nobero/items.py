import scrapy

class Product(scrapy.Item):
    category = scrapy.Field()
    url = scrapy.Field()
    title = scrapy.Field()
    price = scrapy.Field()
    mrp = scrapy.Field()
    last_7_day_sale = scrapy.Field()
    available_skus = scrapy.Field()
    meta = scrapy.Field()
    description = scrapy.Field()
    image = scrapy.Field()
