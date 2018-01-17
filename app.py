import json
import os
import re
import urllib
import requests
from flask import Flask, request, abort
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

@app.route("/", methods=['POST'])
def callback():
    body = request.get_data(as_text=True)
    print(body)

if __name__ == "__main__":
    app.run(host='127.0.0.1', port=5000)

