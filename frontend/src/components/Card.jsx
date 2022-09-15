import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import styled from 'styled-components'
import iconDelete from '../assets/delete.png'
import iconLike from '../assets/love.png'
import iconUnlike from '../assets/unlove.png'
import ModalPutPost from './ModalPutPost'
import { dateParser } from '../utils/dateFormat'
import colors from '../styles/colors'

// styled-components -----------------------------------------
const ContainerCard = styled.div`
  max-width: 800px;
  width: 95%;
  background: ${colors.white};
  padding: 20px;
  margin: 10px auto;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  min-height: 180px;
  text-align: left;
  display: flex;
  flex-wrap: wrap;
  overflow-wrap: break-word;
  @media (max-width: 630px) {
    flex-direction: column;
  }
`

const Img = styled.img`
  height: 100%;
  max-height: 180px;
  width: 250px;
  object-fit: cover;
  @media (max-width: 630px) {
    width: 100%;
  }
`
const DivMiddle = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: space-between;
  padding: 0 15px;
  @media (max-width: 630px) {
    padding: 15px 0 0 0;
  }
`
const Psmall = styled.p`
  font-size: 0.8em;
  font-weight: 600;
`
const DivMiddle1 = styled.div`
  display: flex;
  align-items: center;
`
const ContainerBTN = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media (max-width: 630px) {
    margin-top: 15px;
    flex-direction: row;
  }
`
const IconDelete = styled.img`
  cursor: pointer;
`
const IconLike = styled.img`
  cursor: pointer;
  margin: 10px 10px 0 0;
`

// Composant  --------------------------------------------------
export default function Card(props) {
  const adminId = localStorage.getItem('adminId')
  const userId = localStorage.getItem('userId')
  const token = Cookies.get('token')

  const [pseudo, setPseudo] = useState('')
  const [nbLike, setNbLike] = useState(props.likers.length)
  const [liked, setLiked] = useState(false)

  function like(userId, postId) {
    fetch(`http://localhost:7000/api/post/like/${postId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({ id: userId }),
    })
      .then((res) => res.json())
      .then((data) => {
        setLiked(true)
        setNbLike(data.likers.length)
      })
      .catch((err) => console.log(err))
  }

  function unlike(userId, postId) {
    fetch(`http://localhost:7000/api/post/unlike/${postId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({ id: userId }),
    })
      .then((res) => res.json())
      .then((data) => {
        setLiked(false)
        setNbLike(data.likers.length)
      })
      .catch((err) => console.log(err))
  }

  // Verifie si l' userId à déjà liker
  useEffect(() => {
    if (props.likers.includes(userId)) {
      setLiked(true)
    } else {
      setLiked(false)
    }
  }, [props.likers, userId])

  function deletePost(postId, token) {
    fetch(`http://localhost:7000/api/post/${postId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    })
      .then((res) => {
        if (res.ok) {
          props.callApiPost(token)
        }
        return res.json()
      })
      .then((data) => console.log(data))
      .catch((error) => console.log(error))
  }

  // Affiche les pseudo
  useEffect(() => {
    fetch(`http://localhost:7000/api/user/${props.posterId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setPseudo(data.pseudo)
      })
      .catch((err) => console.log(err))
  }, [props.posterId, token])

  // Syntaxe JSX --------------------------------------------------
  return (
    <ContainerCard>
      <Img src={props.imageUrl} alt="Images du Post" />
      <DivMiddle>
        <div>
          <Psmall>{dateParser(props.createdAt)}</Psmall>
          <h3>{pseudo}</h3>
        </div>

        <p>{props.post}</p>
        {adminId ? (
          <DivMiddle1></DivMiddle1>
        ) : (
          <DivMiddle1>
            {!liked ? (
              <IconLike
                onClick={() => like(userId, props.postId)}
                src={iconUnlike}
                alt="unlike"
                height={30}
                width={30}
              />
            ) : (
              <IconLike
                onClick={() => unlike(userId, props.postId)}
                src={iconLike}
                alt="like"
                height={30}
                width={30}
              />
            )}

            <p>{nbLike}</p>
          </DivMiddle1>
        )}
      </DivMiddle>

      {adminId && (
        <ContainerBTN>
          <ModalPutPost
            post={props.post}
            imageUrl={props.imageUrl}
            postId={props.postId}
            callApiPost={props.callApiPost}
          />
          <IconDelete
            src={iconDelete}
            alt="img delete"
            height={35}
            width={35}
            onClick={() => {
              if (window.confirm('La suppression de ce post sera définitive')) {
                deletePost(props.postId, token)
              }
            }}
          />
        </ContainerBTN>
      )}

      {props.posterId === userId && (
        <ContainerBTN>
          <ModalPutPost
            post={props.post}
            imageUrl={props.imageUrl}
            postId={props.postId}
            callApiPost={props.callApiPost}
          />
          <IconDelete
            src={iconDelete}
            alt="img delete"
            height={35}
            width={35}
            onClick={() => {
              if (window.confirm('La suppression de ce post sera définitive')) {
                deletePost(props.postId, token)
              }
            }}
          />
        </ContainerBTN>
      )}
    </ContainerCard>
  )
}
