import React from 'react'
import Button from '../Button'

const Card = ({ name, avatar, clip_stats: clipStats, ...props }) => {
  const { clips, opponents, untagged } = clipStats
  return (
    <div className='grapplers-card'>
      <div className='grapplers-card__header'>{name}</div>
      <div
        className='grapplers-card__avatar'
      >
        {
          avatar
            ? <img src={avatar} alt='profile' />
            : null
        }
      </div>
      <div className='grapplers-card__body'>
        <div>{`${clips} Clips`}</div>
        <div>{`${opponents} Opponents`}</div>
        {
          untagged
            ? <Button label={`${untagged} Untagged Clips`} theme='red' />
            : <Button label='All Clips Tagged' theme='green' />
        }
      </div>
    </div>
  )
}

export default Card
