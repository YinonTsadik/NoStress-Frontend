import React, { useState } from 'react'

import { ProfileMenuProps } from '../../../../interfaces'
import { Box, Menu, MenuItem, Typography, Divider } from '@mui/material'
import { Edit, Logout } from '@mui/icons-material'

import { useSelector } from 'react-redux'
import { RootState } from '../../../../redux'

import { useNavigate } from 'react-router-dom'

import EditProfileDialog from './EditProfileDialog'

import useStyles from './ProfileMenuStyles'

const ProfileMenu: React.FC<ProfileMenuProps> = (props) => {
    const { classes } = useStyles()
    const { anchorEl, open, handleCloseMenu } = props

    const firstName = useSelector((state: RootState) => state.user).firstName
    const lastName = useSelector((state: RootState) => state.user).lastName
    const name = `${firstName} ${lastName}`

    const [openDialog, setOpenDialog] = useState(false)

    const navigate = useNavigate()

    const handleOpenDialog = () => {
        setOpenDialog(true)
    }

    const handleCloseDialog = () => {
        setOpenDialog(false)
    }

    const handleSignOut = () => {
        navigate('/signin')
    }

    return (
        <Box>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleCloseMenu}
                PaperProps={{
                    className: classes.root,
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem className={classes.menuItem}>
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="caption">Signed in as</Typography>
                        <Typography variant="h6" fontWeight="bold">
                            {name}
                        </Typography>
                    </Box>
                </MenuItem>

                <Divider color="black" />

                <MenuItem onClick={handleOpenDialog}>
                    <Edit fontSize="small" sx={{ marginRight: '1vw' }} />
                    <Typography>Edit your profile</Typography>
                </MenuItem>

                <Divider color="black" />

                <MenuItem onClick={handleSignOut}>
                    <Logout fontSize="small" sx={{ marginRight: '1vw' }} />
                    <Typography>Sign out</Typography>
                </MenuItem>
            </Menu>
            <EditProfileDialog open={openDialog} handleClose={handleCloseDialog} />
        </Box>
    )
}

export default ProfileMenu
