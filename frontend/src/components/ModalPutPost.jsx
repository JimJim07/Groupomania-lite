import React, { useState } from 'react'
import styled from 'styled-components'
import colors from '../styles/colors'
import iconUpdate from '../assets/update.png'
import iconCancel from '../assets/annuler.png'

// Styled-components -------------------------------------------------
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(49, 49, 49, 0.8);
`
const ModalStyled = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #f1f1f1;
  padding: 14px 10px;
  border-radius: 10px;
  width: 90%;
  max-width: 800px;
`
const IconUpdate = styled.img`
  cursor: pointer;
`
const IconCancel = styled.img`
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
`
// Style Form ---------------
const H1 = styled.h1`
  text-align: center;
`
const Form = styled.form`
  width: 90%;
  margin: auto;
  display: flex;
  flex-direction: column;
`
const Input = styled.input`
  font-size: 18px;
  padding: 8px;
  margin-bottom: 10px;
`
const Textarea = styled.textarea`
  font-size: 18px;
  padding: 10px;
  margin-bottom: 10px;
  min-height: 100px;
  font-family: Arial, Helvetica, sans-serif;
`
const Button = styled.button`
  font-size: 16px;
  padding: 10px 15px;
  width: 200px;
  background: transparent;
  border: 1px solid rgba(0, 0, 0, 0.8);
  border-radius: 3px;
  cursor: pointer;
  &:hover {
    background: ${colors.backgroundLight};
  }
`
// Composant ModalPut --------------------------------------------------
export default function ModalPut(props) {
  const token = localStorage.getItem('token')

  const [post, setPost] = useState(props.post)
  const [picture, setPicture] = useState(props.imageUrl)

  const [modal, setModal] = useState(false)

  function toggleModal() {
    setModal(!modal)
  }

  function modifyPost(e) {
    e.preventDefault()

    const data = new FormData()
    data.append('image', picture)
    data.append('post', post)

    fetch('http://localhost:7000/api/post/' + props.postId, {
      method: 'PUT',
      headers: {
        Authorization: 'Bearer ' + token,
      },
      body: data,
    })
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        // console.log(data)
        props.callApiPost(token)
        toggleModal()
      })
      .catch(() => console.log({ message: 'Url PUT Post non valide ' }))
  }

  // Syntaxe JSX --------------------------------------------------
  return (
    <>
      <IconUpdate
        onClick={toggleModal}
        src={iconUpdate}
        alt="icon update"
        height={35}
        width={35}
      />
      {modal && (
        <Overlay>
          <ModalStyled>
            <div>
              <H1>Modifier un post</H1>

              <Form onSubmit={modifyPost}>
                <label></label>
                <Input
                  type="file"
                  name="file"
                  accept=".jpg,.jpeg,.png,"
                  onChange={(e) => setPicture(e.target.files[0])}
                  required
                />

                <label htmlFor="post"></label>
                <Textarea
                  type="text"
                  name="post"
                  maxLength={250}
                  placeholder="Votre post"
                  value={post}
                  onChange={(e) => setPost(e.target.value)}
                  required
                ></Textarea>

                <Button>Modifier le post</Button>
              </Form>

              <IconCancel
                onClick={toggleModal}
                src={iconCancel}
                alt="icon annuler"
                height={35}
                width={35}
              />
            </div>
          </ModalStyled>
        </Overlay>
      )}
    </>
  )
}
