import Head from "next/head";
import { Box,Grid} from "@mui/material";
import { doctorGetAllAppointmentByDate } from "src/api/Api";

import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";

const handleSubmit =  async (event) => {
  //Dcotor Get appointment details by date
  const token = window.sessionStorage.getItem("token");
  const res = await doctorGetAllAppointmentByDate("",token);
  console.log(res);
}

const Page = () => {
  
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
            <button onClick={handleSubmit}>cdpd17 </button>
          </Grid>
        </>
      </Box>
    </>
  );
};
Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
