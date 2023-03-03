import Head from 'next/head';
import { Box, Button, Typography, Grid } from '@mui/material';
import React, { useState } from 'react';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';


const Page = () => {

  const [questions, setQuestions] = useState([
    {
      id: 1,
      question: 'Who are you?',
      provided_answer: ''
    },
    {
      id: 2,
      question: 'Where are you?',
      provided_answer: ''
    },
    {
      id: 3,
      question: 'How are you?',
      provided_answer: ''
    }
  ])

  const handleAnswer = (id, ans) => {
    const updated_questions = questions.map((obj) => {

      if(obj.id === id){
        obj['provided_answer'] = ans
      }

      return obj
    })
    console.log(updated_questions)
    setQuestions(updated_questions)
  }

  return(
    <>
      <Head>
        <title>
          Assessment | Medical Web Assistant
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Grid container>
          <Grid item xs={12} style={{ textAlign: 'center' }}>
            <Typography variant="h4">
              Questions
            </Typography>
          </Grid>
          <Grid item xs={12} style={{ marginTop: 20 }}>
            {questions.map((obj) => 
              <>
                <Grid item xs={12} style={{ textAlign: 'center' }}>
                  <Typography variant="h6">
                    {obj.question}
                  </Typography>
                </Grid>
                <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
                  <Button style={{ color: obj.provided_answer && 'Green' }} varient='outlined' onClick={(e) => handleAnswer(obj.id, true)}> Yes </Button>
                  <Button style={{ color: !obj.provided_answer && 'Red' }} varient='outlined' onClick={(e) => handleAnswer(obj.id, false)}> No </Button>
                </Grid>
              </>
            )}
          </Grid>
        </Grid>
      </Box>
    </>
  )
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
