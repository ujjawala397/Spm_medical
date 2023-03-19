import PropTypes from "prop-types";
import { format } from "date-fns";
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";
import { getSelfAssessment } from "src/api/Api";
import { useState } from "react";
import { useRouter } from "next/navigation";
export const PatientsTable = (props) => {
  const {
    count = 0,
    items = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => {},
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    page = 0,
    rowsPerPage = 0,
    selected = [],
  } = props;
  
  const [email,setEmail]=useState('');
  const router = useRouter();
  const handleSubmit = (email) =>{
    handleEmailSelect(email);
    handlegetAssessment();
  }
  const handleEmailSelect = (data) =>{
    setEmail(data);
    console.log(data)
  }
  const handlegetAssessment = async (event)=>{
    const token = window.sessionStorage.getItem("token");
    const res= await getSelfAssessment({data:"ujjawala397@gmail.com",token})
    console.log(res)
    if (res){
      router.push('/counsellor/assignDoctor');
    }
  }
  return (
    
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((patient) => {
                if (!patient.AssigntoDoctor) {
                  return (
                    <TableRow>
                      <TableCell>{patient.Firstname}</TableCell>
                      <TableCell>{patient.Lastname}</TableCell>
                      <TableCell>{patient.Patient}</TableCell>
                      <button onClick={() => handleSubmit(patient.Patient)}> Status</button>
                    </TableRow>
                  );
                }
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
    </Card>
  );
};

PatientsTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array,
};
