// // services/openaiService.js
const dotenv = require("dotenv");
const OpenAI  = require("openai");

dotenv.config({ path: "../.env" });

const apiKey = process.env.API_KEY;
const model = "gpt-4o-mini"
const openai = new OpenAI({
  apiKey: apiKey,
});

async function callGenerateTextFromSimplePrompt(promptContent, systemContent, previousChat) {
    try {

      const messages = [];
      const userPrompt = {
              role: "user",
              content: promptContent,
            };
      messages.push(userPrompt);
      const completion = await openai.chat.completions.create({
          model: model,
          messages: messages,
      });
      return completion.choices[0].message.content;
    }
    catch (error) {
            console.error("Error:", error);
            return `An error occurred while processing the request: ${error}`;
        }
}

async function callGenerateTextWithInstructions(promptContent, systemContent, previousChat) {
    try {

      const messages = [];
      const userPrompt = {
              role: "user",
              content: promptContent,
            };
      const instructionContent = `Talk like a pirate.`
      const instructionPrompt = {
              role: "developer",
              content: instructionContent,
            };
      messages.push(userPrompt);
      messages.push(instructionPrompt);
      const completion = await openai.chat.completions.create({
          model: model,
          messages: messages,
      });
      return completion.choices[0].message.content;
    }
    catch (error) {
            console.error("Error:", error);
            return `An error occurred while processing the request: ${error}`;
        }
}
module.exports = { callGenerateTextFromSimplePrompt, callGenerateTextWithInstructions };
