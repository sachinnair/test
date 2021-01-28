import React, { useState } from "react";
import "./styles.css";
import QueryBar from "./QueryBar";
import PaginationBar from "./PaginationBar";
import DisplayCards from "./DisplayCards";
import QueryContext from "./Context";

export default function App() {
  const [queryParams, setQueryParams] = useState({});
  const [provinceList, setProvinceList] = useState([]);
  return (
    <>
      <QueryBar searchHandler={setQueryParams} provinceList={provinceList} />
      <PaginationBar>
        <QueryContext.Provider value={queryParams}>
          <DisplayCards onProvinceFilter={setProvinceList} />
        </QueryContext.Provider>
      </PaginationBar>
    </>
  );
}
