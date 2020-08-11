import React from "react"

const Pizza = (props) => {
  const {size, topping, vegetarian, id} = props.pizza;
  return(
    <tr>
      <td>{topping}</td>
      <td>{size}</td>
      <td>{vegetarian ? "Yes" : "No"}</td>
      <td><button type="button" onClick={() => props.onChange(id)}className="btn btn-primary">Edit Pizza</button></td>
    </tr>
  )
}

export default Pizza
