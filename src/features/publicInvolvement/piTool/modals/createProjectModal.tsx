import React, { useState } from "react";
import { Modal, Box, TextField, Button, Typography } from "@mui/material";
import Map from "@/components/map/Map"; // Make sure the path is correct
import ModalWrapper from "@/components/ModalWrapper";

interface CreateProjectModalProps {
  open: boolean;
  onClose: () => void;
}

const CreateProjectModal: React.FC<CreateProjectModalProps> = ({
  open,
  onClose,
}) => {
  const [projectName, setProjectName] = useState("");
  const [projectNumber, setProjectNumber] = useState("");
  const [clientPIN, setClientPIN] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSave = () => {
    // Implement save logic here
    console.log("Saving project:", {
      projectName,
      projectNumber,
      clientPIN,
      startDate,
      endDate,
    });
    onClose();
  };

  return (
    <ModalWrapper open={open} onClose={onClose}>
      <Box sx={{ flex: 1, mr: 2 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          New Project
        </Typography>
        <TextField
          fullWidth
          label="Name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Number"
          value={projectNumber}
          onChange={(e) => setProjectNumber(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Client (UDOT PIN if applicable)"
          value={clientPIN}
          onChange={(e) => setClientPIN(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Start Date"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          margin="normal"
        />
        <TextField
          fullWidth
          label="End Date"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          margin="normal"
        />
        <Box sx={{ mt: 2,display: "flex", justifyContent: "flex-end" }}>
          <Button variant="contained" onClick={handleSave} sx={{ mr: 1 }}>
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </Box>
      </Box>
      <Box sx={{ flex: 2, height: "auto" }}>
        <Map zoom={9} mapHeight="100%" />
      </Box>
    </ModalWrapper>
  );
};

export default CreateProjectModal;
