import React, { useState } from 'react'
import { useNavigate/*, Link*/ } from 'react-router-dom'
import Cookies from 'js-cookie'
import fetchData from '../../Fetch/fetchData.js'

import "./S-L.css"

export default function Signup({ signupOrLogin, setSignupOrLogin }) {
  const navigate = useNavigate()

  const [pseudo, setPseudo] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const infoUser = {
    pseudo: pseudo,
    email: email,
    password: password,
  }

  const [txtError, setTxtError] = useState('')

  const signup = async (e) => {
    e.preventDefault();
    try {

      const url = 'http://localhost:7000/api/user/signup';
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(infoUser)
      };

      await fetchData(url, options);

      afterSignup(infoUser)
    } catch (error) {
      console.log(error);
    }
  };

  const afterSignup = async (infoUser) => {
    try {

      const url = 'http://localhost:7000/api/user/login';
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(infoUser)
      };

      const data = await fetchData(url, options);

      localStorage.setItem('userId', data.userId)
      Cookies.set('token', data.token, { expires: 1, secure: true })
      navigate('/home')
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='S-L'>
      <p className='S-L__title'>Inscription</p>
      <form className='S-L__form' onSubmit={signup}>
        <label>
          <input
            type="text"
            name="pseudo"
            minLength={5}
            maxLength={30}
            placeholder="Pseudo"
            value={pseudo}
            onChange={(e) => {
              setPseudo(e.target.value)
              setTxtError('')
            }}
            required
          />
        </label>

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
            placeholder="Mot de passe"
            name="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
              setTxtError('')
            }}
            required
          />
        </label>

        <button className='S-L__btn'>Créer un nouveau compte</button>
      </form>
      <p className='TxtErr'>{txtError}</p>
      <div className='Separator'></div>
      <button className='S-L__btn' onClick={() => setSignupOrLogin(!signupOrLogin)}>Se connecter</button>
    </div>
  )
}
