import React, { useState, useEffect } from 'react';
import {
  fetchMetroLines,
  fetchDirections,
  fetchStations,
  fetchStationPredictions,
} from '../api';
import Modal from './Modal';
import StationPrediction from './StationPrediction';
import '../styles/Display.css';

export default function Display() {
  const [metroLines, setMetroLines] = useState([]);
  const [metroLine, setMetroLine] = useState(null);

  const [metroLogoClass, setMetroLogoClass] = useState('');

  const [lineDirections, setLineDirections] = useState(new Map());

  const [lineStations, setLineStations] = useState([]);
  const [lineStation, setLineStation] = useState(null);

  const [stationPredictions, setStationPredictions] = useState([]);
  const [mappedPredictions, setMappedPredictions] = useState({});

  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const fetchLines = async () => {
      let lines = await fetchMetroLines();
      setMetroLines(lines);
    };

    fetchLines();
  }, []);

  useEffect(() => {
    if (metroLine) {
      switch (metroLine) {
        case '801':
          setMetroLogoClass('blue-logo');
          break;
        case '802':
          setMetroLogoClass('red-logo');
          break;
        case '803':
          setMetroLogoClass('green-logo');
          break;
        case '804':
          setMetroLogoClass('gold-logo');
          break;
        case '805':
          setMetroLogoClass('purple-logo');
          break;
        case '806':
          setMetroLogoClass('expo-logo');
          break;
        default:
          break;
      }

      setLineDirections(new Map());
      const fetchLineValues = async () => {
        let directions = await fetchDirections(metroLine);
        for (let direction of directions) {
          if (direction.route_id[direction.route_id.length - 1] == 0) {
            setLineDirections(
              (prev) =>
                new Map([...prev, [direction.route_id, direction.display_name]])
            );
          }
        }
        let stations = await fetchStations(metroLine);
        setLineStations(stations);
      };

      fetchLineValues();
    }
  }, [metroLine]);

  useEffect(() => {
    if (lineStation) {
      const fetchPredictions = async () => {
        let predictions = await fetchStationPredictions(metroLine, lineStation);
        setStationPredictions(predictions);
      };

      fetchPredictions();
    }
  }, [metroLine, lineStation]);

  useEffect(() => {
    let dictions = {};
    for (let prediction of stationPredictions) {
      if (lineDirections.has(prediction.run_id)) {
        let val;
        if (dictions[lineDirections.get(prediction.run_id)]) {
          val = dictions[lineDirections.get(prediction.run_id)];
          val.push(prediction.minutes);
        } else {
          val = [prediction.minutes];
          dictions[lineDirections.get(prediction.run_id)] = val;
        }
      }
    }
    setMappedPredictions(dictions);
  }, [stationPredictions, lineDirections]);

  return (
    <div class="display-container">
      <table className="display-table">
        <thead>
          <tr className="table-row">
            <th>Dest</th>
            <th>Min</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(mappedPredictions).map(([key, value]) => (
            <StationPrediction
              metroLogoClass={metroLogoClass}
              stationTitle={key}
              times={value}
            />
          ))}
        </tbody>
      </table>
      <div className="footer">
        <button className="modal-btn" onClick={() => setModalIsOpen(true)}>
          Click
        </button>
      </div>

      {modalIsOpen && (
        <Modal
          metroLines={metroLines}
          setMetroLine={setMetroLine}
          lineDirections={lineDirections}
          lineStations={lineStations}
          setLineStation={setLineStation}
          setModalIsOpen={setModalIsOpen}
        />
      )}
    </div>
  );
}
