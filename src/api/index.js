import axios from 'axios';

const baseURL = 'https://api.metro.net/agencies/lametro-rail/routes/';
// Used for line direction, ex. to Azusa or to Union Station
const directionURL =
  'https://api.metro.net/agencies/lametro-rail/routes/804/runs/';
const stopsURL =
  'https://api.metro.net/agencies/lametro-rail/routes/803/stops/';
const stationPredictionsURL =
  'https://api.metro.net/agencies/lametro-rail/routes/803/stops/80314/predictions/';

export const fetchMetroLines = async () => {
  try {
    const { data } = await axios.get(`${baseURL}`);
    const modifiedData = data.items;
    return modifiedData;
  } catch (err) {
    console.log(err);
  }
};

export const fetchDirections = async (lineID) => {
  try {
    const { data } = await axios.get(`${baseURL}${lineID}/runs/`);
    // const { data } = await axios.get(`${directionURL}`);
    const modifiedData = data.items;
    return modifiedData;
  } catch (err) {
    console.log(err);
  }
};

export const fetchStations = async (lineID) => {
  try {
    const { data } = await axios.get(`${baseURL}${lineID}/stops/`);
    const modifiedData = data.items;
    return modifiedData;
  } catch (err) {
    console.log(err);
  }
};

export const fetchStationPredictions = async (lineID, stationID) => {
  try {
    const { data } = await axios.get(
      `${baseURL}${lineID}/stops/${stationID}/predictions/`
    );
    const modifiedData = data.items;
    return modifiedData;
  } catch (err) {
    console.log(err);
  }
};
