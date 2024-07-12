import React, { useState } from "react";
import { Modal, Box, TextField, Button, Typography } from "@mui/material";
import Map from "@/components/map/Map"; // Make sure the path is correct
import ModalWrapper from "@/components/ModalWrapper";
import { add } from "date-fns";

interface CreateProjectModalProps {
  open: boolean;
  onClose: () => void;
}

const CreateCustomerModal: React.FC<CreateProjectModalProps> = ({
  open,
  onClose,
}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [type, setType] = useState("");
  const [organization, setOrganization] = useState("");
  const [title, setTitle] = useState("");
  const [projects, setProjects] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [secondAddress, setSecondAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");


  const handleSave = () => {
    onClose();
  };

  return (
    <ModalWrapper open={open} onClose={onClose}>
        <Box>
        <Typography variant="h4" component="h2" gutterBottom>
          New Customer
        </Typography>
       
      <Box sx={{display:'flex', flexDirection:'row'}}>
      <Box sx={{ flex: 1, mr: 2 }}>
        <TextField
          fullWidth
          label="first Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          margin="normal"
        />
                <TextField
          fullWidth
          label="Organization"
          value={organization}
          onChange={(e) => setOrganization(e.target.value)}
          margin="normal"
        />
                        <TextField
          fullWidth
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="normal"
        />
         </Box>

              <Box sx={{ flex: 1, height: "auto" }}>
      <TextField
          fullWidth
          label="Project(s)"
          value={projects}
          onChange={(e) => setProjects(e.target.value)}
          margin="normal"
        />
                        <TextField
          fullWidth
          label="Mobile/Direct Phone"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          margin="normal"
        />
                        <TextField
          fullWidth
          label="Address Line 1"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          margin="normal"
        />
                        <TextField
          fullWidth
          label="Address Line 2"
          value={secondAddress}
          onChange={(e) => setSecondAddress(e.target.value)}
          margin="normal"
        />
                        <TextField
          fullWidth
          label="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          margin="normal"
        />
                        <TextField
          fullWidth
          label="State"
          value={state}
          onChange={(e) => setState(e.target.value)}
          margin="normal"
        />
                        <TextField
          fullWidth
          label="Zip Code"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
          margin="normal"
        />
      </Box>
      </Box>
 
     

      <Box sx={{ mt: 2,display: "flex", justifyContent: "flex-end" }}>
          <Button variant="contained" onClick={handleSave} sx={{ mr: 1 }}>
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </Box>
        </Box>
    </ModalWrapper>
  );
};

export default CreateCustomerModal;