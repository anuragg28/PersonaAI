import React from 'react'
import { useNavigate } from 'react-router-dom';
import generate from "../assets/generate.png";



function HeroSection() {
    const navigate = useNavigate();

const handleGenerateClick = () => {
  navigate('/persona/details');
};
  return (
   
    <div className="pt-36 min-h-screen bg-gradient-to-br from-white to-purple-100">
      
      <div className="absolute top-20 left-10 w-32 h-32 border-2 border-dashed border-gray-300 opacity-30"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 border-2 border-dashed border-gray-300 opacity-30"></div>
      
    
      <div className="container mx-auto px-4 pt-20 pb-32">
        <div className="max-w-4xl mx-auto text-center">
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="block">The Most Powerful</span>
            <span className="block text-blue-500">Persona Builder</span>
            <span className="block">for Your Business</span>
          </h1>
          
         
          <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
            Unlock insights with AI-powered user personas tailored to your business model and market
          </p>
          
         
          <button 
              onClick={handleGenerateClick}
              className="relative z-10 transition-transform duration-300 hover:scale-105 focus:outline-none">
              <img src={generate} alt="Generate User Persona" className="w-auto h-12 cursor-pointer"
              />
            </button>
        </div>
      </div>
    </div>

  )
}

export default HeroSection
