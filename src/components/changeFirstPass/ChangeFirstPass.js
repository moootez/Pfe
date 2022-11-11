import React, { useState } from 'react'
import axios from 'axios'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import baseUrl from '../../serveur/baseUrl'
import '../../assets/sass/style.scss'

const FirstPassChange = () => {
    const [password, setPassword] = useState('')
    const [disabled, setDisabled] = useState(true)
    const [error, setError] = useState(false)

    const ButtonStyle = {
        marginTop: '35px',
    }
    const ReinitPassword = {
        border: '1px solid #e0e0e0',
        padding: '20px',
    }
    const checkInput = e => {
        setPassword(e.target.value)
        if (
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?! .*\s).{8,}$/g.test(
                e.target.value
            )
        ) {
            setDisabled(false)
            setError(false)
        } else {
            setDisabled(true)
            setError(true)
        }
    }

    const changePassword = async e => {
        e.preventDefault()
        try {
            const response = await axios.put(
                `${baseUrl}users/change_password`,
                {
                    password,
                    mailer_user: localStorage.email,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.OpaliaToken}`,
                    },
                }
            )

            if (response.data.status === 'sucess') {
                localStorage.clear()
                window.location.reload(true)
            }
        } catch (err) {
            console.log(err.message)
        }
    }
    return (
        <div className="Card blc_reinit_password">
            <form>
                <TextField
                    error={error}
                    value={password}
                    type="password"
                    onChange={e => checkInput(e)}
                    fullWidth
                    required
                    label="Nouveau mot de passe"
                    style={ReinitPassword}
                />
                {error && (
                    <span
                        style={{
                            color: 'red',
                            fontSize: '13px',
                            marginRight: '15px',
                        }}
                    >
                        Un champ d&apos;au moins 8 caractères. Il contient au
                        moins une lettre minuscule , une lettre majuscule, un
                        chiffre numérique, et un caractère spécial{' '}
                    </span>
                )}
                <Button
                    disabled={disabled}
                    onClick={e => changePassword(e)}
                    style={ButtonStyle}
                    fullWidth
                    variant="contained"
                    color="primary"
                >
                    Mettre à jour
                </Button>
            </form>
        </div>
    )
}

export default FirstPassChange
