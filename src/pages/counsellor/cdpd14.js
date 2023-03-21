import Head from "next/head";
import { Button,Box,Grid} from "@mui/material";
import { counsellorGetAllAppointmentByDate } from "src/api/Api";
import { useState, useEffect } from "react";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { AppointmentTableCounsellor } from "src/sections/counsellor/appointment-table-counsellor";
const Page = () => {
  const [counsellorAppointmentList, setCounsellorAppointmentList] = useState([]);
  const [date, setDate] = useState(""); 
  const handleSubmit =  async (event) => {
      //Counsellor Get appointment details by date
      // const token = window.sessionStorage.getItem("token");
      const token= "febab8f0f5e9a0a58d99f844981bc82720eca7b8";
      setDate("2023-10-10");
      console.log(token)
      const res = await counsellorGetAllAppointmentByDate({date,token});
      setCounsellorAppointmentList(res);
      console.log(res);
  }
  return (
    <>
      <Head>
        <title>Counsellor appointmentList </title>
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
            <Button onClick={handleSubmit}variant="contained" color="primary"> 
            View Appointments (cdpd14)
            </Button>
            <AppointmentTableCounsellor
              items={counsellorAppointmentList}
            />
          </Grid>
        </>
      </Box>
    </>
  );
};
Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
