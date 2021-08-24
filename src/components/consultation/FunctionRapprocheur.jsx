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
 *     submitDeclaration,
 *     history,
 *     lng,
 * }
 * @returns
 */
const FunctionRapprocheur = ({
    intl,
    dataDeclaration,
    submitDeclaration,
    history,
    lng,
}) => {
    /**
     * generate pdf
     *
     */
    const generatePdf = () => {
        window.open(dataDeclaration.document, '_blank')
    }
    // render
    return (
        <div style={{ textAlign: 'center', padding: 20 }}>
            {/* component hr */}
            <Divider />
            {/* bouton submit declaration */}
            <div>
                {(dataDeclaration.statutDeclaration ===
                    'en attente de rapprochement' ||
                    dataDeclaration.statutDeclaration ===
                        'nouveau rapprochement') && (
                    <ButtonComponent
                        color="secondary"
                        type="contained"
                        size="medium"
                        label="تصريح متوافق"
                        clicked={() => submitDeclaration('rapprochée')}
                    />
                )}
                {/* bouton edit decaration */}
                <ButtonComponent
                    color="secondary"
                    type="contained"
                    size="medium"
                    label={intl.formatMessage({
                        id: 'BtnModifier',
                    })}
                    clicked={() =>
                        history.push({
                            pathname: `/rapprochement_de_declaration/modification/${dataDeclaration.id}`,
                            state: {
                                idDeclaration: dataDeclaration.id,
                                lang: lng,
                                dataDeclaration,
                                role: 'rapprocheur',
                                label: 'مقاربة التصاريح',
                            },
                        })
                    }
                />
                {/* bouton redirection  Retour */}
                <ButtonComponent
                    color="secondary"
                    type="contained"
                    size="medium"
                    label={intl.formatMessage({
                        id: 'btnRetour',
                    })}
                    clicked={() => {
                        history.push({
                            pathname: '/rapprochement_de_declaration',
                        })
                    }}
                />
                {/* bouton télécharger pdf */}
                <ButtonComponent
                    color="secondary"
                    type="contained"
                    size="medium"
                    label="إستخراج النسخة"
                    clicked={generatePdf}
                />
            </div>
        </div>
    )
}

/**
 *  declaration des props
 */
FunctionRapprocheur.propTypes = {
    intl: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    dataDeclaration: PropTypes.object.isRequired,
    submitDeclaration: PropTypes.func.isRequired,
    lng: PropTypes.string.isRequired,
}

export default injectIntl(FunctionRapprocheur)
