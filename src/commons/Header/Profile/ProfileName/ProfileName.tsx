import { ProfileNameProps } from '../../../../interfaces'
import { Avatar } from '@mui/material'

const stringToColor = (string: string) => {
    let i
    let hash = 0

    for (i = 0; i < string.length; i++) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash)
    }

    let color = '#'

    for (i = 0; i < 3; i++) {
        const value = (hash >> (i * 8)) & 0xff
        color += `00${value.toString(16)}`.slice(-2)
    }

    return color
}

const stringAvatar = (name: string) => {
    return {
        sx: {
            backgroundColor: stringToColor(name),
            border: '1px solid white',
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    }
}

export default function ProfileName(props: ProfileNameProps) {
    return <Avatar {...stringAvatar(props.name)} />
}
