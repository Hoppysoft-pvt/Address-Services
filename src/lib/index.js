import React, { useState } from 'react';
import axios from 'axios';
// material-ui
import {
  Card,
  CardContent,
  Container,
  Grid,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress, {
  circularProgressClasses,
} from "@mui/material/CircularProgress";

function FacebookCircularProgress(props) {
  return (
    <Box sx={{ position: "relative", marginTop: "1%" }}>
      <CircularProgress
        variant="determinate"
        sx={{
          color: (theme) =>
            theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
        }}
        size={25}
        thickness={3.5}
        {...props}
        value={100}
      />
      <CircularProgress
        variant="indeterminate"
        disableShrink
        sx={{
          color: (theme) =>
            theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
          animationDuration: "550ms",
          position: "absolute",
          left: 0,
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: "round",
          },
        }}
        size={25}
        thickness={3.5}
        {...props}
      />
    </Box>
  );
}

// ===========================|| ADDRESS - FORMS ||=========================== //

const Address = () => {
  // const
  const indexId = "1e2tq2";
  const apiKey = "hs_2u37ib6w8wz4137f";

  // useState
  const [list1, setList] = useState([]);
  const [selectedObj, setSelectedObj] = useState([]);
  const [loading, setLoading] = useState(false);

  // methods
  const appendStarToWords = (str) => {
    var words = str.split(/\s+/);
    var modifiedSentence = '';
    for (var i = 0; i < words.length; i++) {
      var word = words[i];
      if (i > 0) {
        modifiedSentence += ' ';
      }
      if (word.startsWith('*') || word.startsWith('?')) {
        word = word.substring(1);
      }
      modifiedSentence += word + "*";
    }
    return modifiedSentence;
  }

  const handleSearchAddress = async (text) => {
    setLoading(true);

    if (!text) {
      setList([]);
      setLoading(false);
      return;
    }
    const [trimmedString, firstWord, secondWord] = (text.trim().match(/^(\S+)(?:\s(.+))?$/) || []).map(str => str || '');
    let luceneQuery = ""
    if (!isNaN(firstWord)) {
      const modifiedStreetQuery = appendStarToWords(secondWord)
      luceneQuery = secondWord ? `number: ${firstWord} AND street: ${modifiedStreetQuery}` : `number: ${firstWord}`
    } else {
      const modifiedStreetQuery = appendStarToWords(trimmedString)
      luceneQuery = `street: ${modifiedStreetQuery}`
    }

    try {
      const response = await axios
        .post(
          `https://${indexId}.hoppysearch.com/v1/search`,
          {
            luceneQuery: luceneQuery,
          },
          {
            headers: {
              Authorization: apiKey,
            },
          }
        )
      setList(response?.data?.documents);
      console.log("******************************************************",luceneQuery, response?.data?.documents);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <Container>
      <Grid container justifyContent="center" spacing={3}>
        <Grid
          item
          sm={10}
          md={9}
          sx={{ mt: { md: 9, xs: 2.5 }, mb: { md: 9, xs: 2.5 } }}
        ></Grid>
        <Grid item xs={8} sx={{ mb: -37.5 }}>
          <Card sx={{ mb: 6.25 }} elevation={4}>
            <CardContent sx={{ p: 4 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12} sx={{ mt: -1 }}>
                  <InputLabel
                    style={{
                      textAlign: "left",
                      marginBottom: 4,
                      color: "#808080",
                      fontWeight: 500,
                    }}
                  >
                    Address
                  </InputLabel>
                  <Autocomplete
                    options={list1}
                    getOptionLabel={(option) =>
                      `${option.number || ""} ${option.street || ""}`
                    }
                    isOptionEqualToValue={(option, value) =>
                      option.street === value.street &&
                      option.city === value.city &&
                      option.hs_guid === value.hs_guid &&
                      option.postcode === value.postcode &&
                      option.region === value.region
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        InputProps={{
                          ...params.InputProps,
                          endAdornment: (
                            <>
                              {loading ? <FacebookCircularProgress /> : null}
                              {params.InputProps.endAdornment}
                            </>
                          ),
                        }}
                      />
                    )}
                    renderOption={(props, option, index) => (
                      <li key={option?.hs_guid} {...props}>
                        <Box width={"100%"}>
                          <Typography
                            variant="button"
                            display="inline"
                            color="textSecondary"
                          >
                            {option?.number}&nbsp;
                          </Typography>
                          <Typography variant="button" display="inline">
                            {option?.street}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            fontSize={12}
                          >
                            {option?.city},&nbsp;{option?.region},&nbsp;
                            {option?.postcode}
                          </Typography>
                          <Divider sx={{ mt: "1%" }} />
                        </Box>
                      </li>
                    )}
                    noOptionsText={loading ? "Loading..." : "No options"}
                    onInputChange={(event, value) => handleSearchAddress(value)}
                    onChange={(event, newValue) => {
                      if (newValue && newValue.street) {
                        const selectedIndex = list1.indexOf(newValue);
                        const obj = list1[selectedIndex];
                        setSelectedObj(obj);
                        const fullAddress = `${newValue.number} ${newValue.street}`;
                        handleSearchAddress(fullAddress);
                      } else {
                        setSelectedObj({
                          city: "",
                          region: "",
                          postcode: "",
                        });
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} sx={{ mt: -1 }}>
                  <InputLabel
                    style={{
                      textAlign: "left",
                      marginBottom: 4,
                      color: "#808080",
                      fontWeight: 500,
                    }}
                  >
                    City
                  </InputLabel>
                  <TextField
                    fullWidth
                    value={selectedObj?.city}
                    name="City"
                    onChange={(event) => {
                      setSelectedObj((prevObj) => ({
                        ...prevObj,
                        city: event.target.value,
                      }));
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} sx={{ mt: -1 }}>
                  <InputLabel
                    style={{
                      textAlign: "left",
                      marginBottom: 4,
                      color: "#808080",
                      fontWeight: 500,
                    }}
                  >
                    State
                  </InputLabel>
                  <TextField
                    fullWidth
                    value={selectedObj?.region}
                    name="State"
                    onChange={(event) => {
                      setSelectedObj((prevObj) => ({
                        ...prevObj,
                        region: event.target.value,
                      }));
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={12} sx={{ mt: -1 }}>
                  <InputLabel
                    style={{
                      textAlign: "left",
                      marginBottom: 4,
                      color: "#808080",
                      fontWeight: 500,
                    }}
                  >
                    Zip Code
                  </InputLabel>
                  <TextField
                    fullWidth
                    value={selectedObj?.postcode}
                    name="ZipCode"
                    onChange={(event) => {
                      setSelectedObj((prevObj) => ({
                        ...prevObj,
                        postcode: event.target.value,
                      }));
                    }}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Address;
