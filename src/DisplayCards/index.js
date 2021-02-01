import React, { useContext, useEffect, useState } from "react";
import "../styles.css";
import cities from "../assets/cities";

import queryParamContext from "../Context";

import { quickSortRecursive } from "../Algorithm/quickSort";
import { distance, currentPos } from "../Algorithm/geoLocation";

function filterFunc(searchTxt, provinceList, sortyBy, cityObj, index, cities) {
  let regPat = new RegExp(`${searchTxt}`, "gi");
  var matchedCity = cityObj.city.match(regPat);

  return (
    (!searchTxt || matchedCity) &&
    (!provinceList.length || provinceList.includes(cityObj.admin_name)) &&
    (sortyBy !== "distance" || cityObj.distance < 30)
  );
}

const DistancesCache = [];
Object.prototype.distance && delete Object.prototype.distance;
Object.defineProperty(Object.prototype, "distance", {
  get: function () {
    if (currentPos) {
      if (
        DistancesCache[JSON.stringify(currentPos)] &&
        DistancesCache[JSON.stringify(currentPos)][this.city]
      ) {
        return DistancesCache[JSON.stringify(currentPos)][this.city];
      } else {
        let computedDist =
          this.lng && this.lat && distance(Number(this.lng), Number(this.lat));
        if (!DistancesCache[JSON.stringify(currentPos)]) {
          DistancesCache[JSON.stringify(currentPos)] = {};
        }
        DistancesCache[JSON.stringify(currentPos)][this.city] = computedDist;

        return computedDist || 0;
      }
    } else {
      return 0;
    }
  }
});

export default ({ onProvinceFilter, showList }) => {
  useEffect(() => {
    const provinces = cities.map((x) => x.admin_name);

    const uniqueProvinces = new Set(provinces);

    onProvinceFilter(Array.from(uniqueProvinces));
  }, [onProvinceFilter]);

  const queryParamConsumer = useContext(queryParamContext);

  const [sortFilterList, setSortFilterList] = useState([]);

  useEffect(() => {
    const filteredList = cities.filter(
      filterFunc.bind(
        null,
        queryParamConsumer.cityName,
        queryParamConsumer.provinceList,
        queryParamConsumer.sortBy
      )
    );

    const templateList = quickSortRecursive(
      queryParamConsumer.sortBy,
      queryParamConsumer.sortBy === "population"
        ? filteredList.map((x) => ({
            ...x,
            population: x.population && Number(x.population)
          }))
        : filteredList,
      queryParamConsumer.sortOrder
    ).map((x) => (
      <div>
        City: {x.city} || Population: {x.population} || Provinces:{" "}
        {x.admin_name} || Distance: {x.distance}
      </div>
    ));

    window.requestIdleCallback(() => {
      setSortFilterList(templateList);
    });
  }, [queryParamConsumer]);

  return (
    <div className={!showList ? "hideMobile" : ""}>
      <h1>Filtered List</h1>
      {sortFilterList}
    </div>
  );
};
