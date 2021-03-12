import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Grid } from '@material-ui/core'
import { injectIntl } from 'react-intl'
import getRapportActions from '../../../../redux/rapport/getRapport/index'
import FormDetail from './FormDetail'
import generateKey from '../../../../shared/utility'
import ButtonComponent from '../../../ui/button'
import validerRapportActions from '../../../../redux/rapport/validerRapport/index'
import exportRapportActions from '../../../../redux/rapport/exportRapport/index'
import submitDecActions from '../../../../redux/declaration_grab/submitDecSaisie/index'
import changeStepActions from '../../../../redux/step_saisie/index'

/**
 *
 *
 * @class index
 * @extends {Component}
 */
class index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listComment: [],
        }
    }

    /* life cycle */

    /**
     *
     *
     * @memberof index
     */
    /* life cycle */

    /**
     *
     *
     * @memberof
     */
    componentDidMount() {
        const { getRapportReq, history } = this.props
        const { dataDeclaration } = history.location.state
        getRapportReq(dataDeclaration.id)
    }

    /**
     *
     *
     * @param {*} nextProps
     * @memberof index
     */
    /**
     *
     *
     * @param {*} nextProps
     * @memberof
     */
    componentWillReceiveProps(nextProps) {
        if (
            nextProps &&
            nextProps.getRapport &&
            nextProps.getRapport.response &&
            nextProps.getRapport.response.length > 0
        ) {
            this.setState({ listComment: nextProps.getRapport.response })
        }
    }

    /**
     * validation du rapport
     *
     * @memberof index
     */
    validerRapport = () => {
        const { validerRapportReq, history } = this.props
        const { dataDeclaration } = history.location.state
        validerRapportReq(dataDeclaration.id)
        history.push({
            pathname: '/verification_de_declaration',
        })
    }

    /**
     * exporter rapport
     *
     * @memberof index
     */
    exportRapport = () => {
        const { exportRapportReq, history } = this.props
        const { dataDeclaration } = history.location.state
        exportRapportReq(dataDeclaration.id)
    }

    /**
     * validation du declaration
     *
     * @memberof index
     */
    submitDeclaration = statusDeclaration => {
        const { submitDecReq, history, changeStep } = this.props
        const { dataDeclaration } = history.location.state
        submitDecReq({
            id_declaration: dataDeclaration.id,
            body: {
                statusDeclaration,
            },
        })
        changeStep(0)
        history.push({
            pathname: `/verification_de_declaration`,
            state: {
                idDeclaration: dataDeclaration.id,
                dataDeclaration,
            },
        })
    }

    /**
     * render
     *
     * @returns
     * @memberof index
     */
    /* render */
    /**
     *
     *
     * @returns
     * @memberof Actions
     */
    render() {
        // const { history, type, intl } = this.props
        // const { dataDeclaration } = history.location.state
        const { listComment } = this.state
        return (
            <div style={{ padding: '2em' }}>
                <Grid container key={generateKey()}>
                    {listComment.length > 0 ? (
                        listComment.map(comment => {
                            return (
                                <Grid container key={generateKey()}>
                                    {comment.commentaire !== null && (
                                        <Fragment>
                                            <FormDetail
                                                key={generateKey()}
                                                comment={comment}
                                            />
                                            <div
                                                style={{
                                                    borderBottom:
                                                        '1px black solid',
                                                    margin: 'auto',
                                                    width: '90%',
                                                }}
                                            />
                                        </Fragment>
                                    )}
                                </Grid>
                            )
                        })
                    ) : (
                        <div />
                    )}
                </Grid>
                <div style={{ textAlign: 'center', padding: 20 }}>
                    {/* {listComment.length > 0 &&
                        listComment[0].status !== 'validée' &&
                        type !== 'verificateur' && (
                            <ButtonComponent
                                color="white"
                                type="contained"
                                size="medium"
                                label="إضافة تعليق"
                                clicked={() =>
                                    history.push({
                                        pathname: `/rapprochement_de_declaration/edit_rapport/${dataDeclaration.id}`,
                                        state: {
                                            idDeclaration: dataDeclaration.id,
                                            dataDeclaration,
                                        },
                                    })
                                }
                            />
                        )} */}
                    {/* {type === 'verificateur' && (
                        <ButtonComponent
                            color="secondary"
                            type="contained"
                            size="medium"
                            label="تأكيد"
                            clicked={() => this.submitDeclaration('vérifiée')}
                        />
                    )} */}
                    {/* {type === 'validateurRapport' && (
                        <ButtonComponent
                            color="secondary"
                            type="contained"
                            size="medium"
                            label="تأكيد الملف"
                            clicked={this.validerRapport}
                        />
                    )} */}
                    <ButtonComponent
                        color="white"
                        type="contained"
                        size="medium"
                        label="تحميل التقرير"
                        clicked={this.exportRapport}
                    />
                    {/* {type === 'validateurRapport' && (
                        <ButtonComponent
                            color="secondary"
                            type="contained"
                            size="medium"
                            label={intl.formatMessage({
                                id: 'btnAnnuer',
                            })}
                            clicked={() => {
                                history.goBack()
                            }}
                        />
                    )} */}
                    {/* {type === 'verificateur' && (
                        <ButtonComponent
                            color="secondary"
                            type="contained"
                            size="medium"
                            label={intl.formatMessage({
                                id: 'btnAnnuer',
                            })}
                            clicked={() =>
                                history.push({
                                    pathname: `/verification_de_declaration`,
                                    state: {
                                        idDeclaration: dataDeclaration.id,
                                        dataDeclaration,
                                    },
                                })
                            }
                        />
                    )} */}
                </div>
            </div>
        )
    }
}
// obtenir les données from  store state
/**
 *
 *
 * @param {*} state
 * @returns
 */
function mapStateToProps(state) {
    return {
        getRapport: state.rapport.getRapport,
    }
}

// dispatch action

/**
 *
 *
 * @param {*} dispatch
 */
const mapDispatchToProps = dispatch => ({
    getRapportReq: payload =>
        dispatch(getRapportActions.getRapportRequest(payload)),
    validerRapportReq: payload =>
        dispatch(validerRapportActions.validerRapportRequest(payload)),
    exportRapportReq: payload =>
        dispatch(exportRapportActions.exportRapportRequest(payload)),
    submitDecReq: dec => dispatch(submitDecActions.submitDecRequest(dec)),
    changeStep: stepRapprochement =>
        dispatch(changeStepActions.changeStepRapprochement(stepRapprochement)),
})
/**
 *  declaration des props
 */
index.propTypes = {
    history: PropTypes.object.isRequired,
    // intl: PropTypes.object.isRequired,
    getRapport: PropTypes.object.isRequired,
    getRapportReq: PropTypes.func.isRequired,
    validerRapportReq: PropTypes.func.isRequired,
    exportRapportReq: PropTypes.func.isRequired,
    // type: PropTypes.string.isRequired,
    submitDecReq: PropTypes.func.isRequired,
    changeStep: PropTypes.func.isRequired,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(index))
