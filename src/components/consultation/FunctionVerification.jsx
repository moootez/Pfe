import React from 'react'
import { injectIntl } from 'react-intl'
import PropTypes from 'prop-types'
import { Divider } from '@material-ui/core'
import ButtonComponent from '../ui/button'

/**
 *
 *
 * @param {*} { intl, history }
 * @returns
 */
const FunctionVerification = ({ intl, history }) => {
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
                    clicked={() => history.goBack()}
                />
            </div>
        </div>
    )
}
/**
 *  declaration des props
 */
FunctionVerification.propTypes = {
    intl: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
}

export default injectIntl(FunctionVerification)
