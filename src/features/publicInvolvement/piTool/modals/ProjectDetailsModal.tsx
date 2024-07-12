import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
} from "@mui/material";
import ModalWrapper from "@/components/ModalWrapper";
import EditIcon from "@mui/icons-material/Edit";
import {Project} from '@/features/publicInvolvement/piTool/types';

interface ProjectDetailsModalProps {
  open: boolean;
  onClose: () => void;
  projectObj: Project;
}

const ProjectDetailsModal: React.FC<ProjectDetailsModalProps> = ({
  projectObj,
  open,
  onClose,
}) => {
  const [projectName, setProjectName] = useState(projectObj.name);
  const [projectNumber, setProjectNumber] = useState(projectObj.number);
  const [clientPIN, setClientPIN] = useState(projectObj.client);
  const [startDate, setStartDate] = useState(projectObj.startDate);
  const [endDate, setEndDate] = useState(projectObj.endDate);
  const [isEditing, setIsEditing] = useState(false);



  const handleSave = () => {
    // handle save logic here
    setIsEditing(false);
    onClose();
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <ModalWrapper open={open} onClose={onClose}>
      <Box sx={{ flex: 1, mr: 2 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Project Details
        </Typography>
        <TextField
          fullWidth
          label="Name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          margin="normal"
          disabled={!isEditing}
        />
        <TextField
          fullWidth
          label="Number"
          value={projectNumber}
          onChange={(e) => setProjectNumber(e.target.value)}
          margin="normal"
          disabled={!isEditing}
        />
        <TextField
          fullWidth
          label="Client (UDOT PIN if applicable)"
          value={clientPIN}
          onChange={(e) => setClientPIN(e.target.value)}
          margin="normal"
          disabled={!isEditing}
        />
        <TextField
          fullWidth
          label="Start Date"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          margin="normal"
          disabled={!isEditing}
        />
        <TextField
          fullWidth
          label="End Date"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          margin="normal"
          disabled={!isEditing}
        />
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

export default ProjectDetailsModal;
