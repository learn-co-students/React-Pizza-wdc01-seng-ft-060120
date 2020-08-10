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
            this.generatePizzas()
          }
        </tbody>
      </table>
    );
  }

  generatePizzas = () =>
  {
    return this.props.pizzas.map(this.pizzaMap)
  }

  pizzaMap = (pizza) =>
  {
    return <Pizza key={pizza.id} onEdit={this.props.onEdit} pizza={pizza} />
  }

}

export default PizzaList;
