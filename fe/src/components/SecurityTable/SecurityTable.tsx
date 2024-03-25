import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import "../../App.css";
import { data } from "../../data";

export function SecurityTable() {
  const navigate = useNavigate();

  /* NOTE: for demo purposes use mock data if api is not available */
  const [securities, setSecurities] = useState(data);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSecurities = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("http://localhost:7000/securities");
        const data = await response.json();
        setSecurities(data);
        setIsLoading(false);
      } catch (e) {
        console.error("Error fetching securities data", e);
        setIsLoading(false);
      }
    };

    fetchSecurities();
  }, []);

  const rows = securities?.map((security) => ({
    symbol: security.ticker,
    name: security.securityName,
    sector: security.sector,
    country: security.country,
    trend: security.trend,
  }));

  const getTrendBackgroundColor = (trend: number) => {
    if (trend < -20) {
      return "red";
    } else if (trend < 20) {
      return "green";
    } else {
      return "blue";
    }
  };

  return (
    <div className="app-wrapper">
      <h1>Security List</h1>
      {isLoading ? (
        <h4>Loading...</h4>
      ) : (
        <TableContainer component={Paper}>
          <Table aria-label="security table">
            <TableHead>
              <TableRow>
                <TableCell>Symbol</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Sector</TableCell>
                <TableCell align="right">Country</TableCell>
                <TableCell align="right">Trend</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  hover
                  key={row.name}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    navigate(`/securities/${row.symbol}`);
                  }}
                >
                  <TableCell component="th" scope="row">
                    {row.symbol}
                  </TableCell>
                  <TableCell align="right">{row.name}</TableCell>
                  <TableCell align="right">{row.sector}</TableCell>
                  <TableCell align="right">{row.country}</TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      backgroundColor: getTrendBackgroundColor(row.trend * 100),
                    }}
                  >
                    {row.trend}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}
