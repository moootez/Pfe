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
const FunctionValidateur = ({ intl, history }) => {
    // obtenir les données d'history
    const { dataDeclaration } = history.location.state

    /**
     * valider decalaration and genrate recu
     *
     */
    const exportPDFAction = () => {
        Post(`declaration/downloadDatasInPdf/${dataDeclaration.id}`).then(
            res => {
                if (res.status === 201 || res.status === 200) {
                    window.open(res.data.result, '_blank')
                }
            }
        )
    }
    // render
    return (
        <div style={{ textAlign: 'center', padding: 20 }}>
            {/* séparation entre les component (hr) */}
            <Divider />
            <div>
                {/* bouton export PDF */}
                <ButtonComponent
                    color="secondary"
                    type="contained"
                    size="medium"
                    label="تحميل PDF"
                    clicked={exportPDFAction}
                />
                {/* bouton redirection  رجوع */}
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
}

export default injectIntl(FunctionValidateur)
