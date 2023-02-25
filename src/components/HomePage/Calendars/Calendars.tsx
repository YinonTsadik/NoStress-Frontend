import React, { useState } from 'react'

import { useSelector } from 'react-redux'
import { RootState } from '../../../redux'

import { Box, Button, Menu, Divider } from '@mui/material'
import { ArrowDropUp, ArrowDropDown } from '@mui/icons-material'

import Calendar from './Calendar'
import useStyles from './CalendarsStyles'

const Calendars: React.FC = () => {
    const { classes } = useStyles()

    const calendars = useSelector((state: RootState) => state.calendars.data)
    const currentCalendar = useSelector(
        (state: RootState) => state.currentCalendar.data
    )

    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

    const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleCloseMenu = () => {
        setAnchorEl(null)
    }

    return (
        <Box className={classes.root}>
            <Button
                aria-controls="calendars-menu"
                aria-haspopup="true"
                onClick={handleOpenMenu}
                endIcon={Boolean(anchorEl) ? <ArrowDropUp /> : <ArrowDropDown />}
                className={classes.button}
            >
                <Box sx={{ width: '100%', textAlign: 'center' }}>
                    {currentCalendar.name}
                </Box>
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
                PaperProps={{
                    className: classes.menu,
                }}
            >
                {calendars.map((calendar) => (
                    <Box key={calendar.id}>
                        <Calendar
                            calendar={calendar}
                            handleCloseMenu={handleCloseMenu}
                        />
                        {calendar !== calendars[calendars.length - 1] ? (
                            <Divider color="black" />
                        ) : (
                            <></>
                        )}
                    </Box>
                ))}
            </Menu>
        </Box>
    )
}

export default Calendars
