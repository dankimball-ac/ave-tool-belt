import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'

import Link from 'next/link'

import Login from '@/features/identity/components/signin'
import {
  Avatar,
  Dialog,
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  Typography,
  useTheme,
} from '@mui/material'
import Cookies from 'js-cookie'
import React, { useState } from 'react'

interface ItemProps {
  index: number
  item: {
    name: string
    icon: JSX.Element
    link: string
  }
//   handleClick: (
//     event: (event: MouseEvent<HTMLButtonElement, MouseEvent>) => void
//   )
}

const ListSubMenuItem = ({ index, item }: ItemProps) => {
  return (
    <ListItemButton
      key={index}
      // onClick={handleClick}
      component={Link}
      href={item.link}
    >
      <ListItemIcon>{item.icon}</ListItemIcon>
      <ListItemText primary={item.name} />
    </ListItemButton>
  )
}

const userItems = [
  {
    name: 'Profile',
    icon: <PersonOutlineOutlinedIcon fontSize="small" />,
    link: '/user/profile',
  },
]

export default function UserMenu() {
  const theme = useTheme()
  const mode = theme.palette.mode

  const [anchorElement, setAnchorElement] = useState<null | HTMLElement>(null)
  const [openLogin, setOpenLogin] = useState(false)

  const handleLoginOpen = () => {
    setOpenLogin(true)
  }

  const handleSignOut = () => {
    const cookies = Cookies.get()
    Object.entries(cookies).forEach((value) => Cookies.remove(value[0]))
    window.location.href = '/locations'
  }

  const handleLoginClose = () => {
    setOpenLogin(false)
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElement(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorElement(null)
  }

  return (
    <>
      <IconButton
        id="userMenu"
        aria-controls="userMenu"
        aria-haspopup="true"
        aria-label="User Menu"
        onClick={handleClick}
      >
        <Avatar
          sx={{
            bgcolor:
              mode === 'light' ? theme.palette.primary.light : 'orange.light',
          }}
          variant="rounded"
        >
          <PersonOutlineOutlinedIcon style={{ color: 'white' }} />
        </Avatar>
      </IconButton>
      {anchorElement && (
        <Menu
          id="userMenu"
          anchorEl={anchorElement}
          open={Boolean(anchorElement)}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'user-button',
          }}
        >
          <List
            sx={{
              width: '100%',
              maxWidth: 400,
            }}
            component="nav"
          >
            {Cookies.get('email')?.length && (
              <>
                <Typography
                  sx={{
                    fontWeight: '500',
                    textAlign: 'center',
                    p: 2,
                    paddingBottom: 2.5,
                  }}
                >
                  {Cookies.get('email')?.length ? Cookies.get('email') : ''}
                </Typography>
                <Divider />
              </>
            )}
            {Cookies.get('loggedIn') &&
              userItems.map((item, index) => (
                <ListSubMenuItem
                  key={index}
                  index={index}
                  item={item}
                  // handleClick={handleClose}
                />
              ))}
            <ListItemButton
              onClick={() =>
                Cookies.get('loggedIn') ? handleSignOut() : handleLoginOpen()
              }
            >
              <ListItemIcon>
                <LoginOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primary={Cookies.get('loggedIn') ? 'Log out' : 'Log in'}
              />
            </ListItemButton>
          </List>
        </Menu>
      )}
      {openLogin && (
        <Dialog onClose={handleLoginClose} open={openLogin}>
          <Login />
        </Dialog>
      )}
    </>
  )
}
