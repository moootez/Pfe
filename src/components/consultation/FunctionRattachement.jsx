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
const FunctionRattacheur = ({ intl, dataDeclaration, history, lng }) => {
    // render
    return (
        <div style={{ textAlign: 'center', padding: 20 }}>
            <div>
                {/* bouton ajout pdf (rattachement) */}
                <ButtonComponent
                    color="black"
                    bgColor="#e0e0e0"
                    type="contained"
                    size="medium"
                    label="Importer une commande"
                    clicked={() =>
                        history.push({
                            pathname: `/declaration_rattacher_saisie/rattacher_le_scan_de_la_declaration/${dataDeclaration.id}`,
                            state: {
                                idDeclaration: dataDeclaration.id,
                                lang: lng,
                                dataDeclaration,
                            },
                        })
                    }
                />
                {/* bouton editer declaration */}
                <ButtonComponent
                    color="secondary"
                    type="contained"
                    size="medium"
                    label={intl.formatMessage({
                        id: 'BtnModifier',
                    })}
                    clicked={() =>
                        history.push({
                            pathname: `/rattachement_scan/modification/${dataDeclaration.id}`,
                            state: {
                                idDeclaration: dataDeclaration.id,
                                lang: lng,
                                dataDeclaration,
                                role: 'rattachement',
                            },
                        })
                    }
                />
                {/* bouton redirection  Retour */}
                <ButtonComponent
                    // disabled={disable}
                    color="secondary"
                    type="contained"
                    size="medium"
                    label={intl.formatMessage({
                        id: 'btnRetour',
                    })}
                    clicked={() => {
                        history.push({
                            pathname:
                                '/declaration_rattacher_saisie/rattacher_le_scan_de_la_declaration',
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
FunctionRattacheur.propTypes = {
    intl: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    dataDeclaration: PropTypes.object.isRequired,
    lng: PropTypes.string.isRequired,
}

export default injectIntl(FunctionRattacheur)
