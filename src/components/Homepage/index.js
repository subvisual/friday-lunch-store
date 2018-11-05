import React from 'react'

import ImgDrink from './drink.png'

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
    callApi('.netlify/functions/createOrder', {
      quantity: this.state.quantity,
    })
      .then(response => response.json())
      .then(response => {
        window.location.href = response.url
      })
      .catch(error => console.log(error))
  }

  render() {
    return (
      <div className="root">
        <div className="title">Let’s get your drink!</div>
        <p className="description">
          Our team will guide you through the first steps of UTRUST payments...
        </p>
        <div className="row">
          <div className="column">
            <div style={{ maxWidth: '100%', marginBottom: '1.45rem' }}>
              <img className="image" src={ImgDrink} alt="UDrink" />
            </div>
          </div>
          <div className="column">
            <div className="subtitle">UDrink</div>
            <p className="description">Gin & Tonic</p>
            <p className="price">€ 5.00</p>
            <p>Quantity: {this.state.quantity}</p>
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
