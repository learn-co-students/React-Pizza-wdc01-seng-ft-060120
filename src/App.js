import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'

class App extends Component {

  state = {
    pizzas: [],
    editPizza: {}
  }

  componentDidMount() {
    fetch('http://localhost:3000/pizzas')
    .then(response => response.json())
    .then(pizzaData => this.setState({pizzas: pizzaData}))
    .catch(error => alert(error))
  }

  addPizzaToEditPizzaState = (pizza) => {
    this.setState({editPizza: pizza})
  }

  updatePizzaState = (pizza) => {
    this.setState({
      pizzas: this.state.pizzas.map((p) => {
        if (p.id === pizza.id) {
          return pizza
        }
        return p
      })
    })
  }

  updatePizza = (event) => {
    event.preventDefault();
    
    const options = {
      method: 'PATCH',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json'
      },
      body: JSON.stringify(this.state.editPizza)
    }

    fetch(`http://localhost:3000/pizzas/${this.state.editPizza.id}`, options)
    .then(response => response.json())
    .then(pizzaData => this.updatePizzaState(pizzaData))
  }

  changeVegetarian = () => {
    this.setState({
      editPizza: {...this.state.editPizza, vegetarian: !this.state.editPizza.vegetarian}
    })
  }

  changeSize = (value) => {
    this.setState({
      editPizza: {...this.state.editPizza, size: value}
    })
  }

  changeTopping = (value) => {
    this.setState({
      editPizza: {...this.state.editPizza, topping: value}
    })
  }

  render() {
    return (
      <Fragment>
        <Header/>
        <PizzaForm 
          editPizza={this.state.editPizza} 
          updatePizza={this.updatePizza}
          changeVegetarian={this.changeVegetarian}
          changeSize={this.changeSize}
          changeTopping={this.changeTopping}
        />
        <PizzaList 
          pizzas={this.state.pizzas} 
          addPizzaToEditPizzaState={this.addPizzaToEditPizzaState} 
        />
      </Fragment>
    );
  }
}

export default App;
