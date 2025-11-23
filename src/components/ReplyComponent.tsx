import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';

const ReplyComponent: React.FC<{ questionId: number }> = ({  }) => {
  const [reply, setReply] = useState('');
  const [replies,] = useState([]);

//   const handleReplySubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(`/api/questions/${questionId}/replies`, { reply });
//       setReply('');
//     } catch (error) {
//       console.error('Error posting reply', error);
//     }
//   };

  return (
    <div>
      <form >
        <TextField
          label="Your Reply"
          variant="outlined"
          fullWidth
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" color="primary" style={{ marginTop: '10px' }}>
          Reply
        </Button>
      </form>
      <Typography variant="h6" style={{ marginTop: '20px' }}>Replies:</Typography>
      {replies.map((reply: any, index: number) => (
        <Typography key={index} style={{ marginLeft: '20px' }}>
          {reply.reply}
        </Typography>
      ))}
    </div>
  );
};

export default ReplyComponent;
