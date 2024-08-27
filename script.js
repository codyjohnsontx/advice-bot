document.addEventListener("DOMContentLoaded", () => {
  const inputField = document.getElementById("crt-input");
  const crtText = document.querySelector(".crt-text");
  const crtInputArea = document.querySelector(".crt-input");
  const lines = document.querySelectorAll(".line");

  let currentLineIndex = 0;

  // const adviceArray = [
  //   "If your code isn’t working, it’s probably because it’s tired. Give it a rest!",
  // ];

  function typeLine(line) {
    let text = line.textContent;
    line.textContent = ""; // Clears the line initially
    line.style.visibility = "visible"; // Once typing starts, line becomes visible
    let index = 0;

    function typeChar() {
      if (index < text.length) {
        line.textContent += text.charAt(index);
        index++;

        // Randomize the typing delay
        const minDelay = 10; // Min delay in ms
        const maxDelay = 100; // Max delay in ms
        const randomDelay =
          Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;

        setTimeout(typeChar, randomDelay);
      } else {
        currentLineIndex++;
        if (currentLineIndex < lines.length) {
          setTimeout(() => typeLine(lines[currentLineIndex]), 250); // ms delay before next line typed
        } else {
          setTimeout(showPrompt, 500); // Show the user prompt once typing is complete
        }
      }
    }

    typeChar();
  }

  function showPrompt() {
    crtInputArea.style.display = "flex"; // Change from none to flex to make it visible
    setTimeout(() => {
      crtInputArea.style.opacity = 1; // Trigger the fade-in animation
      inputField.disabled = false; // Enable the input field after fade-in
      inputField.focus(); // Focus on the input field
    }, 50); // Small delay to ensure display change before opacity
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
        newLine.style.visibility = "visible"; // Ensure the new line is visible
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
