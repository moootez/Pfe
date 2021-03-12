import React, { useEffect, Fragment } from 'react'
import { Grid } from '@material-ui/core'
import PropTypes from 'prop-types'
import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import consultationInput from './consultationInput'
import LabelText from '../../ui/label'
import getDeclarantInterneActions from '../../../redux/declarantInterne/getDeclarantById'

/**
 *
 *
 * @param {*} {
 *     payload,
 *     lng,
 *     intl,
 *     getDeclarantActions,
 *     declarantData,
 * }
 * @returns
 */
const consultationForm = ({
    payload,
    lng,
    intl,
    getDeclarantActions,
    declarantData,
}) => {
    /* life cycle */
    useEffect(() => {
        getDeclarantActions(payload.id)
    }, [])

    // render
    return declarantData ? (
        consultationInput(declarantData).map(item => {
            return (
                declarantData[item.name] && (
                    <Grid
                        item
                        xs={12}
                        md={item.md}
                        sm={item.sm}
                        className="gridItem"
                        key={`${item.name}`}
                    >
                        {/* component input  */}
                        <LabelText
                            lng={lng}
                            intl={intl}
                            label={item.label}
                            defaultValue={
                                item.isObject === true
                                    ? declarantData[item.name].intituleAr
                                    : item.date
                                    ? declarantData[item.name].substr(0, 11)
                                    : item.name === 'categorie'
                                    ? declarantData[item.name].rang
                                    : declarantData[item.name]
                            }
                        />
                    </Grid>
                )
            )
        })
    ) : (
        <Fragment></Fragment>
    )
}
// intialisation des props
consultationForm.defaultProps = {
    declarantData: {},
}
/**
 *  declaration des props
 */
consultationForm.propTypes = {
    payload: PropTypes.object.isRequired,
    lng: PropTypes.string.isRequired,
    intl: PropTypes.object.isRequired,
    declarantData: PropTypes.object,
    getDeclarantActions: PropTypes.func.isRequired,
}
// obtenir les données from  store state
/**
 *
 *
 * @param {*} state
 * @returns
 */
// obtenir les données from  store state
/**
 *
 *
 * @param {*} state
 * @returns
 */
const mapStateToProps = state => {
    return {
        declarantData: state.declarantInterne.getDeclarantInterne.response,
    }
}

// dispatch action

/**
 *
 *
 * @param {*} dispatch
 */
const mapDispatchToProps = dispatch => ({
    getDeclarantActions: payload =>
        dispatch(
            getDeclarantInterneActions.getDeclarantInterneRequest(payload)
        ),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(consultationForm))
