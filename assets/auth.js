// JavaScript File to authenticate users

// Glitch Server API
const apiUrl = 'https://what-to-wear---server.glitch.me'; 

var loginBtn = document.getElementById("loginBtn")
var signupBtn = document.getElementById("signupBtn")

// User Data
const username = document.getElementById("username").value
const email = document.getElementById("email").value
const phoneNumber = document.getElementById("phone-number").value
const age = document.getElementById("age").value
const gender = document.getElementById("gender").value
const password = document.getElementById("password").value

loginBtn.onclick = function() {
    fetch(apiUrl + '/users')
            .then(response => response.json())
            .then(users => document.getElementById("output").textContent = JSON.stringify(users, null, 2))
    checkUserExistance(username, email, phoneNumber, age, gender, password)
}

function checkUserExistance (userInput) {
    if (!users.includes(userInput)){
        alert ("Username does not exist! Please Sign Up.")
    } else{
        alert ("Welcome back!")
    }
}

signupBtn.onclick = function() {
    fetch(apiUrl + '/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, phoneNumber, age, gender, password })
    })
    .then(response => response.json())
    .then(newUser => document.getElementById("output").textContent = JSON.stringify(newUser, null, 2)) 
}