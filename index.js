var express=require("express");
var bodyParser=require("body-parser");
var mysql = require("mysql")

var app=express();

app.use(bodyParser.urlencoded({'extended':'true'}));            
app.use(bodyParser.json());                                    
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 

var port =process.env.PORT || 8080;



const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'newdb'
  });

//connect to database
conn.connect((err) =>{
    if(err) throw err;
    console.log('Mysql Connected...');
});

//get studedent by id //PARAMETERS
app.get('/student/:id',function(req,res){

    let sql = "SELECT * FROM student where id="+req.params.id;
    let query = conn.query(sql, (err, results) => {
        if(err) throw err;
        res.json({"status": 200, "error": null, "response": results});
    });

});

//get studedent by without id //PARAMETERS
app.get('/student',function(req,res){

    console.log(req.headers);//authentication of rest api

    let sql = "SELECT * FROM student where id="+req.body.id+" and name='"+req.body.name+"'";
    let query = conn.query(sql, (err, results) => {
        if(err) throw err;
        res.json({"status": 200, "error": null, "response": results});
    });

});

//update data using post
app.post('/student/:id',function(req,res){

    let sql = "UPDATE student SET fname = '"+req.body.fname+"' where id="+req.params.id;

    let query = conn.query(sql, (err, results) => {
        if(err) throw err;
        res.json({"status": 200, "error": null, "response": results});
    });

});


//update data using put
app.put('/student/:id',function(req,res){

    let sql = "UPDATE student SET fname = '"+req.body.fname+"' where id="+req.params.id;

    let query = conn.query(sql, (err, results) => {
        if(err) throw err;
        res.json({"status": 200, "error": null, "response": results});
    });

});
//GET all data
app.get("/allstudents",function(req,res){

    let sql = "SELECT * FROM student";
    let query = conn.query(sql, (err, results) => {
        if(err) throw err;
        res.json({"status": 200, "error": null, "response": results});
    });
});


//insert data
app.post("/student",function(req,res){

    let data = {
        id: req.body.id,
        name: req.body.name,
        fname:req.body.fname,
        mname:req.body.mname,
        mobile:req.body.mobile,
        emial:req.body.emial,
        
    };

    let sql = "INSERT INTO student SET ?";
    let query = conn.query(sql, data,(err, results) => {
      if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });



});


app.listen(port,()=>{
    console.log(`SERVER RUNNING`);
});



