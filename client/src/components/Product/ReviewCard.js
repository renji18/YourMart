import React from 'react'
import ReactStars from 'react-rating-stars-component'
import ProfilePng from '../../images/Profile.png'
import './ProductDetails.css'

const ReviewCard = ({ review }) => {

  const options = {
    size: "large",
    value: review.rating,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <div className="reviewCard">
      <img src={ProfilePng} alt="User" />
      <p>{review.name}</p>
      <ReactStars {...options} />
      <span>{review.comment}</span>
    </div>
  )
}

export default ReviewCard