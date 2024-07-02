import React, { useState } from 'react'
import './index.css'
import axios from 'axios'
import Header from '../Common/Header'
import baseUrl from '../config'


const Regester = () => {
  const [userData, setUserData] = useState({ firstname: "", lastname: "", location: "", email: "", password: "", phoneno: "", about: "", address: "" })
  const handleUserData = (e) => {
    setUserData({...userData, [e.target.name]: e.target.value});
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(userData);
    axios.post(`${baseUrl}userdata`, { ...userData })
      .then(res => {
        alert("User Added Successfully")
        setUserData({ firstname: "", lastname: "", location: "", email: "", password: "", phoneno: "", about: "", address: "" })
      })
      .catch(err => {
        console.log(err);
        if (err.response && err.response.data && err.response.data.error) {
          alert(err.response.data.error); // Set error message from backend response
        } else {
          alert('An error occurred. Please try again.'); // Generic error message
        }
      });
  }

  const { firstname, lastname, location, email, password, phoneno, about, address } = userData
  return (
    <>
      <Header />
      <div id='register' className='Er-bg22'>
        <div className='Er-bg1'>
          <h1 className='Er-head1'>Client Register</h1>
          <form onSubmit={handleSubmit} >
            <div className='Er-card1'>
              <input className='Er-input1' value={firstname} type="text" placeholder='Enter Your First Name' name='firstname' onChange={handleUserData} required />
              <input className='Er-input1' value={lastname} type="text" placeholder='Enter Your Last Name' name='lastname' onChange={handleUserData} required />
              <input className='Er-input1' value={location} type="text" placeholder='Enter Your Location' name='location' onChange={handleUserData} />
              <input className='Er-input1' value={email} type="text" placeholder='Enter Your Email' name='email' onChange={handleUserData} required />
              <input className='Er-input1' value={password} type="password" placeholder='Set Your Password' name='password' onChange={handleUserData} required />
              <input className='Er-input1' value={phoneno} type="text" placeholder='Enter Your Contact Number' name='phoneno' onChange={handleUserData} required />
              <input className='Er-input1' value={about} type="text" placeholder='Enter How did you here about us' name='about' onChange={handleUserData} required />
              <textarea className='Er-input12' value={address} type="text" placeholder='Enter Your Address' name='address' onChange={handleUserData} required />
              <button type='submit' className='Er-button1'>Submit</button>
              <p className='Er-para1'>By clicking "Submit" Register your Data In our Website</p>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Regester