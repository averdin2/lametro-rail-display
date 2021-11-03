import React, { useState, useEffect } from 'react';
import {
  fetchMetroLines,
  fetchDirections,
  fetchStations,
  fetchStationPredictions,
} from '../api';
import Modal from './Modal';
import StationPrediction from './StationPrediction';

export default function Display() {
  const [metroLines, setMetroLines] = useState([]);
  const [metroLine, setMetroLine] = useState(null);

  // const [lineDirections, setLineDirections] = useState([]);
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
      // console.log(lines);
    };

    fetchLines();
  }, []);

  useEffect(() => {
    if (metroLine) {
      setLineDirections(new Map());
      const fetchLineValues = async () => {
        let directions = await fetchDirections(metroLine);
        // setLineDirections(directions);
        for (let direction of directions) {
          if (direction.route_id[direction.route_id.length - 1] == 0) {
            setLineDirections(
              (prev) =>
                new Map([...prev, [direction.route_id, direction.display_name]])
            );
          }
        }
        // console.log(directions);
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

        // for (let prediction of predictions) {
        //   if (lineDirections.has(prediction.run_id)) {
        //     let val;
        //     if (stationPredictions[lineDirections.get(prediction.run_id)]) {
        //       val = stationPredictions[lineDirections.get(prediction.run_id)];
        //       val.push(prediction.minutes);
        //       setStationPredictions((prev) => ({
        //         ...prev,
        //         [lineDirections.get(prediction.run_id)]: val,
        //       }));
        //     } else {
        //       val = [prediction.minutes];
        //       console.log(val);
        //       setStationPredictions((prev) => ({
        //         ...prev,
        //         [lineDirections.get(prediction.run_id)]: val,
        //       }));
        //     }
        //   }
        // }

        // console.log(predictions);
      };

      fetchPredictions();
    }
  }, [metroLine, lineStation]);

  useEffect(() => {
    let dictions = {};
    for (let prediction of stationPredictions) {
      if (lineDirections.has(prediction.run_id)) {
        // console.log(prediction);
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
    console.log(dictions);
    setMappedPredictions(dictions);
  }, [stationPredictions, lineDirections]);

  return (
    <div>
      <h1>Hello</h1>
      <button onClick={() => setModalIsOpen(true)}>Click</button>

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
      {Object.entries(mappedPredictions).map(([key, value]) => (
        <StationPrediction stationTitle={key} times={value} />
      ))}
    </div>
  );
}
