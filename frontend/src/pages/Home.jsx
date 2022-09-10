import React from 'react'
import { useFetchUser } from '../utils/hooks/useFetchUser'
import { useFetchPost } from '../utils/hooks/useFetchPost'
import { Link, useNavigate } from 'react-router-dom'
import { Loader } from '../utils/style/Atoms'
import Card from '../components/Card'
import FormHome from '../components/FormHome'
import styled from 'styled-components'
import colors from '../utils/style/colors'

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
`
const DivTop = styled.div`
  display: flex;
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

export default function Home() {
  const userId = localStorage.getItem('userId')
  const token = localStorage.getItem('token')

  const navigate = useNavigate()

  const { dataUser, isLoadingUser, errorUser } = useFetchUser(
    `http://localhost:7000/api/user/${userId}`,
    'GET',
    token
  )

  const { dataPost, isLoadingPost, errorPost } = useFetchPost(
    `http://localhost:7000/api/post/`,
    'GET',
    token
  )

  function deconnection() {
    console.log({ message: 'Déconnection' })
    localStorage.clear()
    navigate('/')
  }

  if (errorUser) {
    return <span>Il y a un problème user</span>
  }
  if (errorPost) {
    return <span>Il y a un problème post</span>
  }

  return isLoadingUser || isLoadingPost ? (
    <LoaderWrapper>
      <Loader />
    </LoaderWrapper>
  ) : (
    <div>
      <DivTop>
        <h1>Home</h1>
        <LinkStyled to="/" onClick={deconnection}>
          Déconnection
        </LinkStyled>
        <h3>{dataUser.pseudo} </h3>
      </DivTop>

      <FormHome />

      <ContainerCards>
        {dataPost.map((item, index) => (
          <Card
            key={item._id + '-' + index}
            imageUrl={item.imageUrl}
            post={item.post}
          />
        ))}
      </ContainerCards>
    </div>
  )
}
