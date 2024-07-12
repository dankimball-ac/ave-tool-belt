import React, { useState, useEffect } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  TextField,
  IconButton,
} from "@mui/material";
import GenericNavBar from "@/components/GenericNavBar/GenericNavBar";
import { ResponsivePageLayout } from "@/components/ResponsivePage";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import ForumIcon from '@mui/icons-material/Forum';
import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";
import CreateCustomerModal from "@/features/publicInvolvement/piTool/modals/createContactModal";
import { Contact } from "@/features/publicInvolvement/piTool/types";
import ContactDetailsModal from "@/features/publicInvolvement/piTool/modals/ContactDetialsModal";
import DeleteModal from "@/components/modals/DeleteModal";

const contacts: Contact[] = [
  {
    id: 1,
    firstName: "Dan",
    lastName: "Kimball",
    email: "dkimball@avenueconsutlants.com",
    phone: "801-656-9255",
  },
  {
    id: 2,
    firstName: "John",
    lastName: "Doe",
    email: "jdoe@example.com",
    phone: "123-456-7890",
  },
  {
    id: 3,
    firstName: "Jane",
    lastName: "Smith",
    email: "jsmith@example.com",
    phone: "234-567-8901",
  },
  {
    id: 4,
    firstName: "Michael",
    lastName: "Johnson",
    email: "mjohnson@example.com",
    phone: "345-678-9012",
  },
  {
    id: 5,
    firstName: "Emily",
    lastName: "Davis",
    email: "edavis@example.com",
    phone: "456-789-0123",
  },
  {
    id: 6,
    firstName: "David",
    lastName: "Brown",
    email: "dbrown@example.com",
    phone: "567-890-1234",
  },
  {
    id: 7,
    firstName: "Sarah",
    lastName: "Miller",
    email: "smiller@example.com",
    phone: "678-901-2345",
  },
  {
    id: 8,
    firstName: "James",
    lastName: "Wilson",
    email: "jwilson@example.com",
    phone: "789-012-3456",
  },
  {
    id: 9,
    firstName: "Laura",
    lastName: "Moore",
    email: "lmoore@example.com",
    phone: "890-123-4567",
  },
  {
    id: 10,
    firstName: "Robert",
    lastName: "Taylor",
    email: "rtaylor@example.com",
    phone: "901-234-5678",
  },
  {
    id: 11,
    firstName: "Linda",
    lastName: "Anderson",
    email: "landerson@example.com",
    phone: "012-345-6789",
  },
  {
    id: 12,
    firstName: "Christopher",
    lastName: "Thomas",
    email: "cthomas@example.com",
    phone: "123-456-7891",
  },
  {
    id: 13,
    firstName: "Patricia",
    lastName: "Jackson",
    email: "pjackson@example.com",
    phone: "234-567-8902",
  },
  {
    id: 14,
    firstName: "Matthew",
    lastName: "White",
    email: "mwhite@example.com",
    phone: "345-678-9013",
  },
  {
    id: 15,
    firstName: "Barbara",
    lastName: "Harris",
    email: "bharris@example.com",
    phone: "456-789-0124",
  },
  {
    id: 16,
    firstName: "Joshua",
    lastName: "Martin",
    email: "jmartin@example.com",
    phone: "567-890-1235",
  },
  {
    id: 17,
    firstName: "Karen",
    lastName: "Thompson",
    email: "kthompson@example.com",
    phone: "678-901-2346",
  },
];

const pages = [
  { name: "Projects", link: "/public-involvement/pi-tool/projects" },
  { name: "Contacts", link: "/public-involvement/pi-tool/contacts" },
];

const settings = [
  { name: "Profile", link: "/profile" },
  { name: "Account", link: "/account" },
  { name: "Logout", link: "/logout" },
];

const Contacts: React.FC = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
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
  }, [searchQuery]);

  const handleOpenCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  const handleOpenDetailsModal = (contact: Contact) => {
    setSelectedContact(contact);
    setIsDetailsModalOpen(true);
  };

  const handleCloseDetailsModal = () => {
    setIsDetailsModalOpen(false);
    setSelectedContact(null);
  };

  const handleOpenDeleteModal = (contact: Contact) => {
    setSelectedContact(contact);
    setIsDeleteModalOpen(true);
  };
  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };


  return (
    <>
      <GenericNavBar pages={pages} settings={settings} />
      <ResponsivePageLayout title={""}>
        <Paper style={{ margin: 16, padding: 16 }}>
          <TextField
            style={{ marginBottom: 16 }}
            fullWidth
            placeholder="Search projects"
            variant="outlined"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />{" "}
          <Button
            variant="contained"
            color="primary"
            style={{
              marginBottom: 16,
              marginTop: 16,
              display: "flex",
              justifyContent: "flex-end",
            }}
            onClick={handleOpenCreateModal}
          >
            Create New
          </Button>
          <Table>
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
                <TableRow key={contact.firstName}>
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
        </Paper>
      </ResponsivePageLayout>
      <CreateCustomerModal
        open={isCreateModalOpen}
        onClose={handleCloseCreateModal}
      />
      {selectedContact && (
        <ContactDetailsModal
          contactObj={selectedContact}
          open={isDetailsModalOpen}
          onClose={handleCloseDetailsModal}
        />
      )}
      {selectedContact && (
        <DeleteModal
          objId={selectedContact.id}
          objName={"Contact"}
          open={isDeleteModalOpen}
          onClose={handleCloseDeleteModal}
        />
      )}
    </>
  );
};

export default Contacts;
