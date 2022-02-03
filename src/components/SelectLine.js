import React, { useState } from 'react';
import '../styles/SelectFormStyles.css';

export default function SelectLine(props) {
  const [line, setLine] = useState(null);
  const { metroLines, setMetroLine, setActiveForm } = props;

  /* -- I need to do some kind of check if line has a value, if it 
        does not, I need to put a message that a value was not selected

        Also, SelectLine and SelectStation should be the same component
  -- */

  function handleSubmit(e) {
    e.preventDefault();
    setMetroLine(line);
    setActiveForm(1);
  }

  return (
    <div>
      <h1 className="select-header">Select a Metro Line</h1>
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
        <button className="submit-btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
