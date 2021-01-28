import React, { useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
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

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  }
}));

export default ({ searchHandler, provinceList }) => {
  const classes = useStyles();
  const selectRef = useRef(null);

  const [cityName, setCityName] = useState("");
  return (
    <>
      <p>Query Bar {selectRef.current && selectRef.current.value} </p>
      <FormControl className={classes.formControl}>
        <Input
          placeholder={"Search by City Name"}
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
        />
      </FormControl>
      <FormControl className={classes.formControl}>
        <FormGroup>
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
        <Select labelId="sel_province" ref={selectRef} defaultValue="city_name">
          <MenuItem value="city_name">City Name</MenuItem>
          <MenuItem value="population">Population</MenuItem>
        </Select>
        {/* <FormHelperText>Results will be sorted as per selection</FormHelperText> */}
      </FormControl>
      <Button
        onClick={() =>
          searchHandler({
            cityName,
            provinceList,
            sortBy: selectRef.current.querySelector("input").value
          })
        }
      >
        Filter
      </Button>
    </>
  );
};
