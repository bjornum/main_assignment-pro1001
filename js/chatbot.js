const apiKey = ""; // API KEY GOES HERE - will be adjusted on netlify through its environment variables
const messagesContainer = document.getElementById("messages");
const input = document.getElementById("userInput");
const button = document.getElementById("sendBtn");

button.addEventListener("click", async () => {
  const userMessage = input.value.trim();
  if (!userMessage) return;

  addMessage("user", userMessage);
  input.value = "";

  const botReply = await getOpenAIResponse(userMessage);
  addMessage("bot", botReply);
});

function addMessage(sender, message) {
  s;
  const div = document.createElement("div");
  div.textContent = message;

  // Apply inline styles based on sender
  if (sender === "user") {
    div.style.alignSelf = "flex-end";
    div.style.backgroundColor = "#d1e7ff";
    div.style.color = "#000";
  } else if (sender === "bot") {
    div.style.alignSelf = "flex-start";
    div.style.backgroundColor = "#f8f9fa";
    div.style.color = "#333";
  }

  div.style.padding = "10px";
  div.style.borderRadius = "10px";
  div.style.maxWidth = "70%";
  div.style.wordWrap = "break-word";
  div.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";
  messagesContainer.appendChild(div);

  // Scroll to the bottom after adding a new message
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

async function getOpenAIResponse(userInput) {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: userInput }],
    }),
  });

  if (!response.ok) {
    return "⚠️ Error with OpenAI request.";
  }

  const data = await response.json();
  return data.choices[0].message.content.trim();
}
