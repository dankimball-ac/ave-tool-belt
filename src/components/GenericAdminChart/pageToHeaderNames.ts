import { PageNames } from "@/features/identity/pagesCheck";
import { GridColDef } from "@mui/x-data-grid";

const rolesHeaders: GridColDef[] = [
  {
    field: "role",
    headerName: "Role",
    editable: true,
    flex: 1,
  },
];

const usersHeaders: GridColDef[] = [
  {
    field: "fullName",
    headerName: "Name",
    editable: true,
    flex: 1,
  },
  {
    field: "userName",
    headerName: "Username",
    editable: true,
    flex: 1,
  },
  {
    field: "agency",
    headerName: "Agency",
    editable: true,
    flex: 1,
  },
  {
    field: "email",
    headerName: "Email",
    editable: true,
    flex: 2,
  },
  {
    field: "roles",
    headerName: "Roles",
    editable: true,
    flex: 2,
  },
];

export const pageNameToHeaders: Map<string, GridColDef[]> = new Map()
  .set(PageNames.Roles, rolesHeaders)
  .set(PageNames.Users, usersHeaders);
