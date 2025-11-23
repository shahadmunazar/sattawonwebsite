import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import axios from 'axios';

interface CreateQuestionProps {
  onQuestionCreated: (newQuestion: any) => void;
}

const CreateQuestion: React.FC<CreateQuestionProps> = ({ onQuestionCreated }) => {
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
      
      // Call the callback with the new question
      onQuestionCreated(response.data);
      // Reset the form
      setQuestion('');
      setImage(null);
    } catch (error) {
      console.error('Error creating question:', error);
      // Handle error (e.g., show a notification)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        fullWidth
        required
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files?.[0] || null)}
      />
      <Button type="submit" variant="contained" color="primary">
        Post Question
      </Button>
    </form>
  );
};

export default CreateQuestion;
