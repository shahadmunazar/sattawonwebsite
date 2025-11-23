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
  Paper, 
  useMediaQuery, 
  useTheme, 
  Box 
} from '@mui/material';
import axios from 'axios';

interface ResultsData {
  status: number;
  year: number;
  month: number;
  categories: string[];
  results: {
    [key: string]: string[];
  };
}

const ChartsOfResults: React.FC = () => {
  const [data, setData] = useState<ResultsData | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    // Fetch data from the API
    axios.get('https://liveapi.sattawon.com/api/all-months-results')
      .then(response => setData(response.data.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  if (!data) {
    return <Typography variant="h6" align="center">Loading data...</Typography>;
  }

  const { categories, results } = data;
  const daysOfMonth = Object.keys(results);

  return (
    <Box sx={{ padding: { xs: '10px', md: '20px' }, maxWidth: '1200px', margin: '0 auto' }}>
      <section>
        <Typography 
          variant="h3" 
          sx={{ fontWeight: 'bold', textAlign: 'center', marginBottom: '30px', color: '#333' }}
        >
          Monthly Satta Result Charts
        </Typography>
        
        

        <Grid container justifyContent="center">
          <Grid item xs={12}>
            <Card sx={{ borderRadius: '15px', boxShadow: 3, padding: { xs: '10px', md: '20px' }, bgcolor: 'rgb(240, 248, 255)' }}>
              <CardContent>
                <TableContainer component={Paper} sx={{ overflowX: isMobile ? 'auto' : 'hidden', bgcolor: '#fff' }}>
                  <Table sx={{ minWidth: isMobile ? '600px' : 'auto' }}>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 'bold', color: '#1976d2' }}>Day of the Month</TableCell>
                        {categories.map((category) => (
                          <TableCell key={category} align="right" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                            {category}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {daysOfMonth.map((day) => (
                        <TableRow key={day}>
                          <TableCell sx={{ fontWeight: 'bold' }}>{day}</TableCell>
                          {categories.map((_, index) => (
                            <TableCell key={index} align="right">
                              {results[day][index] || '--'}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* <Typography 
          variant="h3" 
          sx={{ fontWeight: 'bold', textAlign: 'center', marginTop: '40px', marginBottom: '20px', color: '#333' }}
        >
          सट्टा कैसे काम करता है?
        </Typography> */}

        {/* <Typography paragraph sx={{ color: '#555', marginBottom: '20px' }}>
          सट्टा एक प्रकार की सट्टेबाजी है, जो भारत में लोकप्रिय है, जहाँ लोग लॉटरी, क्रिकेट मैच या खास संख्याओं जैसे अनिश्चित घटनाओं के परिणाम पर पैसे लगाते हैं। इसे एक बुकमेकर या "सट्टा किंग" द्वारा संचालित किया जाता है, जहां प्रतिभागी अपनी भविष्यवाणी पर पैसे लगाते हैं, और जीतने की दर उनके द्वारा चुने गए विकल्प पर निर्भर करती है। परिणाम घोषित होने के बाद, सही भविष्यवाणी करने वाले लोगों को धनराशि मिलती है।
        </Typography> */}

        {/* <Typography 
          variant="h3" 
          sx={{ fontWeight: 'bold', textAlign: 'center', marginTop: '40px', marginBottom: '20px', color: '#333' }}
        >
          How does Satta work?
        </Typography> */}
{/* 
        <Typography paragraph sx={{ color: '#555', marginBottom: '20px' }}>
          Satta is a form of betting, popular in India, where people place wagers on the outcomes of uncertain events like lotteries, cricket matches, or specific numbers. Organized by a bookmaker or "satta king," participants bet money on their predictions, with varying payout rates based on the odds. Once the results are announced, those whose predictions are correct receive payouts.
        </Typography> */}

        {/* <Grid container spacing={2} sx={{ marginBottom: '40px' }}>
          <Grid item xs={12} sm={6}>
            <Card variant="outlined" sx={{ height: '100%', padding: '20px' }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  सट्टा के बारे में जानकारी (About Satta)
                </Typography>
                <Typography variant="body1" lang="hi">
                  सट्टा (Satta) का मतलब होता है एक ऐसी गतिविधि जिसमें लोग पैसे लगाकर किसी परिणाम की भविष्यवाणी करते हैं। इसे हम जुआ (Gambling) के एक प्रकार के रूप में देख सकते हैं, जहां लोग किसी खेल, नंबर, या अन्य भविष्यवाणी के आधार पर पैसे लगाते हैं।
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Card variant="outlined" sx={{ height: '100%', padding: '20px' }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  सट्टा के प्रमुख प्रकार (Types of Satta)
                </Typography>
                <Typography variant="body1">
                  SATTA MATKA | KALYAN | SK MORNING | DELHI BAZAR | SUPER DELHI NIGHT | MEERUT CITY | SHREE GANESH | GHAZIABAD | FARIDABAD | SHRINAGAR | GALI | DESAWAR
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid> */}

        <Typography 
          variant="h3" 
          sx={{ fontWeight: 'bold', textAlign: 'left', marginBottom: '20px', color: '#333' }}
        >
          Important Notice
        </Typography>

        <Typography paragraph sx={{ color: '#555', marginBottom: '40px' }}>
          This website is made for entertainment purposes only. We do not support or encourage any kind of betting or gambling activities. If betting or gambling is prohibited in your area, we advise you to stop using this site immediately. We are not responsible for any profit or loss that may occur by using the information provided on this site. Users must ensure compliance with the legal regulations of their area, and any risk incurred will be entirely their own responsibility. Furthermore, this website may only be used by persons aged 18 years or above. If you are under the age of 18, please do not use this site. We reserve the right to check age verification, and accounts will be terminated if the law is violated.
        </Typography>
      </section>
    </Box>
    
  );
};

export default ChartsOfResults;
