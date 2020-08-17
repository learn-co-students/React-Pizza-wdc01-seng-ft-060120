import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'

const url = "http://localhost:3000/pizzas/"
class App extends Component {
  constructor(){
    super()
      this.state = {
        pizzas: [],
        displayPizza: {
          id: null,
          topping: " ",
          size: 'Small',
          vegetarian: undefined
        }
      }
    
  }

  componentDidMount(){
    fetch(url)
    .then(resp => resp.json())
    .then(pizzaData => {
      this.setState( {
        pizzas: pizzaData
      }
      )
    })
  }

  handleClick = (pizza) =>{
    this.setState({
      displayPizza: pizza
    })
  }
  handleToppingChange = (e) => {
    this.setState({
      displayPizza:{...this.state.displayPizza, topping: e.target.value}
    })
  }
  handleSizeChange = (e) => {
    
    this.setState({
      displayPizza:{...this.state.displayPizza, size: e.target.value}
    })
  }
  handleVegetarianChange = (e) => {
      // console.log("Vegetarian")
    this.setState({
      displayPizza:{...this.state.displayPizza, vegetarian: e.target.value=== "Vegetarian" ? true : false}
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    let newPizzas = [...this.state.pizzas]
    fetch(`${url}${this.state.displayPizza.id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(this.state.displayPizza)
    })
    .then(resp => resp.json())
    .then(pizzaData => {
      this.setState({
        pizzas: newPizzas.map(pizza => {
          if(pizza.id === pizzaData.id){
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
        <PizzaForm pizza = {this.state.displayPizza}
          handleToppingChange = {this.handleToppingChange}
          handleSizeChange = {this.handleSizeChange}
          handleVegetarianChange = {this.handleVegetarianChange}
          handleSubmit = {this.handleSubmit}
        
        />
        <PizzaList pizzas = {this.state.pizzas}
          handleClick = {this.handleClick}
        />
      </Fragment>
    );
  }
}

export default App;
