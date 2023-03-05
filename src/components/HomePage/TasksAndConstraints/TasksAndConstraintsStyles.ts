import { makeStyles } from 'tss-react/mui'

const useStyles = makeStyles()({
    root: {
        width: '30%',
        height: '85vh',
        margin: '-7.5vh 3vw 0 auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#FEFFE5',
        borderRadius: '7px',
        boxShadow: '0 0.5vh 2vh 0 rgba(0,0,0,0.2)',
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

    headers: {
        width: '25vw',
        marginTop: '1vh',
    },

    description: {
        marginLeft: '1vw',
        fontWeight: 'bold',
    },

    deadline: {
        marginLeft: '5vw',
        fontWeight: 'bold',
    },

    hours: {
        marginLeft: '5.5vw',
        fontWeight: 'bold',
    },

    start: {
        marginLeft: '2.65vw',
        fontWeight: 'bold',
    },

    end: {
        marginLeft: '4.25vw',
        fontWeight: 'bold',
    },

    type: {
        marginLeft: '4.35vw',
        fontWeight: 'bold',
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
