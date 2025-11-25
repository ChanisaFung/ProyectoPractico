const registroform = document.querySelector('#registroform')
registroform.addEventListener('submit', (e)=>{
    e.preventDefault()
    const usuario = document.querySelector('#usuario').value
    const clave = document.querySelector('#clave').value

    const Users = JSON.parse(localStorage.getItem('users')) || []
    const isUserRegistered = Users.find(user => user.usuario === usuario)
    if(isUserRegistered){
        return alert ('El usuario ya esta registrado')
    }

    Users.push({usuario: usuario, clave: clave})
    localStorage.setItem('users', JSON.stringify(Users))
    alert('Registro Exitoso')

    window.location.href = 'login.html'
})