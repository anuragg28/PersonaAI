const { AzureOpenAI } = require("openai");
require("dotenv").config();

const endpoint = process.env.OPENAI_ENDPOINT;
const apiKey = process.env.OPENAI_KEY1;
const apiVersion = "2024-04-01-preview";
const deployment = "gpt-35-turbo";

async function generatePersona(details) {
  try {
    console.log(details);

    const {
      brandName,
      productDesc,
      businessType,
      industry,
      numResponse,
      features,
    } = details;

    console.log("== Get completions Sample ==");
    const client = new AzureOpenAI({
      endpoint,
      apiKey,
      apiVersion,
      deployment,
    });

    const formattedFeatures = Array.isArray(features)
      ? features
          .map((feature) => {
            return `${feature.feature_name}: ${feature.description}`;
          })
          .join(", ")
      : "";

    let prompt = `
You are a marketing expert creating a customer persona for a brand. Based on the following information, generate a detailed persona that includes demographics, personality traits, professional goals, challenges, and why the person would be interested in the brand.

Brand Name: ${brandName}
Product Description: ${productDesc}
Business Type: ${businessType} (B2B or B2C)
Industry: ${industry}
Features: ${formattedFeatures}

### Output (Return exactly ${numResponse} completely distinct and creative personas as an array in JSON format that can be parsed only.) ###
{
    "response"(${numResponse} response): [
        {
    "name": <Persona Name>,
    "age": <Age>,
    "gender": <Gender>,
    "race": <Racial Background>,
    "occupation": <Occupation>,
    "location": <Location>,
    "industry": <Industry>,
    "background": {
        "education": <Education (include college names)> (max 1 line),
        "work_environment": <Work Environment> (max 2 lines),
        "income": <Income> (max 1 line)
    },
    "communication_channel": [<Preferred Communication Channel (Websites or apps persona is active)>],
    "hobbies": {
        "personal_interests": <Personal interests>,
        "work_related": <Work related interests>
    }
    "professional_goal": {
        "primary_goal": <Primary_Goal>,
        "secondary_goal": <Secondary_Goal>
    }
    "pain_points"(give at least 3): [
    {
    "title": <Title>,
    "description": <Description>
    }],
    "usecase_product"(give at least 2): [
        {
        "title": <Title> (3-7 words),
        "description": <Description> (Min 30 words, explain how the persona will use the product)
        }
    ],
    "features_needed"(give at least 2): [
        {
        "feature": <Feature>,
        "description": <Description> (Elaborate about feature in Min. 30 words)
        }
    ],
}]}
<end>    

Generate this persona in a friendly and engaging way that marketers and business owners can relate to.
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
      console.log("Parsed Response: ", pRes);
      finalResponse = pRes.response;
    }

    return finalResponse;
  } catch (err) {
    console.log(err);
  }
}

// generatePersona({
//   brandName: "Onmail",
//   productDesc:
//     "Onmail is an email productivity tool that helps users manage their emails more efficiently.",
//   businessType: "B2B",
//   industry: "SaaS",
//   numResponse: 1,
//   features: [
//     {
//       feature_name: "Email Organization",
//       description: "Organize emails into folders and categories.",
//     },
//     {
//       feature_name: "Email Tracking",
//       description: "Track email opens and clicks.",
//     },
//   ],
// });

module.exports = { generatePersona };
