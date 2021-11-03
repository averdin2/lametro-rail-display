/* Still need to save direction in Display component */
import React, { useState } from 'react';

export default function SelectLineDirection(props) {
  const [direction, setDirection] = useState(null);
  const { lineDirections, setActiveForm } = props;

  function handleSubmit(e) {
    e.preventDefault();
    console.log(direction);
    setActiveForm(2);
  }
  return (
    <div>
      <h1>Select a Line Direction</h1>
      <form onSubmit={handleSubmit}>
        <select onChange={(e) => setDirection(e.target.value)}>
          <option disabled selected>
            Line Directions
          </option>
          {lineDirections.map((object) => (
            <>
              <option id={object.id} value={object.id}>
                {object.display_name}
              </option>
            </>
          ))}
        </select>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
