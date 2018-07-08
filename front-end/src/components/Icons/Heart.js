import React, { Component } from 'react'
import { Spring } from 'react-spring'

const Heart = ({ liked, toggle, fill }) => {
  const pathStyle = { stroke: "#F62C81" }
  const containerStyle = { cursor: "pointer" }

  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 22 20"
      xmlns="http://www.w3.org/2000/svg"
      style={containerStyle}
      onClick={toggle}
    >
      <path
        d="M0.881954 2.88311C4.44982 -1.78412 8.40246 0.938433 9.93279 2.88311C12.6874 0.209179 16.8849 -1.97859 19.7707 2.88311C21.7907 6.28626 14.4363 15.3615 9.93279 17.5897C5.42923 14.6322 -2.68591 7.55034 0.881954 2.88311Z"
        transform="translate(1.11429 1)"
        style={{ ...pathStyle, fill }}
      />
    </svg>
  )
}

class HeartSpring extends Component {

  render() {
    const { handleClick, liked } = this.props

    return (
      <Spring
        children={Heart}
        to={{
          fill: liked ? '#F62C81' : '#fff',
        }}
        toggle={handleClick}
      />
    )
  }
}

export default HeartSpring
