import Head from 'next/head';
import { Box, Button, Typography, Grid } from '@mui/material';
import React, { useState } from 'react';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';


const Page = () => {

  const [questions, setQuestions] = useState([
    {
      id: 1,
      question: 'Over the past 2 weeks, how often have you been bothered by any of the following problems: Little interest or pleasure in doing things?',
      provided_answer: ''
    },
    {
      id: 2,
      question: 'Over the past 2 weeks, how often have you been bothered by any of the following problems: Feeling down, depressed or hopless?',
      provided_answer: ''
    },
    {
      id: 3,
      question: 'Over the past 2 weeks, how often have you been bothered by any of the following problems: Trouble falling asleep, staying asleep, or sleeping too much?',
      provided_answer: ''
    },
    {
      id: 4,
      question: 'Over the past 2 weeks, how often have you been bothered by any of the following problems: Feeling tired or having little energy?',
      provided_answer: ''
    },
    {
      id: 5,
      question: 'Over the past 2 weeks, how often have you been bothered by any of the following problems: Poor appetite or overeating?',
      provided_answer: ''
    },
    {
      id: 6,
      question: 'Over the past 2 weeks, how often have you been bothered by any of the following problems: Feeling bad about yourself - or that youre a failure or have let yourself or your family down?',
      provided_answer: ''
    },
    {
      id: 7,
      question: 'Over the past 2 weeks, how often have you been bothered by any of the following problems: Trouble concentrating on things, such as reading the newspaper or watching television?',
      provided_answer: ''
    },
    {
      id: 8,
      question: 'Over the past 2 weeks, how often have you been bothered by any of the following problems: Moving or speaking so slowly that other people could have noticed. Or, the opposite - being so fidgety or restless that you have been moving around a lot more than usual?',
      provided_answer: ''
    },
    {
      id: 9,
      question: 'Over the past 2 weeks, how often have you been bothered by any of the following problems: Thoughts that you would be better off dead or of hurting yourself in some way?',
      provided_answer: ''
    },
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
              Assessment
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
                  <Button style={{ color: obj.provided_answer  }} varient='outlined' onClick={(e) => handleAnswer(obj.id, 1)}> Not At All </Button>
                  <Button style={{ color: obj.provided_answer  }} varient='outlined' onClick={(e) => handleAnswer(obj.id, 2)}> Several Days </Button>
                  <Button style={{ color: obj.provided_answer  }} varient='outlined' onClick={(e) => handleAnswer(obj.id, 3)}> More THan Half the Days </Button>
                  <Button style={{ color: obj.provided_answer  }} varient='outlined' onClick={(e) => handleAnswer(obj.id, 4)}> Nearly Every Day </Button>
                </Grid>
              </>
            )}
          </Grid>
          <Button onClick={(e) => console.log("submit")} > Submit</Button>
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
