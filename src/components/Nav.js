import React, { Component } from 'react'
import { Location } from '@reach/router'
import { Link } from 'gatsby'
import { Menu, X } from 'react-feather'
// import Logo from './Logo'

import './Nav.scss'

export class Navigation extends Component {
  state = {
    active: false,
    activeSubNav: false,
    currentPath: false
  }

  componentDidMount = () =>
    this.setState({ currentPath: this.props.location.pathname })

  handleMenuToggle = () => this.setState({ active: !this.state.active })

  // Only close nav if it is open
  handleLinkClick = () => this.state.active && this.handleMenuToggle()

  toggleSubNav = subNav =>
    this.setState({
      activeSubNav: this.state.activeSubNav === subNav ? false : subNav
    })

  markdownToStrong = text =>
    text.replace(/\*{2}(.*?)\*{2}/, <strong>$1</strong>)

  render() {
    const { active } = this.state,
      { heading } = this.props,
      NavLink = ({ to, className, children, ...props }) => (
        <Link
          to={to}
          className={`NavLink ${
            to === this.state.currentPath ? 'active' : ''
          } ${className}`}
          onClick={this.handleLinkClick}
          {...props}
        >
          {children}
        </Link>
      )

    return (
      <nav className={`Nav ${active ? 'Nav-active' : ''}`}>
        <div className="Nav--Container container">
          <div className="Nav--Brand">
            <Link to="/">{/* <Logo /> */}</Link>
            <div>
              {heading.company ? (
                <Link to="/">
                  <h2>{heading.company}</h2>
                </Link>
              ) : null}
              {heading.tagline ? <h3>{heading.tagline}</h3> : null}
            </div>
          </div>
          <div className="Nav--Links">
            {/* <NavLink to="/">Home</NavLink>
            <NavLink to="/about/">About</NavLink>
            <div
              className={`Nav--Group ${
                this.state.activeSubNav === 'posts' ? 'active' : ''
              }`}
            >
              <span
                className={`NavLink Nav--GroupParent ${
                  this.props.location.pathname.includes('posts') ||
                  this.props.location.pathname.includes('blog') ||
                  this.props.location.pathname.includes('post-categories')
                    ? 'active'
                    : ''
                }`}
                onClick={() => this.toggleSubNav('posts')}
              >
                Blog
              </span>
              <div className="Nav--GroupLinks">
                <NavLink to="/blog/" className="Nav--GroupLink">
                  All Posts
                </NavLink>
                {subNav.posts.map((link, index) => (
                  <NavLink
                    to={link.slug}
                    key={'posts-subnav-link-' + index}
                    className="Nav--GroupLink"
                  >
                    {link.title}
                  </NavLink>
                ))}
              </div>
            </div> */}
            <NavLink to="/bio/">Bio</NavLink>
            <NavLink to="/contact/">Contact</NavLink>
          </div>
          <button
            className="Button-blank Nav--MenuButton"
            onClick={this.handleMenuToggle}
          >
            {active ? <X /> : <Menu />}
          </button>
        </div>
      </nav>
    )
  }
}

export default ({ heading, subNav }) => (
  <Location>
    {route => <Navigation heading={heading} subNav={subNav} {...route} />}
  </Location>
)
