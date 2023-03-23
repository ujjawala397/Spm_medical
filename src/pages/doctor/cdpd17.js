import Head from "next/head";
import { TextField,Button,Box,Grid} from "@mui/material";
import { doctorGetAllAppointmentByDate } from "src/api/Api";
import { useState, useEffect } from "react";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { AppointmentTableDoctor } from "src/sections/doctors/appointment-table-doctor";

const Page = () => {
  const [doctorAppointmentList, setDoctorAppointmentList] = useState(null);
  const formattedDateTime = null;
  const minDateTime = new Date().toISOString().slice(0, -8);
  const [date, setDate] = useState(""); 
  const handleSubmit =  async (event) => {
    //Dcotor Get appointment details by date
  }
  useEffect(()=>{
    const fetchAppointments = async () => {
      if(date){
          const token = window.sessionStorage.getItem("token");
          // const token = "677d8902e808f1fa37d8469924ff95ce26c5a092";
          const res = await doctorGetAllAppointmentByDate({date,token});
          setDoctorAppointmentList(res);
          console.log(token)
        }
      }
      fetchAppointments()
    },[date])
    console.log({doctorAppointmentList})
    const handleDateTimeChange = (event) => {
      setDate(event.target.value)
    }
    useEffect(()=>{
      const settingDate = async () => {
        const newDateTime = new Date(date);
        console.log(date);
        // setDate(
        //   {newDateTime.toISOString().substring(0, 10) + "T" + newDateTime.toTimeString().substring(0, 8)}
        // );
      }
      settingDate()
    },[date])
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
        <Grid item xs={8} style={{ textAlign: "center" }}>
            <TextField
              variant="outlined"
              required
              InputLabelProps={{
                shrink: true,
                style: { marginTop: "0.2rem" },
              }}
              format="yyyy-MM-dd"
              value={formattedDateTime}
              inputProps={{ min: minDateTime }}
              label="Date and Time"
              type="date"
              onChange={(event) => handleDateTimeChange(event)}
            />
            <br/>
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
