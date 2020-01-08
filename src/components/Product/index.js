import React from 'react'

import Button from '../Button'

import leftArrow from './left-arrow.svg'

import './index.css'

const CURRENCY = 'EUR'
const QUANTITY = '1'

const UTRUST_API =
  process.env.NODE_ENV === 'development' ? 'http://localhost:9000/' : '/'

const callApi = (endpoint, data) =>
  fetch(UTRUST_API + endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
  })

class Product extends React.Component {
  state = {
    loading: false,
  }

  handlePay = () => {
    if (this.state.email === '' || this.state.email === undefined) {
      alert('Please input your email address')
      return
    }

    this.setState({ loading: true }, () => {
      const host_url = this.props.location.href
      const cancel_url = host_url
      const return_url = host_url

      callApi(
        `.netlify/functions/createOrder?&currency=${CURRENCY}&quantity=${QUANTITY}&email=${this.props.email}&name=${this.props.name}&price=${this.props.price}&cancel_url=${cancel_url}&return_url=${return_url}`
      )
        .then(response => response.json())
        .then(response => {
          window.location.href = response.url
        })
        .catch(error => console.log(error))
    })
  }

  handleEmailChange = event => {
    this.setState({ email: event.target.value })
  }

  render() {
    const { name, description, image, price } = this.props

    return (
      <div className="Product-root">
        <div className="Product-row">
          <a href="/" className="Product-backButton">
            <img
              className="Product-backButtonIcon"
              alt="Back Arrow"
              src={leftArrow}
            />
            Back
          </a>
        </div>
        <div className="Product-row">
          <div className="Product-column">
            <div>
              <img className="Product-image" src={image} alt="Product" />
            </div>
          </div>
          <div className="Product-column">
            <div className="Product-subtitle">{name}</div>
            <p className="Product-description">{description}</p>
            <p className="Product-price">{`€ ${price}`}</p>
            <input
              className="Product-email"
              type="text"
              name="email"
              placeholder="your email"
              onChange={this.handleEmailChange}
            />
            <Button loading={this.state.loading} onClick={this.handlePay}>
              Pay with <span className="smallCaps">UTRUST</span>
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

export default Product
