import React from "react"

const PizzaForm = (props) =>
{
 
  const {topping,size,vegetarian} = props.pizza
  return(
    <div className="form-row">
      <div className="col-5">
          <input  name="topping"
                  type="text" className="form-control" 
                  placeholder="Pizza Topping" value={topping}
                  onChange={props.formHandler}
                  />
      </div>
      <div className="col">
        <select name="size"
                value={size} className="form-control" 
                onChange={props.formHandler}
        >
          <option value="Small">Small</option>
          <option value="Medium">Medium</option>
          <option value="Large">Large</option>
        </select>
      </div>
      <div className="col">
        <div className="form-check" >
          <input  className="form-check-input" onClick={props.formHandler} 
                  type="radio" value="Vegetarian" 
                  checked={vegetarian} 
                  name="vegetarian"
                  />
          <label className="form-check-label">
            Vegetarian
          </label>
        </div>
      </div>
      <div className="col">
        <button type="submit" className="btn btn-success" onClick={() => props.submitHandler()}>Submit</button>
      </div>
    </div>
  )
  
}

export default PizzaForm
