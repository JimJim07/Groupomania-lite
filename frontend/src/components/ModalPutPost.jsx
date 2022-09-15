import React, { useState } from 'react'
import Cookies from 'js-cookie'
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
  background: ${colors.white};
  padding: 14px 10px;
  border-radius: 10px;
  width: 90%;
  max-width: 800px;
`
const IconUpdate = styled.img`
  cursor: pointer;
  height: 35px;
  width: 35px;
`
const IconCancel = styled.img`
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
  height: 35px;
  width: 35px;
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
    background: ${colors.light};
  }
`
// Composant ModalPut --------------------------------------------------
export default function ModalPut(props) {
  const token = Cookies.get('token')

  const [post, setPost] = useState(props.post)
  const [picture, setPicture] = useState('')

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
      .then((res) => res.json())
      .then(() => {
        props.callApiPost(token)
        toggleModal()
      })
      .catch(() => console.log({ message: 'Url PUT Post non valide ' }))
  }

  // Syntaxe JSX --------------------------------------------------
  return (
    <>
      <IconUpdate onClick={toggleModal} src={iconUpdate} alt="icon update" />
      {modal && (
        <Overlay>
          <ModalStyled>
            <div>
              <H1>Modifier un post</H1>

              <Form onSubmit={modifyPost}>
                <label>
                  <Input
                    type="file"
                    name="file"
                    accept=".jpg,.jpeg,.png,"
                    onChange={(e) => setPicture(e.target.files[0])}
                    required
                  />
                </label>

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
              />
            </div>
          </ModalStyled>
        </Overlay>
      )}
    </>
  )
}
