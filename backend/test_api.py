import json
from collections import defaultdict
from datetime import datetime

def get_all_tags():
    dict_tags = defaultdict(int)
    with open("posts.json", 'r') as file:
        data = json.load(file)

    for item in data:
        item["created_at"] = datetime.fromisoformat(item['created_at'].rstrip("Z"))
    
    sorted_data = sorted(data, key=lambda x: x['created_at'], reverse=True)

    # Lấy 5 bài viết có ngày gần nhất
    latest_posts = sorted_data[:1]
    print(latest_posts)
if __name__ == '__main__':
    get_all_tags()

