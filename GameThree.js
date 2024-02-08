// GameThree.js
require('dotenv').config();
class GameThree {
  constructor() {
    this.sendSound;
    this.API_KEY = process.env.API_KEY; // Placeholder API key
    this.url = "https://api.openai.com/v1/chat/completions";
    this.options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.API_KEY}`,
      },
      body: null, // The body will be set when sending a request
    };
    this.conversationState = "client"; // Initial state is "client"
    this.button3 = new Button3(); // Create a new instance of Button3
  }

  preload() {
    this.sendSound = loadSound('HooverSound.mp3');
    console.log('preload method called');
    this.backgroundImage = loadImage('Background.png', () => {
      console.log('Image loaded successfully');
      // This code will run when the image is fully loaded
      this.setup(); // Call setup once the image is loaded
    });
    this.button3.loadImages(); // Preload button images
  }

  setup() {
    // Create canvas after loading the background image
    createCanvas(800, 600);
    
    this.createChatInterface();
    this.createInputAndButton();
    setTimeout(() => {
    // Set button position to be in the middle of the canvas horizontally and 10px from bottom
    this.button3.setPosition((width / 2) - (this.button3.scaledWidth() / 2), height - this.button3.scaledHeight() - 10);
  }, 10000); 
  }

  draw() {
    if (this.backgroundImage) {
      background(this.backgroundImage);
    } else {
      background(30, 30, 150); // Default grey background
    }
    
    this.button3.display(); // Display button
    // Add additional drawing elements or logic here if needed
  }

  createChatInterface() {
    const chatX = width / 2 - 200;
    const chatY = height / 2 - 230;

    this.chatContainer = createDiv();
    this.chatContainer.position(chatX, chatY);
    this.chatContainer.style("width", "400px");
    this.chatContainer.style("height", "400px");
    this.chatContainer.style("border", "1px solid #ccc");
    this.chatContainer.style("background-color", "white");
    this.chatContainer.style("overflow-y", "scroll");
    this.chatContainer.style("padding", "10px");
    this.chatContainer.style("font-family", "'Pixelify Sans', sans-serif");
  }

  createInputAndButton() {
    const chatX = width / 2 - 200;
    const chatY = height / 2 + 200;

    this.myInput = createInput();
    this.myInput.attribute("placeholder", "Write something to your client...");
    this.myInput.position(chatX, chatY);
    this.myInput.size(320, 38);
    this.styleInput(this.myInput);

    this.sendButton = createButton("Send");
    this.sendButton.position(chatX + 340, chatY);
    this.sendButton.mousePressed(() => this.getText());
    this.styleButton(this.sendButton);
  }

  styleInput(input) {
    input.style("font-size", "16px");
    input.style("font-family", "'Pixelify Sans', sans-serif");
    input.style("border", "1px solid #ccc");
    input.style("padding-left", "10px");
  }

  styleButton(button) {
    button.style("font-size", "16px");
    button.style("font-family", "'Pixelify Sans', sans-serif");
    button.style("background-color", "#0084ff");
    button.style("color", "white");
    button.style("border", "none");
    button.style("border-radius", "0px");
    button.style("height", "42px");
    button.style("padding", "4px 22px");
  }

  displayMessage(sender, message) {
    const messageDiv = createDiv(sender + ": " + message);
    messageDiv.style("background-color", sender === "You" ? "#0084ff" : "#e5e5e5");
    messageDiv.style("color", sender === "You" ? "white" : "black");
    messageDiv.style("padding", "10px");
    messageDiv.style("border-radius", "0px");
    messageDiv.style("margin-bottom", "10px");
    messageDiv.parent(this.chatContainer);
  }

  getText() {
    const inputValue = this.myInput.value().trim();
    if (inputValue.length > 0) {
      this.displayMessage("You", inputValue);
      this.clientResponse(inputValue);
      this.myInput.value(""); // Clear the input field after sending the message
    }
  }

clientResponse(inputValue) {
    // Construct the messages array for the conversation
    const messages = [
        {
            "role": "system",
            "content": "You are an extremely difficult and inconsiderate client who hired a freelance designer. You are making the designer's life miserable by requesting weird changes and being rude. Your designer has sent you a message: " + inputValue + ". Respond in a manner that amplifies your uncooperative and infuriating behavior, making the designer's job even more challenging. Answer coherently with the message your designer sent, answer to them rudely. Dont add quotation marks. Make change requests that are arbitrary like 'make it pop' or 'make the logo bigger'. Highly humanize your messages, like making slight spelling mistakes and abbreviating words in american english."
        }
    ];

    // Set the request body to the OpenAI API call
    this.options.body = JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: messages,
        temperature: 0.7,
        max_tokens: 60,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
    });

    fetch(this.url, this.options)
        .then(response => response.json())
        .then(data => {
            const reply = data.choices && data.choices.length > 0 ? data.choices[0].message.content.trim() : "";
            this.displayMessage("Client", reply);
        })
        .catch(error => {
            console.error('Error:', error);
            this.displayMessage("Error", "An error occurred while sending the message.");
        });
}      
  hideChatInterface() {
    if (this.chatContainer) {
      this.chatContainer.hide();
    }
    if (this.myInput) {
      this.myInput.hide();
    }
    if (this.sendButton) {
      this.sendButton.hide();
    }
  }

  showChatInterface() {
    if (this.chatContainer) {
      this.chatContainer.show();
    }
    if (this.myInput) {
      this.myInput.show();
    }
    if (this.sendButton) {
      this.sendButton.show();
    }
  }
 removeChatInterface() {
   console.log("Removing")
    if (this.chatContainer) {
      this.chatContainer.remove();
      this.chatContainer = null;
    }
    if (this.myInput) {
      this.myInput.remove();
      this.myInput = null;
    }
    if (this.sendButton) {
      this.sendButton.remove();
      this.sendButton = null;
    }
  }
}