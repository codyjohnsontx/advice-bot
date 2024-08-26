document.addEventListener("DOMContentLoaded", () => {
  const inputField = document.getElementById("crt-input");
  const crtText = document.querySelector(".crt-text");
  const lines = document.querySelectorAll(".line");

  let currentLineIndex = 0;

  function typeLine(line) {
    let text = line.textContent;
    line.textContent = ""; // Clear the line initially
    line.style.visibility = "visible"; // Make the line visible once typing starts

    let index = 0;

    function typeChar() {
      if (index < text.length) {
        line.textContent += text.charAt(index);
        index++;

        const minDelay = 10;
        const maxDelay = 100;
        const randomDelay = Math.floor(
          Math.random() * (maxDelay - minDelay + 1) + minDelay
        );

        setTimeout(typeChar, randomDelay); // Adjust speed here (milliseconds)
      } else {
        currentLineIndex++;
        if (currentLineIndex < lines.length) {
          setTimeout(() => typeLine(lines[currentLineIndex]), 500); // Delay before next line
        } else {
          enableInput(); // Enable input after typing is complete
        }
      }
    }

    typeChar();
  }

  function enableInput() {
    inputField.disabled = false;
    inputField.focus();
  }

  function initializeTerminal() {
    inputField.disabled = true;
    typeLine(lines[currentLineIndex]);
  }

  inputField.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      const userInput = inputField.value.trim();
      if (userInput) {
        const newLine = document.createElement("span");
        newLine.className = "line";
        newLine.textContent = `> ${userInput}`;
        crtText.appendChild(newLine);
        crtText.appendChild(document.createElement("br"));
        inputField.value = ""; // Clear the input field

        // Parse the command
        const commandParts = userInput.split(" ");
        const command = commandParts[0].toLowerCase();
        const args = commandParts.slice(1).join(" ");

        // Handle commands
        if (command === "echo") {
          handleEchoCommand(args);
        } else if (command === "advice") {
          handleAdviceCommand();
        } else if (command === "help") {
          displayResponse("Available commands: help, clear, echo, advice");
        } else if (command === "clear") {
          crtText.innerHTML = ""; // Clear the screen
        } else {
          displayResponse(`Unknown command: ${command}`);
        }
      }
    }
  });

  function handleEchoCommand(text) {
    displayResponse(text);
  }

  async function handleAdviceCommand() {
    try {
      // Adding a random number to prevent caching
      const randomParam = Math.floor(Math.random() * 1000000);
      const response = await fetch(
        `https://api.adviceslip.com/advice?random=${randomParam}`
      );
      const data = await response.json();
      if (data && data.slip && data.slip.advice) {
        displayResponse(data.slip.advice);
      } else {
        displayResponse("Could not fetch advice. Please try again.");
      }
    } catch (error) {
      displayResponse("Error fetching advice.");
    }
  }

  function displayResponse(text) {
    const responseLine = document.createElement("span");
    responseLine.className = "line";
    responseLine.textContent = text;
    responseLine.style.visibility = "visible"; // Ensure the response is visible

    crtText.appendChild(responseLine);
    crtText.appendChild(document.createElement("br"));
  }

  // Start the terminal initialization
  initializeTerminal();
});
