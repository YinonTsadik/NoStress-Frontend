import { makeStyles } from 'tss-react/mui'

const useStyles = makeStyles()({
    root: {
        transform: `scale(0.85)`,
        maxWidth: '35%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '35px',
        borderRadius: '20px',
        backgroundColor: '#FEFFE5',
        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
        marginTop: '0',
    },

    formLabel: {
        margin: '3px 0',
        fontSize: '24px',
        fontWeight: 'bold',
    },

    form: {
        display: 'flex',
        flexDirection: 'column',
        width: '80%',
    },

    textField: {
        width: '100%',
        marginTop: '8px',
    },

    link: {
        color: '#3f51b5',
        fontSize: '15px',
        '&:hover': {
            textDecoration: 'underline',
        },
    },

    button: {
        marginTop: '15px',
        backgroundColor: '#3f51b5',
        padding: '10px',
        borderRadius: '5px',
        fontWeight: 'bold',
        '&:hover': {
            backgroundColor: '#2b3d91',
        },
    },
})

export default useStyles
