import PropTypes, { array } from "prop-types";
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  Button,
  TableRow,
  List, 
  ListItem, 
  ListItemText, 
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog, 
  DialogTitle, 
  DialogContent,
  FormControlLabel,
  Checkbox
} from "@mui/material";

import { Scrollbar } from "src/components/scrollbar";
import { getSelfAssessment } from "src/api/Api";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { convertToList } from "src/data/selfassessmentmap";

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
  
  const [email, setEmail] = useState(""); 
  const [openReport, setOpenReport] = useState(false); 
  const [openAction, setOpenAction] = useState(false); 
  const [listofQuestions, setList] = useState(new Map([])); 

  const router = useRouter();

  const handlegetAssessment = async (index, email)=>{
    const token = window.sessionStorage.getItem("token");
    setEmail(email);
    const res= await getSelfAssessment({token, email})
    if(res){
      setOpenReport(true);
      const list = await convertToList(res);
      setList(list)
    }
  }

  const itemTextStyle = {
    primary: {
      fontSize: "16px",
      fontWeight: 600,
      color: "black",
    },
    secondary: {
      fontSize: "14px",
      fontWeight: 600,
      color: "blue",
    },
  };

  const handleClickOpen = () => {
    setOpenAction(true);
  };

  const handleClose = () => {
    setOpenReport(false);
    setOpenAction(false);
  };

  const [selectedOption, setSelectedOption] = useState(null);
  const [status, setStatus] = useState(false);

  const handleReject = () => {
    setSelectedOption(null);
    setStatus(false);
  };

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
                <TableCell>Self Assessment</TableCell>
                <TableCell>Assign/Reject/Appointment</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((patient, index) => {
                if (!patient.AssigntoDoctor) {
                  return (
                    <TableRow key = {index}>
                      <TableCell>{patient.Firstname}</TableCell>
                      <TableCell>{patient.Lastname}</TableCell>
                      <TableCell>{patient.Patient}</TableCell>
                      <TableCell>
                        <Button onClick={() => handlegetAssessment(index, patient.Patient)} variant="contained" color="primary"> 
                          Report
                        </Button>
                        <Dialog             
                          BackdropProps={{ invisible: false }}
                          open={openReport}
                          onClose={handleClose}
                          maxWidth="md"
                          maxHeight="md">
                          <DialogTitle>Self Assessment Result</DialogTitle>
                          <DialogContent>
                            <List>
                              {Array.from(listofQuestions).map(([question, answer], index) => (
                                <ListItem key={index}>
                                  <ListItemText 
                                    primary={question} secondary={answer}      
                                    primaryTypographyProps={{ style: itemTextStyle.primary }}
                                    secondaryTypographyProps={{ style: itemTextStyle.secondary }}
                                  />
                                </ListItem>
                              ))}
                            </List>
                          </DialogContent>
                        </Dialog>  
                      </TableCell>
                      <TableCell>
                        <Button onClick={handleClickOpen}  variant="contained" color="primary">Action</Button>
                        <Dialog open={openAction} onClose={handleClose} maxwidth="md" maxheight="md">
                          <DialogTitle>Pick an action</DialogTitle>
                          <DialogContent>
  <div>
    <FormControlLabel
      control={
        <Checkbox
          checked={selectedOption === "bookAppointment"}
          onChange={(event) =>
            setSelectedOption(
              event.target.checked ? "bookAppointment" : null
            )
          }
        />
      }
      label="Book appointment"
      style={{ display: "block" }}
    />
    <FormControlLabel
      control={
        <Checkbox
          checked={selectedOption === "accept"}
          onChange={(event) =>
            setSelectedOption(event.target.checked ? "accept" : null)
          }
        />
      }
      label="Accept"
      style={{ display: "block" }}
    />
    <FormControlLabel
      control={
        <Checkbox
          checked={selectedOption === "reject"}
          onChange={(event) =>
            setSelectedOption(event.target.checked ? "reject" : null)
          }
          onClick={() => handleReject()}
         />
      }
      label="Reject"
      style={{ display: "block" }}
    />
    {selectedOption === "bookAppointment" && (
      <TextField
        label="Date"
        type="date"
        onChange={(event) => setStatus(true)}
      />
    )}
    {selectedOption === "accept" && (
      <FormControl>
        <InputLabel>Status</InputLabel>
        <Select
          value={status ? "Confirmed" : ""}
          onChange={(event) =>
            setStatus(event.target.value === "Confirmed")
          }
        >
          <MenuItem value="Confirmed">Confirmed</MenuItem>
          <MenuItem value="Pending">Pending</MenuItem>
        </Select>
      </FormControl>
    )}

  </div>
  <Button sx={{
    backgroundColor: '#4CAF50',
    color: '#ffffff',
    '&:hover': {
      backgroundColor: '#357a38',
    },
    mr: 2, // adds margin-right of 16px (default spacing unit)
  }}
  onClick={() => handleClickOpen} variant="contained" color="primary" margintop="10"> 
                          Save
                        </Button>
   <Button sx={{
    backgroundColor: '#4CAF50',
    color: '#ffffff',
    '&:hover': {
      backgroundColor: '#357a38',
    },
    mr: 2, // adds margin-right of 16px (default spacing unit)
  }}
  onClick={() => handleClose} variant="contained" color="primary"> 
                          Cancel
                        </Button>

                          </DialogContent>
                        </Dialog>  
                      </TableCell> 
                    </TableRow>
                  );
                }
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
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
