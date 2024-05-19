from flask import Flask, jsonify, request
from flask_cors import CORS
import json
from collections import defaultdict
from datetime import datetime

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['GET'])
def home():
    return "Welcome to the homepage"

@app.route('/categories', methods=['GET'])
def get_categories():
    categories_data = [
        {"name": "Devops"}, {"name": "Embedded"}, {"name": "Raspberry"},
        {"name": "Algorithm"}, {"name": "Python"}, {"name": "Jenkins"},
        {"name": "Linux"}
    ]
    return jsonify(categories_data)

@app.route('/posts', methods=['GET'])
def get_posts():
    # Opening JSON file
    file = open("posts.json")
    
    # returns JSON object as 
    # a dictionary
    posts_data = json.load(file)
    return jsonify(posts_data)

@app.route('/trendingtags', methods=['GET'])
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
    return jsonify(transformed_data)

@app.route('/lastedpost', methods=['GET'])
def get_lasted_posts():
    with open("posts.json", 'r') as file:
        data = json.load(file)

    for item in data:
        item["created_at"] = datetime.fromisoformat(item['created_at'].rstrip("Z"))
    
    sorted_data = sorted(data, key=lambda x: x['created_at'], reverse=True)

    latest_posts = sorted_data[:5]
    return jsonify(latest_posts)

@app.route('/projects', methods=['GET'])
def get_projects():
    file = open("projects.json")

    projects_data = json.load(file)
    return jsonify(projects_data)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=3001)

