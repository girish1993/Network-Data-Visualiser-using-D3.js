#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Fri May 10 16:36:35 2019

@author: girishbhatta
"""

from flask import Flask,render_template
import json

app = Flask(__name__)

    
@app.route("/")
def go_home():
    return render_template("demo.html")

@app.route("/load_data")
def load_data():
    json_data = read_json_data("data.json")
    return json_data

@app.route("/canvas")
def canvas():
    return render_template("demo2.html")


def read_json_data(filename):
    with open(filename) as json_file:  
        json_data = json.load(json_file)
        return json.dumps(json_data)


#read_json_data("data.json")

if __name__ == "__main__":
    app.run(debug=True)