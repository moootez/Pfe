import React, { Fragment } from 'react'
import { injectIntl } from 'react-intl'
import PropTypes from 'prop-types'
import { Divider } from '@material-ui/core'
import ButtonComponent from '../ui/button'

/**
 *
 *
 * @param {*} {
 *     intl,
 *     submitDeclaration,
 *     history,
 *     dataDeclaration,
 *     stepRapprochement,
 *     // listRapport,
 *     lng,
 * }
 * @returns
 */
const FunctionVerificateur = ({
    intl,
    submitDeclaration,
    history,
    dataDeclaration,
    lng,
}) => {
    // render
    return (
        <div style={{ textAlign: 'center', padding: 20 }}>
            {/* séparation entre les component (hr) */}
            <Divider />
            <div>
                {dataDeclaration.statutDeclaration !== 'vérifiée' ? (
                    <Fragment>
                        {/* bouton pour ajouter commentaire */}
                        <ButtonComponent
                            color="secondary"
                            type="contained"
                            size="medium"
                            label="إضافة تعليق"
                            clicked={() =>
                                history.push({
                                    pathname: `/rapprochement_de_declaration/edit_rapport/${dataDeclaration.id}`,
                                    state: {
                                        idDeclaration: dataDeclaration.id,
                                        dataDeclaration,
                                        label: 'مراقبة التصاريح',
                                    },
                                })
                            }
                        />
                        {dataDeclaration.statutDeclaration !== 'vérifiée' ? (
                            /* bouton validation declaration */
                            <ButtonComponent
                                color="secondary"
                                type="contained"
                                size="medium"
                                label="تأكيد"
                                clicked={() => submitDeclaration('vérifiée')}
                            />
                        ) : null}
                    </Fragment>
                ) : null}
                {/* bouton redirection  رجوع */}
                <ButtonComponent
                    color="secondary"
                    type="contained"
                    size="medium"
                    label={intl.formatMessage({
                        id: 'btnRetour',
                    })}
                    clicked={() =>
                        history.push({
                            pathname: `/verification_de_declaration`,
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

FunctionVerificateur.propTypes = {
    intl: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    dataDeclaration: PropTypes.object.isRequired,
    submitDeclaration: PropTypes.func.isRequired,
    lng: PropTypes.string.isRequired,
}

export default injectIntl(FunctionVerificateur)
