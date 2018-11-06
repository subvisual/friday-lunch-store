import React from 'react'

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
              Our team will guide you through the first steps of{' '}
              <span className="smallCaps">UTRUST</span> payments...
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
            <button className="Enjoy-buttonPay">Buy more</button>
          </div>
        </div>
      </div>
    )
  }
}

export default Enjoy
