import { useSidebarStore } from "@/stores/sidebar";
import AddchartOutlinedIcon from "@mui/icons-material/AddchartOutlined";
import BuildOutlinedIcon from "@mui/icons-material/BuildOutlined";
import DatasetOutlinedIcon from "@mui/icons-material/DatasetOutlined";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import ForkLeftOutlinedIcon from "@mui/icons-material/ForkLeftOutlined";
import RouteOutlinedIcon from "@mui/icons-material/RouteOutlined";
import ShowChartOutlinedIcon from "@mui/icons-material/ShowChartOutlined";
import TrafficOutlinedIcon from "@mui/icons-material/TrafficOutlined";
import {
  Box,
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
  icon,
  text,
  url,
  setSelectedOption,
}: // leftPadding = false,
{
  icon: React.ReactNode;
  text: string;
  url: string;
  selectedOption: string;
  setSelectedOption: React.Dispatch<React.SetStateAction<string>>;
  leftPadding?: boolean;
}) {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { closeSideBar } = useSidebarStore();
  const handleClick = () => {
    setSelectedOption(text);

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
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText>
          <Typography fontWeight={400}>{text}</Typography>
        </ListItemText>
      </ListItemButton>
    </ListItem>
  );
}

function SubMenu({
  // title,
  // icon,
  children,
  subheader,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  subheader: string;
}) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      {/* <ListItemButton
        onClick={handleClick}
        sx={{ '&:hover': { backgroundColor: '#f0f0f0' } }}
      >
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText>
          <Typography fontWeight={400}>{title}</Typography>
        </ListItemText>
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit> */}
      <List
        component="div"
        disablePadding
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            {subheader}
          </ListSubheader>
        }
      >
        {children}
      </List>
      {/* </Collapse> */}
    </>
  );
}
{
  /* <Collapse in={false} timeout="auto" orientation="horizontal" unmountOnExit> */
}

export default function Sidebar() {
  const theme = useTheme();
  const [selectedOption, setSelectedOption] = useState("Locations");
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
      openSideBar();
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
        height: "100vh",
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
            transform: isSidebarOpen ? "translateX(0)" : "translateX(-270px)",
            transition: "transform 0.2s ease-out",
            backgroundColor: theme.palette.background.paper,
            border: "none",
            boxShadow: "2",
            width: "270px",
          },
        }}
      >
        <Box
          sx={{
            width: "200px",
            margin: "20px",
            marginX: "auto",
          }}
        >
          <NextLink href="/" passHref>
            <Image
              alt="Ave Toolbelt"
              src="/images/avelogo.svg"
              priority
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", height: "auto", cursor: "pointer" }}
            />
          </NextLink>
        </Box>
        <List>
          <MenuItem
            icon={<TrafficOutlinedIcon />}
            text={"Derek's blackmail photos"}
            url={"/locations"}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            leftPadding
          />
          <SubMenu
            subheader={"Dev Team"}
            title="Design Tools"
            icon={<BuildOutlinedIcon />}
          >
            <MenuItem
              icon={<ShowChartOutlinedIcon />}
              text={"Morgans Pinball collection"}
              url={"/tools/time-space-diagrams"}
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
              leftPadding
            />
            <MenuItem
              icon={<RouteOutlinedIcon />}
              text={"Jacksons New Book"}
              url={"/jackson"}
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
              leftPadding
            />
            <MenuItem
              icon={<ForkLeftOutlinedIcon />}
              text={"Jai's Delight"}
              url={"/tools/left-turn-gap-report"}
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
              leftPadding
            />
          </SubMenu>
          <SubMenu
            subheader={"Traffic Tools"}
            title={"Data"}
            icon={<DatasetOutlinedIcon />}
          >
            <MenuItem
              icon={<AddchartOutlinedIcon />}
              text={"Dan Kimball Fan Page"}
              url={"/data/aggregate"}
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
              leftPadding
            />
            <MenuItem
              icon={<FileDownloadIcon />}
              text={"Useful Avenue Tool"}
              url={"/data/export"}
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
              leftPadding
            />
          </SubMenu>
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
    </Box>
  );
}
