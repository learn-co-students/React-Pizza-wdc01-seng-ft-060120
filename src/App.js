import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'
class App extends Component {
  constructor() {
    super()
    this.state = {
      pizzas: [],
      form: {
        topping: "",
        size: "Small",
        vegetarian: false
      }
    }
  }
  componentDidMount() {
    fetch("http://localhost:3000/pizzas")
    .then(r => r.json())
    .then(pizzas => this.setState({ pizzas: pizzas }))
  }
  render() {
    return (
      <Fragment>
        <Header/>
        <PizzaForm handleInput={this.handleInput} handleSubmit={this.handleSubmit} form={this.state.form} />
        <PizzaList handleEdit={this.handleEdit} pizzas={this.state.pizzas} />
      </Fragment>
    );
  }

  handleInput = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    })
  } 

  handleEdit = (pizza) => {
    this.setState({
      form: pizza
    })
  }

  handleSubmit = (id) => {
    let request;
    if(id) {
      request = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(this.state.form)
      }
    } else {
      request = { 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(this.state.form)
      }
    }
    fetch(`http://localhost:3000/pizzas/${id ? id : ""}`, request)
    .then(r => r.json())
    .then(pizza => this.handleResponse(pizza))
  }
  handleResponse = (returnedPizza) => {
    const newPizzas = this.state.pizzas.map(pizza => 
      pizza.id === returnedPizza.id ? returnedPizza: pizza)
      newPizzas.includes(returnedPizza) ? null : newPizzas.push(returnedPizza)
      this.setState({
        pizzas: newPizzas,
        form: {topping: "", size: "", vegetarian: false }
      })
  }
}

export default App;
