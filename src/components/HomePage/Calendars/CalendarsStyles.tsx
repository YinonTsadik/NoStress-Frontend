import { makeStyles } from 'tss-react/mui'

const useStyles = makeStyles()({
    root: {
        display: 'flex',
        alignContent: 'center',
        width: '20%',
        borderRadius: '7px',
        marginLeft: '2vw',
        border: '1px solid black',
        boxShadow: '0 0.5vh 2vh 0 rgba(0,0,0,0.2)',
    },

    button: {
        width: '100%',
        display: 'flex',
        paddingInline: '1vw',
        alignItems: 'center',
        justifyContent: 'space-between',
        color: 'black',
        textTransform: 'none',
        fontSize: '1.25vw',
        fontWeight: 'bold',
        backgroundColor: '#E1DFE1',
        '&:hover': {
            backgroundColor: '#B8B6B6',
        },
    },

    menu: {
        backgroundColor: '#E1DFE1',
        width: '20%',
    },
})

export default useStyles
