import { useCallback, useEffect, useMemo, useState } from "react";
import Head from "next/head";
import { subDays, subHours } from "date-fns";

import { Box, Button, Container, Stack, SvgIcon, Typography } from "@mui/material";
import { useSelection } from "src/hooks/use-selection";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { applyPagination } from "src/utils/apply-pagination";
import { PatientsTable } from "src/sections/patients/patients-table";
import { getCounsellorDoctors } from "src/api/Api";

const now = new Date();

const data = [];

const usepatients = (page, rowsPerPage) => {
  return useMemo(() => {
    return applyPagination(data, page, rowsPerPage);
  }, [page, rowsPerPage]);
};

const useCustomerIds = (patients) => {
  return useMemo(() => {
    return patients.map((customer) => customer.id);
  }, [patients]);
};

const Page = () => {
  
  const [doctorsList, setDoctorsList] = useState([]);

  useEffect(() => {
    const getDoctorsList = async () => {
        const token =window.sessionStorage.getItem("token")
        console.log(token)
        return await getCounsellorDoctors(token);
    };

    getDoctorsList().then((doctors) => {
      setDoctorsList(doctors);
      console.log(doctors);
    });
  }, []);
  
  return (
    <>
      <Head>
        <title>Doctors List</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">Doctors List</Typography>
                <Stack alignItems="center" direction="row" spacing={1}></Stack>
              </Stack>
            </Stack>
            
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
