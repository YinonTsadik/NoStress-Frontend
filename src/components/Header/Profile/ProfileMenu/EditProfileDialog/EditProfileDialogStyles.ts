import { makeStyles } from 'tss-react/mui'

const useStyles = makeStyles()({
    root: {
        width: '30vw',
        display: 'flex',
        flexDirection: 'column',
        top: '55%',
        left: '50%',
        alignItems: 'center',
        padding: '4.5vh',
        // borderRadius: '5vh',
        backgroundColor: '#FEFFE5',
        boxShadow: '0 0.5vh 2vh 0 rgba(0,0,0,0.2)',
    },

    formLabel: {
        marginBottom: '2vh',
        fontSize: '2.5vw',
        fontWeight: 'bold',
        color: 'black',
    },

    form: {
        display: 'flex',
        flexDirection: 'column',
        width: '80%',
    },

    textField: {
        marginTop: '0.8vh',
    },

    buttonContainer: {
        padding: '0 1vw',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    cancelButton: {
        textTransform: 'none',
    },

    saveButton: {
        backgroundColor: '#3f51b5',
        padding: '2vh',
        borderRadius: '1vh',
        fontSize: '1vw',
        fontWeight: 'bold',
        '&:hover': {
            backgroundColor: '#2b3d91',
        },
    },
})

export default useStyles
