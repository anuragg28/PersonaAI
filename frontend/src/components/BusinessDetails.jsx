import personaStore from "../store/personaStore";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const industries = [
  "SaaS",
  "E-commerce",
  "Healthcare & Pharmaceuticals",
  "Education & E-learning",
  "Finance & Fintech",
  "Retail",
  "Real Estate",
  "Manufacturing",
  "Logistics & Transportation",
  "Hospitality & Travel",
  "Agriculture & Agritech",
  "Media & Entertainment",
  "Automotive",
  "Telecommunications",
  "Energy & Utilities",
  "Consumer Goods",
  "Professional Services",
  "Construction",
  "Legal & Compliance",
  "Nonprofit & Social Impact",
];

export default function BusinessDetails() {

    const [details, setDetails] = useState({industry: industries[1]})
    const navigate = useNavigate()

    const handleBusinessChange = (type) => {
        console.log(type)
        setDetails({...details, businessType: type})
    }

    const handleFeatureAvailability = (featureAvailability) => {
        console.log(featureAvailability)
        setDetails({...details, isFeature: featureAvailability})
    }

    const handleSubmit = () => {
        const {brandName, productDescription, industry, businessType} = details
        personaStore.setState({details: {brandName, productDescription, industry, businessType}, concerns: [], personas: []})
        navigate('/persona/report')
    }

  return (
    <section className="min-h-screen pb-32">
      <h1 className="text-3xl font-bold text-center mt-10">
        Let's Get To Know Your Business
      </h1>
      <div className="flex justify-center mt-3">
        <p
          style={{ width: 450 }}
          className="text-base text-neutral-600 text-center"
        >
          These details will help us create the most accurate and effective user
          personas for your brand
        </p>
      </div>

      <div className="flex justify-center mt-10">
        <form
          style={{ width: 850 }}
          className="min-h-96 bg-white rounded-xl px-10 py-12 border-2 border-neutral-300"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-2 mt-5">
            <label htmlFor="Brand name" className="font-bold">
              Brand Name
            </label>
            <input
              type="text"
              className="outline-none h-10 rounded-md border border-gray-300 text-neutral-700 px-4"
              placeholder={`Enter your brand's name`}
              onChange={(e) => setDetails({...details, brandName: e.target.value})}
            />
          </div>
          <div className="flex flex-col gap-2 mt-5">
            <label htmlFor="Product Description" className="font-bold">
              Product Description
            </label>
            <textarea
              className="outline-none min-h-32 rounded-md border border-gray-300 text-neutral-700 px-4 py-4"
              placeholder={`Enter your product description`}
              onChange={(e) => setDetails({...details, productDescription: e.target.value})}
            >
              {" "}
            </textarea>
          </div>
          <div className="flex flex-col gap-2 mt-5">
            <label htmlFor="Product Description" className="font-bold">
              Select Your Industry
            </label>
            <select onChange={(e) => setDetails({...details, industry: e.target.value})} value={details.industry} className="outline-none h-10 rounded-md border border-gray-300 text-neutral-700 px-4">
              {industries.map((industry, index) => {
                return <option value={industry}>{industry}</option>;
              })}
            </select>
          </div>
          <div className="mt-5">
            <label htmlFor="Product Description" className="font-bold">
              Business Type
            </label>

            <label
              htmlFor="b2c"
              className="flex gap-3 items-center mb-3 mt-5 h-10 rounded-md border border-gray-300 text-neutral-700 px-4"
            >
              <input type="checkbox" checked={details.businessType === "B2C"} onChange={() => handleBusinessChange("B2C")} />
              Business to Consumer (B2C)
            </label>

            <label
              htmlFor="b2b"
              className="flex gap-3 items-center mb-3 h-10 rounded-md border border-gray-300 text-neutral-700 px-4"
            >
              <input type="checkbox" checked={details.businessType === "B2B"} onChange={() => handleBusinessChange("B2B")} />
              Business to Business (B2B)
            </label>

            <label
              htmlFor="d2c"
              className="flex gap-3 items-center mb-3 h-10 rounded-md border border-gray-300 text-neutral-700 px-4"
            >
              <input type="checkbox" checked={details.businessType === "D2C"} onChange={() => handleBusinessChange("D2C")} />
              Direct to Consumer (D2C)
            </label>
          </div>
          <div className="mt-5">
            <label htmlFor="Product Description" className="font-bold">
              Have you developed any features or prototypes for your brand?
            </label>

            <label
              htmlFor="b2c"
              className="flex gap-3 items-center mb-3 mt-5 h-10 rounded-md border border-gray-300 text-neutral-700 px-4"
            >
              <input type="checkbox" checked={details.isFeature === true} onChange={() => handleFeatureAvailability(true)} />
              Yes
            </label>

            <label
              htmlFor="b2b"
              className="flex gap-3 items-center mb-3 h-10 rounded-md border border-gray-300 text-neutral-700 px-4"
            >
              <input type="checkbox" checked={details.isFeature === false} onChange={() => handleFeatureAvailability(false)} />
              No
            </label>
          </div>
          <div className="flex justify-end">
              <button type="submit" className="bg-blue-500 px-4 py-2 text-white rounded-lg">Generate Personas</button>
          </div>
        </form>
      </div>
    </section>
  );
}
