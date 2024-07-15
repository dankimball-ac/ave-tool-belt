import { useSidebarStore } from "@/stores/sidebar";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
// import AddchartOutlinedIcon from "@mui/icons-material/AddchartOutlined";
// import BuildOutlinedIcon from "@mui/icons-material/BuildOutlined";
// import DatasetOutlinedIcon from "@mui/icons-material/DatasetOutlined";
// import FileDownloadIcon from "@mui/icons-material/FileDownload";
// import ForkLeftOutlinedIcon from "@mui/icons-material/ForkLeftOutlined";
// import RouteOutlinedIcon from "@mui/icons-material/RouteOutlined";
// import ShowChartOutlinedIcon from "@mui/icons-material/ShowChartOutlined";
// import MapIcon from '@mui/icons-material/Map';
import {
  Box,
  Collapse,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function MenuItem({
  text,
  url,
  selectedOption,
  setSelectedOption,
  leftPadding = false,
}) {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { closeSideBar } = useSidebarStore();

  const handleClick = () => {
    setSelectedOption(text);
    closeSideBar();
    if (isMobile) {
      closeSideBar();
    }
  };

  const isSelected = router.pathname === url;
  const baseColor = theme.palette.primary.main;

  return (
    <ListItem
      key={text}
      href={url}
      component={NextLink}
      sx={{
        padding: "0px",
        "&:hover": { backgroundColor: baseColor + "30" },
      }}
    >
      <ListItemButton
        onClick={handleClick}
        selected={isSelected}
        sx={{
          color: theme.palette.text.primary,
          "&.Mui-selected": {
            backgroundColor: baseColor + "30",
            borderRight: `2px solid ${baseColor}`,
          },
        }}
      >
        <ListItemText>
          <Typography fontWeight={400}>{text}</Typography>
        </ListItemText>
      </ListItemButton>
    </ListItem>
  );
}

function SubMenu({ title, children }) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemText primary={title} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List
          component="div"
          disablePadding
          // subheader={
          //   <ListSubheader component="div" id="nested-list-subheader">
          //     {subheader}
          //   </ListSubheader>
          // }
        >
          {children}
        </List>
      </Collapse>
    </>
  );
}

export default function Sidebar() {
  const theme = useTheme();
  const [selectedOption, setSelectedOption] = useState("/");
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { isSidebarOpen, toggleSidebar, closeSideBar, openSideBar } =
    useSidebarStore();
  const drawerVariant = isMobile ? "temporary" : "permanent";
  useEffect(() => {
    // TODO: fix mobile sidebar. set to auto false if page loads in mobile
    let timer: NodeJS.Timeout;
    if (isMobile) {
      timer = setTimeout(() => {
        closeSideBar();
      }, 0);
    } else {
      closeSideBar();
    }
    return () => clearTimeout(timer);
  }, [isMobile, closeSideBar, openSideBar]);

  const toggleMobileDrawer =
    () => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        (event.type === "keydown" &&
          (event as React.KeyboardEvent).key === "Tab") ||
        (event as React.KeyboardEvent).key === "Shift"
      ) {
        return;
      }
      toggleSidebar();
    };

  return (
    <Box
      sx={{
      
        width: isMobile ? "auto" : isSidebarOpen ? "270px" : "0px",
        transition: "width 0.2s ease-out",
        overflow: "hidden",
      }}
    >
   <Drawer
        variant={drawerVariant}
        open={isSidebarOpen}
        onClose={toggleMobileDrawer()}
        anchor="left"
        PaperProps={{
          sx: {
            width: "270px",
            height: 'calc(100% - 64px)', // Adjust this value based on your topbar height
            top: 64, // Should match your topbar height
            transform: isSidebarOpen ? "translateX(0)" : "translateX(-270px)",
            transition: "transform 0.2s ease-out",
            backgroundColor: theme.palette.background.paper,
            border: 'none',
            boxShadow: 2,
          },
        }}
        ModalProps={{
          keepMounted: true,
        }}
      >

        <List>
          {/* <SubMenu title="Apps" subheader="Apps" /> */}
          {/* <SubMenu title={"Civil Engineering"}>
            <MenuItem
              text={"Tool Name"}
              url={"/civil-eng/tool-name"}
              sx={{ fontSize: "15px" }}
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
              leftPadding
            />
          </SubMenu>
          <SubMenu
            title={"Drone Mapping"}
            url={"/tools/drone-mapping"}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            leftPadding
          />
          <SubMenu title={"Environmental Planning"} /> */}
          <SubMenu title={"Equity & Inclusion "}>
            <MenuItem
              text={"White Male Privilege Gauge"}
              url={"/public-involvement/pi-tool/projects"}
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
              style={{ paddingLeft: "15px" }}
            />
            <MenuItem
              text={"Intersectionality Test"}
              url={"/public-involvement/pi-tool/projects"}
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
              style={{ paddingLeft: "15px" }}
            />
            <MenuItem
              text={"White Male Complaint Tool"}
              url={"/public-involvement/pi-tool/projects"}
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
              style={{ paddingLeft: "15px" }}
            />
          </SubMenu>
          {/* <SubMenu title={"GIS"} />
          <SubMenu title={"Graphic Storytelling"} />
          <SubMenu title={"Land Surveying"} />
          <SubMenu title={"Owner's Representation"} />
          <SubMenu title={"Planning"} /> */}
          {/* <SubMenu title={"Public Involvement"}>
    
          </SubMenu> */}
          <MenuItem
              text={"PI Tool"}
              url={"/public-involvement/pi-tool/projects"}
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
              style={{ paddingLeft: "15px" }}
            />
          {/* <SubMenu title={"Right of Way Design"} />
          <SubMenu title={"Traffic Engineering"} />
          <SubMenu title={"Traffic Studies"} />
          <SubMenu title={"Transport Planning & Design"} /> */}
          {/* </SubMenu> */}
        </List>
        <Box
          sx={{
            marginTop: "auto",
            marginBottom: "40px",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
          }}
        ></Box>
      </Drawer>
      {isSidebarOpen && (
        <Box
          sx={{
            position: 'fixed',
            top: 64, // Should match your topbar height
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: theme.zIndex.drawer - 1,
          }}
          onClick={closeSideBar}
        />
      )}
    </Box>
  );
}
