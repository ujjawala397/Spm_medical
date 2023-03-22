import PropTypes from "prop-types";

import {
  TableCell,
  TableRow,
  Typography,
  Box,
  Button
} from "@mui/material";

import { useRouter } from "next/navigation";
import { textAlign } from "@mui/system";
export const AppointmentTableCounsellor = (props) => {
  const {
    items = null,
  } = props;
  const router = useRouter();
  const handleConfirm=()=>{
    router.push('/patient/confirmation')
  } 
  const handleReject = ()=>{
    router.push('/patient/rejection')
  } 
  if(items && !items.length){
    return <div>
    No data found
  </div>}
  return (  
    <Box
          component="main"
          sx={{
          flexGrow: 1,
          py: 8,
        }}>
    
    {items?.map((appointment,idx) => {
      if (appointment) {
        return (
          <TableRow>

            <TableCell><Typography variant="h6">{idx+1}</Typography></TableCell>
            <TableCell><Typography variant="h6">{appointment.Appointment}</Typography></TableCell>
            <TableCell><Typography variant="h6">{appointment.Counselor}</Typography></TableCell>
            <TableCell><Typography variant="h6">{appointment.Doctor}</Typography></TableCell> 
            <TableCell><Typography variant="h6">{appointment.Firstname} {appointment.Lastname}</Typography></TableCell>
            <TableCell><Typography variant="h6">{appointment.Patient}</Typography></TableCell>
            <TableCell><Typography variant="h6">{appointment.AssignDoctor}</Typography></TableCell>
            <TableCell><Button onClick={handleConfirm} variant="contained" color="primary">Confirm</Button></TableCell>
            <TableCell><Button onClick={handleReject} variant="contained" color="error">Reject</Button></TableCell>
          </TableRow>
            );
            }
        })}

    </Box>

  );
};

AppointmentTableCounsellor.propTypes = {
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