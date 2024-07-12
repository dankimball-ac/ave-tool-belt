import React from 'react';
import { Modal, Box } from '@mui/material';

interface ModalWrapperProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({ open, onClose, children }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        maxWidth: '50%',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        display: 'flex',
        maxHeight: '90vh',
        overflow: 'auto',
        borderRadius: '7px'
      }}>
        {children}
      </Box>
    </Modal>
  );
};

export default ModalWrapper;