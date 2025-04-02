// // services/openaiService.js
const dotenv = require("dotenv");
const OpenAI  = require("openai");

dotenv.config({ path: "../.env" });

const apiKey = process.env.API_KEY;
const openai = new OpenAI({
  apiKey: apiKey,
});

async function callGPT(promptContent, systemContent, previousChat) {
  try {

      const messages = [];
      const userPrompt = {
              role: "user",
              content: promptContent,
            };
            const systemPrompt = {
              role: "system",
              content: systemContent,
            };
            const assistantPrompt = {
              role: "assistant",
              content: previousChat,
            };
        
            messages.push(userPrompt);
            messages.push(systemPrompt);
            messages.push(assistantPrompt);
       const completion = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          store: true,
          messages: messages,
      });
    return completion.choices[0].message.content;
  }
  catch (error) {
        console.error("Error:", error);
        return `An error occurred while processing the request: ${error}`;
      }
}
module.exports = { callGPT };



