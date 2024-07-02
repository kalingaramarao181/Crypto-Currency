const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const jwt = require("jsonwebtoken")

//DATABASE CONNECTION
const db = mysql.createConnection({
  user: "root",
  password: "",
  host: "localhost",
  database: "crypto"
})

//DATABASE CONNECTION CHECKING
db.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database')
});

 //CREATING SERVER APP
const app = express()  

//ACCESSING CLIENT SIDE REQUESTS
app.use(express.json())  

//CORS PURMISSION
app.use(cors({ origin: 'http://localhost:3000' }));

//GET USER COINS
app.get("/user-coins/:userMail", (req, res) => {
  const sql = 'SELECT * FROM usercoins WHERE userdata = ?';
  db.query(sql, [req.params.userMail], (err, data) => {
    if (err) {
      res.status(500).json({ error: 'Database query error' });
      return;
    }
    const resData = data.map(each => each.usercoin);
    res.json(resData);
  });
});


//GET USER LABEL
app.get("/label", (req, res) => {
  const sql = 'SELECT * FROM tradecoins WHERE usermail = ? AND coinid = ?';
  const user = req.query.user;
  const coinId = req.query.coinId;

  db.query(sql, [user, coinId], (err, data) => {
    if (err) {
      res.status(500).json({ error: 'Database query error' });
      return;
    }
    if (data.length > 0) {
      const resData = data[0].lastlabel;
      res.json(resData);
    } else {
      res.status(404).json({ error: 'No data found' });
    }
  });
});


//GET USER FAVORATE COINS
app.get("/user-favorate-coins/:userMail", (req, res) => {
  const sql = 'SELECT * FROM tradecoins WHERE usermail = ?';
  db.query(sql, [req.params.userMail], (err, data) => {
    if (err) {
      res.status(500).json({ error: 'Database query error' });
      return;
    }
    const resData = data.map(each => each.coinid);
    res.json(resData);
  });
});

//POST TO USER COINS FROM DASHBOARD
app.post("/user-coin/:id", (req, res) => {
  const id = req.params.id;
  const userData = req.body.userData[0].email;
  const dbsql = 'SELECT * FROM usercoins WHERE usercoin = ? AND userdata = ?';
  const postsql = 'INSERT INTO usercoins (usercoin, userdata) VALUES (?, ?)';

  db.query(dbsql, [id, userData], (err, data) => {
    if (err) {
      console.error('Error querying database:', err);
      res.status(500).json({ error: 'Database query error' });
      return;
    }
    if (data.length > 0) {
      
      console.error('Already exists');
      res.status(409).json({ error: 'User already exists' });
      return;
    }

    db.query(postsql, [id, userData], (err, result) => {
      if (err) {
        console.error('Error inserting data into database:', err);
        res.status(500).json({ error: 'Database insertion error' });
        return;
      }
      console.log('Data inserted successfully');
      res.status(201).json({ message: 'Submitted successfully' });
    });
  });
});

//POST TO USER FAVORATES(WITH GRAPH DATA) FROM USER COINS
app.post("/user-coin-to/:id", (req, res) => {
  const id = req.params.id;
  const {lastLabel, lastData, userMail} = req.body.data;
  const dbsql = 'SELECT * FROM tradecoins WHERE coinid = ? AND usermail = ?';
  const postsql = 'INSERT INTO tradecoins (lastlabel, lastdata, usermail, coinid) VALUES (?, ?, ? , ?)';

  db.query(dbsql, [id, userMail], (err, data) => {
    if (err) {
      console.error('Error querying database:', err);
      res.status(500).json({ error: 'Database query error' });
      return;
    }
    if (data.length > 0) {
      console.error('Already exists');
      res.status(409).json({ error: 'User already exists' });
      return;
    }

    db.query(postsql, [lastLabel, lastData, userMail, id], (err, result) => {
      if (err) {
        console.error('Error inserting data into database:', err);
        res.status(500).json({ error: 'Database insertion error' });
        return;
      }
      console.log('Data inserted successfully');
      res.status(201).json({ message: 'Submitted successfully' });
    });
  });
});

//POST TO USER DATA (REGISTRATION)
app.post("/userdata", (req, res) => {
  const { firstname, lastname, location, email, password, phoneno, about, address } = req.body;
  const dbsql = 'SELECT * FROM userdata WHERE email = ?';
  const postsql = 'INSERT INTO userdata (`firstname`, `lastname`, `location`, `email`, `password`, `phoneno`, `about`, `address`) VALUES (?)';
  const values = [firstname, lastname, location, email, password, phoneno, about, address];

  db.query(dbsql, [email], (err, data) => {
    if (err) {
      console.error('Error querying database:', err);
      res.status(500).json({ error: 'Database query error' });
      return;
    }

    if (data.length > 0) {
      console.error('User already exists');
      res.status(409).json({ error: 'User Already Exists' });
      return;
    }

    db.query(postsql, [values], (err, result) => {
      if (err) {
        console.error('Error inserting data into database:', err);
        res.status(500).json({ error: 'Database insertion error' });
        return;
      }
      console.log('Data inserted successfully');
      res.status(201).json({ message: 'Application submitted successfully' });
    });
  });
});

//LOGIN AUTHANTICATED USER
app.post("/login", (req, res) => {
  const { username, password } = req.body
  const sql = `SELECT * FROM userdata WHERE email = '${username}'`
  db.query(sql, (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Database error" }); // Handle database error
    }
    if (data.length === 0) { // Check if user is not found
      return res.status(400).json({ error: "Invalid user" });
    }
    else if (data[0].password === password) {
      const payload = { username: username }
      const jwtToken = jwt.sign(payload, "SECRET_TOKEN")
      res.json({ jwtToken, data })
      res.status(200)
    } else {
      res.status(400).json({ error: "Invalid Password" })
    }
  })
});

// UNUSEFUL DATA
app.post("/trade-coin", (req, res) => {
  const coin = JSON.stringify(req.body)
  const sql = 'INSERT INTO trade (`coin`) VALUES (?)';

  // const {category, enrollmentdate, candidatename, emailid, phonenumber, coursename, facultyname, notes} = req.body;
  // const values = [category, enrollmentdate, candidatename, emailid, phonenumber, coursename, facultyname, notes]
  // const sql = 'INSERT INTO training (`category`, `enrollmentdate`, `candidatename`, `emailid`, `phonenumber`, `coursename`, `facultyname`, `notes`) VALUES (?)';
  db.query(sql, [[coin]], (err, result) => {
    if (err) {
      console.error('Error inserting data into database:', err);
      res.status(500).json({ error: err.message });
      return;
    }
    console.log('Data inserted successfully');
    res.status(201).json({ message: 'Application submitted successfully' });
  });
})


//CONNECTING SERVER
app.listen(4003, () => {
  console.log("Server is running at http://localhost:4003");
})