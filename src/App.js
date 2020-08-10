import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'

const pizzaURL = 'http://localhost:3000/pizzas/'

const DEFAULT_FORM = {
      id: null,
      topping: '',
      size: 'Medium',
      vegetarian: false
    }

class App extends Component {
  state = {
    pizzaList: [],
    editPizza: DEFAULT_FORM
  }

  updateCurrentPizza = () => {
    let { editPizza } = this.state
    // make a patch request
    const patchRequest = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json'
      },
      body: JSON.stringify( editPizza )
    }

    if ( editPizza.id !== null ) {
      fetch(pizzaURL + editPizza.id, patchRequest)
        .then( resp => resp.json() )
        .then( pizza => this.updateCurrentPizzaList( pizza ))
    }
  }

  // update current pizzaList
  updateCurrentPizzaList = pizza => {
    let updatedPizzaList = this.state.pizzaList.map( p => {
      if (p.id === pizza.id){
        p = pizza
        return p
      } else return p
    })

    this.setState({ 
      pizzaList: updatedPizzaList,
      editPizza: DEFAULT_FORM
      })
  }

  fillEditForm = pizza => {
    let { id, topping, size, vegetarian } = pizza
    this.setState({
      editPizza: {
        id,
        topping,
        size,
        vegetarian
      }
    })
  }

  toggelVegetarian = () => {
    this.setState({ editPizza: {
      ...this.state.editPizza,
      vegetarian: !this.state.editPizza.vegetarian
    }})
  }

  updateEditPizza = event => {
    let { name, value } = event.target
    this.setState({ editPizza: {
      ...this.state.editPizza,
      [name]: value
    }})
  }

  render() {
    return (
      <Fragment>
        <Header/>
        <PizzaForm
          editPizza={this.state.editPizza}
          updateEditPizza={this.updateEditPizza}
          toggelVegetarian={this.toggelVegetarian}
          updateCurrentPizza={this.updateCurrentPizza}
        />
        <PizzaList
          pizzaList={this.state.pizzaList}
          fillEditForm={this.fillEditForm}
        />
      </Fragment>
    )
  }
  
  componentDidMount() {
    fetch(pizzaURL)
      .then( resp => resp.json() )
      .then( pizzaList => this.setState({ pizzaList }))
  }
}

export default App
