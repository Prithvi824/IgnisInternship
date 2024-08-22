# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


# useful for handling different item types with a single interface
from collections import defaultdict
import json


class NoberoPipeline:
    def __init__(self) -> None:
        self.grouped_items = defaultdict(list)

    def process_item(self, item, spider):
        key = item.get('category', 'unknown')
        self.grouped_items[key].append(item.__dict__['_values'])
        return item

    def close_spider(self, spider):
        # Write the grouped data to a JSON file when the spider closes
        with open('Scraped Data.json', 'w') as file:
            json.dump(self.grouped_items, file, indent=4, default=str)