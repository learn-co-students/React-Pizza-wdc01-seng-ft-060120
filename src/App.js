import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'
class App extends Component {

  state = {
    pizzas: [],
    pizza: {
      topping: '',
      size: "Small",
      vegetarian: undefined,
      id: undefined
    }
  }

  componentDidMount() {
    fetch('http://localhost:3000/pizzas')
    .then(resp => resp.json())
    .then(pizzas => this.setState({pizzas: pizzas}))
  }

  editPizza = (pizza) => {
    this.setState({pizza: pizza})
  }

  handleSize = (newSize) => {
    let pizza = {...this.state.pizza, size: newSize}
    this.setState({pizza})
  }

  handleTopping = (newTopping) => {
    let pizza = {...this.state.pizza, topping: newTopping}
    this.setState({pizza})
  }

  changeVegetarian = () => {
    this.setState({...this.state.pizza, vegetarian: !this.state.pizza.vegetarian})
  }

  makePizza = (e) => {
    e.preventDefault()

    let newPizzas = [...this.state.pizzas]

    const options = {
      method: "PATCH",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify(this.state.pizza)
    }

    fetch(`http://localhost:3000/pizzas/${this.state.pizza.id}`, options)
    .then(resp => resp.json())
    .then(pizzaData => {
      this.setState({
        pizzas: newPizzas.map(pizza => {
          if(pizza.id === pizzaData.id) {
            return pizzaData
          } else {
            return pizza
          }
        })
      })
    })
  }

  render() {
    return (
      <Fragment>
        <Header/>
        <PizzaForm 
          pizza={this.state.pizza} 
          handleSize={this.handleSize}
          handleTopping={this.handleTopping}
          changeVegetarian={this.changeVegetarian}
          makePizza ={this.makePizza}
        />
        <PizzaList pizzas={this.state.pizzas} editPizza={this.editPizza} />
      </Fragment>
    );
  }
}

export default App;
