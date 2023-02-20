import React, { useState } from 'react'
import { Container, TextField, Button, Box, Typography } from '@mui/material'
import { useLazyQuery, useMutation } from '@apollo/client'
import { GET_USERS, GET_USER_BY_NAME, DELETE_USERS_BY_START } from '../../graphql'
import { User } from '../../interfaces'

const Test: React.FC = () => {
    const [input, setInput] = useState<string>('')
    const [users, setUsers] = useState<User[] | null>(null)
    const [deletedUsers, setDeletedUsers] = useState<User[] | null>(null)
    const [text, setText] = useState<string>('')

    const [getUserByName] = useLazyQuery(GET_USER_BY_NAME, {
        fetchPolicy: 'network-only',
    })

    const [getUsers] = useLazyQuery(GET_USERS, {
        fetchPolicy: 'network-only',
    })

    const [deleteUsersByStart] = useMutation(DELETE_USERS_BY_START, {
        fetchPolicy: 'network-only',
    })

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.currentTarget.value
        setInput(value)
    }

    const submitTask1 = () => {
        if (!input) {
            getUsers().then(({ data }) => {
                if (data.getUsers) {
                    const users: User[] = data.getUsers.map((user: any) => {
                        const { __typename, ...rest } = user
                        return rest as User
                    })
                    setText('')
                    setUsers(users)
                }
            })
        } else
            getUserByName({ variables: { name: input } }).then(({ data }) => {
                if (data.getUserByName) {
                    const { __typename, ...rest } = data.getUserByName
                    const user = rest as User
                    setUsers([user])
                    setText('')
                } else {
                    setUsers(null)
                    setText('Not Found')
                }
            })

        setDeletedUsers(null)
    }

    const submitTask2 = () => {
        if (!input) return

        deleteUsersByStart({ variables: { start: input } }).then(({ data }) => {
            if (data.deleteUsersByStart) {
                const users: User[] = data.deleteUsersByStart.map((user: any) => {
                    const { __typename, ...rest } = user
                    return rest as User
                })
                setText('')
                setUsers(null)
                setDeletedUsers(users)
            }
        })
    }

    return (
        <Container
            sx={{
                backgroundColor: 'white',
                width: '40%',
                display: 'flex',
                flexDirection: 'column',
                alignContent: 'center',
                marginTop: '5%',
                padding: '2.5%',
                borderRadius: '5px',
            }}
        >
            <TextField label="Name" onChange={onChange} variant="filled" />
            <Button onClick={submitTask1}>Task1</Button>
            <Button onClick={submitTask2}>Task2</Button>

            <Box sx={{ border: '1px solid black' }}>
                <Typography>{text}</Typography>

                {users &&
                    users.map((user) => {
                        return (
                            <div key={user.id}>
                                <Typography>{`${user.id}`}</Typography>
                                <Typography>{`${user.firstName}`}</Typography>
                                <Typography>{`${user.lastName}`}</Typography>
                                <Typography>{`${user.username}`}</Typography>
                                <Typography>{`${user.password}`}</Typography>
                                <br />
                            </div>
                        )
                    })}

                {deletedUsers && (
                    <Box>
                        <Typography>{`Deleted users: ${deletedUsers.length}`}</Typography>
                        <br />
                        {deletedUsers.map((user) => {
                            return (
                                <div key={user.id}>
                                    <Typography>{`${user.id}`}</Typography>
                                    <Typography>{`${user.firstName}`}</Typography>
                                    <Typography>{`${user.lastName}`}</Typography>
                                    <Typography>{`${user.username}`}</Typography>
                                    <Typography>{`${user.password}`}</Typography>
                                    <br />
                                </div>
                            )
                        })}
                    </Box>
                )}
            </Box>
        </Container>
    )
}

export default Test
