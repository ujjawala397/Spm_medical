import Head from "next/head";
import { Button,Box,Grid} from "@mui/material";
import { doctorGetAllAppointment } from "src/api/Api";
import { useState, useEffect } from "react";
import { DoctorManagePatientTable } from "src/sections/doctors/doctor-manage-patient-tables";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
const Page = () => {
  const [doctorAppointmentList, setDoctorAppointmentList] = useState(null);
    const handleSubmit =  async (event) => {
        //Patient Get appointment details
        const token = window.sessionStorage.getItem("token");
        // const token = "b5bf1ac0710b6389a7cec45059a1635beac30153"
        const res = await doctorGetAllAppointment(token);
        setDoctorAppointmentList(res);
        console.log(res);
    }
  return (
    <>
      <Head>
        <title>Doctor manage PatientList </title>
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
            View Assigned Patients
            </Button>
            <DoctorManagePatientTable
              items={doctorAppointmentList}
            />
          </Grid>
        </>
      </Box>
    </>
  );
};
Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
