const loginform = document.querySelector('#loginform')
loginform.addEventListener('submit', (e)=>{
    e.preventDefault()
    const usuario = document.querySelector('#usuario').value
    const clave = document.querySelector('#clave').value

    const Users = JSON.parse(localStorage.getItem('users')) || []
    const validUser = Users.find(user=> user.usuario === usuario && user.clave === clave)
    if (!validUser){
        return alert('Usuario y/o contraseña incorrectos')
    }
    alert(`Bienvenido ${validUser.usuario}`)
    window.location.href = 'index.html'
})
