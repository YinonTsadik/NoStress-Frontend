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

    const firstName = useSelector((state: RootState) => state.user).firstName
    const lastName = useSelector((state: RootState) => state.user).lastName
    const name = `${firstName} ${lastName}`

    const [openDialog, setOpenDialog] = useState(false)

    const navigate = useNavigate()

    const handleClose = () => {
        props.setAnchorEl(null)
    }

    const handleEditProfile = () => {
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
                anchorEl={props.anchorEl}
                open={props.open}
                onClose={handleClose}
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

                <MenuItem onClick={handleEditProfile}>
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
