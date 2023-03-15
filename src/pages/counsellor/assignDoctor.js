import { useCallback, useEffect, useMemo, useState } from "react";
import Head from "next/head";
import { subDays, subHours } from "date-fns";

import { Box, Button, Container, Stack, SvgIcon, Typography } from "@mui/material";
import { useSelection } from "src/hooks/use-selection";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { applyPagination } from "src/utils/apply-pagination";
import { PatientsTable } from "src/sections/patients/patients-table";
import { getCounsellorPatients } from "src/api/Api";

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

  return (
    <>
      <Head>
        <title>Assign Doctor</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Typography align="center" sx={{ mb: 3 }} variant="h5">
          Assign Doctor to patient
        </Typography>        
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
