import { AppBar, Toolbar, IconButton, Typography } from '@mui/material'
import { EventNote } from '@mui/icons-material'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux'
import { useNavigate } from 'react-router-dom'
import Profile from './Profile'
import useStyles from './HeaderStyles'

export default function Header() {
    const { classes } = useStyles()

    const navigate = useNavigate()

    const auth = Boolean(useSelector((state: RootState) => state.user).id)

    return (
        <AppBar position="static" className={classes.root}>
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    onClick={() => navigate('/')}
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
