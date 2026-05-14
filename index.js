const express = require("express");
const app = express();
const path = require("path");
app.use(express.urlencoded({ extended: true }));




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

let num = 0;
const newId = function () {
  let str = ["a", "b", "c", "d"];
  let unique = str[num++ % 4] + num;

  return unique;
};

app.post("/add-student" , (req,res)=>{
    
    let {id, name, cls , city } = req.body;
    const q = "INSERT INTO students (id, name, class, city) VALUES (?, ?, ?, ?)";
    try {
    connection.query(q, [id, name, cls, city ], (err, result) => {
      if (err) throw err;
      res.redirect("/home");
    });
  } catch (err) {
    console.log(err);
    res.send("Error in DB");
  }
})


app.get("/student-info", (req, res) => {
  
  let q = 'SELECT * FROM students';
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