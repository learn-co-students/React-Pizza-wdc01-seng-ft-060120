import React from "react"

const PizzaForm = ({ editPizza, updateEditPizza, toggelVegetarian, updateCurrentPizza }) => {
  return(
      <div className="form-row">
        <div className="col-5">
            <input
              type="text"
              className="form-control"
              placeholder="Pizza Topping"
              value={ editPizza.topping }
              name="topping"
              onChange={ event => updateEditPizza( event )}
            />
        </div>
        <div className="col">
          <select value={editPizza.size} onChange={ event => updateEditPizza( event )} name='size' className="form-control">
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </div>
        <div className="col">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name='vegetarian'
              checked={ editPizza.vegetarian }
              onChange={ toggelVegetarian }
            />
            <label className="form-check-label">
              Vegetarian
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              value="Not Vegetarian"
              checked={ !editPizza.vegetarian }
              onChange={ toggelVegetarian }
            />
            <label className="form-check-label">
              Not Vegetarian
            </label>
          </div>
        </div>
        <div className="col">
          <button
            type="submit"
            className="btn btn-success"
            onClick={updateCurrentPizza}
          >Submit</button>
        </div>
      </div>

  )
}

export default PizzaForm
