import React from 'react'
import { Grid } from '@material-ui/core'
import PropTypes from 'prop-types'
import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import consultationInput from './consultationInput'
import LabelText from '../../../ui/label'
import Data from '../consultation/dataDeclaration.json'

/**
 *
 *
 * @param {*} {
 *     payload,
 *     lng,
 *     intl,
 *     allReferenciels,
 * }
 * @returns
 */
const consultationForm = ({ payload, lng, intl, allReferenciels }) => {
    return consultationInput(payload).map(item => {
        // eslint-disable-next-line no-param-reassign
        payload.adresseNaissance = allReferenciels.RefGouvernorat.find(
            // eslint-disable-next-line radix
            e => e.id === parseInt(payload.lieuNaissance)
        ).intituleAr

        // eslint-disable-next-line no-param-reassign
        payload.gouvernoratResidenceUser = allReferenciels.RefGouvernorat.find(
            // eslint-disable-next-line radix
            e => e.id === parseInt(payload.user.gouvernoratResidence)
        ).intituleAr
        // eslint-disable-next-line no-param-reassign
        payload.delegationResidenceUser = allReferenciels.RefDelegation.find(
            // eslint-disable-next-line radix
            e => e.id === parseInt(payload.delegationResidence)
        ).intituleAr

        // eslint-disable-next-line no-param-reassign
        payload.categorieUser = allReferenciels.RefCategorie.find(
            // eslint-disable-next-line radix
            e => e.id === parseInt(payload.categorie)
        ).rang

        // eslint-disable-next-line no-param-reassign
        payload.fonctionUser = allReferenciels.RefFonction.find(
            // eslint-disable-next-line radix
            e => e.id === parseInt(payload.fonction)
        ).intituleAr

        // eslint-disable-next-line no-param-reassign
        payload.ministereUser = allReferenciels.RefMinistere.find(
            // eslint-disable-next-line radix
            e => e.id === parseInt(payload.ministere)
        ).intituleAr

        // eslint-disable-next-line no-param-reassign
        payload.etablissementUser = allReferenciels.RefEtablissement.find(
            // eslint-disable-next-line radix
            e => e.id === parseInt(payload.etablissement)
        ).intituleAr

        // eslint-disable-next-line no-param-reassign
        payload.gouvernoratEtablissementUser = allReferenciels.RefGouvernorat.find(
            // eslint-disable-next-line radix
            e => e.id === parseInt(payload.gouvernoratEtablissement)
        ).intituleAr

        // eslint-disable-next-line no-param-reassign
        payload.delegationEtablissementUser = allReferenciels.RefDelegation.find(
            // eslint-disable-next-line radix
            e => e.id === parseInt(payload.delegationEtablissement)
        ).intituleAr

        // eslint-disable-next-line no-param-reassign
        payload.nationaliteUser = allReferenciels.RefNationalite.find(
            // eslint-disable-next-line radix
            e => e.id === parseInt(payload.nationalite)
        ).intituleAr

        return (
            (payload[item.name] ||
                (item.object === 'user' && payload.user[item.name])) && (
                <Grid
                    item
                    xs={12}
                    md={item.md}
                    sm={item.sm}
                    className="gridItem"
                    key={`${item.name}`}
                >
                    <LabelText
                        lng={lng}
                        intl={intl}
                        label={item.label}
                        defaultValue={
                            item.isObject === true
                                ? item.object === 'user'
                                    ? item.type === 'data'
                                        ? Data[item.list][
                                              payload.user[item.name]
                                          ]
                                        : item.name === 'tel'
                                        ? payload.user[item.name].substr(4, 11)
                                        : payload.user[item.name]
                                    : payload[item.name].intituleAr
                                : item.date === true
                                ? payload[item.name].substr(0, 11)
                                : item.type === 'data'
                                ? Data[item.list][payload[item.name]]
                                : payload[item.name]
                        }
                    />
                </Grid>
            )
        )
    })
}
/**
 *  declaration des props
 */
consultationForm.propTypes = {
    payload: PropTypes.object.isRequired,
    lng: PropTypes.string.isRequired,
    intl: PropTypes.object,
    allReferenciels: PropTypes.object,
}

// obtenir les données from  store state
/**
 *
 *
 * @param {*} state
 * @returns
 */
const mapStateToProps = state => {
    return {
        allReferenciels:
            state.referencial.allReferencials.response.referenciels,
    }
}

export default connect(mapStateToProps)(injectIntl(consultationForm))
