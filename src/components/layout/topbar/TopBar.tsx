import { useGetAdminPagesList } from '@/features/identity/pagesCheck'
import { useSidebarStore } from '@/stores/sidebar'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import MenuOpenOutlinedIcon from '@mui/icons-material/MenuOpenOutlined'
import PublishedWithChangesOutlinedIcon from '@mui/icons-material/PublishedWithChangesOutlined'
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined'
import { Box, IconButton, Paper, useTheme } from '@mui/material'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import DropDownButton from './DropdownButton'
import UserMenu from './UserMenu'

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

  useEffect(() => {
    setUserHasAccess(doesUserHaveAccess())
  }, [])

  const handleMenuCollapseClick = () => {
    toggleSidebar()
  }

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
      name: 'GDOT ATSPM Installation Manual',
      icon: <InfoOutlinedIcon fontSize="small" />,
      link: 'https://udottraffic.utah.gov/ATSPM/Images/ATSPM_Installation_Manual_4.3.pdf',
    },
    {
      name: 'GDOT ATSPM Component Details',
      icon: <InfoOutlinedIcon fontSize="small" />,
      link: 'https://udottraffic.utah.gov/ATSPM/Images/ATSPM_Component_Details_4.3.pdf',
    },
    {
      name: 'GDOT ATSPM Reporting Details',
      icon: <InfoOutlinedIcon fontSize="small" />,
      link: 'https://udottraffic.utah.gov/ATSPM/Images/ATSPM_Reporting_Details_4.3.pdf',
    },
    {
      name: 'ATSPM User Case Examples Manual',
      link: 'https://udottraffic.utah.gov/ATSPM/Images/ATSPM_User%20Case%20Examples_Manual_20200128.pdf',
    },
    {
      name: 'Methods and Assumptions',
      icon: <QuestionAnswerOutlinedIcon fontSize="small" />,
      link: 'https://udottraffic.utah.gov/ATSPM/Images/ATSPM_Methods_and_Assumptions_4.3.pdf',
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
        p: 1,
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          borderRadius: '3px',
          backgroundColor: theme.palette.background.paper,
          marginY: '7px',
        }}
      >
        <Paper>
          <IconButton
            type="button"
            onClick={handleMenuCollapseClick}
            sx={{
              p: 1,
              transform: isSidebarOpen ? 'rotateY(0deg)' : 'rotateY(180deg)',
              transition: 'transform 0.5s',
            }}
          >
            <MenuOpenOutlinedIcon />
          </IconButton>
        </Paper>
      </Box>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          color: theme.palette.mode === 'light' ? 'white' : 'black',
        }}
      >
        <DropDownButton
          title="Manuals"
          icon={<InfoOutlinedIcon />}
          menuItems={documentItems}
        />
        <DropDownButton
          title="Info"
          icon={<InfoOutlinedIcon />}
          menuItems={infoItems}
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
  )
}
