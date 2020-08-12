import React from "react"

const PizzaForm = (props) => {
  const {id, topping, size, vegetarian} = props.form
  return(
      <div className="form-row">
        <div className="col-5">
            <input type="text" name="topping" className="form-control" placeholder="Pizza Topping" 
            value={topping}
            onChange={(e) => props.handleInput(e)}
            />
        </div>
        <div className="col">
          <select  name="size" onChange={(e) => props.handleInput(e)} className="form-control">
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </div>
        <div className="col">
          <div className="form-check">
            <input className="form-check-input" name="vegetarian" onChange={(e) => props.handleInput(e)} type="radio" value={true} 
            checked={vegetarian}
            />
            <label className="form-check-label">
              Vegetarian
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" name="vegetarian" onChange={(e) => props.handleInput(e)} type="radio" value={false} 
            checked={!vegetarian}
            />
            <label className="form-check-label">
              Not Vegetarian
            </label>
          </div>
        </div>
        <div className="col">
          <button type="submit" className="btn btn-success" onClick={() => props.handleSubmit(id)}>Submit</button>
        </div>
      </div>

  )
}

export default PizzaForm
