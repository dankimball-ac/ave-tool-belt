import { useGetAdminPagesList } from '@/features/identity/pagesCheck'
import { useSidebarStore } from '@/stores/sidebar'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import MenuIcon from '@mui/icons-material/Menu';
import PublishedWithChangesOutlinedIcon from '@mui/icons-material/PublishedWithChangesOutlined'
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined'
import { Box, IconButton, Paper, Typography, useTheme } from '@mui/material'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import DropDownButton from './DropdownButton'
import UserMenu from './UserMenu'
import { useRouter } from 'next/router';
import Image from "next/image";
import NextLink from "next/link";

const doesUserHaveAccess = () => {
  if (typeof window === 'undefined') {
    return false
  }

  const loggedIn = Cookies.get('loggedIn')
  if (!loggedIn) {
    return false
  }

  const claims = Cookies.get('claims')
  return !!claims
}

export default function Topbar() {
  const theme = useTheme()
  const { isSidebarOpen, toggleSidebar } = useSidebarStore()
  const [userHasAccess, setUserHasAccess] = useState(false)
  const router = useRouter();

  useEffect(() => {
    setUserHasAccess(doesUserHaveAccess())
  }, [])

  const handleMenuCollapseClick = () => {
    toggleSidebar()
  }

  const getTitle = () => {
    if (router.pathname.includes('/public-involvement/pi-tool/')) {
      return 'PI Tool';
    }else if (router.pathname.includes('/locations')) {
      return 'Avenue Toolbelt';
    }
    // Add more conditions as needed
    return 'Avenue Toolbelt';
  };

  const title = getTitle();

  const infoItems = [
    {
      name: 'About',
      icon: <InfoOutlinedIcon fontSize="small" />,
      link: '/about',
    },
    {
      name: 'FAQ',
      icon: <QuestionAnswerOutlinedIcon fontSize="small" />,
      link: '/faq',
    },
    {
      name: 'Changelog',
      icon: <PublishedWithChangesOutlinedIcon fontSize="small" />,
      link: '/changelog',
    },
  ]

  const documentItems = [
    {
      name: 'Request Tool Access',
      icon: <QuestionAnswerOutlinedIcon fontSize="small" />,
      link: 'https://udottraffic.utah.gov/ATSPM/Images/ATSPM_Methods_and_Assumptions_4.3.pdf',
    },
    {
      name: 'Squava Access',
      link: 'https://udottraffic.utah.gov/ATSPM/Images/ATSPM_User%20Case%20Examples_Manual_20200128.pdf',
    },
    {
      name: 'VPN Access',
      icon: <InfoOutlinedIcon fontSize="small" />,
      link: 'https://avenueconsultants.com/insights/',
    },
    {
      name: 'Contact Uinta',
      icon: <InfoOutlinedIcon fontSize="small" />,
      link: 'https://udottraffic.utah.gov/ATSPM/Images/ATSPM_Component_Details_4.3.pdf',
    },
    {
      name: 'UDOT Resources',
      icon: <InfoOutlinedIcon fontSize="small" />,
      link: 'https://udottraffic.utah.gov/ATSPM/Images/ATSPM_Reporting_Details_4.3.pdf',
    },
  ]

  const pagesToLinks = useGetAdminPagesList()

  const adminPagesList = Array.from(pagesToLinks.keys()).map((key) => ({
    name: key,
    link: pagesToLinks.get(key) as string,
    // Add an icon if necessary, or modify the structure as needed
  }))

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingX: 2,
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
        
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          borderRadius: '3px',
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <Paper>
          <IconButton
            type="button"
            onClick={handleMenuCollapseClick}
            sx={{
              p: 1,
            }}
          >
            <MenuIcon />
          </IconButton>
        </Paper>

      </Box>
      <Box
          sx={{

          }}
        >
          <NextLink href="/" passHref>
            <Image
              alt="Ave Toolbelt"
              src="/images/avelogo.svg"
              priority
              width={0}
              height={0}
              style={{ width: "70%", paddingLeft:'9px', paddingTop:'9px', height: "auto", cursor: "pointer" }}
            />
          </NextLink>
        </Box>

      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: theme.palette.mode === 'light' ? 'black' : 'white',
        }}
      >
        <h3>{title}</h3>
      </Box>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          color: theme.palette.mode === 'light' ? 'white' : 'black',
        }}
      >
        <DropDownButton
          title="Resources"
          icon={<InfoOutlinedIcon />}
          menuItems={documentItems}
        />
        {userHasAccess && (
          <DropDownButton
            title="Admin"
            icon={<InfoOutlinedIcon />}
            menuItems={adminPagesList}
          />
        )}
        <UserMenu />
      </Box>
    </Box>
  );
}
