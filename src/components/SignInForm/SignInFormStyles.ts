import { makeStyles } from 'tss-react/mui'

const useStyles = makeStyles()({
    root: {
        width: '35vw',
        maxWidth: '600px',
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        top: '55%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        alignItems: 'center',
        padding: '7.5vh',
        borderRadius: '5vh',
        backgroundColor: '#FEFFE5',
        boxShadow: '0 0.5vh 2vh 0 rgba(0,0,0,0.2)',
    },

    formLabel: {
        margin: '0.7vh 0',
        fontSize: '2vw',
        fontWeight: 'bold',
    },

    form: {
        display: 'flex',
        flexDirection: 'column',
        width: '80%',
    },

    textField: {
        width: '100%',
        marginTop: '0.8vh',
    },

    link: {
        width: '100%',
        color: '#3f51b5',
        '&:hover': {
            textDecoration: 'underline',
        },

        '.MuiTypography-root': {
            fontSize: '1.4vw',
        },
    },

    button: {
        marginTop: '2.7vh',
        backgroundColor: '#3f51b5',
        padding: '2vh',
        borderRadius: '0.5vh',
        fontSize: '1.35vw',
        fontWeight: 'bold',
        '&:hover': {
            backgroundColor: '#2b3d91',
        },
    },
})

export default useStyles
