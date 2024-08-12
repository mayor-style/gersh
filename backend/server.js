const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const { appendData } = require('./googleSheets');
const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

app.get('/', (req, res) => {
  res.send('Welcome to home Page!');
});


app.get('/submit', (req, res)=>{
  res.send('submit page')
});
// API endpoint to handle form submission
app.post('/submit', upload.single('file'), async (req, res) => {
  const { name, email, phone, title, genre, synopsis, notes } = req.body;
  const file_path = req.file.path;

  // Prepare data to append to Google Sheets
  const values = [
    [name, email, phone, title, genre, synopsis, file_path, notes]
  ];

  try {
    const spreadsheetId = '1a7aHzCYfbP2J_N2IrNhRskfWpcAy8Mp-qQKxsdNf8RQ'; // Replace with your actual Google Sheets ID
 const range = 'Sheet1!A:H'; // Automatically appends data starting from the first available row in columns A to H

    await appendData(spreadsheetId, range, values);
    res.send('Submission successful!');
  } catch (error) {
    res.status(500).send('Error submitting data');
  }
});

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}!`));
