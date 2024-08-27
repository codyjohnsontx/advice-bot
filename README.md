# Pip Boy Terminal Simulation

A web-based simulation of the Pip Boy terminal inspired by the Fallout game universe. This project emulates an old-school CRT terminal with a typewriter effect, featuring green text on a black background. Users can interact with the terminal to receive random advice and execute simple commands.

## Features

- **Typewriter Effect**: Text appears with a typewriter animation, mimicking the feel of an old CRT terminal.
- **Random Advice Generator**: The terminal can provide random advice from a hardcoded list or fetch from an external API.
- **Command Parsing**: Supports basic commands like `echo`, `advice`, `help`, and `clear`.
- **Retro Design**: Styled to resemble a classic CRT screen with a green monochrome aesthetic.

## Demo

[Check out the live demo](https://stupendous-babka-93ba5a.netlify.app/)

## Technologies and APIs Used

- **HTML**: The structure of the terminal is created using semantic HTML elements.
- **CSS**: written in plain CSS to emulate the look of an old CRT screen, including custom animations for text and prompt effects.
- **Vanilla JavaScript**: Handles the typewriter effect, command parsing, and dynamic text display. It also controls the fetching of advice from the API.
- **Advice Slip API**: Fetches random advice to display on the terminal. The API provides a collection of useful and fun advice slips to enhance user interaction.