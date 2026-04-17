import React from 'react';

const FeatureCard = ({ title, description }) => (
  <div className="bg-white p-7 rounded-lg shadow-lg hover:shadow-xl transition-shadow hover:scale-105 ">
    <h2 className="text-2xl font-semibold text-indigo-500 mb-4">
      {title}
    </h2>
    <p className="text-gray-700">
      {description}
    </p>
  </div>
);

export default FeatureCard;
