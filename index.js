import Express from "express";
import mysql from "mysql";
import fs from "fs";
const port = 3001;
var con = mysql.createConnection({
    host: "localhost",
    port: 3308,
    user: "root",
    password: "",
    database: "vuedb",
});
const app = Express();

//index Router
/*
app.get("/", (req, res) => {
    res.end(`
    <!--
    <h1 id="hai">CRUD NodeJS</h1><br/><br/>
    <a href="/">Home</a><br/>
    <a href="/View">View</a><br/>
    <a href="/Insert">Insert</a><br/>
    <a href="/Delete">Delete</a><br/>
    <a href="/Update">Update</a><br/>
    -->
    `);
});
*/


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/home.html")

});

// View
app.get("/view", (req, res) => {
    con.query("SELECT * FROM contacts", (err, result) => {
        if (err) throw err;
        res.writeHead(200, { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" });
        res.end(JSON.stringify(result));
    });
});

//Insert
app.get("/insert", (req, res) => {
    con.query("INSERT INTO `contacts`(`name`, `email`, `city`, `country`, `job`) VALUES ('Brad Pitt','brad@gmail.com','Sanfransisco Bay Area','USA','Actor');", (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

//Delete
app.get('/delete', (req, res) => {
    con.query("delete from contacts where id='8'", (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});



//Delete with id

function mid(req, res, next) {
    // console.log(req.body);
    console.log(req.params);
    next();
}
app.get('/deleteid:id', mid, (req, res) => {
    con.query("delete from contacts where id=?", [req.params.id], (err, result) => {
        if (err) throw err;
        //res.json(req.params.id);
        res.redirect('/view');
    });
});

//Update
app.get('/update', (req, res) => {
    con.query('update contacts set name="Clint Martin" where name="clay martin Jr"', (err, result) => {
        if (err) throw err;
        // res.json(result);
        res.redirect('/view');
    });
});


/* const courses=[
{id:1,name:'course1'},
{id:2,name:'course2'},
{id:3,name:'course3'},
];
*/

/*
const courses = [{ "id": 1, "name": "Juan Alvaraz", "email": "juanal@gmail.com", "city": "Guadalajara", "country": "Mexico", "job": "Programmer" }, { "id": 2, "name": "Clint Martin", "email": "memartin@gmail.com", "city": "Austria", "country": "Vianna", "job": "Teacher" }, { "id": 3, "name": "Sherlock Holmes", "email": "sherlockinfo@gmail.com", "city": "New vales", "country": "England", "job": "Private Detective" }, { "id": 4, "name": "Helen keller", "email": "superhelen@gmail.com", "city": "montenna", "country": "USA", "job": "Writer" }, { "id": 5, "name": "Mary kom", "email": "mary@gmail.com", "city": "Prague", "country": "Czech Repuplic", "job": "Artitecture" }, { "id": 6, "name": "Song Joong Ki", "email": "joonsong@gmail.com", "city": "Seoul", "country": "Korea", "job": "Designer" }, { "id": 7, "name": "Cristiano Ronaldo", "email": "ronaldo@gmail.com", "city": "Madrid", "country": "Spain", "job": "Blogger" }, { "id": 8, "name": "Brad Pitt", "email": "brad@gmail.com", "city": "Sanfransisco Bay Area", "country": "USA", "job": "Actor" }];
app.get('/coursess/:id', (req, res) => {

    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) { res.status(404).send("404 id was wrong"); }
    else {
        con.query("delete from contacts where id=?", [req.params.id], (err, result) => {
            if (err) throw err;
            //res.json(req.params.id);
            res.redirect('/view');
        });
    }

});

*/
//delete custom
app.get('/delete/:id', (req, res) => {
    con.query("SELECT * FROM contacts", (err, result) => {
        if (err) throw err;

        const course = result.find(c => c.id === parseInt(req.params.id));
        if (!course) { res.status(404).send("404 id was wrong"); }
        else {
            con.query("delete from contacts where id=?", [req.params.id], (err, result) => {
                if (err) throw err;
                //res.json(req.params.id);
                res.redirect('/view');
            });
        }
    });
});
//insert custom
// http://localhost:3001/insert/Will/wllmail@gmail.com/NYC/USA/Racer
app.get('/insert/:name/:email/:city/:country/:job', (req, res) => {
    
    const items = [
        { name: 'alpha' }
    ];
    
    const val = [items.map(item => [req.params.name,req.params.email,req.params.city,req.params.country,req.params.job])];
    const sql = "INSERT INTO contacts (`name`, `email`, `city`, `country`, `job`) VALUES ?";
    con.query(sql, val, (err, result) => {
        if (err) throw err;
        //res.json(req.params.id);
        res.redirect('/view');
    });
});



//search
app.get('/:name', (req, res) => {
    con.query("SELECT * FROM contacts where name=?",req.params.name, (err, result) => {
        if (err) throw err;
        const course = result.find(c => c.name ===req.params.name);
        if (!course) { 
            /*res.status(404).send(req.params.name+" User account does not Found in our system");*/ 
            res.sendFile(__dirname + "/404.html")
        }
        else {
            con.query("SELECT * FROM contacts where name=?",req.params.name, (err, result) => {
                if (err) throw err;
                res.writeHead(200, { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" });
                res.end(JSON.stringify(result));
            });
        }
    });
});


//Update
app.get('/:name/job/:newjob', (req, res) => {
    con.query("SELECT * FROM contacts where name=?",req.params.name, (err, result) => {
        if (err) throw err;
        const course = result.find(c => c.name ===req.params.name);
        if (!course) { res.status(404).send(req.params.name+" User account does not Found in our system"); }
        else {
            con.query("UPDATE contacts SET ? WHERE ?",[{job:req.params.newjob},{name:req.params.name}], (err, result) => {
                if (err) throw err;
                res.writeHead(200, { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" });
                res.end(JSON.stringify(result));
            });
        }
    });
});



/*

app.use('/df/df',(req, res,next)=>{
    res.send('<h1> Page not found </h1>');
 });

*/
const __dirname=fs.realpathSync('.');
app.get('*', (req, res)=>{
    res.sendFile(__dirname + "/404.html")
  });


app.listen(port, () => console.log("listening on port" + port));



