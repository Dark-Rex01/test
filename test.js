var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var mysql = require('mysql');
app.use(bodyParser.urlencoded({    
    extended: true
  }));

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'test'
  })

connection.connect(function(err) {
   if (err) 
      throw err
   else {
       console.log('Connected to MySQL');
       app.listen(3000);
       console.log('Server listening on port 3000');
 }
});

app.use(bodyParser.json())

app.get('/read', function(req,res) {

    connection.query('SELECT `id`, `name` FROM `users`', function(err, result) {
      if(err) {
         throw err
      }
      else{
        console.log(result);
      }
    });

});


app.post('/create', function(req, res) {

var jsondata = req.body.name;
var jsonid = req.body.id;

connection.query('INSERT INTO users (id,name) VALUES (?,?)', [jsonid,jsondata] , function(err) {
  if(err) {
     throw err
  }
 else {
     res.send('Success');
  }
});
});

app.put('/update', function(req,res){
    var jsondata = req.body.name;
    var jsonid = req.body.id;
    connection.query('UPDATE users SET name = ? Where id = ?', [jsondata,jsonid], function(err) {
          if (err) {
              throw err;
          }
          else{
              res.send('updated  :  '+ jsondata);
          }
        }
    );

});

app.delete('/delete', function(req,res){
    var jsonid = req.body.id;
    connection.query('DELETE FROM `users` WHERE id = ?', [jsonid], function(err) {
            if (err) {
                throw err;
            }
            else{
                res.send('deleted Id  :  '+ jsonid);
            }
            }
        );
    
});