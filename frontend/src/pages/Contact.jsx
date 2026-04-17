import React from 'react'
import { useState } from 'react';
import PreviousButton from '../components/PreviousButton';

function Contact() {
    const [name,setName]=useState("");
    const[email,setEmail]=useState("");
    const[message,setMessage]=useState("");
  return (
    <div>
       <div className="text-center pb-16 pt-36  min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 md:px-40">
          <h1 className="text-4xl md:text-5xl font-bold text-indigo-600 mb-6 pt-8">
            Get in Touch
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Have questions about PersonaAI? We're here to help. Reach out to our team
            and we'll get back to you as soon as possible.
          </p>
          <div>
            <form className='px-11 pt-20'>
          <label htmlFor="Name" className=" py-2 block text-sm font-medium text-gray-700">  Name </label>
        <input type="text" value={name}onChange={(e) => setName(e.target.value)} placeholder="Enter your name"  
        className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        required/>
        <label htmlFor="email" className=" py-2 block text-sm font-medium text-gray-700">  Email </label>
        <input type="text" value={email}onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email"  
        className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        required/>
        <label htmlFor="email" className=" py-2 block text-sm font-medium text-gray-700">  Your Message </label>
        <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Enter your message"  
        className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
         rows="4"
        required/>
        
    </form>
    </div>
    <div className="flex justify-center items-center h-full">
    
        <div class="lg:w-1/2 mb-8 lg:mb-0">
        
        <h3 class="text-xl text-center font-semibold text-indigo-700 mb-4 pt-11">Email Us</h3>
        <p class="text-gray-600 mb-6 hover:scale-105 hover:cursor-pointer">support@personaai.com</p>
        <h3 class="text-xl font-semibold text-indigo-700 mb-4">Call Us</h3>
        <p class="text-gray-600 hover:cursor-pointer hover:scale-105">+1 (555) 123-4567</p>
      </div>
      </div>
      <PreviousButton/>
        </div>
        
    </div>
  )
}

export default Contact
