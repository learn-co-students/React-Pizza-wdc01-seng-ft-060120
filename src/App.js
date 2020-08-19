import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'

const url = 'http://localhost:3000/pizzas/'

class App extends Component {
  constructor() {
    super()
  
    this.state = {
       pizzas: [],
       topping: '',
       size: '',
       
       
    }
  }
  
  componentDidMount(){
    fetch(url)
    .then( res => res.json() )
    .then( pizzas => this.setState({
      pizzas
    }))
  }

  handleEdit = (pizza) => {
    this.setState({
      topping: pizza.topping,
      size: pizza.size,
      vegetarian: pizza.vegetarian,
      id: pizza.id
    })
  }

  handleTopping = (e) => {
   this.setState({
     topping: e.value
   })
   }
  
   handleSize = (e) => {
    this.setState({
      size: e.value
    })
    } 

    handleVegetarian = (e) => {
      this.setState({
        vegetarian: e.value === "Vegetarian" ? true : false
      })
    }

    

    handleSubmit = (e) => {
      e.preventDefault()
      fetch( url + this.state.id, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json"
        }, body: JSON.stringify({
          topping: this.state.topping,
          size: this.state.size,
          vegetarian: this.state.vegetarian
        })
      } )
      .then( res => res.json() )
      .then( data => this.setState({
        pizzas: this.state.pizzas.map( (pizza) => {
          if (pizza.id === data.id) {
            return data 
          }
          return pizza
        })
      }))
    
     }

  

  render() {
    return (
      <Fragment>
        <Header/>
        <PizzaForm
        topping={this.state.topping}
        size={this.state.size}
        vegetarian={this.state.vegetarian}
        handleTopping={this.handleTopping}
        handleSize={this.handleSize}
        handleVegetarian={this.handleVegetarian}
        handleSubmit={this.handleSubmit}
        />
        <PizzaList 
        pizzas={this.state.pizzas} 
        handleEdit={this.handleEdit}/>
      </Fragment>
    );
  }
}

export default App;
