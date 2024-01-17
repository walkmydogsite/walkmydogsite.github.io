const apiUrl = 'https://what-to-wear---server.glitch.me'

// Get all users
async function getUsers() {
    return fetch(apiUrl + '/users')
        .then(response => response.json())
        .catch(error => {
            console.error('Error fetching users: ', error)
        })
}

// email and Password Authentication
function authenticateEmail(email, users) {
    return !users.some(user => user.email === email)
}
function authenticatePassword(email, password, users) {
    const user = users.find(user => user.email === email)
    return user && user.password === password
}

// Log In
if (document.getElementById("login")) {
    var loginBtn = document.getElementById("loginBtn")

    async function userAuthentication() {
        const email = document.getElementById("email").value
        const password = document.getElementById("password").value

        const allUsers = await getUsers()

        if (authenticateEmail(email, allUsers)) {
            alert(`${email} is not a registered user.`)
            window.location.href = 'signup.html'
        } else {
            console.log(`${email} is already registered.`)
            if (authenticatePassword(email, password, allUsers)) {
                window.location.href = `homepage.html?email=${encodeURIComponent(email)}`
            } else {
                alert('email and password do not match')
            }
        }
    }

    loginBtn.addEventListener('click', userAuthentication)
}

// Sign Up
else if (document.getElementById("signup")) {

    // Display Age
    function updateValue() {
        const age = document.getElementById("age")
        const ageValue = document.getElementById("ageValue")
        ageValue.textContent = "Edad:  " + age.value
    }

    // Create User
    async function createUser(username, email, age, gender, password) {
        console.log('Creating user:', username, email, age, gender, password)

        try {
            const response = await fetch(apiUrl + '/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, email, age, gender, password })
            })

            if (!response.ok) {
                throw new Error('There was a problem connecting to the network')
            }

            const data = await response.json()
            console.log('User created:', data)

        } catch (error) {
            console.error('Error:', error)
        }
    }

    var signupBtn = document.getElementById("signupBtn")
    signupBtn.addEventListener('click', async function () {
        
        const username = document.getElementById("username").value
        const email = document.getElementById("email").value
        const age = document.getElementById("age").value
        const gender = document.getElementById("gender").value
        const password = document.getElementById("password").value

        try {
            const allUsers = await getUsers()
            if (authenticateEmail(email, allUsers)) {
                await createUser(username, email, age, gender, password)
                console.log('User created successfully')
                window.location.href = `homepage.html?email=${encodeURIComponent(email)}`
            } else {
                alert(`${email} is already registered.`)
                window.location.href = 'index.html'
            }
            
        } catch (error) {
            console.error('Error creating user:', error)
        }
    })

}

// Homepage
else if (document.getElementById("homepage")) {

    // Get Email from url
    function getEmailFromURL() {
        const urlParams = new URLSearchParams(window.location.search)
        return urlParams.get('email')
    }

    // Get user through email
    async function getUserByEmail(email) {
        const response = await fetch(apiUrl + `/users/${encodeURIComponent(email)}`)
        if (!response.ok) {
            throw new Error('Network response was not ok')
        }
        const user = await response.json()
        document.getElementById("welcome").textContent = "Hola " + user.username + "!"
    }


    const email = getEmailFromURL()
    getUserByEmail(email)
}



