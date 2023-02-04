import { ProfileMenuProps } from '../../../../interfaces'
import { Menu, MenuItem, Typography, Divider, Box } from '@mui/material'
import { Edit, Logout } from '@mui/icons-material'
import useStyles from './ProfileMenuStyles'

export default function ProfileMenu(props: ProfileMenuProps) {
    const { classes } = useStyles()

    const handleClose = () => {
        props.setAnchorEl(null)
    }

    const handleEditProfile = () => {}

    return (
        <Menu
            anchorEl={props.anchorEl}
            open={props.open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
                className: classes.root,
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
            <MenuItem className={classes.menuItem}>
                <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="caption">Signed in as</Typography>
                    <Typography
                        variant="h6"
                        fontWeight="bold"
                    >{`Yinon Tsadik`}</Typography>
                </Box>
            </MenuItem>

            <Divider color="black" />

            <MenuItem onClick={handleEditProfile}>
                <Edit fontSize="small" sx={{ marginRight: '1vw' }} />
                <Typography>Edit your profile</Typography>
            </MenuItem>

            <Divider color="black" />

            <MenuItem onClick={handleClose}>
                <Logout fontSize="small" sx={{ marginRight: '1vw' }} />
                <Typography>Sign out</Typography>
            </MenuItem>
        </Menu>
    )
}
