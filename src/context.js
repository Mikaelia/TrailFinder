import React, { Component } from 'react'

const Context = React.createContext()

const reducer = (state, action) => {
  switch (action.type) {
    case 'DELETE_CONTACT':
      return {
        ...state,
        contacts: state.contacts.filter(
          contact => contact.id !== action.payload
        )
      }

    case 'ADD_CONTACT':
      return {
        ...state,
        contacts: [action.payload, ...state.contacts]
      }

    default:
      return state
  }
}

export class Provider extends Component {
  state = {
    contacts: [
      {
        id: 1,
        name: 'John Doe',
        email: 'mikaela@gmail.com',
        phone: '222-222-2222'
      },
      {
        id: 2,
        name: 'Bob Bob',
        email: 'bob@gmail.com',
        phone: '222-222-2222'
      },
      {
        id: 3,
        name: 'Blow Mo',
        email: 'joe@gmail.com',
        phone: '222-222-2222'
      }
    ],
    dispatch: action => this.setState(state => reducer(state, action))
  }

  render () {
    const codename = 'mikaela'
    return (
      // pass in anything that we want to be available throughout our app
      // here, can pass in state from anywhere that we want to consume it
      (
        <Context.Provider value={this.state}>
          {this.props.children}
        </Context.Provider>
      )
    )
  }
}

// use consumer within any component that we want to access the state from
export const Consumer = Context.Consumer
