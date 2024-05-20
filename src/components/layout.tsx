import Sidebar from '@/components/layout/sidebar/Sidebar'
import Toast from '@/components/toast'
import { useSidebarStore } from '@/stores/sidebar'
import { Box, useTheme } from '@mui/material'
import React from 'react'
import Topbar from './layout/topbar'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const theme = useTheme()
  const { isSidebarOpen } = useSidebarStore()

  return (
    <Box
      className="app"
      sx={{
        display: 'flex',
        // backgroundColor: theme.palette.background.paper,
      }}
    >
      <Box component="nav">
        <Sidebar />
      </Box>
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
            padding: theme.spacing(3),
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
        <Toast />
      </Box>
    </Box>
  )
}
