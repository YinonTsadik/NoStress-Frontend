import { makeStyles } from 'tss-react/mui'

const useStyles = makeStyles()({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%',
        height: '80%',
        marginTop: '5.5%',
    },

    header: {
        fontSize: '4vw',
        fontWeight: 'bold',
        marginBottom: '2vw',
        textAlign: 'center',
        backgroundColor: '#F5BC42',
        color: 'black',
        borderRadius: '10px 10px 0 0',
        padding: '1vw',
    },

    subHeader: {
        fontSize: '2vw',
        textAlign: 'center',
        backgroundColor: '#0A4D8C',
        color: 'white',
        borderRadius: '0 0 10px 10px',
        padding: '1vw',
    },

    button: {
        backgroundColor: '#E1DFE1',
        color: 'black',
        border: '1px solid black',
        borderRadius: '10px',
        textTransform: 'none',
        width: '22.5vw',
        height: '12.5vh',
        marginTop: '5vh',
        fontSize: '1.75vw',
        boxShadow: '0 0.5vh 2vh 0 rgba(0,0,0,0.2)',
        '&:hover': {
            backgroundColor: '#B8B6B6',
        },
    },
})

export default useStyles
