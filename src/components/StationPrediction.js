import React from 'react';
import '../styles/Display.css';

export default function StationPrediction(props) {
  const { metroLogoClass, stationTitle, times } = props;
  const timesString = times.join(', ');
  return (
    <tr className="table-row table-body-text">
      <td>
        <span className={`line-logo ${metroLogoClass}`}></span>
        {stationTitle}
      </td>
      <td>{timesString}</td>
    </tr>
  );
}
