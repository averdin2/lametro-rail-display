import React, { useState } from 'react';

export default function SelectLine(props) {
  const [line, setLine] = useState(null);
  const { metroLines, setMetroLine, setActiveForm } = props;

  function handleSubmit(e) {
    e.preventDefault();
    setMetroLine(line);
    setActiveForm(1);
  }

  return (
    <div>
      <h1>Select a Metro Line</h1>
      <form onSubmit={handleSubmit}>
        <select onChange={(e) => setLine(e.target.value)}>
          <option disabled selected>
            Metro Lines
          </option>
          {metroLines.map((object) => (
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
