import React, { useState } from 'react'
import { useContext } from 'react'
import { InfoContext } from '../../Context/InfoContext'
import Cookies from 'js-cookie'
import pictureUser from '../../assets/simba.webp'
import iconDelete from '../../assets/delete.png'
import iconLike from '../../assets/love.png'
import iconUnlike from '../../assets/unlove.png'
import { dateParser } from '../../utils/dateFormat'
import './Card.css'
import fetchData from '../../Fetch/fetchData'

export default function Card({ post, deleteOnePost }) {
  const { _id, imageUrl, txtContent, posterPseudo, posterId, updatedAt, likers } = post
  const token = Cookies.get('token')
  const { userInfoCTX } = useContext(InfoContext);

  const userId = localStorage.getItem('userId')

  const ifAlreadyLiked = likers.find(liker => liker === userId) ? true : false

  const [liked, setLiked] = useState(ifAlreadyLiked)
  const [nbOfLikes, setNbOfLikes] = useState(likers.length)

  const likeAndUnlikePost = async () => {
    try {

      if (liked) {
        setNbOfLikes(nbOfLikes - 1)
      } else {
        setNbOfLikes(nbOfLikes + 1)
      }

      setLiked(!liked)

      const url = `http://localhost:7000/api/post/${liked ? 'unlike' : 'like'}/${_id}`
      const options = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ id: userId })
      };

      await fetchData(url, options);

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='Card'>
      <div className='Card__header'>
        <img className='Card__pictureUser' src={pictureUser} alt="Picture User" />
        <div>
          <h3>{posterPseudo}</h3>
          <p className='Card__date'>{dateParser(updatedAt)}</p>
        </div>
      </div>

      <img className='Card__img' src={imageUrl} alt="Images du Post" />
      <p className='Card__txt'>{txtContent}</p>

      <div className='Card__ContainerBottom'>
        <div className='Card__ContainerHeart'>
          <img
            className='Card__heart'
            onClick={() => likeAndUnlikePost()}
            src={liked ? iconLike : iconUnlike}
            alt="" />
          <p>{nbOfLikes}</p>
        </div>
        {(userInfoCTX.ifAdmin || userId === posterId) && <img
          className='Card__trash'
          src={iconDelete}
          alt="img delete"
          onClick={() => { deleteOnePost(_id) }} />}

      </div>
    </div>
  )
}
