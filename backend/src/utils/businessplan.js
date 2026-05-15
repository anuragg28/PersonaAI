const { OpenAI } = require("openai");
require("dotenv").config();

const apiKey = process.env.OPENAI_API_KEY;
const deployment = "gemini-2.5-flash";

async function generateBusinessPlan(
  brandName,
  productDesc,
  businessType,
  industry,
  numResponse = 1
) {
  try {
    console.log("== Get completions Sample ==");
    const client = new OpenAI({
      apiKey,
      baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
    });

    let prompt = `
    Based on the following details:
    Brand Name: ${brandName}
    Product Description**: ${productDesc}
    Business Type: ${businessType} (B2B or B2C)
    Industry: ${industry}
  
  Provide a concise business plan, outlining the company's core mission, target market, value proposition, and go-to-market strategy. Then, generate a monetization strategy explaining how the business can generate revenue and grow profitability, considering the industry and business type.
  
    Format the output as:
    {
      "business_plan": <Business Plan> (Paragraph format),
    "monetization_strategy": <Monetization Strategy> (Paragraph format)
    }
      <end>
    `;

    const result = await client.chat.completions.create({
      messages: [{ role: "system", content: prompt }],
      model: deployment,
      max_tokens: 8192,
      temperature: 0.8,
      stop: ["<end>"],
    });

    console.log(result);

    const finalResponse = {};

    for (let i = 0; i < result.choices.length; i++) {
      let response = result.choices[i].message.content;
      response = response.replace(/```json/g, "").replace(/```/g, "").trim();
      console.log(`Persona ${i}: ${response}`);

      const pRes = await JSON.parse(response);
      finalResponse.business_plan = pRes.business_plan;
      finalResponse.monetization_strategy = pRes.monetization_strategy;
    }

    return finalResponse;
  } catch (err) {
    console.log(err);
  }
}

// generateBusinessPlan(
//   "FitFusion",
//   "A personalized workout app that creates custom fitness plans based on user goals, fitness level, and available equipment.",
//   "B2C",
//   "Health & Fitness"
// );

module.exports = {
  generateBusinessPlan,
};
