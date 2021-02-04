import Express from "express";
import mysql from "mysql";

const app = Express();


app.get("/", (req, res) => {
    res.end(`<h1 id="hai">CRUD NodeJS</h1><br/><br/>
    <a href="/book">book</a><br/>
    <a href="/createcookie">createcookie</a><br/>
    <a href="/clearcookie">clearcookie</a><br/>
    `);
});


// sinle route containe GET,POST,PUT method
app.route('/book')
  .get(function (req, res) {
    res.send('Get a random book')
  })
  .post(function (req, res) {
    res.send('Add a book')
  })
  .put(function (req, res) {
    res.send('Update the book')
  })

app.get('/createcookie', function(req, res){
    res.cookie('names', 'express',{maxAge:900000000}).send('cookie set'); //Sets name = express 
    res.redirect('/');
});
app.get('/clearcookie', function(req, res){
    res.clearCookie('names', 'express',{maxAge:900000000}).send('cookie clear'); //Sets name = express 
    res.redirect('/');
});
app.listen(3001, () => console.log("listening on port 3001"));

