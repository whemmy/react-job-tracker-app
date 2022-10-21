import React from 'react'
import Wrapper from '../assets/wrappers/StatItem'

const StatItem = ({ count, title, icon, color, bcg }) => {
  return (
    <Wrapper color={color} bcg={bcg}>
      <header>
        <span className="count">{count}</span>
        <span className="icon">{icon}</span>
      </header>
      <div className="title">{title}</div>
    </Wrapper>
  )
}

export default StatItem
