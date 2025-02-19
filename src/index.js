const express = require("express");
const cors = require("cors");
const app = express();


app.use(cors({
  origin: ['http://localhost:3000', 'https://tadefi.vercel.app']
}));

app.use(express.json({ limit: '50mb' }));

// Simulate skin type analysis
const analyzeSkinType = () => {
  const skinTypes = ['dry', 'oily', 'combination', 'sensitive', 'normal'];
  const skinConcerns = ['aging', 'acne', 'pigmentation', 'redness'];
  
  return {
    type: skinTypes[Math.floor(Math.random() * skinTypes.length)],
    concern: skinConcerns[Math.floor(Math.random() * skinConcerns.length)]
  };
};

// Endpoint to process skin image and return analysis
app.post("/api/analyze-skin", (req, res) => {
  try {
    const { imageData } = req.body;
    
    // Simulate processing delay
    setTimeout(() => {
      // Get skin analysis
      const skinAnalysis = analyzeSkinType();
      
      res.json({
        success: true,
        analysis: {
          skinType: skinAnalysis.type,
          skinConcern: skinAnalysis.concern
        }
      });
    }, 1500); // Simulate 1.5s processing time
    
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error analyzing skin image"
    });
  }
});

module.exports = app;