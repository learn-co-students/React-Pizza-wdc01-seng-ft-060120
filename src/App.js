import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'

const URL = "http://localhost:3000/pizzas/"



class App extends Component {

  state = {
    pizzas: [],
    current: 
    {
      id: "",
      topping: "",
      size: "",
      vegetarian: null
    }
  }

  render() {
    return (
      <Fragment>
        <Header/>
        {!this.state.current.id ? null : <PizzaForm pizza={this.state.current} submitHandler={this.submitHandler}
                   formHandler={this.formHandler}
        />}
        <PizzaList pizzas={this.state.pizzas} onEdit={this.editHandler}/>
      </Fragment>
    );
  }

  formHandler = (e) =>
  {
    const tgt = e.target
    const current = {...this.state.current}
    if(tgt.name === "topping" || tgt.name === "size" )
      current[tgt.name] = tgt.value;    
    else if (e.target.name === 'vegetarian')
      current.vegetarian = !current.vegetarian

    this.setState({current})
  }

  updatePizza = (newPizza) =>
  {
    const newPizzas = this.state.pizzas.map((pizza) => {
      if(pizza.id === newPizza.id)
        return newPizza
      return pizza
    })
    this.setState({pizzas: newPizzas})
  }

  submitHandler = () =>
  {
    const pizzaData = this.state.current
    fetch(URL + pizzaData.id,this.patchConfig(pizzaData))
    .then(r => r.json())
    .then((pizza) => this.updatePizza(pizza))
  }

  patchConfig = (data) =>
  {
    return {
      method: "PATCH",
      headers:
      {
        "Content-Type": "application/json",
        "accept": "application/json"
      },
      body: JSON.stringify(data)
    }
  }

  findPizza = (id) =>
  {
    const {pizzas} = this.state
    
    return pizzas.find(pizza => id === pizza.id)
  }

  editHandler = (id) =>
  {
    this.setState({current: this.findPizza(id)})
  }

  setPizzas = (pizzas) =>
  {
    this.setState({pizzas})
  }

  componentDidMount()
  {
    fetch(URL)
    .then(r => r.json())
    .then(json => this.setPizzas(json))
  }
}

export default App;
