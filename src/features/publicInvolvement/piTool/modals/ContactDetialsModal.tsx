import React, { useState } from "react";
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  Chip,
  MenuItem,
  Checkbox,
} from "@mui/material";
import Map from "@/components/map/Map"; // Make sure the path is correct
import ModalWrapper from "@/components/ModalWrapper";
import { add } from "date-fns";
import { Contact, Project } from "@/features/publicInvolvement/piTool/types";
import { projectsData } from "@/pages/public-involvement/pi-tool/mockdata";

interface CreateProjectModalProps {
  open: boolean;
  onClose: () => void;
  contactObj: Contact;
}

const ContactDetailsModal: React.FC<CreateProjectModalProps> = ({
  open,
  onClose,
  contactObj,
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
  const disabledInputColor = "rgba(0, 0, 0, 0.75)";
  const handleSave = () => {
    setIsEditing(false);
    onClose();
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  //api call for all projects
  const allProjectData: Project[] = projectsData;

  const allProjects = allProjectData.map((project) => {
    return project.name;
  });

  return (
    <ModalWrapper open={open} onClose={onClose}>
      <Box>
        <Typography variant="h4" component="h2" gutterBottom>
          New Customer
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Box sx={{ flex: 1, mr: 2 }}>
            <TextField
              fullWidth
              label="first Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              margin="normal"
              disabled={!isEditing}
              sx={{
                "& .MuiInputBase-input.Mui-disabled": {
                  WebkitTextFillColor: disabledInputColor,
                  color: disabledInputColor,
                },
              }}
            />
            <TextField
              fullWidth
              label="last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              margin="normal"
              disabled={!isEditing}
              sx={{
                "& .MuiInputBase-input.Mui-disabled": {
                  WebkitTextFillColor: disabledInputColor,
                  color: disabledInputColor,
                },
              }}
            />
            <TextField
              fullWidth
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              disabled={!isEditing}
              sx={{
                "& .MuiInputBase-input.Mui-disabled": {
                  WebkitTextFillColor: disabledInputColor,
                  color: disabledInputColor,
                },
              }}
            />
            <TextField
              fullWidth
              label="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              margin="normal"
              disabled={!isEditing}
              sx={{
                "& .MuiInputBase-input.Mui-disabled": {
                  WebkitTextFillColor: disabledInputColor,
                  color: disabledInputColor,
                },
              }}
            />
            <TextField
              fullWidth
              label="Type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              margin="normal"
              disabled={!isEditing}
              sx={{
                "& .MuiInputBase-input.Mui-disabled": {
                  WebkitTextFillColor: disabledInputColor,
                  color: disabledInputColor,
                },
              }}
            />
            <TextField
              fullWidth
              label="Organization"
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
              margin="normal"
              disabled={!isEditing}
              sx={{
                "& .MuiInputBase-input.Mui-disabled": {
                  WebkitTextFillColor: disabledInputColor,
                  color: disabledInputColor,
                },
              }}
            />
            <TextField
              fullWidth
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              margin="normal"
              disabled={!isEditing}
              sx={{
                "& .MuiInputBase-input.Mui-disabled": {
                  WebkitTextFillColor: disabledInputColor,
                  color: disabledInputColor,
                },
              }}
            />
          </Box>

          <Box sx={{ flex: 1, height: "auto" }}>
            <TextField
              fullWidth
              label="Mobile/Direct Phone"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              margin="normal"
              disabled={!isEditing}
              sx={{
                "& .MuiInputBase-input.Mui-disabled": {
                  WebkitTextFillColor: disabledInputColor,
                  color: disabledInputColor,
                },
              }}
            />
            <TextField
              fullWidth
              label="Address Line 1"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              margin="normal"
              disabled={!isEditing}
              sx={{
                "& .MuiInputBase-input.Mui-disabled": {
                  WebkitTextFillColor: disabledInputColor,
                  color: disabledInputColor,
                },
              }}
            />
            <TextField
              fullWidth
              label="Address Line 2"
              value={secondAddress}
              onChange={(e) => setSecondAddress(e.target.value)}
              margin="normal"
              disabled={!isEditing}
              sx={{
                "& .MuiInputBase-input.Mui-disabled": {
                  WebkitTextFillColor: disabledInputColor,
                  color: disabledInputColor,
                },
              }}
            />
            <TextField
              fullWidth
              label="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              margin="normal"
              disabled={!isEditing}
              sx={{
                "& .MuiInputBase-input.Mui-disabled": {
                  WebkitTextFillColor: disabledInputColor,
                  color: disabledInputColor,
                },
              }}
            />
            <TextField
              fullWidth
              label="State"
              value={state}
              onChange={(e) => setState(e.target.value)}
              margin="normal"
              disabled={!isEditing}
              sx={{
                "& .MuiInputBase-input.Mui-disabled": {
                  WebkitTextFillColor: disabledInputColor,
                  color: disabledInputColor,
                },
              }}
            />
            <TextField
              fullWidth
              label="Zip Code"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              margin="normal"
              disabled={!isEditing}
              sx={{
                "& .MuiInputBase-input.Mui-disabled": {
                  WebkitTextFillColor: disabledInputColor,
                  color: disabledInputColor,
                },
              }}
            />
          </Box>
        </Box>
        <FormControl fullWidth margin="dense">
          <InputLabel>Project(s)</InputLabel>
          <Select
            sx={{
              "& .MuiInputBase-input.Mui-disabled": {
                WebkitTextFillColor: disabledInputColor,
                color: disabledInputColor,
              },
            }}
            disabled={!isEditing}
            multiple
            label="Projects"
            value={contactObj.projects}
            // onChange={handleProjectChange}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
          >
            {allProjects
              ?.sort((a, b) => a.localeCompare(b))
              .map((project) => (
                <MenuItem key={project} value={project}>
                  <Checkbox checked={contactObj.projects?.includes(project)} />
                  {project}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
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
