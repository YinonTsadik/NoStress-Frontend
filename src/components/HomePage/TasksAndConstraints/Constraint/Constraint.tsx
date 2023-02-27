import React from 'react'
import { ConstraintProps } from '../../../../interfaces'
import { Box, Typography, Divider } from '@mui/material'
import useStyles from './ConstraintStyles'

const Constraint: React.FC<ConstraintProps> = (props) => {
    const { classes } = useStyles()
    const { constraint } = props

    return (
        <Box className={classes.root}>
            <Typography className={classes.description}>
                {constraint.description}
            </Typography>
            <Divider
                orientation="vertical"
                color="black"
                className={classes.divider}
            />
            <Typography className={classes.startTime}>
                {new Date(constraint.startTime).toLocaleString()}
            </Typography>
            <Divider
                orientation="vertical"
                color="black"
                className={classes.divider}
            />
            <Typography className={classes.endTime}>
                {new Date(constraint.endTime).toLocaleString()}
            </Typography>
            <Divider
                orientation="vertical"
                color="black"
                className={classes.divider}
            />
            <Typography className={classes.type}>{constraint.type}</Typography>
        </Box>
    )
}

export default Constraint
