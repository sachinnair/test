import React, { useState } from "react";
import "./styles.css";
import QueryBar from "./QueryBar";
import PaginationBar from "./PaginationBar";
import DisplayCards from "./DisplayCards";
import QueryContext from "./Context";

export default function App() {
  const [queryParams, setQueryParams] = useState({
    cityName: "",
    provinceList: [],
    sortBy: "city",
    sortOrder: "asc"
  });
  const [provinceList, setProvinceList] = useState([]);

  const [showList, setShowList] = useState(true);
  const toggleView = (val) => {
    setShowList(val);
  };
  return (
    <>
      <QueryContext.Provider value={queryParams}>
        <QueryBar
          toggleView={toggleView}
          searchHandler={setQueryParams}
          provinceList={provinceList}
          hideMobile={showList}
        />
        <PaginationBar>
          <DisplayCards
            onProvinceFilter={setProvinceList}
            showList={showList}
          />
        </PaginationBar>
      </QueryContext.Provider>
    </>
  );
}
