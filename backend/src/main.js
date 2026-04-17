const express = require("express");
const cors = require("cors");
const fs = require("fs");

const { generatePersona } = require("./utils/persona");
const {competitorAnalysis} = require("./utils/competitor");
const {generateBusinessPlan} = require("./utils/businessplan");
const {generateMvp} = require("./utils/mvp");
const {generateConcerns} = require("./utils/concerns");

let production = true;

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/persona", async (req, res) => {
  try {
    const { brandName, productDescription, businessType, industry, features, numResponse } = req.body;

    if (!brandName || !productDescription || !businessType || !industry) {
      return res
        .status(400)
        .json({ error: "Invalid Details send" });
    }

    if(!production) {
      console.log("production")
      const rawData = fs.readFileSync("src/data/persona.json", "utf8")
      const jsonData = await JSON.parse(rawData);
      return res.status(200).json(jsonData);
    }

    const details = {
      brandName,
      productDesc: productDescription,
      businessType,
      industry,
      features,
      numResponse,
    };

    const finalResponse = await generatePersona(details)
    res.status(200).json({ result : finalResponse ? finalResponse : "No personas generated" });

  } catch (err) {
    console.log(err)
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/competitor", async (req, res) => {
  try {
    const { brandName, productDescription, businessType, industry, numResponses } = req.body;

    if (!brandName || !productDescription || !businessType || !industry) {
      return res
        .status(400)
        .json({ error: "Invalid Details send" });
    }

    if(!production) {
      console.log("production")
      const rawData = fs.readFileSync("src/data/competitor.json", "utf8")
      const jsonData = await JSON.parse(rawData);
      return res.status(200).json(jsonData);
    }

    const finalResponse = await competitorAnalysis(brandName, productDescription, industry, businessType, numResponses);
    res.status(200).json({ result : finalResponse ? finalResponse : "No Competitor Found" });


  } catch (err) {
    console.log(err)
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/business-plan", async (req, res) => {
  try {
    const { brandName, productDescription, businessType, industry, numResponses } = req.body;

    if (!brandName || !productDescription || !businessType || !industry) {
      return res
        .status(400)
        .json({ error: "Invalid Details send" });
    }

    if(!production) {
      console.log("production")
      const rawData = fs.readFileSync("src/data/business-plan.json", "utf8")
      const jsonData = await JSON.parse(rawData);
      return res.status(200).json(jsonData);
    }

    const finalResponse = await generateBusinessPlan(brandName, productDescription, industry, businessType, numResponses);
    return res.status(200).json({ result : finalResponse ? finalResponse : "No business plan Found" });


  } catch (err) {
    console.log(err)
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/mvp", async (req, res) => {
  try {
    const { brandName, productDescription, businessType, industry, numResponses } = req.body;

    if (!brandName || !productDescription || !businessType || !industry) {
      return res
        .status(400)
        .json({ error: "Invalid Details send" });
    }

    if(!production) {
      console.log("production")
      const rawData = fs.readFileSync("src/data/mvp.json", "utf8")
      const jsonData = await JSON.parse(rawData);
      return res.status(200).json(jsonData);
    }

    const finalResponse = await generateMvp(brandName, productDescription, industry, businessType, numResponses);
    res.status(200).json({ result : finalResponse ? finalResponse : "No Competitor Found" });


  } catch (err) {
    console.log(err)
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/concerns", async (req, res) => {
  try {

    const { brandName, productDescription, businessType, industry, numResponse } = req.body;

    if (!brandName || !productDescription || !businessType || !industry) {
      return res
        .status(400)
        .json({ error: "Invalid Details send" });
    }

    if(!production) {
      console.log("production")
      const rawData = fs.readFileSync("src/data/concerns.json", "utf8")
      const jsonData = await JSON.parse(rawData);
      return res.status(200).json(jsonData);
    }

    const finalResponse = await generateConcerns(brandName, productDescription, businessType, industry, numResponse);
    res.status(200).json({ result : finalResponse ? finalResponse : "No concerns found" });

  } catch(err) {
    console.log(err)
    res.status(500).json({ error: "Internal Server Error" });
  }
})

app.listen(4500, () => {
  console.log("Server is running on port 4500");
});
