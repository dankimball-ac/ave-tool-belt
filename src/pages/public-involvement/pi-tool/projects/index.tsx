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
  Link,
} from "@mui/material";
import GenericNavBar from "@/components/GenericNavBar/GenericNavBar";
import { ResponsivePageLayout } from "@/components/ResponsivePage";
import CreateProjectModal from "@/features/publicInvolvement/piTool/modals/createProjectModal";
import ProjectDetailsModal from "@/features/publicInvolvement/piTool/modals/ProjectDetailsModal";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";
import { Project } from "@/features/publicInvolvement/piTool/types";
import DeleteModal from "@/components/modals/DeleteModal";
import { projectsData } from "../mockdata";

let projects:Project[] = projectsData;

const pages = [
  { name: "Projects", link: "/public-involvement/pi-tool/projects" },
  { name: "Contacts", link: "/public-involvement/pi-tool/contacts" },
];

const settings = [
  { name: "Profile", link: "/profile" },
  { name: "Account", link: "/account" },
  { name: "Logout", link: "/logout" },
];

const Projects: React.FC = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);

  useEffect(() => {
    setFilteredProjects(
      projects.filter(
        (project) =>
          project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.number.includes(searchQuery) ||
          project.client.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery]);

  const handleOpenCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  const handleOpenDetailsModal = (project: Project) => {
    setSelectedProject(project);
    setIsDetailsModalOpen(true);
  };

  const handleCloseDetailsModal = () => {
    setIsDetailsModalOpen(false);
    setSelectedProject(null);
  };

  const handleOpenDeleteModal = (project: Project) => {
    setSelectedProject(project);
    setIsDeleteModalOpen(true);
  };
  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      <GenericNavBar pages={pages} settings={settings} />
      <ResponsivePageLayout title={""}>
        <Paper
          style={{
            margin: 16,
            padding: 16,
            height: "calc(100vh - 18vh)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <TextField
            style={{ marginBottom: 16 }}
            fullWidth
            placeholder="Search projects"
            variant="outlined"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            style={{
              marginBottom: 16,
              marginTop: 16,
              alignSelf: "flex-end",
            }}
            onClick={handleOpenCreateModal}
          >
            Create New
          </Button>
          <div style={{ flexGrow: 1, overflow: "auto" }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Number</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredProjects.map((project) => (
                  <TableRow key={project.number}>
                    <TableCell>
                      <Link
                        style={{ textDecoration: "none", color: "inherit" }}
                        href="/public-involvement/pi-tool/projects"
                      >
                        <a>{project.number}</a>
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Link
                        style={{ textDecoration: "none", color: "inherit" }}
                        href="/public-involvement/pi-tool/project"
                      >
                        <a>{project.name}</a>
                      </Link>
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        aria-label="view"
                        onClick={() => handleOpenDetailsModal(project)}
                      >
                        <ManageSearchIcon />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        onClick={() => handleOpenDeleteModal(project)}
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
        </Paper>
      </ResponsivePageLayout>
      <CreateProjectModal
        open={isCreateModalOpen}
        onClose={handleCloseCreateModal}
      />
      {selectedProject && (
        <ProjectDetailsModal
          projectObj={selectedProject}
          open={isDetailsModalOpen}
          onClose={handleCloseDetailsModal}
        />
      )}
      {selectedProject && (
        <DeleteModal
          objId={selectedProject.id}
          objName={"Project"}
          open={isDeleteModalOpen}
          onClose={handleCloseDeleteModal}
        />
      )}
    </>
  );
};

export default Projects;
