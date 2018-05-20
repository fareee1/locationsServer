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

client.connect()

// Select query for locations

app.get('/',(req,resp)=>{
    client.query("SELECT * FROM locations",
    (err, rows,fields)=> {
    if(err){
        res.send(error)
    }else{
        resp.json(rows.rows)
    }
})
})

app.post('/addMarker',(req,resp)=>{
    const sql = 'INSERT INTO locations(lat, long, cityname, description, visited) VALUES($1,$2,$3,$4,$5)'
    const params = [req.body.lat, req.body.long, req.body.cityname, req.body.description, req.body.visited]
    if(!req.body.lat || !req.body.long || req.body.cityname || req.body.description){
        return res.send("Something missing")
    } 
    if(!req.body.visited){
        req.body.visited = true
    }
    return client.query(sql, params)
})

// BodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

port = process.env.PORT
// Listener
app.listen(port, ()=>{
console.log('Im listening on ', port)
})