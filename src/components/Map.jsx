import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";

import { useSelector } from "react-redux";
import axios from "axios";

export default function Map() {
  mapboxgl.accessToken =
    "pk.eyJ1Ijoicm9oaXRzYWNoNTAiLCJhIjoiY2t6enB3NnJ2MGMzNzNibmFwa3cwMHBzcSJ9.WGPktzbJ7B1eZSkMR2djKw";

  // const data = useSelector((state) => state.custom.data);
  const latlong = useSelector((state) => state.custom.latlong);
  const zoom = useSelector((state) => state.custom.zoom);
  const mapContainer = useRef(null);
  const mapHtml = useRef(null);

  useEffect(() => {
    mapHtml.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/rohitsach50/ckwkg30zm8rdv14oc4tmffjv0",
      center: [78.9629, 20.5937],
      zoom: 4,
    });

    // get data from server

    // add markers to map
    axios
      .get("https://arcane-everglades-66784.herokuapp.com/test")
      .then((response) => {
        // handle success
        let mapData = response.data;
        // console.log(mapData);
        // add markers to map
        mapData.map["station_list"].forEach(function (marker) {
          var el = document.createElement("section");
          let tet = marker["Ambient"]["AAQMS"]["parameter_map"];
          var value = 0;
          tet.forEach(function (parameter) {
            if (
              parameter["parameter_name"] === "PM10" ||
              parameter["parameter_name"] === "PM10"
            ) {
              value = parseInt(parameter["value"]);
              if (parseInt(parameter["value"]) <= 50) {
                el.className = "marker-green";
              } else if (
                parseInt(parameter["value"]) >= 51 &&
                parseInt(parameter["value"]) <= 100
              ) {
                el.className = "marker-yellow";
              } else if (
                parseInt(parameter["value"]) >= 101 &&
                parseInt(parameter["value"]) <= 150
              ) {
                el.className = "marker-orange";
              } else if (
                parseInt(parameter["value"]) >= 151 &&
                parseInt(parameter["value"]) <= 200
              ) {
                el.className = "marker-red";
              } else if (
                parseInt(parameter["value"]) >= 201 &&
                parseInt(parameter["value"]) <= 300
              ) {
                el.className = "marker-purple";
              } else if (parseInt(parameter["value"]) >= 301) {
                el.className = "marker-brown";
              } else {
                el.className = "marker-white";
              }
            }
          });

          new mapboxgl.Marker(el)
            .setLngLat([marker["longitude"], marker["latitude"]])
            .addTo(mapHtml.current)
            .setPopup(
              new mapboxgl.Popup({ offset: 5 }).setHTML(
                "<h6>" +
                  marker["station_name"] +
                  '</h6><p classname="value">' +
                  value +
                  "</p>"
              )
            );
        });
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });

    // cleanup function
    return () => {
      mapHtml.current.remove();
    };
  },[]);
useEffect(()=>{
  mapHtml.current.flyTo({
    center:latlong,
    essential:true,
    zoom:zoom,

  })
})
  return (
    <>
      <div ref={mapContainer} className="map" />
    </>
  );
}
