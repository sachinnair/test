import React, { useContext, useEffect } from "react";

import cities from "../../public/cities";

import queryParamContext from "../Context";

// function searchCity () {

// }

// function filterProvince() {

// }

export default ({ onProvinceFilter }) => {
  useEffect(() => {
    const provinces = cities.map((x) => x.admin_name);

    const uniqueProvinces = new Set(provinces);

    onProvinceFilter(Array.from(uniqueProvinces));

    console.log("Effect in Action");
  }, [onProvinceFilter]);

  const queryParamConsumer = useContext(queryParamContext);

  return (
    <>
      Filter ON: {queryParamConsumer.sortBy}
      {/* {Array.from(uniqueProvinces).map((y) => (
        <div>{y}</div>
      ))} */}
      {cities.map((x) => (
        <>
          <div>
            City: {x.city} || Population: {x.population} || Provinces:{" "}
            {x.admin_name}
          </div>
        </>
      ))}
    </>
  );
};
