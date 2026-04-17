const { AzureOpenAI } = require("openai");
require("dotenv").config();

const endpoint = process.env.OPENAI_ENDPOINT;
const apiKey = process.env.OPENAI_KEY1;
const apiVersion = "2024-04-01-preview";
const deployment = "gpt-35-turbo";

async function generateConcerns(
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
  Product Description**: ${productDesc}
  Business Type: ${businessType} (B2B or B2C)
  Industry: ${industry}

  Generate questions that potential customers might have about the product. For each question, provide a one-paragraph solution addressing the customer’s concern directly and suggesting how the product or service can alleviate it. Have a minimum of ${numResponse} questions and answers.

  Format the output as:
  {
    "response": [
      {
    
        "question": <Question>,
        "proposed_solution": <Answer> (Paragraph format)
        "is_highlighted": <true/false> (Highlight the most important concerns, only one can be true)
      }
    ]
  }
    <end>
  `;

    const result = await client.chat.completions.create({
      messages: [{ role: "system", content: prompt }],
      model: deployment,
      max_tokens: 400 * numResponse,
      temperature: 0.8,
      stop: ["<end>"],
    });

    console.log(result);

    let finalResponse;

    for (let i = 0; i < result.choices.length; i++) {
      let response = result.choices[i].message.content;
      console.log(`Persona ${i}: ${response}`);

      const pRes = await JSON.parse(response);
      console.log("Parsed Response: ", pRes);
      finalResponse = pRes.response;
    }

    return finalResponse;
  } catch (err) {
    console.log(err);
  }
}

// generatePersona(
//   "Onmail",
//   "Onmail is an email productivity tool that helps users manage their emails more efficiently.",
//   2
// );

// generateConcerns(
//   "EcoTracker", 
//   "A carbon footprint tracker that helps users monitor and reduce their environmental impact.", 
//   "B2C", 
//   "SaaS"
// )

module.exports = { generateConcerns };
