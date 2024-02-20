import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import fetchData from '../../Fetch/fetchData.js';
import "./S-L.css";

export default function Login({ signupOrLogin, setSignupOrLogin }) {
  const navigate = useNavigate();
  const [user, setUser] = useState({ email: '', password: '' });
  const [txtError, setTxtError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    setTxtError('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const url = 'http://localhost:7000/api/user/login';
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
      };

      const data = await fetchData(url, options);
      localStorage.setItem('userId', data.userId);
      Cookies.set('token', data.token, { expires: 1, secure: true });
      navigate('/home');

    } catch (error) {
      console.error(error);
      setTxtError("Paire identifiant/mot de passe incorrecte");
    }
  };

  return (
    <div className='S-L'>
      <p className='S-L__title'>Connexion</p>
      <form className='S-L__form' onSubmit={handleLogin}>
        <label>
          <input
            type="email"
            name="email"
            placeholder="Adresse e-mail"
            autoComplete="email"
            value={user.email}
            onChange={handleInputChange}
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
            value={user.password}
            onChange={handleInputChange}
            required
          />
        </label>
        <button className='S-L__btn'>Se connecter</button>
      </form>
      {txtError && <p className='TxtErr'>{txtError}</p>}
      <div className='Separator'></div>
      <button className='S-L__btn' onClick={() => setSignupOrLogin(!signupOrLogin)}>Créer un nouveau compte</button>
    </div>
  );
}