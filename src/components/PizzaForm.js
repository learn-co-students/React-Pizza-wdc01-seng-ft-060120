import React from "react"

const PizzaForm = (props) => {
  return(
      <div className="form-row">
        <div className="col-5">
            <input onChange={(e) => props.handleTopping(e.target)} type="text" className="form-control" placeholder="Pizza Topping" value={
                //Pizza Topping Should Go Here
                props.topping
              }/>
        </div>
        <div className="col">
          <select onChange={(e) => props.handleSize(e.target)} value={props.size} className="form-control">
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </div>
        <div className="col">
          <div className="form-check">
            <input onChange={(e) => props.handleVegetarian(e.target)} className="form-check-input" type="radio" value="Vegetarian" checked={props.vegetarian}/>
            <label className="form-check-label">
              Vegetarian
            </label>
          </div>
          <div className="form-check">
            <input onChange={(e) => props.handleVegetarian(e.target)} className="form-check-input" type="radio" value="Not Vegetarian" checked={!props.vegetarian}/>
            <label className="form-check-label">
              Not Vegetarian
            </label>
          </div>
        </div>
        <div className="col">
          <button type="submit" className="btn btn-success" onClick={(e) => props.handleSubmit(e)}>Submit</button>
        </div>
      </div>

  )
}

export default PizzaForm
