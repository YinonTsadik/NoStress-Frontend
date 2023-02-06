// import { useSelector } from 'react-redux'
// import { RootState } from '../../redux'

// import { useDispatch } from 'react-redux'
// import { bindActionCreators } from 'redux'
// import { actionCreators } from '../../redux'

// import { useQuery } from '@apollo/client'
// import { GET_USER_CALENDARS } from '../../graphql'

import useStyles from './HomeStyles'

export default function Home() {
    const { classes } = useStyles()

    // const dispatch = useDispatch()

    // const user = useSelector((state: RootState) => state.user)
    // const userID = user.id

    return (
        <div className={classes.root}>
            <h1>Home</h1>
        </div>
    )
}
