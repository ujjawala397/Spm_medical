import Head from 'next/head';
import React from 'react'
import { Box, Container, Stack, Typography } from '@mui/material';

import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';


const Page = () => {
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState({
    closeContact: "",
    tested: "",
    travelHistory: "",
    difficultyBreathing: "",
    age: "",
    symptomsSet1: "",
    symptomsSet2: "",
  });

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
      <Container maxWidth="lg">
        <Stack spacing={3}>
          <Typography variant="h4">
            Settings
          </Typography>
          <Typography variant="h6" >
              Have you been in close contact with a confirmed or probable case of COVID-19
              <button> Yes </button>
              <button> No </button>
          </Typography>
        </Stack>
      </Container>
    </Box>
  </>
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
