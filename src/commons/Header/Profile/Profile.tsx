import { useSelector } from 'react-redux'
import { RootState } from '../../../redux'

import { useState } from 'react'

import { Box, IconButton } from '@mui/material'
import ProfileName from './ProfileName'
import ProfileMenu from './ProfileMenu'

export default function Profile() {
    const user = useSelector((state: RootState) => state.user)

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
                <ProfileName name={`${user.firstName} ${user.lastName}`} />
            </IconButton>
            <ProfileMenu anchorEl={anchorEl} setAnchorEl={setAnchorEl} open={open} />
        </Box>
    )
}
