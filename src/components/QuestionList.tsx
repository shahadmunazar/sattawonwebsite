import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Card, CardContent, Typography } from '@mui/material';
// import ReplyComponent from './ReplyComponent';

const QuestionList: React.FC = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await axios.get('/api/questions');
      setQuestions(response.data);
    };

    fetchQuestions();
  }, []);

  return (
    <Grid container spacing={4}>
      {questions.map((question: any) => (
        <Grid item xs={12} sm={6} md={4} key={question.id}>
          <Card>
            <CardContent>
              <Typography variant="h5">{question.question}</Typography>
              {/* <ReplyComponent questionId={question.id} /> */}
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default QuestionList;
