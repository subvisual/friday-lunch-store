/* eslint-disable import/no-webpack-loader-syntax, import/no-unresolved */
import React, { Component } from 'react'

import arc1 from './arc1.svg'
import arc2 from './arc2.svg'

import './index.css'

class Arcs extends Component {
  render() {
    return (
      <div className="Arcs-root">
        <img src={arc1} alt="" className="Arcs-arc1" />
        <img src={arc2} alt="" className="Arcs-arc2" />
      </div>
    )
  }
}

export default Arcs
