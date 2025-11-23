import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, InputLabel } from '@mui/material';

const CreateQuestion: React.FC<{ onQuestionCreated: (question: any) => void }> = ({ onQuestionCreated }) => {
  const [question, setQuestion] = useState('');
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('question', question);
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await axios.post('https://apisattaking.sattakingmaker.com/api/user/add-questions', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      onQuestionCreated(response.data); // Pass the newly created question to the parent
      setQuestion('');
      setImage(null);
    } catch (error) {
      console.error('Error creating question', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Your Question"
        variant="outlined"
        fullWidth
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        required
      />
      <InputLabel htmlFor="image-upload" style={{ marginTop: '10px' }}>
        Upload Image
      </InputLabel>
      <input
        id="image-upload"
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files?.[0] || null)}
      />
      <Button type="submit" variant="contained" color="primary" style={{ marginTop: '10px' }}>
        Post Question
      </Button>
    </form>
  );
};

export default CreateQuestion;
