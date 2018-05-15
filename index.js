const express= require('express')
const pg = require('pg')
const { Client } = require('pg');
const app = express()
const bodyParser = require('body-parser')

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true
  });
  
// Allow client to access cross domain or ip-address
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
})


const locations = [{
    "id": 1,
    "lat": 52.3702,
    "lon": 4.8952,
    "cityName": "Amsterdam",
    "description": "Such a lovely place to visit",
    "visited": true
},{
    "id": 2,
    "lat": 50.1109,
    "lon": 8.6821,
    "cityName": "Frankfurt",
    "description": "Visited twice",
    "visited": true
},{
    "id": 3,
    "lat": 50.0755,
    "lon": 14.4378,
    "cityName": "Prague",
    "description": "Feel in love with this city",
    "visited": true
},{
    "id": 4,
    "lat": 40.4168,
    "lon": 3.7038,
    "cityName": "Madrid",
    "description": "Planning to visit in october",
    "visited": false
},{
    "id": 5,
    "lat": 44.7866,
    "lon": 20.4489,
    "cityName": "Belgrade",
    "description": "Best nightlife",
    "visited": false
},{
    "id": 6,
    "lat": 48.8566,
    "lon": 2.3522,
    "cityName": "Paris",
    "description": "City of love",
    "visited": false
}]

client.connect()

// Select query for projects 
app.get('/',(req,res)=>{
    res.send(locations)
})

// BodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

port = process.env.PORT
// Listener
app.listen(port, ()=>{
console.log('Im listening on ', port)
})