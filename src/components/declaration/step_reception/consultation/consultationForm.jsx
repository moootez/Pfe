import React from 'react'
import { Grid } from '@material-ui/core'
import PropTypes from 'prop-types'
import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import consultationInput from './consultationInput'
import LabelText from '../../../ui/label'
import Data from './dataDeclaration.json'

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
    console.log('payload', payload)
    const lieu = allReferenciels.find(
        // eslint-disable-next-line radix
        e => e.id === parseInt(payload.lieuNaissance)
    )

    return consultationInput(payload).map(item => {
        return item.required ? (
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
                                ? item.name === 'adresseNaissance'
                                    ? lieu && lieu.intituleAr
                                    : payload.user[item.name]
                                : item.type === 'data'
                                ? Data[item.list][payload.user[item.name]]
                                : payload[item.name].intituleAr
                            : item.date === true
                            ? payload[item.name] &&
                              payload[item.name].substr(0, 11)
                            : item.type === 'data'
                            ? Data[item.list][payload[item.name]]
                            : item.name === 'tel'
                            ? payload.user[item.name] &&
                              payload.user[item.name].substr(4, 11)
                            : item.name === 'categorie'
                            ? payload[item.name].rang
                            : payload[item.name]
                    }
                />
            </Grid>
        ) : (
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
                                    ? payload.user[item.name]
                                    : payload[item.name].intituleAr
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
            state.referencial.allReferencials.response.referenciels
                .RefGouvernorat,
    }
}

export default connect(mapStateToProps)(injectIntl(consultationForm))
