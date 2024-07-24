import React, { useState } from "react";
import { Modal, Button, Paper, Box } from "@mui/material";
import { Contact } from "@/features/publicInvolvement/piTool/types";
import SearchBar from '@/features/publicInvolvement/piTool/components/SearchBar'
import ContactTable from '@/features/publicInvolvement/piTool/components/ContactTable'
import ModalWrapper from "@/components/ModalWrapper";

interface ProjectContactModalProps {
  contacts: Contact[];
  open: boolean;
  onClose: () => void;
  // onSave: (selectedContacts: Contact[]) => void;
}

const ProjectContactModal: React.FC<ProjectContactModalProps> = ({
  contacts,
  open,
  onClose,
  // onSave,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>(contacts);

  const handleSave = () => {
    // onSave(filteredContacts);
    onClose();
  };

  return (
    <ModalWrapper open={open} onClose={onClose}>
      <Box

      >
        <h2>ProjectName Contacts</h2>
        <ContactTable
        addToProjectBtn
          contacts={filteredContacts}
          handleOpenCreateModal={() => {}}
          handleOpenDetailsModal={() => {}}
          handleOpenDeleteModal={() => {}}
        />
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 16 }}>
          <Button variant="contained" color="primary" onClick={handleSave} style={{ marginRight: 8 }}>
            Save
          </Button>
          <Button variant="outlined" color="secondary" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </Box>
    </ModalWrapper>
  );
};

export default ProjectContactModal;
