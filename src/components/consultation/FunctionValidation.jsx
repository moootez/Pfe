import React from 'react'
import { injectIntl } from 'react-intl'
import PropTypes from 'prop-types'
import { Divider } from '@material-ui/core'
import ButtonComponent from '../ui/button'

/**
 *
 *
 * @param {*} { intl, dataDeclaration, history, lng }
 * @returns
 */
const FunctionValidation = ({ intl, dataDeclaration, history, lng }) => {
    // render
    return (
        <div style={{ textAlign: 'center', padding: 20 }}>
            {/* séparation entre les component (hr) */}
            <Divider />
            <div>
                {/* bouton redirection  Retour */}
                <ButtonComponent
                    color="secondary"
                    type="contained"
                    size="medium"
                    label={intl.formatMessage({
                        id: 'btnRetour',
                    })}
                    clicked={() =>
                        history.push({
                            pathname: `/affectation_pour_validation`,
                            state: {
                                idDeclaration: dataDeclaration.id,
                                lang: lng,
                                dataDeclaration,
                                role: 'validation',
                            },
                        })
                    }
                />
            </div>
        </div>
    )
}
/**
 *  declaration des props
 */

FunctionValidation.propTypes = {
    intl: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    dataDeclaration: PropTypes.object.isRequired,
    lng: PropTypes.string.isRequired,
}

export default injectIntl(FunctionValidation)
