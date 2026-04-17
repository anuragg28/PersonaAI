import React from "react";
import FeatureCard from "../components/FeatureCard";
import PreviousButton from "../components/PreviousButton";

import { Link } from "react-router-dom";

function HowItWorks() {
  const steps = [
    {
      number: "1",
      title: "Input Your Business Details",
      description:
        "Start by providing information about your business, target market, and specific goals. Our AI uses this as a foundation for persona creation.",
    },
    {
      number: "2",
      title: "AI Analysis",
      description:
        "Our advanced AI algorithms analyze market data, consumer behavior patterns, and industry trends to generate insights.",
    },
    {
      number: "3",
      title: "Persona Generation",
      description:
        "Based on the analysis, we create detailed user personas including demographics, behaviors, goals, and pain points.",
    },
    {
      number: "4",
      title: "Customize & Refine",
      description:
        "Fine-tune the generated personas to perfectly match your needs, with the ability to adjust details and add specific characteristics.",
    },
  ];
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-16 px-4 pt-36">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-bold text-indigo-600 mb-6">
            How PersonaAI Works
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
            Our AI-powered platform simplifies the process of creating detailed,
            accurate user personas for your business in four easy steps.
          </p>
        </div>
        <div className="grid grid-cols-1  gap-8 mb-20">
          {steps.map((step) => (
            <FeatureCard
              key={step.title}
              //   number={step.number}
              title={step.title}
              description={step.description}
            />
          ))}
          <div className="text-center">
            <Link to={"/persona/details"}>
              <button className="bg-indigo-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-indigo-700 transition-colors hover:scale-105">
                Try PersonaAI Now
              </button>
            </Link>
          </div>
        </div>
      </div>
      <PreviousButton />
    </div>
  );
}

export default HowItWorks;
