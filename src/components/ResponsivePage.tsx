import { Box, useTheme } from '@mui/material'
import Head from 'next/head'
import Header from './header'

interface ResponsivePageLayoutProps {
  children: React.ReactNode
  title: string
  noBottomMargin?: boolean
}

export const ResponsivePageLayout = ({
  children,
  title,
  noBottomMargin,
}: ResponsivePageLayoutProps) => {
  const theme = useTheme()
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',

        maxWidth: '1550px',
        minWidth: '375px',
        [theme.breakpoints.down('md')]: {},
      }}
    >
      <Head>
        <title>{title}</title>
      </Head>
      <Box sx={{ mb: noBottomMargin ? 0 : 3 }}>
        <Header title={title} />
      </Box>
      {children}
    </Box>
  )
}
