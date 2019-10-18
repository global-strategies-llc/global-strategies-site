import React, { Component, Fragment } from 'react'
import { X } from 'react-feather'

import './Popup.scss'

class Popup extends Component {
  constructor(props) {
    super(props)
    this.state = { showPopup: false }
  }

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    })
  }

  render() {
    const { isButton, label, children } = this.props
    return (
      <Fragment>
        <div className="Popup taCenter">
          {/* eslint-disable-next-line */}
          <a
            href="#"
            className={isButton ? 'Button' : ''}
            onClick={this.togglePopup.bind(this)}
          >
            {label}
          </a>
        </div>

        {this.state.showPopup ? (
          <div className="Popup-Overlay">
            <div
              className="Popup-Background"
              onClick={this.togglePopup.bind(this)}
            ></div>
            <div className="Popup-Inner">
              <X
                className="Popup-Close"
                onClick={this.togglePopup.bind(this)}
              />
              <div className="Popup-Content">{children}</div>
            </div>
          </div>
        ) : null}
      </Fragment>
    )
  }
}
export default Popup
