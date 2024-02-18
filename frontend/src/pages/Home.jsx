import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import logo from '../assets/icon-color.png'
import Card from '../components/Card/Card'
import './Home.css'

export default function Home() {
  const userId = localStorage.getItem('userId')
  const token = Cookies.get('token')

  const [dataPost, setDataPost] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    if ((!userId || !token)) navigate('/')
    callApiPost(token)
  }, [token])

  const callApiPost = async (token) => {
    try {
      const response = await fetch(`http://localhost:7000/api/post/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      })
      if (!response.ok) {
        throw new Error('Problème Serveur')
      }
      const data = await response.json()
      console.log(data);
      setDataPost(data)
    } catch (error) {
      console.log(error);
    }
  }

  // Syntaxe JSX --------------------------------------------------
  return (
    <main className='Main'>
      <img className='Main__img' src={logo} alt="Logo groupomania" />
      <div className='Main__container'>
        {dataPost.map((item, index) => (
          <Card
            key={item._id + '-' + index}
            item={item}
          />
        ))}
      </div>
    </main>
  )
}
