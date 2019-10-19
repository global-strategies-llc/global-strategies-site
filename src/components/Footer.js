import React from 'react'
import './Footer.scss'

export default () => (
  <footer className="footer">
    <div className="container">
      <span>Global Strategies, LLC</span>
      <span>Charlotte, NC and Bozeman, MT</span>
      <span>© Copyright {new Date().getFullYear()} All rights reserved.</span>
    </div>
  </footer>
)
