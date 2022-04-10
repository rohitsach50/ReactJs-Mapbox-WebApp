import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
const Empty = () => {
  let stateNames = [];
  // let stateAvglist=[]
  let countryAvgNum = 0;
  let countryAvgDenum = 0;
  let countryAvg = 0;
  let finalObj = [];
  let obj = {};
  let prevState = null;
  let numrator = 0;
  let denominator = 0;
  let avg = 0;
  const dispatch = useDispatch();
  const data = useSelector((state) => state.custom.data);
  const stateAvgFinalList = useSelector(
    (state) => state.custom.stateAvgFinalList
  );

  useEffect(() => {
    axios.get("http://localhost:5000/data/stations").then((response) => {
    
      dispatch({
        type: "dataReducer",
        payload: response.data,
      });
    });
  }, []);

  if (data !== null) {
    data.forEach((city) => {
      if (prevState !== city["stateID"]) {
        avg = numrator / denominator;
        if (prevState !== null) {
          obj[String(prevState)] = avg;
          finalObj.push(obj);
          // console.log("Final Average of "+`${prevState}` +" is "+ `${avg}`);
        }

        numrator = 0;
        denominator = 0;
        avg = 0;
        obj = {};
      }

      if (!stateNames.includes(city["stateID"])) {
        stateNames.push(city["stateID"]);
        // console.log(city["stateID"]);
      }
      city["stationsInCity"].forEach((station) => {
        if (stateNames.includes(station["stateID"])) {
          if (station["live"]) {
            numrator += station["avg"];
            denominator += 1;
            countryAvgNum += station["avg"];
            countryAvgDenum += 1;
          }
          prevState = station["stateID"];
        }
      });
    });
    countryAvg = countryAvgNum / countryAvgDenum;

    avg = numrator / denominator;
    obj[String(prevState)] = avg;
    finalObj.push(obj);

    if (stateAvgFinalList === null) {
      dispatch({
        type: "avgReducer",
        payload: parseInt(countryAvg),
      });
      dispatch({
        type: "stateAvgReducer",
        payload: finalObj,
      });
      dispatch({
        type: "statelistReducer",
        payload: stateNames,
      });
      dispatch({
        type: "countryAvgReducer",
        payload: parseInt(countryAvg),
      });
    }
  }

  return <></>;
};
export default Empty;
