import os
import numpy as np
import pandas as pd

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, inspect, desc

from flask import (
    Flask,
    render_template,
    jsonify,
    redirect)

from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

# The database URI
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///db/baseball.sqlite"
app.config['SQLALCHEMY_BINDS'] = {
    "combined_db":"sqlite:///db/baseballDeath.sqlite",
    "combined_db2":"sqlite:///db/graphdb.sqlite"
    }

db = SQLAlchemy(app)

# Create our database model

class Graph(db.Model):
    __bind_key__ = 'combined_db2'
    __tablename__= 'final6'
    
    id = db.Column(db.Integer, primary_key=True)
    year = db.Column(db.Integer)
    country = db.Column(db.String)
    count = db.Column(db.String)
    height = db.Column(db.Float)
    weight = db.Column(db.Float)

    def __repr__(self):
        return '<Graph %r>' % (self.name)

class BaseballDeath(db.Model):
    __bind_key__ = 'combined_db'
    __tablename__= 'final2'
    
    id = db.Column(db.Integer, primary_key=True)
    birthYear = db.Column(db.Integer)
    nameFirst = db.Column(db.String)
    nameLast = db.Column(db.String)
    latitude = db.Column(db.Float)
    longitude = db.Column(db.Float)
    country_iso_code = db.Column(db.String)
    deathYear = db.Column(db.Integer)
    birthCity = db.Column(db.String)
    flags = db.Column(db.String)
    deathCity = db.Column(db.String)
    deathCountry = db.Column(db.String)

    def __repr__(self):
        return '<BaseballDeath %r>' % (self.name)

class Baseball(db.Model):
    __tablename__ = 'final'

    id = db.Column(db.Integer, primary_key=True)
    birthYear = db.Column(db.Integer)
    nameFirst = db.Column(db.String)
    nameLast = db.Column(db.String)
    latitude = db.Column(db.Float)
    longitude = db.Column(db.Float)
    country_iso_code = db.Column(db.String)
    deathYear = db.Column(db.Integer)
    birthCity = db.Column(db.String)
    flags = db.Column(db.String)
    deathCity = db.Column(db.String)
    deathCountry = db.Column(db.String)
    

    def __repr__(self):
        return '<Baseball %r>' % (self.name)


# Create database tables
@app.before_first_request
def setup():
    print("set up")# Recreate database each time for demo
    # db.drop_all()
    db.create_all()
    db.create_all(bind='combined_db')


@app.route("/")
def home():
    """Render Home Page."""
    return render_template("index.html")


@app.route("/birthYear")
def stats_data():
    """Return birthYear"""
    #get entire table, and print everything using "results"
    #match return (result) with original csv to see if everything will print
    # Query for the necessary data
    results = db.session.query(Baseball.birthYear, Baseball.nameFirst, Baseball.nameLast, 
        Baseball.latitude, Baseball.longitude, Baseball.country_iso_code, Baseball.deathYear,
        Baseball.birthCity, Baseball.flags, Baseball.deathCity, Baseball.deathCountry).\
        order_by(Baseball.birthYear.desc()).\
        limit(20000).all()

    # Create lists from the query results
    nameLast = [result[0] for result in results]
    birthYear = [result[1] for result in results]
    nameFirst = [result[2] for result in results]
    latitude = [result[3] for result in results]
    longitude = [result[4] for result in results]
    country_iso_code = [result[5] for result in results]
    deathYear = [result[6] for result in results]
    birthCity = [result[7] for result in results]
    flags = [result[8] for result in results]
    deathCity = [result[9] for result in results]
    deathCountry = [result[10] for result in results]
    # print(nameLast)
    # print(latitude)
    # print(longitude)
    
    # baseball_dict = {
    #     "nameLast": nameLast, "birthYear": birthYear, "latitude": latitude, 
    #     "longitude":longitude
    # }
    return jsonify(results)

@app.route("/deathYear")
def stats_data2():
    """Return deathYear"""
    #get entire table, and print everything using "results"
    #match return (result) with original csv to see if everything will print
    # Query for the necessary data
    results2 = db.session.query(BaseballDeath.birthYear, BaseballDeath.nameFirst, BaseballDeath.nameLast, 
        BaseballDeath.latitude, BaseballDeath.longitude, BaseballDeath.country_iso_code, BaseballDeath.deathYear,
        BaseballDeath.flags, BaseballDeath.deathCity, BaseballDeath.deathCountry).\
        order_by(BaseballDeath.deathYear.desc()).\
        limit(20000).all()

    # Create lists from the query results
    nameLast = [result[0] for result in results2]
    birthYear = [result[1] for result in results2]
    nameFirst = [result[2] for result in results2]
    latitude = [result[3] for result in results2]
    longitude = [result[4] for result in results2]
    country_iso_code = [result[5] for result in results2]
    deathYear = [result[6] for result in results2]
    flags = [result[7] for result in results2]
    deathCity = [result[8] for result in results2]
    deathCountry = [result[9] for result in results2]
    
    
    return jsonify(results2)

@app.route("/graph")
def graph_data():

    results3 = db.session.query(Graph.year, Graph.country, Graph.count, 
        Graph.height, Graph.weight).\
        order_by(Graph.count.desc()).\
        limit(300).all()
  
    year = [result[0] for result in results3]
    country = [result[1] for result in results3]
    count = [result[2] for result in results3]
    height = [result[3] for result in results3]
    weight = [result[4] for result in results3]

    return jsonify(results3)

@app.route("/sources")
def sources():
    """Render Home Page."""
    return render_template("sources.html")


if __name__ == '__main__':
    app.run(debug=True)