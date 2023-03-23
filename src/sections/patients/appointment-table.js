import PropTypes from "prop-types";

import {
  TableRow,
  TableCell,
  Button,
  Typography,
  Card,
  Container,
  Box
} from "@mui/material";
import { useRouter } from "next/navigation";

export const AppointmentTable = (props) => {
  const {
    items = null,
  } = props;
  

  const router = useRouter();
  const handleConfirm = () =>{
    router.push('/patient/confirmation')
  }
  const handleReject=()=>{
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
          py: 8
        }}>
        <Container maxWidth="xl">
      
              {items?.map((appointment,idx) => {
                if (appointment) {
                  return (
                    
                    <TableRow >
                      <TableCell><Typography variant="h6">{idx+1}</Typography></TableCell>  
                      <TableCell><Typography variant="h6">Email :{appointment.Patient}</Typography></TableCell>
                      <TableCell><Typography variant="h6">Doctor : {appointment.Doctor}</Typography></TableCell>
                      <TableCell><Typography variant="h6">Counsellor : {appointment.Counsellor}</Typography></TableCell>
                      <TableCell><Typography variant="h6">Appointment : {appointment.Appointment}</Typography></TableCell>
                      <TableCell><Typography variant="h6">Assign Doctor : {appointment.AssignDoctor}</Typography></TableCell>
                      <TableCell><Typography variant="h6">{appointment.Desciption}</Typography></TableCell>
                      <TableCell> <Button onClick={handleConfirm} variant="contained" color="primary"> 
                          Confirm
                        </Button></TableCell>
                      <TableCell> <Button onClick={handleReject} variant="contained" color="error"> 
                          Reject
                        </Button></TableCell>
                    </TableRow>

                  );
                }
              })}
        </Container>
    </Box>
             
  );
};

AppointmentTable.propTypes = {
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
