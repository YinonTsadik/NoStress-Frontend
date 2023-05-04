import { makeStyles } from 'tss-react/mui'

const useStyles = makeStyles()({
    root: {
        width: '100%',
        height: '100%',
    },

    caption: {
        marginTop: '10%',
    },

    editButton: {
        position: 'absolute',
        top: 0,
        right: 0,
        paddingRight: '2.5%',
    },

    deleteButton: {
        position: 'absolute',
        marginTop: '10%',
        right: 0,
        paddingRight: '2.5%',
    },
})

export default useStyles
