import React from 'react'
import { useState, useEffect } from 'react'
import './BookForm.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const BookForm = () => {

  const navigate= useNavigate()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        title: '',
        genre: '',
        synopsis: '',
        file: null,
        notes: '',
      });

      const [notify, setNotify]= useState('');

  

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };


  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };
    
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach(key => {
      data.append(key, formData[key]);
    });

try {
  console.log("hello there")
  const response = await axios.post('https://gersh.onrender.com/submit', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  if (response.status === 200) {
    alert('Submission successful!');
    setNotify('Submitted! Within 24 to 48 hours you should get a feedback from us via email.');
    navigate('/book');
  } else {
    console.error('Submission failed with status:', response.status);
  }
} catch (error) {
  console.error('There was an error submitting the form:', error.message);
}


  return (
    <>
    <div className="container">
      <h1>Submit Your Book for Publication and Movie Adaptation</h1>
   <form onSubmit={handleSubmit}>

   <label htmlFor="name">Full Name</label>
     <input type="text" name="name" placeholder="Full Name" onChange={handleChange} required />


     <label htmlFor="email">Email Address</label>
      <input type="email" name="email" placeholder="Email Address" onChange={handleChange} required />

      <label htmlFor="phone">Phone Number</label>
      <input type="tel" name="phone" placeholder="Phone Number" onChange={handleChange} required />

      <label htmlFor="title">Book Title</label>
      <input type="text" name="title" placeholder="Book Title" onChange={handleChange} required />

      <label htmlFor="genre">Genre</label>
      <input type="text" name="genre" placeholder="Genre" onChange={handleChange} required />

      <label htmlFor="synopsis">Synopsis</label>
      <textarea name="synopsis" placeholder="Synopsis/Short Description" onChange={handleChange} required />

      <label htmlFor="file">Upload Book File*</label> <span> <strong>Note:</strong> Please upload a chapter by chapter summary so that we can understand the full arc of the narrative. <br />If your book does not have chapters, please upload a detailed and comprehensive summary not to exceed 5,000 words. <br /> <br />Acceptable file types: .Pdf, .Jpg, .Png, .Jpeg</span>
      <div>

      <input type="file" name="file" onChange={handleFileChange} required />
      </div>

     
      <textarea name="notes" placeholder="Additional Notes" onChange={handleChange} />
    <strong>{notify}</strong>
      <button type="submit">Submit</button>
   </form>
   </div>


</>
  )
}

export default BookForm
