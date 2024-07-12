import React, { useState } from "react";
import { Modal, Box, TextField, Button, Typography } from "@mui/material";
import Map from "@/components/map/Map"; // Make sure the path is correct
import ModalWrapper from "@/components/ModalWrapper";
import { add } from "date-fns";
import {Contact} from '@/features/publicInvolvement/piTool/types';

interface CreateProjectModalProps {
  open: boolean;
  onClose: () => void;
  contactObj: Contact;

}

const ContactDetailsModal: React.FC<CreateProjectModalProps> = ({
  open,
  onClose,
  contactObj
}) => {
  const [firstName, setFirstName] = useState(contactObj.firstName);
  const [lastName, setLastName] = useState(contactObj.lastName);
  const [email, setEmail] = useState(contactObj.email);
  const [phone, setPhone] = useState(contactObj.phone);
  const [type, setType] = useState(contactObj.type);
  const [organization, setOrganization] = useState(contactObj.organization);
  const [title, setTitle] = useState(contactObj.title);
  const [projects, setProjects] = useState(contactObj.projects);
  const [mobile, setMobile] = useState(contactObj.mobile);
  const [address, setAddress] = useState(contactObj.address);
  const [secondAddress, setSecondAddress] = useState(contactObj.secondAddress);
  const [city, setCity] = useState(contactObj.city);
  const [state, setState] = useState(contactObj.state);
  const [zipCode, setZipCode] = useState(contactObj.zipCode);
  const [isEditing, setIsEditing] = useState(false);



  const handleSave = () => {
    setIsEditing(false);
    onClose();
  };

  const handleEdit = () => {
    setIsEditing(true);
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
          disabled={!isEditing}
        />
        <TextField
          fullWidth
          label="last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          margin="normal"
          disabled={!isEditing}
        />
        <TextField
          fullWidth
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
          disabled={!isEditing}
        />
        <TextField
          fullWidth
          label="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          margin="normal"
          disabled={!isEditing}
        />
        <TextField
          fullWidth
          label="Type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          margin="normal"
          disabled={!isEditing}
        />
                <TextField
          fullWidth
          label="Organization"
          value={organization}
          onChange={(e) => setOrganization(e.target.value)}
          margin="normal"
          disabled={!isEditing}
        />
                        <TextField
          fullWidth
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="normal"
          disabled={!isEditing}
        />
         </Box>

              <Box sx={{ flex: 1, height: "auto" }}>
      <TextField
          fullWidth
          label="Project(s)"
          value={projects}
          onChange={(e) => setProjects([e.target.value])}
          margin="normal"
          disabled={!isEditing}
        />
                        <TextField
          fullWidth
          label="Mobile/Direct Phone"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          margin="normal"
          disabled={!isEditing}
        />
                        <TextField
          fullWidth
          label="Address Line 1"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          margin="normal"
          disabled={!isEditing}
        />
                        <TextField
          fullWidth
          label="Address Line 2"
          value={secondAddress}
          onChange={(e) => setSecondAddress(e.target.value)}
          margin="normal"
          disabled={!isEditing}
        />
                        <TextField
          fullWidth
          label="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          margin="normal"
          disabled={!isEditing}
        />
                        <TextField
          fullWidth
          label="State"
          value={state}
          onChange={(e) => setState(e.target.value)}
          margin="normal"
          disabled={!isEditing}
        />
                        <TextField
          fullWidth
          label="Zip Code"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
          margin="normal"
          disabled={!isEditing}
        />
      </Box>
      </Box>
 
     

      <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
          {isEditing ? (
            <>
              <Button variant="contained" onClick={handleSave} sx={{ mr: 1 }}>
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </>
          ) : (
            <>
              <Button variant="contained" onClick={handleEdit} sx={{ mr: 1 }}>
                Edit
              </Button>
              <Button onClick={onClose}>cancel</Button>
            </>
          )}
        </Box>
        </Box>
    </ModalWrapper>
  );
};

export default ContactDetailsModal;