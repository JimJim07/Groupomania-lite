import { useState } from 'react'
import { useNavigate/*, Link*/ } from 'react-router-dom'
import Cookies from 'js-cookie'
import fetchData from '../../Fetch/fetchData.js'
import "./S-L.css"

export default function Login({ signupOrLogin, setSignupOrLogin }) {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [txtError, setTxtError] = useState('')

  const infoUser = {
    email: email,
    password: password,
  }

  async function login(e) {
    e.preventDefault()
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
      <p className='S-L__title'>Connexion</p>
      <form className='S-L__form' onSubmit={login}>
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
