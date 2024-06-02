import json
from collections import defaultdict
from datetime import datetime

def get_all_tags():
    dict_tags = defaultdict(int)
    with open("posts.json", 'r') as file:
        data = json.load(file)

    for item in data:
        if 'tags' in item:
            list_tag = item['tags']
            for tag in list_tag:
                tag = tag.strip()
                dict_tags[tag] = dict_tags[tag] + 1

    # Chuyển đổi dictionary thành một list của các dictionary
    transformed_data = [{key: value} for key, value in dict_tags.items()]
    return transformed_data
res = get_all_tags()
print(res)
