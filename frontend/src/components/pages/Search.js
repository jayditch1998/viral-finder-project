import React, { Fragment, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Collapse,
  Container,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FullPageLoader from "./FullPageLoader";
import axios from "axios";

const Search = () => {
  const [query, setQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [userData, setData] =useState([]);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmitSearch = async () => {
    try {
      if (query.trim()) {
        setSearching(true);
        console.log("Search query:", query);
      }
      const response = await axios.post(
        "http://localhost:4000/api/instagram/find-user",
        {
          username: query
        }
      );
      if(response.status === 200){
        setData(response?.data)
        setSearching(false);
      }
      console.log('RESPONSE: ', response);
    } catch (error) { 

    }
  }

  return (
    <Container
      component={"main"}
      maxWidth="xs"
      sx={{
        height: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography
            variant="h4"
            align="center"
            sx={{
              mb: 2,
              fontWeight: 600,
              color: (theme) => theme.palette.text.primary,
              textTransform: "uppercase",
            }}
          >
            Search User
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            disabled={searching}
            fullWidth
            variant="outlined"
            placeholder="Search..."
            value={query}
            onChange={handleInputChange}
            sx={{
              maxWidth: 600,
              margin: "auto",
              borderRadius: 2,
              boxShadow: 1,
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
              "& .MuiInputBase-input": {
                padding: "10px 14px",
              },
              "& .MuiInputLabel-root": {
                color: (theme) => theme.palette.text.secondary,
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12}>
          {searching ? (
            <Box
              sx={{
                marginTop: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <CircularProgress size={60} />
              <Typography
                variant="h6"
                sx={{
                  // marginTop: 2,
                  fontWeight: 600,
                  color: (theme) => theme.palette.text.secondary,
                }}
              >
                {`Searching for the user ${query} ...`}
              </Typography>
            </Box>
          ) : (
            <Collapse in={!!query.trim()} timeout={300}>
              <Button
                variant="contained"
                color="primary"
                sx={{
                  maxWidth: 600,
                  width: "100%",
                  borderRadius: 2,
                  boxShadow: 1,
                  fontWeight: 600,
                  textTransform: "uppercase",
                  transition: "opacity 0.3s ease-in-out",
                  backgroundColor: "#333",
                }}
                onClick={handleSubmitSearch}
              >
                Search
              </Button>
            </Collapse>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Search;
