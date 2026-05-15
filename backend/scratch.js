const { generatePersona } = require("./src/utils/persona");

async function test() {
  try {
    const res = await generatePersona({
      brandName: "TestBrand",
      productDesc: "A test product",
      businessType: "B2B",
      industry: "Tech",
      features: [{ feature_name: "F1", description: "D1" }],
      numResponse: 1,
    });
    console.log("FINAL:", res);
  } catch (err) {
    console.error("TEST SCRIPT CAUGHT ERROR:", err);
  }
}

test();
