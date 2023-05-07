import { makeStyles } from 'tss-react/mui'

const useStyles = makeStyles()({
    root: {
        width: '15vw',
        overflow: 'visible',
        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
        marginTop: '2vh',
        backgroundColor: '#FEFFE5',

        '&:before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            right: '1.75vw',
            width: '0.75vw',
            height: '1.5vh',
            backgroundColor: '#FEFFE5',
            transform: 'translateY(-50%) rotate(45deg)',
        },
    },

    menuItem: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },

    iconButton: {
        marginLeft: 'auto',
    },
})

export default useStyles
