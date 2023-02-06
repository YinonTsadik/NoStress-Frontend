import BigCalendar from '../../components/BigCalendar'
import useStyles from './HomeStyles'

export default function Home() {
    const { classes } = useStyles()

    return (
        <div className={classes.root}>
            <BigCalendar />
        </div>
    )
}
