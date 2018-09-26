import React from 'react'

export default (props) => {

  const {name,
  length,
  location,
  summary,
  difficulty,
  stars,
  starVotes,
  url,
  imgMedium,
  ascent,
  descent,
  conditionDetails,
  conditionDate} = props.trailDetails
  return (
    
    <div>
      <h4>{name}</h4>
    <ul className='list-group'>
          <li className='list-group-item'>
            <img src={imgMedium} alt="no pic :( it's your imagination's time to shine" />
          </li>
          <li className='list-group-item'>Link: {url}</li>
          <li className='list-group-item'>Length: {length} miles</li>
          <li className='list-group-item'>Location: {location}</li>
          <li className='list-group-item'>Description: {summary}</li>
          <li className='list-group-item'>Difficulty: {difficulty}</li>
          <li className='list-group-item'>
            Rating: {stars} stars, {starVotes} reviews
          </li>
          <li className='list-group-item'>
            Elevation Change: {ascent}, {descent}
          </li>
          {{conditionDetails} ? (
          <li className='list-group-item'>
            Condition Details: {conditionDetails} {conditionDate}
          </li>) : null}
        </ul>
    </div>
  )
}
