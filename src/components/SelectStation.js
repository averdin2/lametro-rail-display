import React, { useState } from 'react';

export default function SelectStation(props) {
  const [station, setStation] = useState(null);
  const { lineDirections, lineStations, setLineStation } = props;

  function handleSubmit(e) {
    e.preventDefault();
    setLineStation(station);
    // console.log(lineDirections);
  }
  return (
    <div>
      <h1>Select Station Form</h1>
      <form onSubmit={handleSubmit}>
        <select onChange={(e) => setStation(e.target.value)}>
          <option disabled selected>
            Line Stations
          </option>
          {lineStations.map((object) => (
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
