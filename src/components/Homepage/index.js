import React from 'react'

import imgDrink from './drink.png'

import './index.css'

const UTRUST_API =
  process.env.NODE_ENV === 'development' ? 'http://localhost:9000/' : '/'

const callApi = (endpoint, data) =>
  fetch(UTRUST_API + endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
  })

class HomePage extends React.Component {
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
      <div className="HomePage-root">
        <div className="HomePage-row">
          <div className="HomePage-column">
            <div className="HomePage-title">Let’s get your drink!</div>
            <p className="HomePage-description">
              Our team will guide you through the first steps of{' '}
              <span className="smallCaps">UTRUST</span> payments...
            </p>
          </div>
          <div className="HomePage-column" />
        </div>
        <div className="HomePage-row">
          <div className="HomePage-column">
            <div>
              <img className="HomePage-image" src={imgDrink} alt="UDrink" />
            </div>
          </div>
          <div className="HomePage-column">
            <div className="HomePage-subtitle">UDrink</div>
            <p className="HomePage-description">Gin & Tonic</p>
            <p className="HomePage-price">€ 5.00</p>
            <p>Quantity: {this.state.quantity}</p>
            <p>
              <button
                className="HomePage-buttonLess"
                onClick={() => this.handleQuantity(-1)}
              >
                -
              </button>
              <button
                className="HomePage-buttonMore"
                onClick={() => this.handleQuantity(+1)}
              >
                +
              </button>
            </p>
            <button className="HomePage-buttonPay" onClick={this.handlePay}>
              Pay with <span className="smallCaps">UTRUST</span>
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default HomePage
