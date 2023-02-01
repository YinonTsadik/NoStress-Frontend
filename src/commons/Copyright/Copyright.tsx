import useStyles from './CopyrightStyles'
import { Typography } from '@mui/material'

export default function Copyright() {
    const { classes } = useStyles()
    return (
        <Typography variant="body2" className={classes.root}>
            {'Copyright © '}
            Yinon Tsadik {new Date().getFullYear()}
        </Typography>
    )
}
