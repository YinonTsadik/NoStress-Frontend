import { makeStyles } from 'tss-react/mui'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

const useStyles = makeStyles()({
    root: {
        width: '65%',
        height: '72.5%',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        position: 'fixed',
        bottom: '3vh',
    },

    calendar: {
        fontFamily: 'Roboto',
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        borderRadius: '7px',
        padding: '3vh 1vw',
        boxShadow: '0 0.5vh 2vh 0 rgba(0,0,0,0.2)',
    },
})

export default useStyles
