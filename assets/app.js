const apiUrl = 'https://what-to-wear---server.glitch.me'

// Get all users
function getUsers() {
    return fetch(apiUrl + '/users')
        .then(response => response.json())
        .catch(error => {
            console.error('Error fetching users:', error)
        })
}

// Log In
if (document.getElementById("login")) {
    var loginBtn = document.getElementById("loginBtn")

    async function userAuthentication() {
        const email = document.getElementById("email").value
        const password = document.getElementById("password").value

        const allUsers = await getUsers()

        if (authenticateemail(email, allUsers)) {
            console.log(`${email} is not a registered user.`)
            window.location.href = 'signup.html'
        } else {
            console.log(`${email} is already registered.`)
            if (authenticatePassword(email, password, allUsers)) {
                window.location.href = 'homepage.html'
            } else {
                console.log('email and password do not match')
            }
        }
    }

    // email and Password Authentication
    function authenticateemail(email, users) {
        return !users.some(user => user.email === email)
    }
    function authenticatePassword(email, password, users) {
        const user = users.find(user => user.email === email)
        return user && user.password === password
    }

    loginBtn.addEventListener('click', userAuthentication)
}

// Sign Up
else if (document.getElementById("signup")) {

    function updateValue() {
        const age = document.getElementById("age");
        const ageValue = document.getElementById("ageValue");
        ageValue.textContent = "Edad:  " + age.value;
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
            await createUser(username, email, age, gender, password)
            console.log('User created successfully')
            window.location.href = 'homepage.html'
        } catch (error) {
            console.error('Error creating user:', error)
        }
    })

}



