import React, { useEffect, useState } from 'react'
import axios from 'axios'
import baseUrl from '../../serveur/baseUrl'
import '../../assets/sass/style.scss'
import PageTitle from '../../components/ui/pageTitle'
import { Divider, Grid } from '@material-ui/core'
import InputText from '../../components/ui/input'
import ButtonComponent from '../../components/ui/button'
import { useDispatch, useSelector } from 'react-redux'
import getParametresActions from '../../redux/parametres/getParametres'
import patchParametresActions from '../../redux/parametres/patchParametres'

const ParametreGlobale = () => {
    const [value, setValue] = useState({ valeur: 0, id: null })
    const dispatch = useDispatch();
    const response = useSelector(state => state.parametres.getParametres.response)

    useEffect(() => {
        dispatch(getParametresActions.getParametresRequest())
    }, [])

    useEffect(() => {
        if (response) {
            setValue(response.filter(e => e.type == 'timeout')[0])
        }
    }, [response])

    const validerParametre = async () => {
        dispatch(patchParametresActions.patchParametresRequest((value)))
    }

    return (
        <div className="ctn__declataion">
            <PageTitle label="Paramètre Globale" />
            <Grid
                item
                xs={4}
                md={4}
                sm={4}
                className="gridItem"
            >
                <InputText
                    id={value.id}
                    onchange={e => setValue({ valeur: e.target.value, id: value.id })}
                    name="Paramètre session"
                    label="Paramètre session (en secondes)"
                    defaultValue={value.valeur}
                    placeholder="Paramètre session"
                    type="number"
                    value={value.valeur}
                />
            </Grid>
            <div style={{ textAlign: 'center', padding: 20 }}>
                <Divider />
                <div>
                    <ButtonComponent
                        color="secondary"
                        type="contained"
                        label="Valider"
                        size="medium"
                        clicked={e => validerParametre(e)}
                    />
                </div>
            </div>
        </div>
    )
}

export default ParametreGlobale
