import GenericNavBar from "@/components/GenericNavBar/GenericNavBar";
import { ResponsivePageLayout } from "@/components/ResponsivePage";
import {
  Autocomplete,
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import MapWrapper from "@/components/map/MapWrapper";
import { useState } from "react";
import CreateInteractionModal from "@/features/publicInvolvement/piTool/modals/CreateInteractionModal";
import ProjectContactModal from "@/features/publicInvolvement/piTool/modals/ProjectContactModal";
import { Contact } from "@/features/publicInvolvement/piTool/types";

const pages = [
  { name: "Projects", link: "/public-involvement/pi-tool/projects" },
  { name: "Contacts", link: "/public-involvement/pi-tool/contacts" },
];

const settings = [
  { name: "Profile", link: "/profile" },
  { name: "Account", link: "/account" },
  { name: "Logout", link: "/logout" },
];

const interactions = [
  { type: "Phone Call", contact: "Bobby" },
  { type: "Inpersion meeting", contact: "Jill" },
];

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
];

const Project = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState<boolean>(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleOpenContactModal = () => setIsContactModalOpen(true);
  const handleCloseContactModal = () => setIsContactModalOpen(false);
  return (
    <>
      <GenericNavBar pages={pages} settings={settings} />

      <ResponsivePageLayout title={""}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            height: "1100px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              alignItems: "center",
            }}
          >
            <Button onClick={handleOpenContactModal} variant="contained">
              Project Contacts
            </Button>
            <Typography variant="h2" sx={{ marginLeft: "95px" }}>
              Project Interactions
            </Typography>
            <Autocomplete
              sx={{ minWidth: "250px" }}
              id="search-interactions"
              options={interactions.map((option) => option.type)}
              renderInput={(params) => (
                <TextField {...params} label="search Interactions" />
              )}
            />
          </Box>
          <Box
            sx={{
              flex: 2,
              cursor: "pointer",
              "&:hover": {
                opacity: 0.8,
              },
            }}
            onClick={handleOpenModal}
          >
            <MapWrapper zoom={10} />
          </Box>
        </Box>
      </ResponsivePageLayout>
      <CreateInteractionModal open={isModalOpen} onClose={handleCloseModal} />
      <ProjectContactModal
        open={isContactModalOpen}
        onClose={handleCloseContactModal}
        contacts={contacts}
      />
    </>
  );
};

export default Project;
