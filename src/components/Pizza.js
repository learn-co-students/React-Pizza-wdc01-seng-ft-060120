import React from "react"

const Pizza = (props) => {
  const {size,topping,vegetarian,id} = props.pizza
  return(
    <tr>
      <td>{topping}</td>
      <td>{size}</td>
      <td>{vegetarian ? "Yes" : "No"}</td>
      <td>
        <button type="button" 
                className="btn btn-primary"
                onClick={() => props.onEdit(id)}>
                Edit Pizza</button>
      </td>
    </tr>
  )
}

export default Pizza
