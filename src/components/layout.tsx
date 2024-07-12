import Sidebar from '@/components/layout/sidebar/Sidebar'
import Toast from '@/components/toast'
import { useSidebarStore } from '@/stores/sidebar'
import { Box, useTheme } from '@mui/material'
import React, { useEffect } from 'react'
import Topbar from './layout/topbar'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const theme = useTheme()
  const { isSidebarOpen } = useSidebarStore()

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'visible'
    }
    return () => {
      document.body.style.overflow = 'visible'
    }
  }, [isSidebarOpen])

  
  
  return (
    <Box
      className="app"
      sx={{
        display: 'flex',
        // backgroundColor: theme.palette.background.paper,
      }}
    >

      <Box
        component="main"
        className="content"
        sx={{
          backgroundColor: theme.palette.background.default,
        }}
      >
        <Topbar />
        
        <Box
          sx={{
         
            minHeight: `calc(100vh - 73px)`,
            width: '100%',
            transition: 'width 0.3s ease-out',
            [theme.breakpoints.down('sm')]: {
              padding: theme.spacing(1),
            },
            [theme.breakpoints.down('xs')]: {
              padding: theme.spacing(0),
            },
          }}
        >
          {children}
        </Box>
        <Box component="nav">
        <Sidebar />
      </Box>
        <Toast />
      </Box>
    </Box>
  )
}
