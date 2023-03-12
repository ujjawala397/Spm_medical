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
import { useRouter } from "next/navigation";
const Page = () => {
  const router = useRouter();

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
  const obj = questions.reduce((acc, question, key) => {
    return {
      ...acc,
      [question.question]: question.provided_answer,
    };
  }, []);

  const handleAnswer = (id, ans) => {
    const updated_questions = questions.map((obj) => {
      if (obj.id === id) {
        obj["provided_answer"] = ans;
      }
      return obj;
    });
    setQuestions(updated_questions);
  };

  const handleSubmit = async (event) => {
    for (let i = 0; i < 9; i++) {
      if (!questions[i].provided_answer) {
        alert("Please answer all questions");
        return;
      }
    }
    const token = window.sessionStorage.getItem("token");
    let req = {};
    for (let i = 0; i < 9; i++) {
      req[`Question${i + 1}`] = questions[i].provided_answer + "";
    }
    console.log(req);
    const res = await assesmentSubmission({ data: req, token });

    console.log(res);
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
        <form container required>
          <Grid item xs={12} style={{ textAlign: "center" }}>
            <Typography variant="h4">Assessment</Typography>
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
                    <FormControl required>
                      <Select style={{ height: "40px" }}>
                        <MenuItem
                          value="Not At All"
                          defaultValue=""
                          required
                          onClick={(e) => handleAnswer(obj.id, 1)}
                        >
                          Not At All{" "}
                        </MenuItem>
                        <MenuItem
                          value="Several Days"
                          defaultValue=""
                          required
                          onClick={(e) => handleAnswer(obj.id, 2)}
                        >
                          Several Days
                        </MenuItem>
                        <MenuItem
                          defaultValue=""
                          required
                          value="More Than Half the Days"
                          onClick={(e) => handleAnswer(obj.id, 3)}
                        >
                          More Than Half the Days
                        </MenuItem>
                        <MenuItem
                          defaultValue=""
                          required
                          value="Nearly Every Day"
                          onClick={(e) => handleAnswer(obj.id, 4)}
                        >
                          Nearly Every Day
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </b>
                </Grid>
              </>
            ))}
            <Button fullWidth onClick={handleSubmit}>
              {" "}
              Submit
            </Button>
          </Grid>
        </form>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
