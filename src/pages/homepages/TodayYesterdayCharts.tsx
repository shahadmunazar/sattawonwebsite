import React, { useEffect, useState } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import axios from 'axios';

interface Result {
  category_id: number;
  category_name: string;
  today_number: string;
  yesterday_number: string;
}

const TodayYesterdayCharts: React.FC = () => {
  const [results, setResults] = useState<Result[]>([]);

  useEffect(() => {
    // Fetch data from the API
    axios.get('https://liveapi.sattawon.com/api/today-numbers-history')
      .then(response => {
        setResults(response.data.data.results);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <section>
        {/* <Typography 
          variant="h4" 
          component="h2" 
          sx={{ fontWeight: 'bold', textAlign: 'center', marginBottom: '20px', color: '#333' }}
        >
          Today and Yesterday Satta Matka Result
        </Typography> */}
        
        {/* <Typography 
          variant="body1" 
          sx={{ textAlign: 'center', marginBottom: '40px', color: '#666' }}
        >
          The following tables display the results for today and yesterday. The data is meticulously collected and updated in real-time, ensuring that the information presented is both accurate and timely. This allows for effective monitoring and comparison of performance across different time periods.
        </Typography> */}

        <Grid container spacing={4} justifyContent="center" alignItems="center">
          {/* Today Data Table */}
          <Grid item xs={12} sm={6} md={4} lg={6}>
            <Card variant="outlined" sx={{ borderRadius: '15px', padding: '20px', boxShadow: 3, bgcolor: '00d4ff' }}>
              <CardContent>
                <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', textAlign: 'center', marginBottom: '20px', color: '#1976d2' }}>
                  Today
                </Typography>
                <TableContainer component={Paper} sx={{ marginTop: '20px', bgcolor: '#00d4ff' }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 'bold', color: '#1976d2' }}>Category</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: '#1976d2' }}>Today Number</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {results.map((row) => (
                        <TableRow key={row.category_id}>
                          <TableCell>{row.category_name}</TableCell>
                          <TableCell>{row.today_number}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* Yesterday Data Table */}
          <Grid item xs={12} sm={6} md={4} lg={6}>
            <Card variant="outlined" sx={{ borderRadius: '15px', padding: '20px', boxShadow: 3, bgcolor: 'rgb(211, 233, 255)' }}>
              <CardContent>
                <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', textAlign: 'center', marginBottom: '20px', color: '#1976d2' }}>
                  Yesterday
                </Typography>
                <TableContainer component={Paper} sx={{ marginTop: '20px', bgcolor: '#ffcc00' }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 'bold', color: '#1976d2' }}>Category</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: '#1976d2' }}>Yesterday Number</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {results.map((row) => (
                        <TableRow key={row.category_id}>
                          <TableCell>{row.category_name}</TableCell>
                          <TableCell>{row.yesterday_number}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </section>
    </div>
  );
};

export default TodayYesterdayCharts;
