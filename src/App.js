import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'

const url = "http://localhost:3000/pizzas";

class App extends Component {
  state = {
    pizzas: [],
    currentPizza: {}
  }

  componentDidMount(){
    fetch(url)
    .then(resp => resp.json())
    .then(pizzas => 
      this.setState({
        pizzas
      }))
  }

  changeState = (id) => {
    //console.log(ID);
    const pizza = this.state.pizzas.find(pizza => pizza.id === id);
    this.setState({
      currentPizza: pizza
    })
  }

  editPizza = (pizza) => {
    this.setState({
      currentPizza: pizza
    });
  }
    
  handlePizzaToppingChange = (e) => {
    this.setState({
      currentPizza: {
        ...this.state.currentPizza,
        topping: e.target.value
      }
    });
  }

  handlePizzaSizeChange = (e) => {
    this.setState({
      currentPizza: {
        ...this.state.currentPizza,
        size: e.target.value
      }
    });
  }

  handleVegetarianChange = (e) => {
    this.setState({
      currentPizza: {
        ...this.state.currentPizza,
        vegetarian: e.target.value === 'Vegetarian' ? true : false
      }
    });
  }

  handleSubmit = (id) => {
    let updatedPizza = {...this.state.currentPizza};

    fetch(`http://localhost:3000/pizzas/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(updatedPizza)
    })
    .then(resp => resp.json())
    .then(newPizzaData => this.setState({
      pizzas: this.state.pizzas.map(pizza => {
        if (pizza.id === id) {
          pizza = newPizzaData
        }
        return pizza;
      })
    }))
  }

  render() {
    return (
      <div>
        <Header/>
        {this.state.currentPizza ? <PizzaForm 
        currentPizza={this.state.currentPizza}
        handlePizzaSizeChange={this.handlePizzaSizeChange} 
        handlePizzaToppingChange={this.handlePizzaToppingChange} 
        handleVegetarianChange={this.handleVegetarianChange} 
        handleSubmit={this.handleSubmit}/> 
        : null }
        <PizzaList pizzas={this.state.pizzas} onChange={this.changeState}/>
      </div>
    );
  }
}

export default App;
