const express = require("express");
const app = express();
const path = require("path");
app.use(express.urlencoded({ extended: true }));

const methodOverride = require("method-override");
app.use(methodOverride("_method"));


const mysql = require("mysql2");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "18022004",
  database: "college",
});

const port = 3000;
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get("/", (req,res)=>{
    res.send("Welcome");
})

app.get("/home", (req, res) => {
  res.render("home.ejs");
});

// app.get("/student-info", (req, res) => {
//   let student = req.body;
//   let q = "SELECT * FROM students";
//   try {
//     connection.query(q, (err, result) => {
//       if (err) throw err;
//       let counts = result;
//       res.render("student-info.ejs", { counts });
//     });
//   } catch (err) {
//     console.log(err);
//     res.send("Error in DB");
//   }
// });

app.get("/add-student" , (req,res)=>{
    res.render("new-stu.ejs");
});


app.post("/add-student" , (req,res)=>{
  let {name, cls, city, email, dob, gender} = req.body;
  let doa = new Date();
  let q1 = "SELECT MAX(id) AS total FROM studentsData";

connection.query(q1, (err, result) => {
    if (err) {
        res.send(err);
        return;
    }

    let total = result[0].total + 1;

    let q2 = "INSERT INTO studentsData(id, name, class, city, email, dob, gender, doa) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

    connection.query(q2, [total, name, cls, city, email, dob, gender, doa], (err, result2) => {
        if (err) {
            res.send(err);
            return;
        }

        res.redirect("/home");
    });
});
});
   
      

app.get("/student-info", (req, res)=>{
  res.render("searchStu.ejs")
})


app.get("/student-info/city", (req, res) => {
  let {city}= req.query;
  
  let q = 'SELECT * FROM studentsData WHERE city=?';
  try {
    connection.query(q, [city], (err, result) => {
      if (err) throw err;
      let counts = result;
      res.render("student-info.ejs", { counts });
    });
  } catch (err) {
    console.log(err);
    res.send("Error in DB");
  }
});


app.get("/student-info/roll", (req, res) => {
  let {roll}= req.query;
  
  let q = 'SELECT * FROM studentsData WHERE id=?';
  try {
    connection.query(q, [roll], (err, result) => {
      if (err) throw err;
      let counts = result;
      res.render("student-info.ejs", { counts });
    });
  } catch (err) {
    console.log(err);
    res.send("Error in DB");
  }
});


app.get("/student-info/name", (req, res) => {
  let {name}= req.query;
  
  let q = 'SELECT * FROM studentsData WHERE name=?';
  try {
    connection.query(q, [name], (err, result) => {
      if (err) throw err;
      let counts = result;
      res.render("student-info.ejs", { counts });
    });
  } catch (err) {
    console.log(err);
    res.send("Error in DB");
  }
});


app.get("/all-students", (req, res) => {
  
  let q = 'SELECT * FROM studentsData';
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let counts = result;
      res.render("student-info.ejs", { counts });
    });
  } catch (err) {
    console.log(err);
    res.send("Error in DB");
  }
});

app.delete("/del-stu/:id", (req, res)=>{
  let {id} = req.params;
  const q= `DELETE FROM studentsData WHERE id=${id};`;
  connection.query(q, (err, result)=>{
    if(err) res.send("Error in DB");
    res.redirect("/home");
  })

})


app.get("/student/:id/certificate", (req, res)=>{
  let {id} = req.params;
  const q = `SELECT * FROM studentsData WHERE id=${id};`;
  connection.query(q, (err, result)=>{
    let docs = result;
    res.render("certificate.ejs" , {docs});
  });
});