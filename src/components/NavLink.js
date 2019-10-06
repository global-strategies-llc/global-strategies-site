import React from 'react'
import { Link } from 'gatsby'

import './NavLink.scss'

export default ({ className, children, ...props }) => (
  <Link {...props} className={`NavLink ${className || ''}`}>
    {children}
  </Link>
)
