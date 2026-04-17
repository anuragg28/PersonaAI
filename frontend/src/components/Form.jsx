import React from 'react'
import { useState } from 'react';
import Navbar from './Navbar';

function Form() {
    const [brandName, setBrandName] = useState('');
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [businessType, setBusinessType] = useState('');
    const [hasPrototypes, setHasPrototypes] = useState('');
    const [featureTitle, setFeatureTitle] = useState('');
    const [featureDescription, setFeatureDescription] = useState('');

  return (<>
  <Navbar/>
    <div className="w-full flex justify-end">
        <div className="w-1/2 p-8 bg-white shadow-lg rounded-lg">
      <h2>Product details</h2>
      <form>
        <label htmlFor="brandName" className="block text-sm font-medium text-gray-700">  Brand Name* 
        </label>
        <input type="text" value={brandName}onChange={(e) => setBrandName(e.target.value)} placeholder="Enter brand name"  
        className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        required/>
        <label htmlFor="productName" className="block text-sm font-medium text-gray-700">  Product Name* 
        </label>
        <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} placeholder="Enter product name"  
        className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        required/>
        <label htmlFor="productDescription" className="block text-sm font-medium text-gray-700">  Product Description*
        </label>
        <textarea value={productDescription} onChange={(e) => setProductDescription(e.target.value)} placeholder="Enter product description"  
        className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
         rows="6"
        required/>
        
        
        <label htmlFor="industryName" className="block text-sm font-medium text-gray-700">Industry Name</label>
<select name="industry" id="industry"  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
  <option value="SaaS">SaaS</option>
  <option value="E-commerce">E-commerce</option>
  <option value="Healthcare & Pharmaceuticals">Healthcare & Pharmaceuticals</option>
  <option value="Education & E-learning">Education & E-learning</option>
  <option value="Finance & Fintech">Finance & Fintech</option>
  <option value="Retail">Retail</option>
  <option value="Real Estate">Real Estate</option>
  <option value="Logistics & Transportation">Logistics & Transportation </option>
  <option value="Hospitality & Travel">Hospitality & Travel</option>
  <option value="Agriculture & Agritech">Agriculture & Agritech  </option>
  <option value="Media & Entertainment">Media & Entertainment  </option>
  <option value="Automotive">Automotive  </option>
  <option value="Telecommunications">Telecommunications</option>
  <option value="Energy & Utilities">Energy & Utilities</option>
  <option value="Consumer Goods">Consumer Goods  </option>
  <option value="Professional Services">Professional Services</option>
  <option value="Construction">Construction</option>
  <option value="Legal & Compliance">Legal & Compliance</option>
  <option value="Nonprofit & SocialImpact">Nonprofit & Social Impact</option>
</select>
<h3 className="text-sm font-medium text-gray-700">Business Type</h3>
<label className="flex items-center space-x-2 p-3 border border-gray-300 rounded-lg cursor-pointer">
          <input
            type="checkbox"
            className="form-checkbox h-4 w-4 text-blue-600"
            checked={businessType === 'B2B'}
            onChange={() => setBusinessType('B2B')}
          />
          <span>B2B (Business to Business)</span>
        </label>
        <label className="flex items-center space-x-2 p-3 border border-gray-300 rounded-lg cursor-pointer">
          <input
            type="checkbox"
            className="form-checkbox h-4 w-4 text-blue-600"
            checked={businessType === 'B2C'}
            onChange={() => setBusinessType('B2C')}
          />
          <span>B2C (Business to Customer)</span>
        </label>

        <label className="flex items-center space-x-2 p-3 border border-gray-300 rounded-lg cursor-pointer">
          <input
            type="checkbox"
            className="form-checkbox h-4 w-4 text-blue-600"
            checked={businessType === 'D2C'}
            onChange={() => setBusinessType('D2C')}
          />
          <span>D2C (Direct to Customer)</span>
        </label>
        <h3 className="text-sm font-medium text-gray-700">Have you developed any features or prototypes for your brand?</h3>
            <label className="flex items-center space-x-2 p-3 border border-gray-300 rounded-lg cursor-pointer mt-2">
              <input type="radio"
                name="hasPrototypes"
                className="form-radio h-4 w-4 text-blue-600"
                checked={hasPrototypes === 'Yes'}
                onChange={() => setHasPrototypes('Yes')}
              />
              <span>Yes</span>
            </label>
            <label className="flex items-center space-x-2 p-3 border border-gray-300 rounded-lg cursor-pointer mt-2">
              <input
                type="radio"
                name="hasPrototypes"
                className="form-radio h-4 w-4 text-blue-600"
                checked={hasPrototypes === 'No'}
                onChange={() => setHasPrototypes('No')}
              />
              <span>No</span>
            </label>
            <label htmlFor="featureTitle" className="block text-sm font-medium text-gray-700">  Feature title </label>
        <input type="text" value={featureTitle}onChange={(e) => setFeatureTitle(e.target.value)} placeholder="Enter Feature title "  
        className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        required/>
        <label htmlFor="featureDescription" className="block text-sm font-medium text-gray-700">  Feature Description </label>
        <textarea value={featureDescription} onChange={(e) => setFeatureDescription(e.target.value)} placeholder="Enter product description"  
        className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
         rows="6"
        required/>
<div className="flex justify-center">
<button type='submit' className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400" >Generate
</button>
</div>

      </form>
    </div>
        </div>
        </>
  )
}

export default Form
