from flask import Flask, jsonify, request
from flask_cors import CORS
import json

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

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=3001)

