const userMessage = document.querySelector('#user_message');
const botMessage = document.querySelector('#bot_message');
const sendButton = document.querySelector('#send_btn');
const chatBot = document.querySelector('.chatbot');
const botForm = document.querySelector('form');

function sendBotMessage(e) {
    e.preventDefault();
    chatBot.innerHTML += `
    <div id="bot_message" class="chatbot__message chatbot__message--bot">
    <p> 
    ${userMessage.value}
    </p>
    </div>
    `;
    userMessage.value = '';
}

sendButton.addEventListener('click', sendBotMessage);
botForm.addEventListener('submit', sendBotMessage);