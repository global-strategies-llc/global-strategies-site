import React from 'react'
import Image from './Image'

import './Card.scss'

const Card = ({ img, heading, className, children }) => (
  <div className={['Card', className].join(' ')}>
    <div className="Card--Image">{img ? <Image {...img} /> : null}</div>
    <div className="Card--Content">
      <h5 className="Card--Heading">{heading}</h5>
      <div className="Card--Body">{children}</div>
    </div>
  </div>
)

export default Card
