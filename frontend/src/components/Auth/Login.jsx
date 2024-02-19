import { useState } from 'react'
import { /*Link,*/ useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import "./S-L.css"

export default function Login({ signupOrLogin, setSignupOrLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [txtError, setTxtError] = useState('')

  const navigate = useNavigate()

  function addUser(e) {
    e.preventDefault()
    const infoUser = {
      email: email,
      password: password,
    }

    fetch('http://localhost:7000/api/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(infoUser),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          console.log(data)
          setTxtError('Paire identifiant / mot de passe incorrecte')
        } else {
          console.log({ message: 'Connexion réussie' })
          if (data.userId) localStorage.setItem('userId', data.userId)
          Cookies.set('token', data.token, { expires: 1, secure: true })
          navigate('/home')
        }
      })
  }

  return (
    <div className='S-L'>
      <p className='S-L__title'>Connexion</p>
      <form className='S-L__form' onSubmit={addUser}>
        <label>
          <input
            type="email"
            name="email"
            placeholder="Adress e-mail"
            autoComplete="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              setTxtError('')
            }}
            required
          />
        </label>

        <label>
          <input
            type="password"
            minLength={5}
            name="password"
            autoComplete="current-password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
              setTxtError('')
            }}
            required
          />
        </label>

        <button className='S-L__btn'>Se connecter</button>
      </form>
      <p className='txtError'>{txtError}</p>
      <div className='Separator'></div>
      <button className='S-L__btn' onClick={() => setSignupOrLogin(!signupOrLogin)}>Créer un nouveau compte</button>
    </div>
  )
}
