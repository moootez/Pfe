import React from 'react'
import { injectIntl } from 'react-intl'
import PropTypes from 'prop-types'
import { Divider } from '@material-ui/core'
import ButtonComponent from '../ui/button'

/**
 *
 *
 * @param {*} {
 *     intl,
 *     dataDeclaration,
 *     history,
 *     lng,
 *     submitDeclaration,
 *     listRapport,
 * }
 * @returns
 */
const FunctionValidateurRapport = ({
    intl,
    dataDeclaration,
    history,
    lng,
    submitDeclaration,
    listRapport,
}) => {
    // render
    return (
        <div style={{ textAlign: 'center', padding: 20 }}>
            {/* séparation entre les component (hr) */}
            <Divider />
            <div>
                {listRapport.length > 0 && listRapport[0].status !== 'validée' && (
                    /* bouton validation déclaration */
                    <ButtonComponent
                        color="secondary"
                        type="contained"
                        size="medium"
                        label="تأكيد التقرير"
                        clicked={() => submitDeclaration()}
                    />
                )}
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
                            pathname: `/list_rapport`,
                            state: {
                                idDeclaration: dataDeclaration.id,
                                lang: lng,
                                dataDeclaration,
                                role: 'vérification',
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
FunctionValidateurRapport.propTypes = {
    intl: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    dataDeclaration: PropTypes.object.isRequired,
    submitDeclaration: PropTypes.func.isRequired,
    lng: PropTypes.string.isRequired,
    listRapport: PropTypes.array.isRequired,
}

export default injectIntl(FunctionValidateurRapport)
