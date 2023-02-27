import { makeStyles } from 'tss-react/mui'

const useStyles = makeStyles()({
    root: {
        border: '1px solid red',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        padding: '3.5%',
        margin: '3%',
        backgroundColor: '#2A9D8F',
        borderRadius: '5px',
    },

    description: {
        fontWeight: 'bold',
        flex: '1',
        textAlign: 'center',
    },

    startTime: {
        flex: '1',
        textAlign: 'center',
    },

    endTime: {
        flex: '1',
        textAlign: 'center',
    },

    type: {
        flex: '1',
        textAlign: 'center',
    },

    divider: {
        height: '5vh',
        margin: '0 0.5vw',
    },
})

export default useStyles
