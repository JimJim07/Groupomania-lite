import React, { useState } from 'react'
import Cookies from 'js-cookie'
import iconDelete from '../../assets/delete.png'
import iconLike from '../../assets/love.png'
import iconUnlike from '../../assets/unlove.png'
import { dateParser } from '../../utils/dateFormat'
import './Card.css'

export default function Card({ item }) {
  const { _id, imageUrl, post, posterId, updatedAt } = item

  const userId = localStorage.getItem('userId')
  const token = Cookies.get('token')

  const [liked, setLiked] = useState(false)

  const likeAndUnlikePost = async (url) => {
    try {
      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify({ id: userId })
      })
      if (!response.ok) {
        throw new Error('Problème serveur')
      }
      const data = await response.json()
      console.log(data);
      setLiked(!liked)

    } catch (error) {
      console.log(error);
    }
  }

  const deletePost = async (postId, token, e) => {

    try {

      const response = await fetch(`http://localhost:7000/api/post/${postId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      })
      console.log(response);
      if (!response.ok) {
        throw new Error('Problème serveur')
      }

      const target = e.target
      const element = target.closest(".Card")
      element.remove()

      const data = await response.json()
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  // Syntaxe JSX --------------------------------------------------
  return (
    <div className='Card'>
      <img className='Card__img' src={imageUrl} alt="Images du Post" />
      <div className='Card__content'>
        <p className='Card__date'>{dateParser(updatedAt)}</p>
        <h3>{posterId}</h3>

        <p>{post}</p>
        <div className='Card__ContainerHeart'>
          <img
            className='Card__heart cursor__pointer'
            onClick={() => likeAndUnlikePost(`http://localhost:7000/api/post/${liked ? 'like' : 'unlike'}/${_id}`)}
            src={liked ? iconLike : iconUnlike}
            alt="" />
          <p>{liked ? 1 : 0}</p>
        </div>
      </div>
      <div>
        <img
          className='cursor__pointer'
          src={iconDelete}
          alt="img delete"
          width={30}
          onClick={(e) => {
            if (window.confirm('La suppression de ce post sera définitive')) {
              deletePost(_id, token, e)
            }
          }} />
      </div>
    </div>
  )
}
