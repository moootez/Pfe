import React, { Component } from 'react'
import { TextField, Button, Grid, Paper, Typography } from '@material-ui/core'
import axios from 'axios'

class NewEditProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            nom: '',
            prenom: '',
            email: '',
            tel: '',
            username: '',
            password: '',
            confirmerPassword: '',
            errors: {},
        }
    }

    componentDidMount() {
        // Fetch logged-in user data from localStorage
        const user = {
            id: localStorage.getItem('id_user'),
            email: localStorage.getItem('email'),
            nom: localStorage.getItem('nom'),
            prenom: localStorage.getItem('prenom'),
            tel: localStorage.getItem('tel'),
            username: localStorage.getItem('username'),
        }

        this.setState({ ...user })
    }

    handleInputChange = e => {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }

    handleFormSubmit = async e => {
        e.preventDefault()
        const {
            nom,
            prenom,
            email,
            tel,
            username,
            password,
            confirmerPassword,
        } = this.state

        const errors = {}

        // Field validation
        if (!nom) {
            errors.nom = 'Nom is required'
        }
        if (!prenom) {
            errors.prenom = 'Prénom is required'
        }
        if (!email) {
            errors.email = 'Email is required'
        }
        if (!tel) {
            errors.tel = 'Téléphone is required'
        }
        if (!username) {
            errors.username = 'Username is required'
        }

        // Password validation
        if (password && password !== confirmerPassword) {
            errors.confirmerPassword = 'Passwords do not match'
        }

        // If there are validation errors, stop submission
        if (Object.keys(errors).length > 0) {
            this.setState({ errors })
            return
        }

        // Create payload with only non-empty fields
        const payload = {}
        if (nom) payload.nom = nom
        if (prenom) payload.prenom = prenom
        if (email) payload.email = email
        if (tel) payload.tel = tel
        if (username) payload.username = username
        if (password) payload.password = password

        const token = localStorage.getItem('OpaliaToken') // Get Bearer token

        try {
            const response = await axios.patch(
                `http://127.0.0.1:8000/api/users/${localStorage.getItem(
                    'id_user'
                )}`,
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Send the Bearer token
                    },
                }
            )

            localStorage.setItem('nom', nom)
            localStorage.setItem('prenom', prenom)
            localStorage.setItem('email', email)
            localStorage.setItem('tel', tel)
            localStorage.setItem('username', username)

            console.log('User updated successfully:', response.data)
        } catch (error) {
            console.error('Error updating user:', error.response?.data)
        }
    }

    render() {
        const {
            nom,
            prenom,
            email,
            tel,
            username,
            password,
            confirmerPassword,
            errors,
        } = this.state

        return (
            <Grid container justify="center" style={{ marginTop: '20px' }}>
                <Grid item xs={12} sm={8} md={6}>
                    <Paper style={{ padding: '20px' }}>
                        <Typography variant="h5" align="center" gutterBottom>
                            Edit Profile
                        </Typography>
                        <form onSubmit={this.handleFormSubmit}>
                            <TextField
                                name="nom"
                                label="Nom"
                                value={nom}
                                onChange={this.handleInputChange}
                                fullWidth
                                margin="normal"
                                error={!!errors.nom}
                                helperText={errors.nom}
                            />
                            <TextField
                                name="prenom"
                                label="Prénom"
                                value={prenom}
                                onChange={this.handleInputChange}
                                fullWidth
                                margin="normal"
                                error={!!errors.prenom}
                                helperText={errors.prenom}
                            />
                            <TextField
                                name="email"
                                label="Email"
                                value={email}
                                onChange={this.handleInputChange}
                                fullWidth
                                margin="normal"
                                type="email"
                                error={!!errors.email}
                                helperText={errors.email}
                            />
                            <TextField
                                name="tel"
                                label="Téléphone"
                                value={tel}
                                onChange={this.handleInputChange}
                                fullWidth
                                margin="normal"
                                error={!!errors.tel}
                                helperText={errors.tel}
                            />
                            <TextField
                                name="username"
                                label="Username"
                                value={username}
                                onChange={this.handleInputChange}
                                fullWidth
                                margin="normal"
                                error={!!errors.username}
                                helperText={errors.username}
                            />
                            <TextField
                                name="password"
                                label="Password"
                                value={password}
                                onChange={this.handleInputChange}
                                fullWidth
                                margin="normal"
                                type="password"
                            />
                            <TextField
                                name="confirmerPassword"
                                label="Confirm Password"
                                value={confirmerPassword}
                                onChange={this.handleInputChange}
                                fullWidth
                                margin="normal"
                                type="password"
                                error={!!errors.confirmerPassword}
                                helperText={errors.confirmerPassword}
                            />
                            <div
                                style={{
                                    marginTop: '20px',
                                    textAlign: 'center',
                                }}
                            >
                                <Button
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                >
                                    Save Changes
                                </Button>
                            </div>
                        </form>
                    </Paper>
                </Grid>
            </Grid>
        )
    }
}

export default NewEditProfile
