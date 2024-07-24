import React, { useEffect, useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Box,
} from "@mui/material";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import ForumIcon from "@mui/icons-material/Forum";
import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";
import { Contact } from "@/features/publicInvolvement/piTool/types";
import SearchBar from "./SearchBar";

interface ContactTableProps {
  contacts: Contact[];
  handleOpenCreateModal: () => void;
  handleOpenDetailsModal: (contact: Contact) => void;
  handleOpenDeleteModal: (contact: Contact) => void;
  addToProjectBtn?:boolean
}

const ContactTable: React.FC<ContactTableProps> = ({
  contacts,
  handleOpenCreateModal,
  handleOpenDetailsModal,
  handleOpenDeleteModal,
  addToProjectBtn
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>(contacts);

  useEffect(() => {
    setFilteredContacts(
      contacts.filter(
        (contact) =>
          contact.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          contact.lastName.includes(searchQuery) ||
          contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          contact.phone.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, contacts]);

  return (
    <Box
      style={{
        margin: 16,
        padding: 16,
        height: "auto",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Box sx={{display:'flex', gap:2}}>
        {addToProjectBtn && (
      <Button
        variant="contained"
        color="primary"
        style={{
          marginBottom: 16,
          marginTop: 16,
          display: "flex",
          alignSelf: "flex-end",
        }}
        onClick={handleOpenCreateModal}
      >
        Add Contact
      </Button>
      )}
      <Button
        variant="contained"
        color="primary"
        style={{
          marginBottom: 16,
          marginTop: 16,
          display: "flex",
          alignSelf: "flex-end",
        }}
        onClick={handleOpenCreateModal}
      >
        Create New
      </Button>
      </Box>
      <div style={{ flexGrow: 1, overflow: "auto" }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredContacts.map((contact) => (
              <TableRow key={contact.id}>
                <TableCell>{contact.firstName}</TableCell>
                <TableCell>{contact.lastName}</TableCell>
                <TableCell>{contact.email}</TableCell>
                <TableCell>{contact.phone}</TableCell>
                <TableCell align="right">
                  <IconButton
                    aria-label="view"
                    onClick={() => handleOpenDetailsModal(contact)}
                  >
                    <ManageSearchIcon />
                  </IconButton>
                  <IconButton aria-label="view">
                    <ForumIcon />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    onClick={() => handleOpenDeleteModal(contact)}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <IconButton aria-label="download">
                    <DownloadIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Box>
  );
};

export default ContactTable;
