import { makeStyles } from 'tss-react/mui'

const useStyles = makeStyles()({
    root: {
        border: '1px solid red',
        maxWidth: '37.5%',
        maxHeight: '60%',
        marginLeft: 'auto',
        marginTop: '-12.5vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        transform: 'translate(0%, 0%) scale(0.825)',
    },

    button: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
    },

    content: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '80%',
        overflowY: 'scroll',
    },
})

export default useStyles
