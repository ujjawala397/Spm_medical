import Head from "next/head";
import { Button,Box,Grid,TextField} from "@mui/material";
import { getAllcounsellorAppointmentByDate } from "src/api/Api";
import { useState, useEffect } from "react";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { AppointmentTableCounsellor } from "src/sections/counsellor/appointment-table-counsellor";
const Page = () => {
  const [counsellorAppointmentList, setCounsellorAppointmentList] = useState(null);
  const formattedDateTime = null;
  const minDateTime = new Date().toISOString().slice(0, -8);
  const [date, setDate] = useState(""); 
  const handleSubmit =  async (event) => {
      //Counsellor Get appointment details by date
      
    }
    useEffect(()=>{
      const fetchAppointments = async () => {
        if(date){
          const token = window.sessionStorage.getItem("token");
          // const token= "febab8f0f5e9a0a58d99f844981bc82720eca7b8";
          const res = await getAllcounsellorAppointmentByDate({date,token});
          setCounsellorAppointmentList(res);
          console.log(token)
        }
      }
      fetchAppointments()
    },[date])
    console.log({counsellorAppointmentList})

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
