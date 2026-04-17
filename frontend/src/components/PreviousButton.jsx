import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';

const PreviousButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/'); }

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-4 right-4 flex items-center justify-center w-12 h-12 text-white bg-blue-500 rounded-full hover:bg-blue-600 transition duration-300 shadow-lg hover:scale-105">
      <BiArrowBack className="w-6 h-6 " /> 
     
    </button>
  );
};


export default PreviousButton
