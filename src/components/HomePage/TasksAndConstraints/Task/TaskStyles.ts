import { makeStyles } from 'tss-react/mui'

const useStyles = makeStyles()({
    root: {
        border: '1px solid red',
        display: 'flex',
        alignItems: 'center',
        // justifyContent: 'space-evenly',
        padding: '3.5%',
        margin: '3%',
        backgroundColor: '#F5BC42',
        borderRadius: '5px',
    },

    description: {
        fontWeight: 'bold',
        textAlign: 'center',
        width: '33.33%',
    },

    deadline: {
        textAlign: 'center',
        width: '33.33%',
    },

    workHours: {
        textAlign: 'center',
        width: '33.33%',
    },

    divider: {
        alignSelf: 'stretch',
        height: 'auto',
        margin: '0 5%',
        backgroundColor: 'black',
    },
})

export default useStyles
