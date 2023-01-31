import { makeStyles } from 'tss-react/mui'

const useStyles = makeStyles()({
    container: {
        backgroundColor: '#FEFFE5',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '35px 0',
        borderRadius: '20px',
        maxWidth: '35%',
        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
    },

    formLabel: {
        margin: '3px 0',
        fontSize: '24px',
        fontWeight: 'bold',
    },

    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '80%',
    },

    textField: {
        color: 'black',
        width: '100%',
        marginTop: '8px',
        borderRadius: '5px',
    },

    link: {
        color: '#3f51b5',
        marginBottom: '15px',
        textAlign: 'center',
        fontSize: '15px',
        '&:hover': {
            textDecoration: 'underline',
        },
    },

    button: {
        width: '100%',
        backgroundColor: '#3f51b5',
        color: 'white',
        padding: '10px',
        borderRadius: '5px',
        border: 'none',
        fontWeight: 'bold',
        '&:hover': {
            backgroundColor: '#2b3d91',
        },
    },
})

export default useStyles
