import React, { Component } from 'react'

import './index.css'

const LINK = 'link'
const BUTTON = 'button'

export default class Button extends Component {
  get role() {
    return this.props.href ? LINK : BUTTON
  }

  renderLoading() {
    return <button className="Button Button-isLoading" />
  }

  renderButton() {
    if (this.props.loading) return this.renderLoading()

    return (
      <button onClick={this.props.onClick} className="Button">
        {this.props.children}
      </button>
    )
  }

  renderLink() {
    return (
      <a href={this.props.href} onClick={this.props.onClick} className="Button">
        {this.props.children}
      </a>
    )
  }

  render() {
    return this.role === LINK ? this.renderLink() : this.renderButton()
  }
}
