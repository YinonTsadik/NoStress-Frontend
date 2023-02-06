import React from 'react'

import {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@mui/material'

export interface EditProfileProps {
    open: boolean
    handleClose: () => void
}

const EditProfileDialog: React.FC<EditProfileProps> = (props) => {
    const { open, handleClose } = props

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        handleClose()
    }

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <TextField label="First Name" />
                    <TextField label="Last Name" />
                    <TextField label="Username" />
                    <TextField label="Password" type="password" />
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit">OK</Button>
            </DialogActions>
        </Dialog>
    )
}

export default EditProfileDialog
