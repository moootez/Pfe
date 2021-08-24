import React from 'react'
import { injectIntl } from 'react-intl'
import PropTypes from 'prop-types'
import { Divider } from '@material-ui/core'
import ButtonComponent from '../ui/button'
import { Post } from '../../serveur/axios'

/**
 *
 *
 * @param {*} {
 *     intl,
 *     submitDeclaration,
 *     nouveauRapprochementDeclaration,
 *     history,
 * }
 * @returns
 */
const FunctionValidateur = ({
    intl,
    submitDeclaration,
    nouveauRapprochementDeclaration,
    history,
}) => {
    // obtenir les données d'history
    const { dataDeclaration } = history.location.state

    /**
     * valider decalaration and genrate recu
     *
     */
    const validationAction = () => {
        Post(`declaration/downloadDatasInPdf/${dataDeclaration.id}`).then(
            res => {
                if (res.status === 201 || res.status === 200) {
                    window.open(res.data.result, '_blank')
                }
            }
        )
        submitDeclaration('validée')
    }
    // render
    return (
        <div style={{ textAlign: 'center', padding: 20 }}>
            <Divider />
            <div>
                {(dataDeclaration.statutDeclaration ===
                    'en attente de validation' ||
                    dataDeclaration.statutDeclaration === 'rapprochée') && (
                    <div>
                        {/* bouton تأكيد declaration */}
                        <ButtonComponent
                            color="secondary"
                            type="contained"
                            size="medium"
                            label="تأكيد"
                            clicked={validationAction}
                        />
                        {/* bouton رفض declaration */}
                        <ButtonComponent
                            color="secondary"
                            type="contained"
                            size="medium"
                            label="رفض"
                            clicked={() => submitDeclaration('rejetée')}
                        />
                        {/* bouton redirection à مقاربة التصاريح   */}
                        <ButtonComponent
                            color="secondary"
                            type="contained"
                            size="medium"
                            label="الRetour إلى المصالحة"
                            clicked={() => nouveauRapprochementDeclaration()}
                        />
                    </div>
                )}
                {/* bouton redirection  Retour */}
                <ButtonComponent
                    color="secondary"
                    type="contained"
                    size="medium"
                    label={intl.formatMessage({
                        id: 'btnRetour',
                    })}
                    clicked={() => {
                        history.goBack()
                    }}
                />
            </div>
        </div>
    )
}

/**
 *  declaration des props
 */
FunctionValidateur.propTypes = {
    intl: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    submitDeclaration: PropTypes.func.isRequired,
    nouveauRapprochementDeclaration: PropTypes.func.isRequired,
}

export default injectIntl(FunctionValidateur)
