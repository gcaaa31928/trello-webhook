import json
import os
import re
import urllib
import requests
from flask import Flask, request, abort
from flask_cors import CORS
import sys
import requests
import json

app = Flask(__name__)
CORS(app)

def send_message(message):
    payload = {}
    payload['text'] = message
    data = {}
    data['payload'] = json.dumps(payload)
    print(str(data))
    r = requests.post('https://chat.synology.com/webapi/entry.cgi?api=SYNO.Chat.External&method=incoming&version=2&token=%22tkElWrrctM0kmjFu1oX4r3IJJoDgQ79NbtGkirgH2DdR26ubpigNKGfrFu1jrC61%22', data=data)
    print(r.text)

def is_done(name):
    return name == '完成' or name == 'Done'
def get_card_link(card):
    return 'https://trello.com/c/{}'.format(card['shortLink'])
@app.route("/", methods=['POST'])
def callback():
    try:
        body = request.get_json()
        print(body)
        action = body['action']['data']
        if is_done(action['listAfter']['name']):
            message = '{} 已經完成 {},\n {}'.format(body['action']['display']['entities']['memberCreator']['text'], action['card']['name'], get_card_link(action['card']))
            print(message)
            send_message(message)
    except:
        print(sys.exc_info()[0])
    return 'OK'

if __name__ == "__main__":
    #send_message('https://trello.com/c/GU75HtYC/19-werwer')
    app.run(host='127.0.0.1', port=5000)

