import React from 'react'

import logo from './logo.png'
import imgDrink from './drink.png'

import './index.css'

const UTRUST_API =
  process.env.NODE_ENV === 'development' ? 'http://localhost:9000/' : '/'

const callApi = (endpoint, data) =>
  fetch(UTRUST_API + endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
  })

class Homepage extends React.Component {
  state = {
    quantity: 1,
  }

  handleQuantity = num => {
    const { quantity } = this.state

    if (num === -1 && quantity === 1) return
    this.setState({ quantity: quantity + num })
  }

  handlePay = () => {
    const quantity = this.state.quantity

    callApi('.netlify/functions/createOrder?quantity=' + quantity)
      .then(response => response.json())
      .then(response => {
        window.location.href = response.url
      })
      .catch(error => console.log(error))
  }

  render() {
    return (
      <div className="Homepage-root">
        <img className="Homepage-logo" src={logo} alt="logo" />
        <div className="Homepage-row">
          <div className="Homepage-column">
            <div className="Homepage-title">Let’s get your drink!</div>
            <p className="Homepage-description">
              Our team will guide you through the first steps of{' '}
              <span className="Homepage-smallCaps">UTRUST</span>
              payments...
            </p>
          </div>
          <div className="Homepage-column" />
        </div>
        <div className="Homepage-row">
          <div className="Homepage-column">
            <div>
              <img className="Homepage-image" src={imgDrink} alt="UDrink" />
            </div>
          </div>
          <div className="Homepage-column">
            <div className="Homepage-subtitle">UDrink</div>
            <p className="Homepage-description">Gin & Tonic</p>
            <p className="Homepage-price">€ 5.00</p>
            <p>Quantity: {this.state.quantity}</p>
            <p>
              <button
                className="Homepage-buttonLess"
                onClick={() => this.handleQuantity(-1)}
              >
                -
              </button>
              <button
                className="Homepage-buttonMore"
                onClick={() => this.handleQuantity(+1)}
              >
                +
              </button>
            </p>
            <button className="Homepage-buttonPay" onClick={this.handlePay}>
              Pay with UTRUST
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default Homepage
