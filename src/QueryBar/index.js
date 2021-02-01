import React, { useState, useRef, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import "../styles.css";
import {
  Input,
  Select,
  Button,
  FormControl,
  FormLabel,
  InputLabel,
  MenuItem,
  FormHelperText,
  FormGroup,
  Checkbox,
  FormControlLabel
} from "@material-ui/core";

import queryParamContext from "../Context";

import { fetchCurrentPos } from "../Algorithm/geoLocation";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  }
}));

const provincesChecked = [];
const handler = function (e) {
  if (e.target.checked) {
    provincesChecked.push(e.target.value);
  } else {
    provincesChecked.splice(provincesChecked.indexOf(e.target.value), 1);
  }
};

export default ({ searchHandler, provinceList, toggleView, hideMobile }) => {
  const queryParams = useContext(queryParamContext);

  const classes = useStyles();
  const selectRef = useRef(null);
  const sortOrderRef = useRef(null);

  const [cityName, setCityName] = useState(queryParams.cityName);
  return (
    <>
      <div className={"FilterButton"}>
        <Button
          color="primary"
          variant="contained"
          onClick={() => toggleView(false)}
        >
          Mobile Filter
        </Button>
      </div>
      <div className={`${hideMobile ? "hideMobile" : ""}`}>
        <FormControl className={classes.formControl}>
          <Input
            placeholder={"Search by City Name"}
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
          />
        </FormControl>
        <FormControl className={classes.formControl}>
          <FormGroup onChange={handler}>
            <FormLabel component="legend">Select Provinces</FormLabel>
            {provinceList.map((x) => (
              <FormControlLabel
                control={<Checkbox value={x} key={x} />}
                label={x}
              />
            ))}
          </FormGroup>
        </FormControl>
        <FormControl variant="filled" className={classes.formControl}>
          <InputLabel id="sel_province">Sort By</InputLabel>
          <Select
            labelId="sel_province"
            ref={selectRef}
            defaultValue={queryParams.sortBy}
          >
            <MenuItem value="city">City Name</MenuItem>
            <MenuItem value="population">Population</MenuItem>
            <MenuItem value="distance">GeoLocation</MenuItem>
          </Select>
          {/* <FormHelperText>Results will be sorted as per selection</FormHelperText> */}
        </FormControl>
        <FormControl variant="filled" className={classes.formControl}>
          <InputLabel id="sel_sortOrder">Sort Order</InputLabel>
          <Select
            labelId="sel_sortOrder"
            ref={sortOrderRef}
            defaultValue={queryParams.sortOrder}
          >
            <MenuItem value="asc">Ascending</MenuItem>
            <MenuItem value="desc">Descending</MenuItem>
          </Select>
          {/* <FormHelperText>Results will be sorted as per selection</FormHelperText> */}
        </FormControl>
        <Button
          color="primary"
          variant="contained"
          onClick={() =>
            fetchCurrentPos().then(() => {
              searchHandler({
                cityName,
                provinceList:
                  (provincesChecked.length > 0 && provincesChecked) ||
                  provinceList,
                sortBy: selectRef.current.querySelector("input").value,
                sortOrder: sortOrderRef.current.querySelector("input").value
              });
              toggleView(true);
            })
          }
        >
          Apply Filter
        </Button>
      </div>
    </>
  );
};
