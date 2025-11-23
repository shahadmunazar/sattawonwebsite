// import React, { useEffect, useState } from 'react';
// import {
//   Container,
//   Typography,
//   Grid,
//   Paper,
//   TextField,
//   Button,
//   Box,
//   List,
//   ListItem,
//   ListItemText,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
// } from '@mui/material';
// import './ForumPage.css'; // Import your CSS styles

// const ForumPage = () => {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [comment, setComment] = useState({});
//   const [commentVisibility, setCommentVisibility] = useState({});
//   const [newPost, setNewPost] = useState({ title: '', content: '', description: '' });
//   const [openModal, setOpenModal] = useState(false);

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const response = await fetch('http://127.0.0.1:8000/api/game-forums-list');
//         if (!response.ok) throw new Error('Failed to fetch data');
//         const data = await response.json();
//         setPosts(data.data);
//       } catch (err) {
//   // @ts-ignore
//   setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPosts();
//   }, []);

//   const filteredPosts = posts.filter(post =>
//       // @ts-ignore

//     post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       // @ts-ignore

//     post.content.toLowerCase().includes(searchTerm.toLowerCase())
//   );
//   // @ts-ignore

//   const handleCommentSubmit = async (postId) => {
//       // @ts-ignore

//     if (!comment[postId]) return;

//     const payload = {
//       title: "This is replying",
//         // @ts-ignore

//       content: comment[postId],
//       game_forum_id: postId,
//     };

//     try {
//       const response = await fetch('http://127.0.0.1:8000/api/topics-temp', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': 'Bearer YOUR_TOKEN_HERE',
//         },
//         body: JSON.stringify(payload),
//       });

//       if (!response.ok) throw new Error('Failed to add comment');

//       const newComment = {
//         id: Date.now(),
//           // @ts-ignore

//         content: comment[postId],
//         user_id: "Your User ID",
//         created_at: new Date().toISOString(),
//       };
//   // @ts-ignore

//       setPosts(prevPosts =>
//         prevPosts.map(post =>
//             // @ts-ignore

//           post.id === postId ? { ...post, topics: [...(post.topics || []), newComment] } : post
//         )
//       );

//       setCommentVisibility(prev => ({ ...prev, [postId]: true }));
//       setComment(prev => ({ ...prev, [postId]: '' }));
//     } catch (error) {
//       console.error('Error adding comment:', error);
//     }
//   };

//   const handleNewPostSubmit = async () => {
//     if (!newPost.title || !newPost.content || !newPost.description) return;

//     const payload = {
//       title: newPost.title,
//       content: newPost.content,
//       description: newPost.description,
//     };

//     try {
//       const response = await fetch('http://127.0.0.1:8000/api/game-forums', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': 'Bearer YOUR_TOKEN_HERE',
//         },
//         body: JSON.stringify(payload),
//       });

//       if (!response.ok) throw new Error('Failed to create post');

//       const newForumPost = await response.json();
//         // @ts-ignore

//       setPosts(prevPosts => [newForumPost.data, ...prevPosts]);
//       setNewPost({ title: '', content: '', description: '' });
//       setOpenModal(false);
//     } catch (error) {
//       console.error('Error creating post:', error);
//     }
//   };
//   // @ts-ignore

//   const toggleCommentVisibility = (postId) => {
//       // @ts-ignore

//     setCommentVisibility(prev => ({ ...prev, [postId]: !prev[postId] }));
//   };

//   // Loading and error states
//   if (loading) {
//     return (
// <Container maxWidth={false} style={{ marginTop: '2rem' }}>
// <Typography variant="h4" align="center">Loading...</Typography>
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
//         Forum Posts
//       </Typography>

//       {/* Button to Open Modal */}
//       <Box display="flex" justifyContent="center" mb={2}>
//         <Button variant="contained" color="primary" onClick={() => setOpenModal(true)}>
//           Create a New Post
//         </Button>
//       </Box>

//       {/* Modal for New Post */}
//       <Dialog open={openModal} onClose={() => setOpenModal(false)}>
//         <DialogTitle>Create a New Post</DialogTitle>
//         <DialogContent>
//           <TextField
//             variant="outlined"
//             label="Title"
//             value={newPost.title}
//             onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
//             fullWidth
//             margin="normal"
//           />
//           <TextField
//             variant="outlined"
//             label="Content"
//             value={newPost.content}
//             onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
//             fullWidth
//             margin="normal"
//             multiline
//             rows={4}
//           />
//           <TextField
//             variant="outlined"
//             label="Description"
//             value={newPost.description}
//             onChange={(e) => setNewPost({ ...newPost, description: e.target.value })}
//             fullWidth
//             margin="normal"
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpenModal(false)} color="secondary">Cancel</Button>
//           <Button onClick={handleNewPostSubmit} color="primary">Post</Button>
//         </DialogActions>
//       </Dialog>

//       {/* Search Bar */}
//       <Box mb={4} display="flex" justifyContent="center">
//         <TextField
//           variant="outlined"
//           placeholder="Search posts..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           style={{ width: '300px' }}
//         />
//         <Button variant="contained" color="primary" style={{ marginLeft: '1rem' }}>
//           Search
//         </Button>
//       </Box>

//       {filteredPosts.map((post) => (
//           // @ts-ignore

//   <Grid item xs={12} key={post.id}>
    
//     <Paper elevation={3} className="post-card" style={{ padding: '16px', marginBottom: '1rem', backgroundColor: '#f5f5f5' }}>
//     {/* // @ts-ignore

//     {post.imageUrl ? ( // Check if imageUrl exists

//         <img src={post.imageUrl} alt={post.title || 'Post Image'} style={{ width: '100%', height: 'auto', marginBottom: '1rem' }} />
//       ) : null} If imageUrl doesn't exist, don't render anything */}

//       <Typography variant="h6">{post.name || 'Untitled'}</Typography>
//       <Typography variant="subtitle1" color="textSecondary">
//         {post.title}
//       </Typography>
//       <Typography variant="body2">
//         <strong>Heading:</strong> {post.heading}
//       </Typography>
//       <Typography variant="body2">
//         <strong>Content:</strong> {post.content}
//       </Typography>
//       <Typography variant="body2">
//         <strong>Description:</strong> {post.description}
//       </Typography>
//       <Typography variant="caption" color="textSecondary">
//         <strong>Created At:</strong> {new Date(post.created_at).toLocaleString()}
//       </Typography>

//       {/* Comments Section */}
//       <Box mt={2}>
//         <Button variant="outlined" onClick={() => toggleCommentVisibility(post.id)}>
//           {commentVisibility[post.id] ? 'Hide Comments' : 'Show Comments'}
//         </Button>
//         {commentVisibility[post.id] && (
//           <>
//             <List>
//               {(post.topics || []).map(comment => (
//                 <ListItem key={comment.id}>
//                   <ListItemText primary={comment.content} secondary={new Date(comment.created_at).toLocaleString()} />
//                 </ListItem>
//               ))}
//             </List>
//             <TextField
//               variant="outlined"
//               label="Add a comment..."
//               value={comment[post.id] || ''}
//               onChange={(e) => setComment({ ...comment, [post.id]: e.target.value })}
//               fullWidth
//               margin="normal"
//             />
//             <Button variant="contained" color="primary" onClick={() => handleCommentSubmit(post.id)}>
//               Submit Comment
//             </Button>
//           </>
//         )}
//       </Box>
//     </Paper>
//   </Grid>
// ))}

//     </Container>
//   );
// };

// export default ForumPage;
