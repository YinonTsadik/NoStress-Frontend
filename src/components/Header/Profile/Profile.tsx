import React from 'react'

import { useSelector } from 'react-redux'
import { RootState } from '../../../redux'

import { useMemo, useState } from 'react'

import { Box, IconButton, Avatar } from '@mui/material'
import ProfileMenu from './ProfileMenu'

const stringToColor = (string: string) => {
    let i
    let hash = 0

    for (i = 0; i < string.length; i++) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash)
    }

    let color = '#'

    for (i = 0; i < 3; i++) {
        const value = (hash >> (i * 8)) & 0xff
        color += `00${value.toString(16)}`.slice(-2)
    }

    return color
}

const stringAvatar = (name: string) => {
    return {
        sx: {
            backgroundColor: stringToColor(name),
            border: '1px solid white',
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    }
}

const Profile: React.FC = () => {
    const firstName = useSelector((state: RootState) => state.user.firstName)
    const lastName = useSelector((state: RootState) => state.user.lastName)
    const name = useMemo(() => `${firstName} ${lastName}`, [firstName, lastName])

    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
    const open = Boolean(anchorEl)

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    return (
        <Box>
            <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
            >
                <Avatar {...stringAvatar(name)} />
            </IconButton>
            <ProfileMenu anchorEl={anchorEl} setAnchorEl={setAnchorEl} open={open} />
        </Box>
    )
}

export default Profile
