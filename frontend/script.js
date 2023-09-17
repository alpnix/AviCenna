// require('dotenv').config()

const userMessage = document.querySelector('#user_message');
const botMessage = document.querySelector('#bot_message');
const sendButton = document.querySelector('#send_btn');
const chatBot = document.querySelector('.chatbot');
const botForm = document.querySelector('form');
// const signin = document.querySelector('.sign-in');
// console.log(signin)

// const firebaseConfig = {
//     apiKey: process.env.API_KEY,
//     authDomain: process.env.AUTH_DOMAIN,
//     projectId: process.env.PROJECT_ID,
//     storageBucket: process.env.STORAGE_BUCKET_ID,
//     messagingSenderId: process.env.MESSAGING_SENDER_ID,
//     appId: process.env.APP_ID
// };

// Initialize Firebase
// firebase.initializeApp(firebaseConfig);

// signin.addEventListener('click', () => {
//     const provider = new firebase.auth.GoogleAuthProvider();
//     firebase.auth().signInWithPopup(provider)
//                 .then((userCredential) => {
//                     // User signed in successfully
//                     var user = userCredential.user;
//                     messageDiv.textContent = "Sign-in with Google successful. Welcome, " + user.displayName;
//                     messageDiv.style.color = "green";
//                 })
//                 .catch((error) => {
//                     // Handle errors
//                     var errorCode = error.code;
//                     var errorMessage = error.message;
//                     messageDiv.textContent = "Error: " + errorMessage;
//                     messageDiv.style.color = "red";
//                 });
// })

// // Sign up a user
// firebase.auth().createUserWithEmailAndPassword(email, password)
//     .then((userCredential) => {
//         // User signed up successfully
//         var user = userCredential.user;
//     })
//     .catch((error) => {
//         // Handle errors
//         var errorCode = error.code;
//         var errorMessage = error.message;
//     });

// firebase.auth().onAuthStateChanged((user) => {
//     if (user) {
//         // User is signed in
//         var uid = user.uid;
//         print(uid)
//         sendButton.disabled = false;
//         sendButton.title = ''
//     } else {
//         // User is signed out
//         sendButton.disabled = true;
//         sendButton.title = 'Login in to use'
//     }
// });

// firebase.auth().signOut().then(() => {
//     // Sign-out successful.
// }).catch((error) => {
//     // An error happened.
// });

async function respond(userMessage) {
    const res = await fetch('http://127.0.0.1:5000/model', {
        method: 'POST',
        headers: {
            Accept: 'application.json',
            'Content-Type': 'application/json'
        },
        mode: "cors",
        body: JSON.stringify({ input: userMessage})
    });
    // Ensure the response status is OK before attempting to parse it
    if (res.status === 200) {
        const data = await res.json(); // Parse the JSON response
        return data;
    } else {
        throw new Error('Failed to fetch data');
    }
}

async function sendBotMessage(e) {
    e.preventDefault();
    try {
        const response = await respond(userMessage.value);
        // Update the chat interface with the response
        chatBot.innerHTML += `
        <div id="bot_message" class="chatbot__message chatbot__message--user">
            <p>${userMessage.value}</p>
        </div>
        <div id="bot_message" class="chatbot__message chatbot__message--bot">
            <p>${response.message}</p>
        </div>
        `;
        userMessage.value = '';
    } catch (error) {
        console.error('Error:', error);
        // Handle the error appropriately (e.g., display an error message in the chat interface)
    }
}

sendButton.addEventListener('click', sendBotMessage);
botForm.addEventListener('submit', sendBotMessage);