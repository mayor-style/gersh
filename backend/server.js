require('dotenv').config()
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());
const user=process.env.EMAIL_USER
// Set up Multer for handling file uploads
const upload = multer({ storage: multer.memoryStorage() }); // Using memory storage to keep the file in buffer

// Nodemailer transport setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER || 'mayormento11234@gmail.com', // Your email address
        pass: process.env.EMAIL_PASS  ||  'zjxfpuutadvqlehg', // Your email password
    },
});

app.post('/submit', upload.single('file'), async (req, res) => {
    const { name, email, phone, title, genre, synopsis, notes } = req.body;
    const file = req.file; // The uploaded file

    // Prepare the email content
    const mailOptions = {
        from: process.env.EMAIL_USER || 'mayormento11234@gmail.com' ,
        to: process.env.EMAIL_USER  || 'mayormento11234@gmail.com', // Sending to the same email
        subject: 'New Book Submission',
        text: `You have received a new book submission:

        Full Name: ${name}
        Email Address: ${email}
        Phone Number: ${phone}
        Book Title: ${title}
        Genre: ${genre}
        Synopsis: ${synopsis}
        Additional Notes: ${notes}`,
        attachments: [
            {
                filename: file.originalname,
                content: file.buffer, // The file content is stored in memory
            },
        ],
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send('Submission successful!');
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Error submitting data');
    }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
