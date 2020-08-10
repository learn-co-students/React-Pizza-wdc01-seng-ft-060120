import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'

const BASEURL = "http://localhost:3000/pizzas/"

class App extends Component {
  state = {
    pizzas: [],
    pizza: {
      topping: "",
      size: "Small",
      vegetarian: undefined,
      id: undefined,
    }
  }

  componentDidMount(){
    fetch(BASEURL)
    .then(resp => resp.json())
    .then(pizzas => {
      this.setState({
        pizzas
      })
    })
  }

  populateForm = (pizza) => {
    this.setState({
      pizza
    })
  }

  handleTopping = (topping) => {
    let pizza = {...this.state.pizza, topping}
    this.setState({
      pizza
    })
  }

  handleSize = (size) => {
    let pizza = {...this.state.pizza, size}
    this.setState({
      pizza
    })
  }

  makeVeg = () => {
    let pizza = {...this.state.pizza, vegetarian: true}
    this.setState({
      pizza
    })
  }

  makeNotVeg = () => {
    let pizza = {...this.state.pizza, vegetarian: false}
    this.setState({
      pizza
    })
  }

  makePizza = (e) => {
    e.preventDefault()
    if (this.state.pizza.id) {
      let url = `${BASEURL}${this.state.pizza.id}`
      let newPizzas = [...this.state.pizzas]
      let pizzaConfig = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(this.state.pizza)
      }
      fetch(url, pizzaConfig)
      .then(resp => resp.json())
      .then(pizza => {
        this.setState({
          pizzas: newPizzas.map(oldPizza => {
            if(oldPizza.id === pizza.id){
              return pizza
            }
            else{
              return oldPizza
            }
          })
        })
      })
    }
    else{
      alert("You didn't select a Pizza to Edit, dummy!")
    }
  }



  render() {
    return (
      <Fragment>
        <Header/>
        <PizzaForm
          pizza={this.state.pizza}
          handleTopping={this.handleTopping}
          handleSize={this.handleSize}
          makeVeg={this.makeVeg}
          makeNotVeg={this.makeNotVeg}
          makePizza={this.makePizza}
        />
        <PizzaList pizzas={this.state.pizzas} populateForm={this.populateForm}/>
      </Fragment>
    );
  }
}

export default App;
