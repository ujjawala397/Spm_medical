import PropTypes from "prop-types";

import {
  TableCell,
  TableRow,
} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";
import { useRouter } from "next/navigation";
export const AppointmentTableCounsellor = (props) => {
  const {
    items = null,
  } = props;
  
  const router = useRouter();
  if(items && !items.length){
    return <div>
    No data found
  </div>}
  return (  
    <Scrollbar sx={{ mb: 3 }}>
    
    {items?.map((appointment,idx) => {
      if (appointment) {
        return (
          <TableRow>

            <TableCell>{idx+1}</TableCell>
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