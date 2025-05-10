const apiKey = ""; // API KEY GOES HERE - will be adjusted on netlify through its environment variables

const messagesContainer = document.getElementById("messages");
const typingIndicator = document.getElementById("typing-indicator");
const input = document.getElementById("userInput");
const button = document.getElementById("sendBtn");

const errorMessage = document.getElementById("error-message");
const errorText = document.getElementById("error-text");

button.addEventListener("click", async () => {
  const userMessage = input.value.trim();
  if (!userMessage) return;

  addMessage("user", userMessage);
  input.value = "";

  // Show typing indicator
  showTypingIndicator();

  // Waiting for the AI response
  const botReply = await getOpenAIResponse(userMessage);

  // Remove typing indicator
  hideTypingIndicator();

  addMessage("bot", botReply);
});

const addMessage = (sender, message) => {
  const messageWrapper = document.createElement("div");
  messageWrapper.style.display = "flex";
  messageWrapper.style.marginBottom = "10px";

  if (sender === "user") {
    messageWrapper.style.justifyContent = "flex-end";
  } else if (sender === "bot") {
    messageWrapper.style.justifyContent = "flex-start";
  }

  if (sender === "bot") {
    const label = document.createElement("div");
    label.textContent = "FRAM";
    label.style.fontWeight = "bold";
    label.style.marginRight = "8px";
    label.style.color = "#333";
    messageWrapper.appendChild(label);
  }

  const messageDiv = document.createElement("div");
  messageDiv.textContent = message;

  // Apply inline styles based on sender
  if (sender === "user") {
    messageDiv.style.backgroundColor = "#d1e7ff";
    messageDiv.style.color = "#000";
    messageDiv.style.marginRight = "10px";
  } else if (sender === "bot") {
    messageDiv.style.backgroundColor = "#f8f9fa";
    messageDiv.style.color = "#333";
  }

  messageDiv.style.padding = "10px";
  messageDiv.style.borderRadius = "10px";
  messageDiv.style.maxWidth = "90%";
  messageDiv.style.wordWrap = "break-word";
  messageDiv.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";

  messageWrapper.appendChild(messageDiv);
  messagesContainer.appendChild(messageWrapper);

  // Scroll to the bottom after adding a new message
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
};

const showTypingIndicator = () => {
  typingIndicator.style.display = "flex";
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
};

const hideTypingIndicator = () => {
  typingIndicator.style.display = "none";
};

const getOpenAIResponse = async (userInput) => {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are an assistant specialized in providing information and support for farms in Norway. Answer questions with this context in mind.",
          },
          { role: "user", content: userInput },
        ],
      }),
    });

    // Various graceful error handling for different response statuses
    if (!response.ok) {
      switch (response.status) {
        case 400:
          errorText.textContent =
            "Error: Bad Request. Please check your input.";
          break;
        case 401:
          errorText.textContent =
            "Error: Unauthorized. Please check your API key.";
          break;
        case 403:
          errorText.textContent =
            "Error: Forbidden. You don't have access to this resource.";
          break;
        case 404:
          errorText.textContent =
            "Error: Not Found. The endpoint does not exist.";
          break;
        case 429:
          errorText.textContent = "Error: Too Many Requests. Please slow down.";
          break;
        case 500:
          errorText.textContent =
            "Error: Internal Server Error. Please try again later.";
          break;
        default:
          errorText.textContent = `Error: ${response.status} - ${
            response.statusText || "Unknown error"
          }`;
      }
      errorMessage.style.display = "block";
      return;
    }

    // Hide the error message if the request succeeds
    errorMessage.style.display = "none";

    const data = await response.json();
    return data.choices[0].message.content.trim();
  } catch (error) {
    // Show the error message and update the text for network or other errors
    errorText.textContent = `Error: ${error.message}`;
    errorMessage.style.display = "block";
    return;
  }
};
