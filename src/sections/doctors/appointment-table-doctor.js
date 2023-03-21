import PropTypes from "prop-types";

import {
  TableCell,
  TableRow,
} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";
import { useRouter } from "next/navigation";
export const AppointmentTableDoctor = (props) => {
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
            <TableCell>{appointment.Appointment}</TableCell>  
            <TableCell>{appointment.Counselor}</TableCell>  
            <TableCell>{appointment.Doctor}</TableCell>    
            <TableCell>{appointment.Firstname} {appointment.Lastname}</TableCell>  
            <TableCell>{appointment.Patient}</TableCell>  
            <TableCell>{appointment.AssignDoctor}</TableCell>  
            
          </TableRow>
            );
            }
        })}

    </Scrollbar>

  );
};

AppointmentTableDoctor.propTypes = {
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
