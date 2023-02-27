import { makeStyles } from 'tss-react/mui'

const useStyles = makeStyles()({
    root: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        overflow: 'hidden',
        backgroundImage: 'linear-gradient(to right, #266870, #A6BBC1)',
    },
})

export default useStyles
