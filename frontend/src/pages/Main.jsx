// import React, { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import Cookies from 'js-cookie'
import { useState } from 'react'
import logo from '../assets/icon-color.png'
import Login from '../components/Auth/Login'
import Signup from '../components/Auth/Signup'
// import Card from '../components/Card/Card'
import './Main.css'

export default function Main() {
  const [signupOrLogin, setSignupOrLogin] = useState(false)
  // const userId = localStorage.getItem('userId')
  // const token = Cookies.get('token')

  // const [dataPost, setDataPost] = useState([])

  // const navigate = useNavigate()

  // useEffect(() => {
  //   if ((!userId || !token)) navigate('/')
  //   callApiPost(token)
  // }, [token])

  // const callApiPost = async (token) => {
  //   try {
  //     const response = await fetch(`http://localhost:7000/api/post/`, {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: 'Bearer ' + token,
  //       },
  //     })
  //     if (!response.ok) {
  //       throw new Error('Problème Serveur')
  //     }
  //     const data = await response.json()
  //     console.log(data);
  //     setDataPost(data)
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // Syntaxe JSX --------------------------------------------------
  return (
    <main className='Main'>
      <img className='Main__img' src={logo} alt="Logo groupomania" />
      {signupOrLogin ?
        <Login
          setSignupOrLogin={setSignupOrLogin}
          signupOrLogin={signupOrLogin} /> :
        <Signup
          setSignupOrLogin={setSignupOrLogin}
          signupOrLogin={signupOrLogin} />
      }
    </main>
  )
}
