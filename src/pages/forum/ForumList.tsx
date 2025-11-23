// import React, { useEffect, useState } from 'react';
// import { Container, Typography, Paper, Grid, Button } from '@mui/material';
// import { useTheme } from '@mui/material/styles';
// import './ForumList.css'; // Import the CSS file
// import ForumAllPost from './ForumAllPost';

// const ForumList = () => {
//   const [topics, setTopics] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [currentIndex, setCurrentIndex] = useState(0);
  
//   const topicsPerSlide = 3; // Show only 3 topics
//   const theme = useTheme();

//   // Array of diverse colors to ensure variety
//   const colors = [
//     '#FFCDD2', '#E1BEE7', '#BBDEFB', '#C8E6C9', '#FFF9C4', 
//     '#FFE0B2', '#D1C4E9', '#FFECB3', '#F8BBD0', '#B2DFDB'
//   ];

//   // Helper function to shuffle colors for uniqueness
//   const shuffleColors = (colorArray) => {
//     const shuffled = [...colorArray].sort(() => 0.5 - Math.random());
//     return shuffled.slice(0, topicsPerSlide);
//   };

//   useEffect(() => {
//     const fetchTopics = async () => {
//       try {
//         const response = await fetch('http://127.0.0.1:8000/api/game-forums-list');
//         if (!response.ok) throw new Error('Network response was not ok');
//         const data = await response.json();
//         setTopics(data.data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchTopics();
//   }, []);

//   const displayedTopics = topics.slice(
//     currentIndex * topicsPerSlide,
//     currentIndex * topicsPerSlide + topicsPerSlide
//   );

//   // Get a new shuffled set of colors for each batch of topics
//   const colorSet = shuffleColors(colors);

//   if (loading) {
//     return (
//       <Container maxWidth="lg" style={{ marginTop: '2rem' }}>
//         <Typography variant="h4" align="center">Loading...</Typography>
//       </Container>
//     );
//   }

//   if (error) {
//     return (
//       <Container maxWidth="lg" style={{ marginTop: '2rem' }}>
//         <Typography variant="h4" align="center">Error: {error}</Typography>
//       </Container>
//     );
//   }

//   return (
//     <Container maxWidth="lg" style={{ marginTop: '2rem' }}>
//       <Typography variant="h4" align="center" gutterBottom>
//         Forum
//       </Typography>
//       <Paper elevation={3} className="forum-container">
//         <Typography variant="h5" gutterBottom>
//           Welcome to the Forum!
//         </Typography>

//         <Grid container spacing={2} justifyContent="center">
//           {displayedTopics.map((topic, index) => (
//             <Grid item xs={12} sm={6} md={4} key={topic.id}>
//               <Paper
//                 elevation={4}
//                 className="animated-card"
//                 style={{ backgroundColor: colorSet[index] }}
//               >
//                 <Typography variant="h6">{topic.name}</Typography>
//                 <Typography variant="body2" color="textSecondary">
//                   <strong>Content:</strong> {topic.content}
//                 </Typography>
//                 <Typography variant="body2" color="textSecondary">
//                   <strong>Created At:</strong> {new Date(topic.created_at).toLocaleString()}
//                 </Typography>
//               </Paper>
//             </Grid>
//           ))}
//         </Grid>

//         <Grid container spacing={2} justifyContent="center" style={{ marginTop: '1rem' }}>
//           <Grid item>
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={() =>
//                 setCurrentIndex((prevIndex) =>
//                   prevIndex === 0 ? Math.ceil(topics.length / topicsPerSlide) - 1 : prevIndex - 1
//                 )
//               }
//             >
//               Previous
//             </Button>
//           </Grid>
//           <Grid item>
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={() =>
//                 setCurrentIndex((prevIndex) =>
//                   (prevIndex + 1) % Math.ceil(topics.length / topicsPerSlide)
//                 )
//               }
//             >
//               Next
//             </Button>
//           </Grid>
//         </Grid>
//       </Paper>
//       <ForumAllPost/>

//     </Container>


//   );
// };

// export default ForumList;
