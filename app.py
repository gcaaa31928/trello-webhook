import json
import os
import re
import urllib
import requests
from flask import Flask, request, abort
from flask_cors import CORS
import sys

app = Flask(__name__)
CORS(app)

@app.route("/", methods=['POST'])
def callback():
    try:
        body = request.get_json()
        print(body)
        action = body['action']['data']
        if action['listAfter']['name'] == '完成':
            print('{} 已經完成 {}'.format(body['action']['display']['entities']['memberCreator']['text'], action['card']['name']))
    except:
        print(sys.exc_info()[0])
    return 'OK'

if __name__ == "__main__":
    app.run(host='127.0.0.1', port=5000)

