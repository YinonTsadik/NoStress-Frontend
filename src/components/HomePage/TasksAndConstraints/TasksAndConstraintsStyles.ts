import { makeStyles } from 'tss-react/mui'

const useStyles = makeStyles()({
    root: {
        width: '32.5%',
        height: '82.5vh',
        margin: '-6.75vh 1.75vw 3.5vh auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#FEFFE5',
        borderRadius: '7px',
    },

    switchBox: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '2vh 0',
    },

    switch: {
        margin: '0 0.75vw',
    },

    switchLabel: {
        width: '6vw',
        textAlign: 'center',
    },

    content: {
        border: '1px solid silver',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '80%',
        margin: '3%',
        overflowY: 'auto',
        overflowX: 'hidden',
        borderRadius: '7px',
    },
})

export default useStyles
