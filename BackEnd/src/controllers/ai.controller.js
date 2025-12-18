// ai.controller.js
const aiService = require("../services/ai.service")

module.exports.getReview = async (req, res) => {

    const code = req.body.code; // Line 5: The variable is 'code'

    if (!code) {
        // Change the status message to reflect what you're expecting
        return res.status(400).send("Code content is required in the request body.");
    }

    // FIX: Change 'Code' (uppercase) to 'code' (lowercase)
    const response = await aiService.generateContent(code); 

    res.send(response);

}