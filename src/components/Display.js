import React, { useState, useEffect } from 'react';
import {
  fetchMetroLines,
  fetchDirections,
  fetchStops,
  fetchStationPredictions,
} from '../api';

export default function Display() {
  let [data, setData] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      let apiValue = await fetchMetroLines();
      setData(apiValue);
      console.log(apiValue);
    };

    fetchAPI();
  }, []);
  return (
    <div>
      <h1>Hello</h1>
      <form>
        {data.map((object) => (
          <>
            <input
              type="radio"
              id={object.id}
              name={object.display_name}
              value={object.display_name}
            />
            <label for={object.display_name}>{object.display_name}</label>
            <br />
          </>
        ))}
      </form>
    </div>
  );
}
