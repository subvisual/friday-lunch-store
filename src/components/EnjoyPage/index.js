import React from 'react'

import imgGatsby from './gatsby-cheers.gif'

import './index.css'

class EnjoyPage extends React.Component {
  render() {
    return (
      <div className="EnjoyPage-root">
        <div className="EnjoyPage-row">
          <div className="EnjoyPage-column">
            <div className="EnjoyPage-title">Enjoy your drink!</div>
            <p className="EnjoyPage-description">
              Our team will guide you through the first steps of{' '}
              <span className="smallCaps">UTRUST</span> payments...
            </p>
          </div>
          <div className="EnjoyPage-column" />
        </div>
        <div className="EnjoyPage-row">
          <div className="EnjoyPage-column">
            <img className="EnjoyPage-image" src={imgGatsby} alt="UDrink" />
          </div>
        </div>
        <div className="EnjoyPage-row">
          <div className="EnjoyPage-column">
            <button className="EnjoyPage-buttonPay">Buy more</button>
          </div>
        </div>
      </div>
    )
  }
}

export default EnjoyPage
