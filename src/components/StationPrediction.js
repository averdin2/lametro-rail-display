import React from 'react';

export default function StationPrediction(props) {
  const { stationTitle, times } = props;
  return (
    <div>
      <h1>{stationTitle}</h1>
      {times.map((time) => (
        <p>{time}</p>
      ))}
    </div>
  );
}
