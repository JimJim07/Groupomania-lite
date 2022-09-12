import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Loader } from '../styles/Atoms'
import Card from '../components/Card'
import FormHome from '../components/FormHome'
import styled from 'styled-components'
import colors from '../styles/colors'

// Styled-components --------------------------------------
const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
`
const DivTop = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: center;
  height: 70px;
  max-width: 800px;
  width: 95%;
  margin: auto;
`
const ContainerCards = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column-reverse;
`
const LinkStyled = styled(Link)`
  text-decoration: none;
  color: white;
  padding: 8px;
  border-radius: 10px;
  margin: 0 10px;
  background-color: ${colors.tertiary};
  &:hover {
    background: ${colors.primary};
  }
`

// Composant --------------------------------------------------
export default function Home() {
  const userId = localStorage.getItem('userId')
  const token = localStorage.getItem('token')

  const [dataUser, setDataUser] = useState({})
  const [dataPost, setDataPost] = useState([])

  const [loadUser, setLoadUser] = useState(true)
  const [loadPost, setLoadPost] = useState(true)

  const [errorUser, setErrorUser] = useState(false)
  const [errorPost, setErrorPost] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    if (!token) return
    callApiUser(token, userId)
  }, [token, userId])

  useEffect(() => {
    if (!token) return
    callApiPost(token)
  }, [token])

  useEffect(() => {
    if (!token) navigate('/')
  }, [token, navigate])

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
        setDataUser(data)
        setLoadUser(false)
      })
      .catch(() => {
        console.log({ message: 'Url GET User non valide' })
        setErrorUser(true)
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
        console.log(data)
        setDataPost(data)
        setLoadPost(false)
      })
      .catch(() => {
        console.log({ message: 'Url GET Post non valide ' })
        setErrorPost(true)
      })
  }

  function deconnection() {
    console.log({ message: 'Déconnection' })
    localStorage.clear()
    navigate('/')
  }

  if (errorUser || errorPost) {
    return <span>Un problème est survenu</span>
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
          <DivTop>
            <h1>Accueil</h1>
            <LinkStyled to="/" onClick={deconnection}>
              Déconnection
            </LinkStyled>
            <h3>{dataUser.pseudo} </h3>
            {/* <h3>{dataUser._id} </h3> */}
          </DivTop>
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
                callApiPost={callApiPost}
              />
            ))}
          </ContainerCards>
        </div>
      )}
    </>
  )
}
