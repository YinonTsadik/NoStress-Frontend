import {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@mui/material'

import { useState } from 'react'

export interface EditProfileProps {
    open: boolean
    handleClose: () => void
}

export default function EditProfileDialog(props: EditProfileProps) {
    const { open, handleClose } = props
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        // handle form submission, validate the input, and make any necessary updates
        handleClose()
    }

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="First Name"
                        value={firstName}
                        onChange={(event) => setFirstName(event.target.value)}
                    />
                    <TextField
                        label="Last Name"
                        value={lastName}
                        onChange={(event) => setLastName(event.target.value)}
                    />
                    <TextField
                        label="Username"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit">OK</Button>
            </DialogActions>
        </Dialog>
    )
}
