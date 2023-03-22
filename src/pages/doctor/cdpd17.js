import Head from "next/head";
import { Button,Box,Grid} from "@mui/material";
import { doctorGetAllAppointmentByDate } from "src/api/Api";
import { useState, useEffect } from "react";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { AppointmentTableDoctor } from "src/sections/doctors/appointment-table-doctor";

const Page = () => {
  const [doctorAppointmentList, setDoctorAppointmentList] = useState(null);
  const [date, setDate] = useState(""); 
  const handleSubmit =  async (event) => {
    //Dcotor Get appointment details by date
    setDate("2023-10-10");
  }
  useEffect(()=>{
    const fetchAppointments = async () => {
      if(date){
          // const token = window.sessionStorage.getItem("token");
          const token = "677d8902e808f1fa37d8469924ff95ce26c5a092";
          const res = await doctorGetAllAppointmentByDate({date,token});
          setDoctorAppointmentList(res);
          console.log(token)
        }
      }
      fetchAppointments()
    },[date])
    console.log({doctorAppointmentList})
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
            <Button onClick={handleSubmit}variant="contained" color="primary"> 
              View Appointments
            </Button>
            <AppointmentTableDoctor
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
