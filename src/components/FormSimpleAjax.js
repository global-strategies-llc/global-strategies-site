import React, { Fragment } from 'react'
import Helmet from 'react-helmet'
import { Loader } from 'react-feather'
import { stringify } from 'qs'
import { serialize } from 'dom-form-serializer'

import './Form.scss'

class Form extends React.Component {
  static defaultProps = {
    name: 'Contact Us',
    subject: '', // optional subject of the notification email
    action: '',
    successMessage: 'Thanks for your inquiry, we will be in touch soon!',
    errorMessage:
      'There is a problem, and your message has not been sent.  Please try contacting us via email at leo@globalstrategies.xyz'
  }

  state = {
    alert: '',
    disabled: false,
    loading: false,
    success: false
  }

  onInput = e => {
    if (e.target.value.trim() !== '') {
      e.target.classList.add('filled')
    } else {
      e.target.classList.remove('filled')
    }
  }

  handleSubmit = e => {
    e.preventDefault()
    if (this.state.disabled) return

    const form = e.target
    const data = serialize(form)
    data['g-recaptcha-response'] =
      window.grecaptcha && window.grecaptcha.getResponse()

    if (!data['g-recaptcha-response']) {
      return this.setState({
        disabled: false,
        alert: `Please verify your humanity.  Click the checkbox next to "I'm not a robot"`
      })
    }

    this.setState({ disabled: true, loading: true, alert: '' })

    fetch(form.action + '?' + stringify(data), {
      method: 'POST'
    })
      .then(res => {
        if (res.ok) {
          return res
        } else {
          throw new Error('Network error')
        }
      })
      .then(() => new Promise(resolve => setTimeout(() => resolve(), 3000)))
      .then(() => {
        form.reset()
        window.grecaptcha.reset()
        this.setState({
          alert: this.props.successMessage,
          disabled: false,
          loading: false,
          success: true
        })
      })
      .catch(err => {
        console.error(err)
        this.setState({
          disabled: false,
          loading: false,
          alert: this.props.errorMessage
        })
      })
  }

  render() {
    const { name, subject, action } = this.props

    return (
      <Fragment>
        {this.state.alert && (
          <div className="Form--Alert">{this.state.alert}</div>
        )}
        <Helmet>
          <script src="https://www.google.com/recaptcha/api.js" async defer />
        </Helmet>
        <form
          className={['Form', this.state.success ? 'Hidden' : ''].join(' ')}
          name={name}
          action={action}
          onSubmit={this.handleSubmit}
          data-netlify="true"
          data-netlify-recaptcha="true"
        >
          {this.state.loading && (
            <div className="Loader">
              <Loader />
            </div>
          )}
          <div className="Form--Group">
            <label className="Form--Label">
              <input
                className="Form--Input Form--InputText"
                type="text"
                placeholder="Firstname"
                name="firstname"
                required
                onInput={this.onInput}
              />
              <span>First name</span>
            </label>
            <label className="Form--Label">
              <input
                className="Form--Input Form--InputText"
                type="text"
                placeholder="Lastname"
                name="lastname"
                required
                onInput={this.onInput}
              />
              <span>Last name</span>
            </label>
          </div>
          <label className="Form--Label">
            <input
              className="Form--Input Form--InputText"
              type="email"
              placeholder="Email"
              name="emailAddress"
              required
              onInput={this.onInput}
            />
            <span>Email address</span>
          </label>
          <label className="Form--Label">
            <input
              className="Form--Input Form--InputText"
              type="text"
              placeholder="Phone"
              name="phone"
              onInput={this.onInput}
            />
            <span>Phone number</span>
          </label>
          <label className="Form--Label">
            <textarea
              className="Form--Input Form--Textarea Form--InputText"
              placeholder="Message"
              name="message"
              rows="10"
              required
              onInput={this.onInput}
            />
            <span>Message</span>
          </label>
          <div
            className="g-recaptcha"
            data-sitekey="6LfKA78UAAAAANwNt2Juwl5QKg6GTDH8qrHeUfPf"
          />
          {!!subject && <input type="hidden" name="subject" value={subject} />}
          <input type="hidden" name="form-name" value={name} />
          <input
            className="Button Form--SubmitButton"
            type="submit"
            value="Send Inquiry"
            disabled={this.state.disabled}
          />
        </form>
      </Fragment>
    )
  }
}

export default Form
