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
  const { setInfoUser, setConnexion, setIfAdmin } = useContext(InfoContext)

  const userId = localStorage.getItem('userId')
  const adminId = localStorage.getItem('adminId')
  const token = Cookies.get('token')

  const [dataPost, setDataPost] = useState([])

  const [loadUser, setLoadUser] = useState(true)
  const [loadPost, setLoadPost] = useState(true)

  const navigate = useNavigate()

  useEffect(() => {
    if (userId && token) callApiUser(token, userId)
    if (adminId && token) callApiAdmin(token, adminId)
    if (!token) return
  }, [token, userId, adminId])

  useEffect(() => {
    if (!token) return
    callApiPost(token)
  }, [token])

  // Renvois a la page Login si aucun UserId ou adminId et Token n'est founi
  useEffect(() => {
    if ((!userId || !adminId) && !token) navigate('/')
  }, [token, userId, adminId, navigate])

  function callApiUser(token, UserId) {
    setLoadUser(true)
    fetch(`http://localhost:7000/api/user/${UserId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setInfoUser(data.pseudo)
        setConnexion(true)
        setLoadUser(false)
      })
      .catch(() => {
        console.log({ message: 'Url GET User non valide' })
      })
  }

  function callApiAdmin(token, adminId) {
    setLoadUser(true)
    fetch(`http://localhost:7000/api/user/admin/${adminId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setInfoUser(data.pseudo)
        setConnexion(true)
        setLoadUser(false)
        setIfAdmin(true)
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
