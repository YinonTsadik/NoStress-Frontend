import { Box, Link, Typography } from '@mui/material'

export default function Copyright() {
    return (
        <Box sx={{ position: 'fixed', bottom: '1.2vh', width: '100%' }}>
            <Typography variant="body2" color="text.secondary" align="center">
                {'Copyright © '}
                <Link color="inherit" href="/">
                    NoStress
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        </Box>
    )
}
