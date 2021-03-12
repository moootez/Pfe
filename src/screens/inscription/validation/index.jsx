import React from 'react'
import { Grid, FormGroup, Divider } from '@material-ui/core'
import PropTypes from 'prop-types'
import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import consultationInput from './consultationInput'
import LabelText from '../../../components/ui/label'
import ButtonComponent from '../../../components/ui/button'
import validateInscriptionActions from '../../../redux/inscription/validateInscription'
import refusInscriptionActions from '../../../redux/inscription/refusInscription'
import PageTitle from '../../../components/ui/pageTitle'

/**
 *
 *
 * @param {*} {
 *     history,
 *     lng,
 *     intl,
 *     validateInscriptionReq,
 *     refusInscriptionReq,
 * }
 * @returns
 */
const Index = ({
    history,
    lng,
    intl,
    validateInscriptionReq,
    refusInscriptionReq,
}) => {
    /* hook member */
    const { dataInscription } = history.location.state

    /**
     * valider inscription
     *
     */
    const validateInscription = () => {
        const { statutDemande, ...obj } = dataInscription
        const payload = Object.assign(obj, { statutDemande: 'autorisée' })
        validateInscriptionReq(payload)
    }

    /**
     * refuser inscription
     *
     */
    const refuseInscription = () => {
        refusInscriptionReq({
            statutDemande: 'non autorisée',
            id: dataInscription.id,
        })
    }

    const defaultValueReturn = (value, item) => {
        if (value) {
            if (item.isObject) return value.intituleAr
            if (item.name === 'categorie') return value.rang
            return value
        }
        return ''
    }

    return (
        <div style={{ width: '80%', margin: '50px 200px' }}>
            <Grid className="gridItem">
                <PageTitle label="مطالب التسجيل بالمنظومة" />
            </Grid>
            <FormGroup>
                <Grid container>
                    {consultationInput().map(item => (
                        <Grid
                            item
                            xs={12}
                            md={item.md}
                            sm={item.sm}
                            className="gridItem"
                            key={`${item.name}`}
                        >
                            <LabelText
                                name={item.name}
                                lng={lng}
                                intl={intl}
                                label={item.label}
                                defaultValue={defaultValueReturn(
                                    dataInscription[item.name],
                                    item
                                )}
                            />
                        </Grid>
                    ))}
                </Grid>
                <div style={{ textAlign: 'center', padding: 20 }}>
                    <Divider />
                    {!dataInscription.enable && (
                        <div style={{ marginTop: 50 }}>
                            <ButtonComponent
                                color="secondary"
                                type="contained"
                                size="medium"
                                label="قبول التسجيل"
                                clicked={validateInscription}
                            />

                            <ButtonComponent
                                color="secondary"
                                type="contained"
                                size="medium"
                                label="رفض التسجيل"
                                clicked={refuseInscription}
                            />
                        </div>
                    )}
                    <ButtonComponent
                        color="secondary"
                        type="contained"
                        size="medium"
                        label={intl.formatMessage({
                            id: 'btnAnnuer',
                        })}
                        clicked={() => {
                            history.push({
                                pathname: '/liste_des_inscriptions',
                            })
                        }}
                    />
                </div>
            </FormGroup>
        </div>
    )
}
/**
 *  declaration des props
 */
Index.propTypes = {
    lng: PropTypes.string.isRequired,
    history: PropTypes.object.isRequired,
    intl: PropTypes.object.isRequired,
    validateInscriptionReq: PropTypes.func.isRequired,
    refusInscriptionReq: PropTypes.func.isRequired,
}

// obtenir les données from  store state
/**
 *
 *
 * @param {*} state
 * @returns
 */
const mapStateToProps = () => {
    return {}
}

// dispatch action

/**
 *
 *
 * @param {*} dispatch
 */
const mapDispatchToProps = dispatch => ({
    validateInscriptionReq: payload =>
        dispatch(
            validateInscriptionActions.updateInscriptionStatusRequest(payload)
        ),
    refusInscriptionReq: payload =>
        dispatch(refusInscriptionActions.refusInscriptionRequest(payload)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(Index))
