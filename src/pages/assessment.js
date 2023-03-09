import Head from "next/head";
import {
  Box,
  Button,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { assesmentSubmission } from "src/api/Api";
import React, { useState } from "react";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";

const Page = () => {
  let obj = {}; 
  const [questions, setQuestions] = useState([
    {
      id: 1,
      question:
        "Over the past 2 weeks, how often have you been bothered by any of the following problems: Little interest or pleasure in doing things?",
      provided_answer: "",
    },
    {
      id: 2,
      question:
        "Over the past 2 weeks, how often have you been bothered by any of the following problems: Feeling down, depressed or hopless?",
      provided_answer: "",
    },
    {
      id: 3,
      question:
        "Over the past 2 weeks, how often have you been bothered by any of the following problems: Trouble falling asleep, staying asleep, or sleeping too much?",
      provided_answer: "",
    },
    {
      id: 4,
      question:
        "Over the past 2 weeks, how often have you been bothered by any of the following problems: Feeling tired or having little energy?",
      provided_answer: "",
    },
    {
      id: 5,
      question:
        "Over the past 2 weeks, how often have you been bothered by any of the following problems: Poor appetite or overeating?",
      provided_answer: "",
    },
    {
      id: 6,
      question:
        "Over the past 2 weeks, how often have you been bothered by any of the following problems: Feeling bad about yourself - or that youre a failure or have let yourself or your family down?",
      provided_answer: "",
    },
    {
      id: 7,
      question:
        "Over the past 2 weeks, how often have you been bothered by any of the following problems: Trouble concentrating on things, such as reading the newspaper or watching television?",
      provided_answer: "",
    },
    {
      id: 8,
      question:
        "Over the past 2 weeks, how often have you been bothered by any of the following problems: Moving or speaking so slowly that other people could have noticed. Or, the opposite - being so fidgety or restless that you have been moving around a lot more than usual?",
      provided_answer: "",
    },
    {
      id: 9,
      question:
        "Over the past 2 weeks, how often have you been bothered by any of the following problems: Thoughts that you would be better off dead or of hurting yourself in some way?",
      provided_answer: "",
    },
  ]);

  const handleAnswer = (id, ans) => {
    const updated_questions = questions.map((obj) => {
      if (obj.id === id) {
        obj["provided_answer"] = ans;
      }
      return obj;
    });
    setQuestions(updated_questions);
    console.log(updated_questions)
  };

  
  const handleSubmit = async (event) => {
    Object.keys(questions).map(function(key, index) {
      obj[questions[index].question] = questions[index].provided_answer+"";
    })
    console.log(obj);
    const token = window.sessionStorage.getItem("token");
    console.log("--------------------")
    console.log(obj)

    console.log(questions)

    const post_data = questions.map((obj) => {
      return { [obj.question]: obj.provided_answer }
    })

    const res = await assesmentSubmission({data:JSON.stringify(obj),token})
    console.log("Response ")
    console.log(res)
    console.log("final data ")
    console.log(post_data);  
  };

  return (
    <>
      <Head>
        <title>Assessment | Medical Web Assistant</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Grid container>
          <Grid item xs={12} style={{ textAlign: "center" }}>
            <Typography variant="h4">Quick Assessment</Typography>
          </Grid>

          <Grid item xs={12} style={{ margin: 40 }}>
            {questions.map((obj) => (
              <>
                <Grid item xs={12} style={{ marginBottom: 25 }}>
                  <b>
                    Q{obj.id}: {obj.question}
                  </b>
                  <br />

                  <b style={{ color: "grey" }}>
                    Option
                    <Select style={{ height: "40px" }}>
                      <MenuItem value="Not At All" onClick={(e) => handleAnswer(obj.id, 1)}>
                        Not At All{" "}
                      </MenuItem>
                      <MenuItem value="Several Days" onClick={(e) => handleAnswer(obj.id, 2)}>
                        Several Days
                      </MenuItem>
                      <MenuItem
                        value="More Than Half the Days"
                        onClick={(e) => handleAnswer(obj.id, 3)}
                      >
                        More Than Half the Days
                      </MenuItem>
                      <MenuItem value="Nearly Every Day" onClick={(e) => handleAnswer(obj.id, 4)}>
                        Nearly Every Day
                      </MenuItem>
                    </Select>
                  </b>
                </Grid>
              </>
            ))}
            {/* <Button 
            fullWidth
            onClick={(e) => {
                       
                     
          }}> Submit</Button> */}
          <Button
            fullWidth
            onClick={handleSubmit}> Submit</Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
