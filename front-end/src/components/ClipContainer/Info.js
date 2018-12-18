import React from 'react'
import Heart from '../Icons/Heart'
import axios from 'axios'

const Info = ({ clip, toggleEditing, liked, toggleLike, history }) => {
  return (
    <div className='clip__info'>
      <div className='clip__meta'>
        <Heart liked={liked} handleClick={() => toggleLike(!liked)} />
        <div className='clip__text'>{clip.opponent}</div>
        <div className='clip__tags'>
          {
            clip.tags.map(
              (tag, i) =>
                <span
                  className='tag'
                  key={`tag-${clip.id}-${i}`}
                >{`${tag}${i === clip.tags.length - 1 ? ' ' : ', '}`}</span>
            )
          }
        </div>
      </div>
      <div
        className='clip__btn'
        onClick={() => toggleEditing(true)}
      >Edit</div>
      <div
        className='clip__btn'
        onClick={() => {
          axios.delete(`/api/clips/${clip.id}/`)
          history.push('/')
        }}
      >Delete</div>
    </div>
  )
}

export default Info
