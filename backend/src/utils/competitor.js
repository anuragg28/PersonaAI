const { OpenAI } = require("openai");
require("dotenv").config();

const apiKey = process.env.OPENAI_API_KEY;
const deployment = "gemini-2.5-flash";

async function competitorAnalysis(
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
    Product Description: ${productDesc}
    Business Type: ${businessType} (B2B or B2C)
    Industry: ${industry}
  
    Provide a competitor analysis in JSON format. For each major competitor in this industry, include:
  
    Format the output as JSON that can be parsed (Min 3 competitors):
    "result" : [
    {
      "competitor_name": <Competitor Name> 
        "strengths": <Strengths> (10-30 words)
        "weaknesses": <Weaknesses> (10-30 words)
        "market_share": <Market Share> (Percentage format)
        "uniqueness": <Unique Selling Proposition> (10-30 words)
    }]
      <end>
    `;

    const result = await client.chat.completions.create({
      messages: [{ role: "system", content: prompt }],
      model: deployment,
      max_tokens: 8192,
      temperature: 0.8,
      stop: ["<end>"],
    });

    let finalResponse;

    for (let i = 0; i < result.choices.length; i++) {
      let response = result.choices[i].message.content;
      response = response.replace(/```json/g, "").replace(/```/g, "").trim();
      console.log(`Persona ${i}: ${response}`);

      const pRes = await JSON.parse(response);
      console.log("Parsed Response: ", pRes);
      finalResponse = pRes.result;
    }
    
    console.log("running")
    return finalResponse;
  } catch (err) {
    console.log(err);
  }
}

// competitorAnalysis(
//   "FitFusion",
//   "A personalized workout app that creates custom fitness plans based on user goals, fitness level, and available equipment.",
//   "B2C",
//   "Health & Fitness"
// );

module.exports = {
  competitorAnalysis,
};
