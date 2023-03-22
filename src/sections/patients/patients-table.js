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
  Checkbox,
  Typography,
} from "@mui/material";

import { Scrollbar } from "src/components/scrollbar";
import {
  counsellorAssignPatientToDoctor,
  counsellorGetAllDoctors,
  getCounsellorDoctors,
  getSelfAssessment,
} from "src/api/Api";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { convertToList } from "src/data/selfassessmentmap";
import { putCounsellorPatients } from "src/api/Api";
import { status } from "nprogress";

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

  const [openReport, setOpenReport] = useState(false);
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  const [doctors, setDoctors] = useState(["hello"]);
  const [listofQuestions, setList] = useState(new Map([]));

  const [openAction, setOpenAction] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [doctor, setDoctor] = useState({});
  const [date, setDate] = useState(null);
  const [description, setDescription] = useState("");
  const [isSaveDisabled, setIsSaveDisabled] = useState(false);

  const [errorMessageReport, setErrorMessageReport] = useState("");
  const [errorMessageAction, setErrorMessageAction] = useState("");
  const [successMessageAction, setSuccessMessageAction] = useState("");

  const formattedDateTime = null;
  const minDateTime = new Date().toISOString().slice(0, -8);
  useEffect(() => {
    setIsSaveDisabled(selectedOption === null);
  }, [selectedOption]);

  const styles = {
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

  const router = useRouter();

  const handleClickOpen = (email, id) => {
    setOpenAction(true);
    setEmail(email);
    setId(id);
    console.log(window.sessionStorage.getItem("token"));
    setToken(window.sessionStorage.getItem("token"));
  };

  const handleClose = async () => {
    console.log("Here");
    setErrorMessageAction("");
    setSuccessMessageAction("");
    setOpenReport(false);
    setOpenAction(false);
  };

  const handlegetAssessment = async (email) => {
    const token = window.sessionStorage.getItem("token");
    console.log(email + " Email");
    const res = await getSelfAssessment({ token, email });
    if (res) {
      setOpenReport(true);
      const list = await convertToList(res);
      setList(list);
    }
    //TODO ERROR
  };

  const handleCheckboxChange = (event) => {
    setSelectedOption(event.target.checked ? event.target.name : null);
    setIsSaveDisabled(event.target.checked);
    setErrorMessageAction("");
    setSuccessMessageAction("");
    setErrorMessageReport("");
  };

  const handleDateTimeChange = (event) => {
    const newDateTime = new Date(event.target.value);
    setDate(
      newDateTime.toISOString().substring(0, 10) + "T" + newDateTime.toTimeString().substring(0, 8)
    );
    setErrorMessageAction("");
    setSuccessMessageAction("");
    setErrorMessageReport("");
  };

  const handleAction = async () => {
    console.log(email + " Email");
    console.log(id + " Id");
    console.log(selectedOption);
    if (
      (selectedOption === "bookAppointment" && (description.length === 0 || !date)) ||
      (selectedOption === "reject" && description.length === 0) ||
      (selectedOption === "assign" && !doctor)
    ) {
      setErrorMessageAction("Fill the required information before saving");
    } else {
      if (selectedOption === "assign") {
        //TODO: CALL ASSIGN DOCTOR API
        const req = {
          id: id,
          Patient: email,
          Doctor: doctor.email,
          Description: "Assigned patient to doctor",
        };
        console.log(req);
        await counsellorAssignPatientToDoctor(req, token).then((res) => {
          if (res.Error) {
            setErrorMessageAction(res.Error);
            setSuccessMessageAction("");
          } else if (res.id || res.detail) {
            setErrorMessageAction("");
            setSuccessMessageAction("Patient assigned successfully!");
          } else {
            setErrorMessageAction(
              "Action Failed. Something went wrong. Please contact the administrator"
            );
            setSuccessMessageAction("");
          }
        });
      } else {
        let patientStatus = null;
        let successMessage = "";
        if (selectedOption === "reject") {
          patientStatus = false;
          successMessage = "Patient has been rejected";
        } else {
          patientStatus = true;
          if (selectedOption === "bookAppointment") {
            successMessage = "You have booked an appointment with the patient";
          } else {
            successMessage = "You have assign the patient to a doctor";
          }
        }

        const data = {
          id: id,
          Patient: email,
          Appointment: date,
          Accept: patientStatus,
          Description: description,
        };

        const response = await putCounsellorPatients(data, token);
        console.log("Put Counselor Response1: " + response.id);
        console.log("Put Counselor Response2: " + response.Error);
        if (response.Error) {
          setErrorMessageAction(response.Error);
          setSuccessMessageAction("");
        } else if (response.id || response.detail) {
          setErrorMessageAction("");
          setSuccessMessageAction(successMessage);
        } else {
          setErrorMessageAction(
            "Action Failed. Something went wrong. Please contact the administrator"
          );
          setSuccessMessageAction("");
        }
      }
    }
    setDescription("");
    setSelectedOption("");
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
                    <TableRow key={index}>
                      <TableCell>{patient.Firstname}</TableCell>
                      <TableCell>{patient.Lastname}</TableCell>
                      <TableCell>{patient.Patient}</TableCell>
                      <TableCell>
                        <Button
                          onClick={() => handlegetAssessment(patient.Patient)}
                          variant="contained"
                          color="primary"
                        >
                          Report
                        </Button>
                        {errorMessageReport && (
                          <Typography color="error" variant="body1">
                            {errorMessageReport}
                          </Typography>
                        )}
                        <Dialog
                          BackdropProps={{
                            invisible: true,
                            style: { opacity: 1 },
                          }}
                          maxWidth="lg"
                          fullWidth={true}
                          PaperProps={{
                            style: {
                              maxHeight: "90vh",
                              minHeight: "90vh",
                            },
                          }}
                          open={openReport}
                          onClose={handleClose}
                        >
                          <DialogTitle>Self Assessment Result</DialogTitle>
                          <DialogContent>
                            <List>
                              {Array.from(listofQuestions).map(([question, answer], index) => (
                                <ListItem key={index}>
                                  <ListItemText
                                    primary={question}
                                    secondary={answer}
                                    primaryTypographyProps={{ style: styles.primary }}
                                    secondaryTypographyProps={{ style: styles.secondary }}
                                  />
                                </ListItem>
                              ))}
                            </List>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                      <TableCell>
                        <Button
                          onClick={async () => {
                            getCounsellorDoctors(window.sessionStorage.getItem("token")).then(
                              (val) => {
                                setDoctors(val);
                              }
                            );
                            handleClickOpen(patient.Patient, patient.id);
                          }}
                          variant="contained"
                          color="primary"
                        >
                          Action
                        </Button>
                        <Dialog
                          BackdropProps={{
                            invisible: true,
                            style: { opacity: 1 },
                          }}
                          maxWidth="sm"
                          fullWidth={true}
                          PaperProps={{
                            style: {
                              maxHeight: "80vh",
                              minHeight: "40vh",
                            },
                          }}
                          open={openAction}
                          onClose={handleClose}
                        >
                          <DialogTitle>Pick an action</DialogTitle>
                          <DialogContent>
                            <div>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    name="bookAppointment"
                                    checked={selectedOption === "bookAppointment"}
                                    onChange={(event) => handleCheckboxChange(event)}
                                  />
                                }
                                label="Book appointment"
                                style={{ display: "block" }}
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    name="assign"
                                    checked={selectedOption === "assign"}
                                    onChange={(event) => handleCheckboxChange(event)}
                                  />
                                }
                                label="Assign a doctor"
                                style={{ display: "block" }}
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    name="reject"
                                    checked={selectedOption === "reject"}
                                    onChange={(event) => handleCheckboxChange(event)}
                                  />
                                }
                                label="Reject"
                                style={{ display: "block" }}
                              />
                              {selectedOption === "bookAppointment" && (
                                <>
                                  <TextField
                                    variant="outlined"
                                    size="small"
                                    required
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{
                                      shrink: true,
                                      style: { marginTop: "0.2rem" },
                                    }}
                                    format="yyyy-MM-dd'T'HH:mm"
                                    value={formattedDateTime}
                                    inputProps={{ min: minDateTime }}
                                    label="Date and Time"
                                    type="datetime-local"
                                    onChange={(event) => handleDateTimeChange(event)}
                                  />
                                  <TextField
                                    variant="outlined"
                                    size="small"
                                    required
                                    fullWidth
                                    margin="none"
                                    multiline
                                    rows={4}
                                    value={description}
                                    label="Description"
                                    type="description"
                                    onChange={(event) => {
                                      setDescription(event.target.value);
                                      setErrorMessageAction("");
                                      setErrorMessageReport("");
                                      setSuccessMessageAction("");
                                    }}
                                  />
                                </>
                              )}
                              {selectedOption === "assign" && (
                                <FormControl fullWidth>
                                  <InputLabel>Doctor Name</InputLabel>
                                  <Select
                                    onChange={(event) => {
                                      setDoctor(event.target.value);
                                    }}
                                  >
                                    {doctors.map((doctor) => {
                                      return (
                                        <MenuItem value={doctor}>
                                          {doctor.first_name + " " + doctor.last_name}
                                        </MenuItem>
                                      );
                                    })}
                                  </Select>
                                </FormControl>
                              )}
                              {selectedOption === "reject" && (
                                <>
                                  <TextField
                                    variant="outlined"
                                    size="small"
                                    required
                                    fullWidth
                                    margin="normal"
                                    multiline
                                    rows={4}
                                    value={description}
                                    label="Reason for Rejection"
                                    type="description"
                                    onChange={(event) => {
                                      setDescription(event.target.value);
                                      setErrorMessageReport("");
                                      setSuccessMessageAction("");
                                    }}
                                  />
                                </>
                              )}
                            </div>
                            <Button
                              sx={{
                                backgroundColor: "#4CAF50",
                                color: "#ffffff",
                                "&:hover": {
                                  backgroundColor: "#357a38",
                                },
                                mr: 2,
                                mt: 1,
                              }}
                              disabled={isSaveDisabled}
                              onClick={() => handleAction(event, patient.Patient)}
                              variant="contained"
                              color="primary"
                              margintop="10"
                            >
                              Save
                            </Button>
                            {successMessageAction && (
                              <Typography color="primary" variant="body1" fontWeight="bold">
                                {successMessageAction}
                              </Typography>
                            )}
                            {errorMessageAction && (
                              <Typography color="error" variant="body1" fontWeight="bold">
                                {errorMessageAction}
                              </Typography>
                            )}
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
