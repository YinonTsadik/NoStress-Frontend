import { makeStyles } from 'tss-react/mui'

const useStyles = makeStyles()({
    root: {
        width: '30vw',
        height: '35vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '4.5vh',
        borderRadius: '7px',
        backgroundColor: '#FEFFE5',
        boxShadow: '0 0.5vh 2vh 0 rgba(0,0,0,0.2)',
    },

    title: {
        marginBottom: '5.25vh',
        fontSize: '2.25vw',
        fontWeight: 'bold',
    },

    subtitle: {
        fontSize: '1vw',
    },

    buttonsContainer: {
        marginTop: '6vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 1.5vw',
    },

    cancelButton: {
        textTransform: 'none',
        padding: '1vh',
    },

    deleteButton: {
        borderRadius: '1vh',
        fontSize: '1vw',
        fontWeight: 'bold',
    },
})

export default useStyles
