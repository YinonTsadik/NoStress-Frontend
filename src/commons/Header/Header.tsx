import useStyles from './HeaderStyles'
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material'

import { EventNote } from '@mui/icons-material'

import { useSelector } from 'react-redux'
import { RootState } from '../../redux'

import Profile from './Profile'

export default function Header() {
    const { classes } = useStyles()
    const auth = Boolean(useSelector((state: RootState) => state.user).id)

    return (
        <AppBar position="static" className={classes.root}>
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 'auto' }}
                >
                    <EventNote fontSize="large" sx={{ mr: 2 }} />
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        NoStress
                    </Typography>
                </IconButton>
                {auth && <Profile />}
            </Toolbar>
        </AppBar>
    )
}
