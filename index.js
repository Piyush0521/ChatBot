import openai from "./config/open-ai.js";
import readlineSync from "readline-sync";
import colors from "colors";

async function main() {
  console.log(
    colors.bold.green("Welcome to your own Chatbot - Piyush ka chatbot")
  );
  console.log(colors.bold.green("You can start chatting with the bot"));
  console.log(colors.bold.green("Type - 'exit' to exit from the program"));

  //to store conversation history
  const chatHistory = [];

  while (true) {
    const userInput = readlineSync.question(colors.yellow("You: "));

    try {
      //construct messages by iterating over the chat history
      const messages = chatHistory.map(([role, content]) => ({
        role,
        content,
      }));

      //Add latest user input
      messages.push({ role: "user", content: userInput });

      //call the API with user input
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: messages,
      });

      //Get completion response
      const completionResponse = completion.data.choices[0].message.content;

      if (userInput.toLowerCase() === "exit") {
        console.log(colors.green("Bot: " + completionResponse));
        return;
      }

      console.log(colors.green("Bot: " + completionResponse));

      // Update history with user input and corresponding bot response
      chatHistory.push(["user", userInput]);
      chatHistory.push(["assistant", completionResponse]);
    } catch (error) {
      console.error(colors.red(error));
    }
  }
}

main();
