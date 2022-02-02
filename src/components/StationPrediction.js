import React from 'react';
import '../styles/Display.css';
import '../styles/StationPrediction.css';

export default function StationPrediction(props) {
  const { metroLogoClass, stationTitle, times } = props;
  const timesString = times.join(', ');
  return (
    <tr className="table-row table-body-text">
      <td>
        <div className="line-title">
          <div className="logo-container">
            {/* <span className={`line-logo ${metroLogoClass}`}></span> */}
            <div className={`line-logo ${metroLogoClass}`}></div>
          </div>
          <div className="title-container">{stationTitle}</div>
        </div>
      </td>
      <td>{timesString}</td>
    </tr>
  );
}
