const { AzureOpenAI } = require("openai");
require("dotenv").config();

const endpoint = process.env.OPENAI_ENDPOINT;
const apiKey = process.env.OPENAI_KEY1;
const apiVersion = "2024-04-01-preview";
const deployment = "gpt-35-turbo";

async function generateMvp(
  brandName,
  productDesc,
  businessType,
  industry,
  numResponse = 1
) {
  try {
    console.log("== Get completions Sample ==");
    const client = new AzureOpenAI({
      endpoint,
      apiKey,
      apiVersion,
      deployment,
    });

    let prompt = `
    Based on the following details:
    Brand Name: ${brandName}
    Product Description: ${productDesc}
    Business Type: ${businessType} (B2B or B2C)
    Industry: ${industry}
  
  Generate a step-by-step MVP (Minimum Viable Product) plan for this product in the form of an array. Each step should focus on core activities, from initial planning to launch, with an emphasis on prioritizing essential features. Provide each step as a concise action item in this format:
  
    Format the output as JSON that can be parsed (Max 7 steps):
    {
        result: [{
      "step_no": <Step Index> (Number format)
        "title": <Title> (10-30 words)
        "description": <Description> (50-100 words)
    }]
    }
      <end>
    `;

    const result = await client.chat.completions.create({
      messages: [{ role: "system", content: prompt }],
      model: deployment,
      max_tokens: 1000 * numResponse,
      temperature: 0.8,
      stop: ["<end>"],
    });

    console.log(result);

    let finalResponse;

    for (let i = 0; i < result.choices.length; i++) {
      let response = result.choices[i].message.content;
      console.log(`Persona ${i}: ${response}`);

      const pRes = await JSON.parse(response);
      finalResponse = pRes.result;
    }

    return finalResponse;
  } catch (err) {
    console.log(err);
  }
}

// generateMvp(
//   "FitFusion",
//   "A personalized workout app that creates custom fitness plans based on user goals, fitness level, and available equipment.",
//   "B2C",
//   "Health & Fitness"
// );

module.exports = {
  generateMvp,
};
