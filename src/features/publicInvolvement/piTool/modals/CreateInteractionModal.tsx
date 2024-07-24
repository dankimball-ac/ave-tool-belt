import React, { useState } from "react";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Typography,
  Box,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import ModalWrapper from "@/components/ModalWrapper";

interface CreateInteractionModalProps {
  open: boolean;
  onClose: () => void;
}

const CreateInteractionModal: React.FC<CreateInteractionModalProps> = ({
  open,
  onClose,
}) => {
  const [interactionType, setInteractionType] = useState("");
  const [inboundOutbound, setInboundOutbound] = useState("inbound");
  const [contact, setContact] = useState("");
  const [comments, setComments] = useState("");

  const handleInteractionTypeChange = (event: SelectChangeEvent) => {
    setInteractionType(event.target.value as string);
  };

  const handleInboundOutboundChange = (
    event: React.MouseEvent<HTMLElement>,
    newValue: string | null
  ) => {
    if (newValue !== null) {
      setInboundOutbound(newValue);
    }
  };

  return (
    <ModalWrapper open={open} onClose={onClose}>
      <Box
        sx={{
          width: "350px",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography variant="h4">
          Create Interaction
        </Typography>

        <TextField
          fullWidth
          label="Project"
          value="Project Name Here"
          InputProps={{
            readOnly: true,
          }}
        />

        <FormControl fullWidth>
          <InputLabel id="interaction-type-label">Interaction Type</InputLabel>
          <Select
            labelId="interaction-type-label"
            value={interactionType}
            label="Interaction Type"
            onChange={handleInteractionTypeChange}
          >
            <MenuItem value="inPerson">In Person</MenuItem>
            <MenuItem value="Meeting">Meeting</MenuItem>
            <MenuItem value="Phone">Phone</MenuItem>
            <MenuItem value="Public">Public</MenuItem>
            <MenuItem value="Social">Social Media</MenuItem>
            <MenuItem value="Website">Website</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </Select>
        </FormControl>

        <ToggleButtonGroup
          color="primary"
          value={inboundOutbound}
          exclusive
          onChange={handleInboundOutboundChange}
          aria-label="Inbound/Outbound"
          fullWidth
        >
          <ToggleButton value="inbound">Inbound</ToggleButton>
          <ToggleButton value="outbound">Outbound</ToggleButton>
        </ToggleButtonGroup>
        <Box sx={{ display: "flex" }}>
          <FormControl fullWidth>
            <InputLabel id="contact-label">Contact</InputLabel>
            <Select
              labelId="contact-label"
              value={contact}
              label="Contact"
              onChange={(e) => setContact(e.target.value)}
            >
              <MenuItem value="contact1">John Doe</MenuItem>
              <MenuItem value="contact2">Peter Parker</MenuItem>
              <MenuItem value="contact3">Milly Miles</MenuItem>
            </Select>
          </FormControl>
          <Button>New</Button>
        </Box>
        <Button variant="contained" color="primary">
          Upload Files
        </Button>

        <TextField
          fullWidth
          label="Comments"
          multiline
          rows={4}
          value={comments}
          onChange={(e) => setComments(e.target.value)}
        />
      </Box>
    </ModalWrapper>
  );
};

export default CreateInteractionModal;
