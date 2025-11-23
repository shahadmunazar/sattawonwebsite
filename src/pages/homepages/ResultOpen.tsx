import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Typography, Button, Grid, CircularProgress, Slide } from '@mui/material';
import AndroidIcon from '@mui/icons-material/Android';
import axios from 'axios';
import './css/ResultOpen.css'; // Import a CSS file for additional styling

const ResultOpen: React.FC = () => {
  const [yesterdayNumber, setYesterdayNumber] = useState<any>(null);
  const [category, setCategory] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNumbers = async () => {
      try {
        const response = await axios.get('https://liveapi.sattawon.com/api/today-numbers-history');
        if (response.data.status === 200) {
          setYesterdayNumber(response.data.data.yesterday_number);
          setCategory(response.data.data.category);
        }
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchNumbers();
  }, []);

  

  return (
    <div className="container mt-5">
      <section>
        <Grid item xs={12} textAlign="center">
          {/* <Typography
            variant="h5"
            component="h2"
            style={{
              fontWeight: 'bold',
              color: '#333',
              lineHeight: 1.5,
              marginBottom: '20px',
            }}
          >
            Get the Fastest and Most Accurate Satta Matka Results Here
          </Typography> */}
          {/* <Typography
            variant="h5"
            component="h2"
            style={{
              fontWeight: 'bold',
              color: '#333',
              lineHeight: 1.5,
              marginBottom: '20px',
            }}
          >
            (सबसे तेज़ और सटीक सट्टा रिजल्ट यहाँ पाएं)
          </Typography> */}
          {/* <p lang="hi">
            हमारी वेबसाइट पर सट्टा रिजल्ट सबसे पहले देखें। रियल-टाइम रिजल्ट के साथ हमेशा अपडेट रहें और कोई भी अपडेट मिस न करें!
          </p> */}
        </Grid>

        {/* PlayGame Button */}
        {/* <Grid container justifyContent="center" style={{ marginTop: '20px' }}>
          <Button
            variant="contained"
            color="success"
            onClick={handleRedirect}
            style={{ padding: '10px 20px', fontSize: '16px', borderRadius: '10px' }}
          >
            Play Game
          </Button>
        </Grid> */}

        <Grid container spacing={4} justifyContent="center" alignItems="center" style={{ marginTop: '30px' }}>
          {loading ? (
            <Grid item>
              <CircularProgress />
            </Grid>
          ) : error ? (
            <Grid item>
              <Typography color="error">{error}</Typography>
            </Grid>
          ) : (
            <>
              <Slide direction="up" in={!loading} mountOnEnter unmountOnExit>
                <Grid item xs={12} sm={6} md={4}>
                  <Card
                    variant="elevation"
                    elevation={3}
                    style={{
                      borderRadius: '15px',
                      backgroundColor: '#00d4ff',
                      padding: '20px',
                      height: '100%',
                    }}
                  >
                    <CardContent>
                      <Typography variant="h5" component="h2" style={{ fontWeight: 'bold', textAlign: 'center' }}>
                        {category?.name || 'Loading...'}
                      </Typography>
                      <Typography variant="body2" component="p" style={{ marginTop: '10px', textAlign: 'center' }}>
                        Today Number: {category?.now_open_number || 'Loading...'}
                      </Typography>
                      <Typography variant="body2" component="p" style={{ marginTop: '10px', textAlign: 'center' }}>
                        Open Time: {category?.open_time || 'Loading...'}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Slide>

              <Slide direction="up" in={!loading} mountOnEnter unmountOnExit>
                <Grid item xs={12} sm={6} md={4}>
                  <Card
                    variant="elevation"
                    elevation={3}
                    style={{
                      borderRadius: '15px',
                      backgroundColor: '#ffcc00',
                      padding: '20px',
                      height: '100%',
                    }}
                  >
                    <CardContent>
                      <Typography variant="h5" component="h2" style={{ fontWeight: 'bold', textAlign: 'center' }}>
                        {yesterdayNumber?.category_name || 'Loading...'}
                      </Typography>
                      <Typography variant="body2" component="p" style={{ marginTop: '10px', textAlign: 'center' }}>
                        Yesterday Number: {yesterdayNumber?.open_number || 'Loading...'}
                      </Typography>
                      <Typography variant="body2" component="p" style={{ marginTop: '10px', textAlign: 'center' }}>
                        Open Time: {new Date(yesterdayNumber?.open_time).toLocaleString() || 'Loading...'}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Slide>
            </>
          )}
        </Grid>

        <Grid container spacing={4} justifyContent="center" alignItems="center" style={{ marginTop: '40px' }}>
          <Grid item xs={12}>
            
          <Typography 
  variant="body1" 
  component="p" 
  style={{ marginBottom: '20px', color: '#555', textAlign: 'center', fontWeight: 'bold', backgroundColor: 'yellow', padding: '5px' }}
>
  <strong>अभी आप घर बैठकर ऑनलाइन सट्टा खेलकर कमा सकते हैं अब आपको कहीं जाने की जरूरत नहीं है आपके ही मोबाइल में हम आपके लिए लाए हैं ऑनलाइन सट्टा है इसे ज्वाइन करने के लिए डाउनलोड बटन पर क्लिक करे</strong>
</Typography>

            <Typography variant="h5" component="p" style={{ marginBottom: '20px', fontWeight: 'bold', textAlign: 'center' }}>
            Get Mobile App click to download button
            </Typography>
            <Typography variant="h6" component="p" style={{ marginBottom: '20px', textAlign: 'center' }}>
              सट्टा मोबाइल ऐप प्राप्त करें - डाउनलोड करने के लिए यहाँ क्लिक करें
            </Typography>
          </Grid>
          <Grid item xs={12} style={{ textAlign: 'center' }}>
            <Button
              variant="contained"
              color="secondary"
              href="https://download.sattawon.com/SattaWon.apk"
              style={{ padding: '10px 20px', fontSize: '16px', borderRadius: '10px' }}
              startIcon={<AndroidIcon />}
            >
              Download App Now
            </Button>
          </Grid>
        </Grid>
      </section>
    </div>
  );
};

export default ResultOpen;

