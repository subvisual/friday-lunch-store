import React from 'react'

import Quantity from '../Quantity'

import imgDrink from './drink.png'

import './index.css'

const UTRUST_API =
  process.env.NODE_ENV === 'development' ? 'http://localhost:9000/' : '/'

const callApi = (endpoint, data) =>
  fetch(UTRUST_API + endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
  })

class Home extends React.Component {
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
      <div className="Home-root">
        <div className="Home-row">
          <div className="Home-column">
            <div className="Home-title">Let’s get your drink!</div>
            <p className="Home-description">
              Our team will guide you through the first steps of{' '}
              <span className="smallCaps">UTRUST</span> payments...
            </p>
          </div>
          <div className="Home-column" />
        </div>
        <div className="Home-row">
          <div className="Home-column">
            <div>
              <img className="Home-image" src={imgDrink} alt="UDrink" />
            </div>
          </div>
          <div className="Home-column">
            <div className="Home-subtitle">UDrink</div>
            <p className="Home-description">Gin & Tonic</p>
            <p className="Home-price">€ 5.00</p>
            <Quantity
              quantity={this.state.quantity}
              onHandleQuantity={this.handleQuantity}
            />
            <button className="Home-buttonPay" onClick={this.handlePay}>
              Pay with <span className="smallCaps">UTRUST</span>
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default Home
