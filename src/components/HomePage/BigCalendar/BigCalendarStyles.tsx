import { makeStyles } from 'tss-react/mui'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

const useStyles = makeStyles()({
    root: {
        // border: '1px solid red',
        marginLeft: 0,
        width: '65vw',
        height: '75vh',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        position: 'fixed',
        bottom: '3.5vh',
    },

    calendar: {
        // border: '1px solid red',
        fontFamily: 'Roboto',
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        borderRadius: '7px',
        padding: '2vh 1vw',
    },
})

export default useStyles
