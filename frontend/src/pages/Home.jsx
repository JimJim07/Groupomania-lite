import React, { useEffect, useState, useContext } from 'react'
import { InfoContext } from '../Context/InfoContext'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import { Loader } from '../styles/Atoms'
import Card from '../components/Card'
import FormHome from '../components/FormHome'
import styled from 'styled-components'

// Styled-components --------------------------------------
const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
`
const ContainerCards = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column-reverse;
`

// Composant --------------------------------------------------
export default function Home() {
  const { setInfoUser, setConnexion } = useContext(InfoContext)

  const userId = localStorage.getItem('userId')
  const token = Cookies.get('token')

  const [dataPost, setDataPost] = useState([])

  const [loadUser, setLoadUser] = useState(true)
  const [loadPost, setLoadPost] = useState(true)

  const navigate = useNavigate()

  useEffect(() => {
    if (!token) return
    callApiUser(token, userId)
  }, [token, userId])

  useEffect(() => {
    if (!token) return
    callApiPost(token)
  }, [token])

  // Renvois a la page Login si aucun UserId et Token n'est founi
  useEffect(() => {
    if (!token || !userId) navigate('/')
  }, [token, userId, navigate])

  function callApiUser(token, userId) {
    setLoadUser(true)
    fetch(`http://localhost:7000/api/user/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data)
        setInfoUser(data.pseudo)
        setConnexion(true)
        setLoadUser(false)
      })
      .catch(() => {
        console.log({ message: 'Url GET User non valide' })
      })
  }

  function callApiPost(token) {
    setLoadPost(true)
    fetch(`http://localhost:7000/api/post/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data)
        setDataPost(data)
        setLoadPost(false)
      })
      .catch(() => {
        console.log({ message: 'Url GET Post non valide ' })
      })
  }

  // Syntaxe JSX --------------------------------------------------
  return (
    <>
      {loadUser && loadPost ? (
        <LoaderWrapper>
          <Loader />
        </LoaderWrapper>
      ) : (
        <div>
          <FormHome callApiPost={callApiPost} />
          <ContainerCards>
            {dataPost.map((item, index) => (
              <Card
                key={item._id + '-' + index}
                postId={item._id}
                posterId={item.posterId}
                imageUrl={item.imageUrl}
                post={item.post}
                likers={item.likers}
                createdAt={item.createdAt}
                callApiPost={callApiPost}
              />
            ))}
          </ContainerCards>
        </div>
      )}
    </>
  )
}
