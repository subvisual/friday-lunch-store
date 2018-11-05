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

    if (num == -1 && quantity == 1) return
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
      <div className="root">
        <img className="logo" src={logo} alt="logo" />
        <div className="row">
          <div className="column">
            <div className="title">Let’s get your drink!</div>
            <p className="description">
              Our team will guide you through the first steps of{' '}
              <span className="smallCaps">UTRUST</span>
              payments...
            </p>
          </div>
          <div className="column" />
        </div>
        <div className="row">
          <div className="column">
            <div>
              <img className="image" src={imgDrink} alt="UDrink" />
            </div>
          </div>
          <div className="column">
            <div className="subtitle">UDrink</div>
            <p className="description">Gin & Tonic</p>
            <p className="price">€ 5.00</p>
            <p>Quantity: {this.state.quantity}</p>
            <p>
              <button
                className="buttonLess"
                onClick={() => this.handleQuantity(-1)}
              >
                -
              </button>
              <button
                className="buttonMore"
                onClick={() => this.handleQuantity(+1)}
              >
                +
              </button>
            </p>
            <button className="buttonPay" onClick={this.handlePay}>
              Pay with UTRUST
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default Homepage
