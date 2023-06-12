import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Typography, CircularProgress } from "@mui/material";

const PrimeNumbers = () => {
  const [num, setNum] = useState("");
  const [primes, setPrimes] = useState([]);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    setNum(event.target.value);
  };

  const handleSubmit = async (event) => {
    setIsSubmitting(true);
    event.preventDefault();
    try {
      const response = await axios.get(
        `https://taskserver-production.up.railway.app/primes/${num}`
      );
      setPrimes(response.data);
      setIsSubmitting(false);
      setError("");
    } catch (err) {
      setError("An error occurred. Please try again.");
      setIsSubmitting(false);
      setPrimes([]);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="num"
          label="Number"
          name="num"
          autoFocus
          value={num}
          onChange={handleChange}
          type="number"
        />
        <Button
          type="submit"
          disabled={isSubmitting}
          fullWidth
          variant="contained"
          color="primary"
        >
          Submit
        </Button>
      </form>
      {isSubmitting && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "1rem",
          }}
        >
          <CircularProgress />
        </div>
      )}
      {error && (
        <Typography variant="body2" color="error">
          {error}
        </Typography>
      )}
      {primes.length > 0 && (
        <div>
          <Typography variant="h6">Prime Numbers:</Typography>
          {primes.map((prime, index) => (
            <Typography key={index} variant="body1">
              {prime}
            </Typography>
          ))}
        </div>
      )}
    </div>
  );
};

export default PrimeNumbers;
