import PropTypes from "prop-types";

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
import { useRouter } from "next/navigation";
export const AppointmentTable = (props) => {
  const {
    items = [],
  } = props;
  
  const router = useRouter();
  
  let count=0;
  return (  

      <Scrollbar sx={{ mb: 3 }}>
              {items.map((appointment) => {
                count++;
                if (appointment) {
                  return (
                    <TableRow>

                      <TableCell>{count}</TableCell>  
                      <TableCell>Email :{appointment.Patient}</TableCell>
                      <TableCell>Doctor : {appointment.Doctor}</TableCell>
                      <TableCell>Counsellor : {appointment.Counsellor}</TableCell>
                      <TableCell>Appointment : {appointment.Appointment}</TableCell>
                      <TableCell>Assign Doctor : {appointment.AssignDoctor}</TableCell>
                      <TableCell>{appointment.Desciption}</TableCell>
                    </TableRow>
                  );
                }
              })}

      </Scrollbar>

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
