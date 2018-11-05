import React from 'react'

import ImgDrink from './drink.png'

import './index.css'

const UTRUST_API =
  process.env.NODE_ENV === 'development' ? 'http://localhost:9000/' : '/'

class Homepage extends React.Component {
  handleClick = () => {
    const url = fetch(UTRUST_API + '.netlify/functions/createOrder', {
      method: 'POST',
      body: JSON.stringify({ quantity: 1 }),
    })
      .then(response => response.json())
      .then(response => {
        console.log('response:', response)

        window.location.href = response.url
        return response
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
        <div style={{ maxWidth: '100%', marginBottom: '1.45rem' }}>
          <img className="image" src={ImgDrink} alt="UDrink" />
        </div>
        <div className="subtitle">UDrink</div>
        <p className="description">Gin & Tonic</p>
        <p className="price">€ 5.00</p>
        <button className="buttonPay" onClick={this.handleClick}>
          Pay with UTRUST
        </button>
      </div>
    )
  }
}

export default Homepage
