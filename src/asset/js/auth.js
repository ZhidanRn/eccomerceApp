let users = JSON.parse(localStorage.getItem('users')) || [];

function register() {
    const regUser = document.getElementById('regUser').value
    const regPass = document.getElementById('regPass').value
    const regConf = document.getElementById('regConf').value

    if (users.some(user => user.username === regUser)) {
        alert('Username is already registered. Choose another username')
        return
    } else if(regPass != regConf){
        alert('Passwords do not match')
        return
    }

    users.push({ username: regUser, password: regPass })
    
    localStorage.setItem('users', JSON.stringify(users))

    alert('Registration Successful. Please Login')

    window.location.href = "login.html"
}

function login() {
    const loginUser = document.getElementById('loginUser').value
    const loginPass = document.getElementById('loginPass').value

    const user = users.find(user => user.username === loginUser)

    if (user && user.password === loginPass) {
        alert(`Login Seccesful`)
        window.location.href = 'index.html'
    } else {
        alert('Login Failed, Make sure your username and password correct')
    }
}