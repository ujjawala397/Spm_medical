import Head from "next/head";
import { Button,Box,Grid} from "@mui/material";
import { getAllPatientAppointmentByDate } from "src/api/Api";

import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { AppointmentTable } from "src/sections/patients/appointment-table";
import { useState } from "react";



const Page = () => {
    
    const [appointmentList, setAppointmentList] = useState(null);
    const handleSubmit =  async (event) => {
        //Patient Get appointment details
        const token = window.sessionStorage.getItem("token");
        const res = await getAllPatientAppointmentByDate(token);
        setAppointmentList(res);
        console.log(res);
    }
  return (
    <>
      <Head>
        <title>Doctor Appointments</title>
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
            <Button onClick={handleSubmit} variant="contained" color="primary">Show appointments </Button>
            <AppointmentTable
              items={appointmentList}
            />
          </Grid>

        </>

      </Box>
    </>
  );
};
Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
