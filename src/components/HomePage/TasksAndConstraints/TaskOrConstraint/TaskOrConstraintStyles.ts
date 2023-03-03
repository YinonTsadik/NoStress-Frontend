import { makeStyles } from 'tss-react/mui'

const useStyles = makeStyles()({
    root: {
        display: 'flex',
        alignItems: 'center',
        padding: '3.5%',
        margin: '3%',
        width: '25vw',
        height: '7.5vh',
        borderRadius: '5px',
        boxShadow: '0 0.5vh 2vh 0 rgba(0,0,0,0.2)',
    },

    divider: {
        alignSelf: 'stretch',
        height: 'auto',
        margin: '0 2.5%',
        backgroundColor: 'black',
    },

    description: {
        flex: 1,
        textAlign: 'center',
        fontWeight: 'bold',
    },

    property: {
        flex: 1,
        textAlign: 'center',
    },

    iconButton: {
        position: 'absolute',
        top: 0,
        right: 0,
        padding: 0,
        margin: 0,
    },
})

export default useStyles
