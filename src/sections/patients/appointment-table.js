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
import { Scrollbar } from "src/components/scrollbar";
import { useRouter } from "next/navigation";

export const AppointmentTable = (props) => {
  const {
    items = [],
  } = props;
  
  const router = useRouter();
  
  let count=0;
  return (  

    <Box
          component="main"
          sx={{
          flexGrow: 1,
          py: 8
        }}>
        <Container maxWidth="xl">
      
              {items.map((appointment) => {
                count++;
                if (appointment) {
                  return (
                    
                    <TableRow >
                      <TableCell><Typography variant="h6">{count}</Typography></TableCell>  
                      <TableCell><Typography variant="h6">Email :{appointment.Patient}</Typography></TableCell>
                      <TableCell><Typography variant="h6">Doctor : {appointment.Doctor}</Typography></TableCell>
                      <TableCell><Typography variant="h6">Counsellor : {appointment.Counsellor}</Typography></TableCell>
                      <TableCell><Typography variant="h6">Appointment : {appointment.Appointment}</Typography></TableCell>
                      <TableCell><Typography variant="h6">Assign Doctor : {appointment.AssignDoctor}</Typography></TableCell>
                      <TableCell><Typography variant="h6">{appointment.Desciption}</Typography></TableCell>
                      <TableCell> <Button onClick={() => handlegetAssessment(index, patient.Patient)} variant="contained" color="primary"> 
                          Confirm
                        </Button></TableCell>
                      <TableCell> <Button onClick={() => handlegetAssessment(index, patient.Patient)} variant="contained" color="primary"> 
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
