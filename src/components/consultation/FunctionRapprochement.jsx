import React from 'react'
import { injectIntl } from 'react-intl'
import PropTypes from 'prop-types'
import ButtonComponent from '../ui/button'

/**
 *
 *
 * @param {*} { intl, dataDeclaration, history, lng }
 * @returns
 */
const FunctionRapprochement = ({ intl, dataDeclaration, history, lng }) => {
    // render
    return (
        <div style={{ textAlign: 'center', padding: 20 }}>
            <div>
                {dataDeclaration.statutDeclaration !== 'rapprochée' && (
                    // bouton pour editer declaration
                    <ButtonComponent
                        color="secondary"
                        type="contained"
                        size="medium"
                        label={intl.formatMessage({
                            id: 'BtnModifier',
                        })}
                        clicked={() =>
                            history.push({
                                pathname: `/affectation_pour_rapprochement/modification/${dataDeclaration.id}`,
                                state: {
                                    idDeclaration: dataDeclaration.id,
                                    lang: lng,
                                    dataDeclaration,
                                    role: 'affectation',
                                    label: 'التوزيع للمقاربة',
                                },
                            })
                        }
                    />
                )}
                {/* bouton redirection  رجوع */}
                <ButtonComponent
                    color="secondary"
                    type="contained"
                    size="medium"
                    label={intl.formatMessage({
                        id: 'btnRetour',
                    })}
                    clicked={() => {
                        history.push({
                            pathname: '/affectation_pour_rapprochement',
                        })
                    }}
                />
            </div>
        </div>
    )
}
/**
 *  declaration des props
 */
FunctionRapprochement.propTypes = {
    intl: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    dataDeclaration: PropTypes.object.isRequired,
    lng: PropTypes.string.isRequired,
}

export default injectIntl(FunctionRapprochement)
