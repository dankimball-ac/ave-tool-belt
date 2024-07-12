import React, { useState } from "react";
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  Divider,
} from "@mui/material";
import ModalWrapper from "@/components/ModalWrapper";

export const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "none",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
  "@media (max-width: 400px)": {
    width: "100%",
  },
};

export const modalButtonLocation = {
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "flex-end",
  paddingTop: "25px",
  width: "100%",
};

interface CreateProjectModalProps {
  open: boolean;
  onClose: () => void;
  objId: number;
  objName: string;
}

const DeleteModal: React.FC<CreateProjectModalProps> = ({
  open,
  onClose,
  objId,
  objName,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography sx={{ fontWeight: "bold" }}>Delete {objName}</Typography>
        <>
          <Divider sx={{ margin: "10px 0", backgroundColor: "gray" }} />
          <Typography>
            Are you sure you want to delete this {objName.toLowerCase()}?
          </Typography>
          <br />
          <Box sx={modalButtonLocation}>
            <Button onClick={onClose}>No</Button>
            <Button
              //   onClick={() => handleDeleteClick(id)}
              style={{ color: "red" }}
            >
              Delete {objName}
            </Button>
          </Box>
        </>
      </Box>
    </Modal>
  );
};

export default DeleteModal;
