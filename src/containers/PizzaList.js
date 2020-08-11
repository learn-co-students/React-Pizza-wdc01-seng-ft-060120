import React, { Component } from 'react';
import Pizza from '../components/Pizza'
class PizzaList extends Component {
  render() {
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Topping</th>
            <th scope="col">Size</th>
            <th scope="col">Vegetarian?</th>
            <th scope="col">Edit</th>
          </tr>
        </thead>
        <tbody>
          {
            this.renderPizzas()
          }
        </tbody>
      </table>
    );
  }
  
  renderPizzas = () => {
    return this.props.pizzas.map((pizza, key) => <Pizza onChange={this.props.onChange} key={pizza.id} pizza={pizza}/>)
  }
}

export default PizzaList;
