import React, { useState, useEffect } from "react";
import "./App.css";

const FlightSearch = () => {
  const [flights, setFlights] = useState([]);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [sortBy, setSortBy] = useState("price");
  const [sortDirection, setSortDirection] = useState("asc");

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await fetch(
          "https://api.npoint.io/378e02e8e732bb1ac55b",
        );
        if (!response.ok) {
          throw new Error("Error fetching flights");
        }
        const data = await response.json();
        setFlights(data);
        setFilteredFlights(data);
      } catch (error) {
        console.error("Error fetching flights:", error);
      }
    };

    fetchFlights();
  }, []);

  const handleFilterByAirline = (airline) => {
    if (airline === "") {
      setFilteredFlights(flights);
    } else {
      const filtered = flights.filter((flight) => flight.airline === airline);
      setFilteredFlights(filtered);
    }
  };
  const handleSortByPrice = () => {
    const newSortDirection = sortDirection === "asc" ? "desc" : "asc";
    setSortDirection(newSortDirection);

    const sorted = [...filteredFlights].sort((a, b) => {
      if (newSortDirection === "asc") {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });

    setFilteredFlights(sorted);
    setSortBy("price");
  };

  return (
    <div className="main-container">
      <div className="header">
        <nav className="header-nav">
          <a href="/" className="header-logo">
            Flight Booking
          </a>
          <button className="header-btn">Login</button>
        </nav>
      </div>
      <div className="flight-search-container">
        <div className="filter-section">
          <span>Filter by Airline:</span>
          <select onChange={(e) => handleFilterByAirline(e.target.value)}>
            <option value="">All Airlines</option>
            <option value="IndiGo">IndiGo</option>
            <option value="Air India">Air India</option>
            <option value="SpiceJet">SpiceJet</option>
            <option value="GoAir">GoAir</option>
            <option value="Vistara">Vistara</option>
            <option value="AirAsia">AirAsia</option>
          </select>
        </div>
        <div className="sort-section">
          <span>Sort by:</span>
          <button onClick={handleSortByPrice} className={sortBy === "price" ? "active" : ""}>
            Price {sortDirection === "asc" ? "↓" : "↑"}
          </button>
        </div>
        <div className="table-container">
          <table className="flight-table">
            <thead>
              <tr>
                <th>Airline</th>
                <th>Price</th>
                <th>Flight Number</th>
                <th>Origin</th>
                <th>Destination</th>
                <th>Departure Time</th>
                <th>Arrival Time</th>
                <th>Seats Available</th>
              </tr>
            </thead>
            <tbody>
              {filteredFlights.map((flight) => (
                <tr key={flight.id}>
                  <td>{flight.airline}</td>
                  <td>${flight.price}</td>
                  <td>{flight.flightNumber}</td>
                  <td>{flight.origin}</td>
                  <td>{flight.destination}</td>
                  <td>{new Date(flight.departureTime).toLocaleTimeString()}</td>
                  <td>{new Date(flight.arrivalTime).toLocaleTimeString()}</td>
                  <td>{flight.seatsAvailable}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <footer className="footer">
        <p>&copy; 2024 Flight Booking. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default FlightSearch;

