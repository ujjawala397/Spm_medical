import Head from "next/head";
import { Box,Grid} from "@mui/material";
import { counsellorGetAllAppointmentByDate } from "src/api/Api";
import { useState, useEffect } from "react";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";

const Page = () => {
  
  const [date, setDate] = useState(""); 
  const handleSubmit =  async (event) => {
      //Counsellor Get appointment details by date
      const token = window.sessionStorage.getItem("token");
      setDate("2023-10-10");
      console.log(token)
      const res = await counsellorGetAllAppointmentByDate({date,token});
      console.log(res);
  }
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
        <>
          <Grid item xs={12} style={{ textAlign: "center" }}>
            <button onClick={handleSubmit}>View Appointments (cdpd14) </button>
          </Grid>
        </>
      </Box>
    </>
  );
};
Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
