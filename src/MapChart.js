import React, { memo, useState, useEffect } from "react";
import axios from "axios";
import { scaleQuantize } from "d3-scale";
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography
} from "react-simple-maps";

const colorScale = scaleQuantize()
  .domain([0, 150])
  .range(["#FFF5F0", "#BF181C", "#FCA689", "#FA7354", "#EA3C2E", "#BF181C"]);
const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/india/india-states.json";

const MapChart = ({ setTooltipContent }) => {
  const [stateDetails, setStateDetails] = useState([]);

  var curCases = 0;

  useEffect(() => {
    axios
      .get("https://api.rootnet.in/covid19-in/stats/latest")
      .then(res => res.data.data.regional)
      .then(res => {
        setStateDetails(res);
        console.log(res);
      });
  }, []);
  return (
    <>
      <ComposableMap
        data-tip=""
        style={{
          width: "100vw",
          height: "auto"
          //transform: "translateX(-30vw)",
          //overflow: "hidden"
        }}
        projection="geoMercator"
        projectionConfig={{
          rotate: [-80.0, -22, 0],
          scale: 1150
        }}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map(geo => {
              var { NAME_1 } = geo.properties;
              NAME_1 = NAME_1 === "Orissa" ? "Odisha" : NAME_1;
              NAME_1 = NAME_1 === "Uttaranchal" ? "Uttarakhand" : NAME_1;
              const state = stateDetails.find(x => x.loc === NAME_1);
              if (state) {
                curCases =
                  state.confirmedCasesIndian + state.confirmedCasesForeign;
              } else {
                curCases = 0;
              }
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() => {
                    if (state) {
                      curCases =
                        state.confirmedCasesIndian +
                        state.confirmedCasesForeign;
                      setTooltipContent(
                        `${NAME_1} - ${state.confirmedCasesIndian +
                          state.confirmedCasesForeign}C - ${state.deaths}D - ${
                          state.discharged
                        }R`
                      );
                    } else {
                      curCases = 0;
                      setTooltipContent(`${NAME_1}`);
                    }
                  }}
                  onMouseLeave={() => {
                    setTooltipContent("");
                  }}
                  fill={colorScale(curCases)}
                  style={{
                    hover: {
                      stroke: "#373737"
                    }
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
    </>
  );
};

export default memo(MapChart);
