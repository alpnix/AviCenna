// content.js
// Listen for messages from the popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    // If the message has a color property, change the background color
    if (message.color) {
      document.body.style.backgroundColor = message.color;
    }
  });