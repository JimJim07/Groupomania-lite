import React, { useState } from 'react'
import Cookies from 'js-cookie'
import iconDelete from '../../assets/delete.png'
import iconLike from '../../assets/love.png'
import iconUnlike from '../../assets/unlove.png'
import { dateParser } from '../../utils/dateFormat'
import './Card.css'
import fetchData from '../../Fetch/fetchData'

export default function Card({ post, deleteOnePost }) {
  const { _id, imageUrl, txtContent, posterPseudo, updatedAt, likers } = post
  const token = Cookies.get('token')

  const userId = localStorage.getItem('userId')

  const ifAlreadyLiked = likers.find(liker => liker === userId) ? true : false

  const [liked, setLiked] = useState(ifAlreadyLiked)
  const [nbOfLikes, setNbOfLikes] = useState(likers.length)

  const likeAndUnlikePost = async () => {
    try {

      const url = `http://localhost:7000/api/post/${liked ? 'unlike' : 'like'}/${_id}`
      const options = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ id: userId })
      };

      await fetchData(url, options);

      if (liked) {
        setNbOfLikes(nbOfLikes - 1)
      } else {
        setNbOfLikes(nbOfLikes + 1)
      }

      setLiked(!liked)

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='Card'>
      <img className='Card__img' src={imageUrl} alt="Images du Post" />
      <div className='Card__content'>
        <p className='Card__date'>{dateParser(updatedAt)}</p>
        <h3>{posterPseudo}</h3>

        <p>{txtContent}</p>
        <div className='Card__ContainerHeart'>
          <img
            className='Card__heart'
            onClick={() => likeAndUnlikePost()}
            src={liked ? iconLike : iconUnlike}
            alt="" />
          <p>{nbOfLikes}</p>
        </div>
      </div>
      <div>
        <img
          className='Card__trash'
          src={iconDelete}
          alt="img delete"
          onClick={() => { deleteOnePost(_id) }} />
      </div>
    </div>
  )
}
