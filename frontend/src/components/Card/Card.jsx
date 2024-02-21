import React, { useState } from 'react'
import Cookies from 'js-cookie'
import iconDelete from '../../assets/delete.png'
import iconLike from '../../assets/love.png'
import iconUnlike from '../../assets/unlove.png'
import { dateParser } from '../../utils/dateFormat'
import './Card.css'
import fetchData from '../../Fetch/fetchData'

export default function Card({ item, deleteOnePost }) {
  const { _id, imageUrl, post, posterPseudo, updatedAt } = item

  const userId = localStorage.getItem('userId')
  const token = Cookies.get('token')

  const [liked, setLiked] = useState(false)

  const likeAndUnlikePost = async () => {
    try {

      const url = `http://localhost:7000/api/post/${liked ? 'like' : 'unlike'}/${_id}`
      const options = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ id: userId })
      };

      const data = await fetchData(url, options);
      console.log(data);
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

        <p>{post}</p>
        <div className='Card__ContainerHeart'>
          <img
            className='Card__heart'
            onClick={() => likeAndUnlikePost()}
            src={liked ? iconLike : iconUnlike}
            alt="" />
          <p>{liked ? 1 : 0}</p>
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
