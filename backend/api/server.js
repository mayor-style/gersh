const express = require('express');
const cors = require('cors')
const multer = require('multer');
const mysql = require('mysql');
const path = require('path');
const app = express();

app.use(cors())

app.use(express.json());
app.use('/uploads', express.static('uploads'));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'book_submission'
  });
  

  db.connect(err => {
    if (err) throw err;
    console.log('MySQL connected...');
  });



  // Multer setup for file uploads
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });


  const upload = multer({ storage: storage });

  // API endpoint to handle form submission
app.post('/submit', upload.single('file'), (req, res) => {
    const { name, email, phone, title, genre, synopsis, notes } = req.body;
    const file_path = req.file.path;
  
    const writerQuery = 'INSERT INTO writers (name, email, phone) VALUES (?, ?, ?)';
    const writerData = [name, email, phone];
  
    db.query(writerQuery, writerData, (err, result) => {
      if (err) throw err;
      const writer_id = result.insertId;
  
      const bookQuery = 'INSERT INTO books (writer_id, title, genre, synopsis, file_path, notes) VALUES (?, ?, ?, ?, ?, ?)';
      const bookData = [writer_id, title, genre, synopsis, file_path, notes];
  
      db.query(bookQuery, bookData, (err, result) => {
        if (err) throw err;
        res.send('Submission successful!');
      });
    });
  });
  


  // Start the server

  const PORT =  8000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));