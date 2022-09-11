import React from 'react'
import styled from 'styled-components'
import iconDelete from '../assets/delete.png'
import ModalPutPost from './ModalPutPost'

// styled-components -----------------------------------------
const ContainerCard = styled.div`
  max-width: 800px;
  width: 95%;
  padding: 20px;
  margin: 10px auto;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  min-height: 180px;
  text-align: left;
  display: flex;
  flex-wrap: wrap;
`

const Img = styled.img`
  height: 100%;
  width: 200px;
  object-fit: cover;
  margin-right: 15px;
`
const IconDelete = styled.img`
  cursor: pointer;
`
const ContainerBTN = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  // align-items: flex-end;
`
const DivMiddle = styled.div`
  flex: 1;
`

// Composant  --------------------------------------------------
export default function Card(props) {
  // console.log(props)
  const userId = localStorage.getItem('userId')
  const token = localStorage.getItem('token')

  function deletePost(postId, token) {
    fetch('http://localhost:7000/api/post/' + postId, {
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
  return (
    <ContainerCard>
      <Img src={props.imageUrl} alt="Images du Post" />
      <DivMiddle>
        <p>{props.posterId}</p>
        <p>{props.post}</p>
      </DivMiddle>

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
