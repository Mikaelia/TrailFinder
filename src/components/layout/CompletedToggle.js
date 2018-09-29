import React, { Component } from 'react'

class CompletedToggle extends Component {
  constructor (props) {
    super(props)

    this.state = {
      completed: false
    }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    this.setState({ completed: !this.state.completed })
  }

  render () {
    const { completed } = this.state
    console.log({ completed })
    return (
      <button onClick={this.handleClick}>
        {this.state.completed
          ? <span className='text-success'>
            <i className='fas fa-check' /> COMPLETED
            </span>
          : <span className='text-danger'>
            <i className='fas fa-times' /> NOT COMPLETED
            </span>}

      </button>
    )
  }
}

export default CompletedToggle
