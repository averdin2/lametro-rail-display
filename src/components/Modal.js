import React, { useState } from 'react';
import SelectLine from './SelectLine';
import SelectLineDirection from './SelectLineDirection';
import SelectStation from './SelectStation';
import '../styles/Modal.css';
import '../styles/SelectFormStyles.css';

export default function Modal(props) {
  const {
    metroLines,
    setMetroLine,
    lineDirections,
    lineStations,
    setLineStation,
    setModalIsOpen,
  } = props;
  const [activeForm, setActiveForm] = useState(0);

  function handlePrevious() {
    setActiveForm(activeForm - 1);
  }

  return (
    <div className="modalOverlay">
      <div className="modalContainer">
        <button className="modalCloseBtn" onClick={() => setModalIsOpen(false)}>
          X
        </button>
        {activeForm === 0 && (
          <SelectLine
            metroLines={metroLines}
            setMetroLine={setMetroLine}
            setActiveForm={setActiveForm}
          />
        )}
        {/* {activeForm === 1 && (
          <SelectLineDirection
            lineDirections={lineDirections}
            setActiveForm={setActiveForm}
          />
        )} */}
        {activeForm === 1 && (
          <SelectStation
            lineDirections={lineDirections}
            lineStations={lineStations}
            setLineStation={setLineStation}
          />
        )}
        {activeForm > 0 && (
          <button className="submit-btn" onClick={handlePrevious}>
            Previous
          </button>
        )}
      </div>
    </div>
  );
}
