import React from 'react'
import Link from 'gatsby-link'

import imgGatsby from './gatsby-cheers.gif'

import './index.css'

class Enjoy extends React.Component {
  render() {
    return (
      <div className="Enjoy-root">
        <div className="Enjoy-row">
          <div className="Enjoy-column">
            <div className="Enjoy-title">Enjoy your drink!</div>
            <p className="Enjoy-description">
              Cheers to the future of online payments!
            </p>
          </div>
          <div className="Enjoy-column" />
        </div>
        <div className="Enjoy-row">
          <div className="Enjoy-column">
            <img className="Enjoy-image" src={imgGatsby} alt="UDrink" />
          </div>
        </div>
        <div className="Enjoy-row">
          <div className="Enjoy-column">
            <Link to="/">
              <button className="Enjoy-buttonPay">Buy more</button>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default Enjoy
