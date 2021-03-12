import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import PropTypes from 'prop-types'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { Tabs, Tab } from '@material-ui/core'
import changeStepActions from '../../redux/step_saisie/index'
import PageTitle from '../ui/pageTitle'
import Conjoint from '../declaration/step_grab/conjoint/Detail'
import EnfantsMineurs from '../declaration/step_grab/enfantsMineurs/Detail'
import DeclarationBien from '../declaration/step_grab/decBien/ModeConsultation'
import DeclarationIntr from '../declaration/step_grab/decIntr/ModeConsultation'
import Rapport from '../declaration/rapport/consultation/index'
import CtnDecDetail from '../ui/tabPanel'
import submitDecActions from '../../redux/declaration_grab/submitDecSaisie/index'
import nouveauRapprochementActions from '../../redux/declaration/nouveauRapprochement/index'
import FunctionRattachement from './FunctionRattachement'
import FunctionRapprochement from './FunctionRapprochement'
import FunctionRapprocheur from './FunctionRapprocheur'
import FunctionValidation from './FunctionValidation'
import FunctionValidateur from './FunctionValidateur'
import FunctionVerificateur from './FunctionVerificateur'
import FunctionVerification from './FunctionVerification'
import FunctionValidateurCoursDesComptes from './FunctionValidateurCoursDesComptes'
import validerRapportActions from '../../redux/rapport/validerRapport/index'
import FunctionValidateurRapport from './FunctionValidateurRapport'
import getRapportActions from '../../redux/rapport/getRapport/index'

/* style pour le component tab */
const a11yProps = index => ({
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
})

/* style css */
const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: '100%',
        paddisngTop: '0.5em',
        padding: '0.5em',
    },
    tabs: {
        borderBottom: `1px solid ${theme.palette.divider}`,
        backgroundColor: '#e6e7e8',
    },
}))

/**
 *
 *
 * @param {*} {
 *     intl,
 *     stepRapprochement,
 *     history,
 *     lng,
 *     changeStep,
 *     submitDecReq,
 *     step,
 *     getRapportReq,
 *     validerRapportReq,
 *     getRapport,
 *     nouveauRapprochementReq,
 *     changeStepDeclaration,
 * }
 * @returns
 */
const Index = ({
    intl,
    stepRapprochement,
    history,
    lng,
    changeStep,
    submitDecReq,
    step,
    getRapportReq,
    validerRapportReq,
    getRapport,
    nouveauRapprochementReq,
    changeStepDeclaration,
}) => {
    /* hook memeber */
    const classes = useStyles()
    const theme = useTheme()
    const { dataDeclaration, type, label } = history.location.state
    const [value, setValue] = React.useState(step)
    const [listRapport, setListRapport] = React.useState([])
    const disabledComponent = dataDeclaration.user.situationCivile !== 'marié'
    // déclaration des rubriques
    const typeDeclaration = [
        {
            id: 0,
            name: 'conjoint',
            component: (
                <Conjoint
                    history={history}
                    type={type}
                    dataDeclaration={dataDeclaration}
                />
            ),
        },
        {
            id: 1,
            name: 'enfantsM',
            component: (
                <EnfantsMineurs
                    history={history}
                    type={type}
                    dataDeclaration={dataDeclaration}
                />
            ),
        },
        {
            id: 2,
            name: 'decBien',
            component: (
                <DeclarationBien
                    history={history}
                    type={type}
                    dataDeclaration={dataDeclaration}
                />
            ),
        },
        {
            id: 3,
            name: 'decIntr',
            component: (
                <DeclarationIntr
                    history={history}
                    type={type}
                    dataDeclaration={dataDeclaration}
                />
            ),
        },
    ]
    const [typeDclarationFinal, setTypeDclarationFinal] = useState(
        typeDeclaration
    )

    /* life cycle */
    useEffect(() => {
        if (
            dataDeclaration &&
            dataDeclaration.user.situationCivile !== 'marié'
        ) {
            changeStep(1)
            changeStepDeclaration(0)
        } else {
            changeStep(0)
        }
        getRapportReq(dataDeclaration.id)
    }, [])

    /* life cycle */
    useEffect(() => {
        setValue(step)
    }, [step])

    /* life cycle */
    useEffect(() => {
        if (
            (type === 'validateurRapport' || type === 'verificateur') &&
            getRapport.response &&
            getRapport.response.length > 0 &&
            typeDclarationFinal.length < 5
        ) {
            setListRapport(getRapport.response)
            setTypeDclarationFinal([
                ...typeDclarationFinal,
                {
                    id: 4,
                    name: 'rapport',
                    component: (
                        <Rapport
                            history={history}
                            type={type}
                            dataDeclaration={dataDeclaration}
                        />
                    ),
                },
            ])
        }
    }, [getRapport])
    /* functions */
    /**
     * set value and step rubrique
     *
     * @param {*} event
     * @param {*} newValue
     */
    const handleChange = (event, newValue) => {
        setValue(newValue)
        changeStep(newValue)
        changeStepDeclaration(0)
    }

    /**
     * valider declaration
     *
     * @param {*} statusDeclaration
     */
    const submitDeclaration = statusDeclaration => {
        submitDecReq({
            id_declaration: dataDeclaration.id,
            body: {
                statusDeclaration,
            },
            history,
        })
    }

    /**
     * valider rapport
     *
     */
    const validerRapport = () => {
        validerRapportReq(dataDeclaration.id)
    }

    /**
     * rapprocher declaration
     *
     */
    const nouveauRapprochementDeclaration = () => {
        nouveauRapprochementReq({
            id_declaration: dataDeclaration.id,
        })
        setTimeout(() => {
            const pathname = history.location.pathname.split('/')
            history.push({
                pathname: `/${pathname[1]}`,
            })
        }, 2500)
    }

    // render
    return (
        <div className={classes.root}>
            <div>
                <PageTitle label={label} />
            </div>
            {/* tabs des rébriques */}
            <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
                aria-label="full width tabs example"
                className={classes.tabs}
            >
                {(typeDclarationFinal || []).map((types, index) => (
                    <Tab
                        key={types.id}
                        label={intl.formatMessage({ id: types.name })}
                        {...a11yProps(index)}
                        disabled={disabledComponent && index === 0}
                    />
                ))}
            </Tabs>
            {/* <SwipeableViews index={value}> */}
            {(typeDclarationFinal || []).map((types, index) => (
                <CtnDecDetail
                    key={types.id}
                    value={value}
                    index={index}
                    dir={theme.direction}
                >
                    {types.component}
                </CtnDecDetail>
            ))}
            {type === 'rapprocheur' && (
                <FunctionRapprocheur
                    intl={intl}
                    submitDeclaration={submitDeclaration}
                    history={history}
                    lng={lng}
                    dataDeclaration={dataDeclaration}
                />
            )}
            {type === 'validateur' && (
                <FunctionValidateur
                    intl={intl}
                    submitDeclaration={submitDeclaration}
                    nouveauRapprochementDeclaration={
                        nouveauRapprochementDeclaration
                    }
                    history={history}
                    lng={lng}
                />
            )}
            {type === 'validateurCoursDesComptes' && (
                <FunctionValidateurCoursDesComptes
                    intl={intl}
                    history={history}
                    lng={lng}
                />
            )}
            {type === 'verificateur' && (
                <FunctionVerificateur
                    intl={intl}
                    stepRapprochement={stepRapprochement}
                    dataDeclaration={dataDeclaration}
                    submitDeclaration={submitDeclaration}
                    history={history}
                    listRapport={listRapport}
                />
            )}
            {type === 'validation' && (
                <FunctionValidation
                    intl={intl}
                    submitDeclaration={submitDeclaration}
                    history={history}
                    lng={lng}
                    dataDeclaration={dataDeclaration}
                />
            )}
            {(type === 'vérification' || type === 'publication') && (
                <FunctionVerification
                    intl={intl}
                    submitDeclaration={submitDeclaration}
                    history={history}
                    lng={lng}
                    dataDeclaration={dataDeclaration}
                />
            )}
            {type === 'rattachement' && (
                <FunctionRattachement
                    intl={intl}
                    history={history}
                    lng={lng}
                    dataDeclaration={dataDeclaration}
                />
            )}
            {type === 'affectation' && (
                <FunctionRapprochement
                    intl={intl}
                    history={history}
                    lng={lng}
                    dataDeclaration={dataDeclaration}
                />
            )}
            {type === 'validateurRapport' && (
                <FunctionValidateurRapport
                    intl={intl}
                    submitDeclaration={validerRapport}
                    history={history}
                    lng={lng}
                    dataDeclaration={dataDeclaration}
                    listRapport={listRapport}
                />
            )}
        </div>
    )
}

/**
 *  declaration des props
 */
Index.propTypes = {
    intl: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    getRapport: PropTypes.object.isRequired,
    changeStep: PropTypes.func.isRequired,
    getRapportReq: PropTypes.func.isRequired,
    step: PropTypes.number.isRequired,
    stepRapprochement: PropTypes.number.isRequired,
    submitDecReq: PropTypes.func.isRequired,
    validerRapportReq: PropTypes.func.isRequired,
    nouveauRapprochementReq: PropTypes.func.isRequired,
    lng: PropTypes.string.isRequired,
    changeStepDeclaration: PropTypes.func.isRequired,
}

// obtenir les données from  store state
/**
 *
 *
 * @param {*} state
 * @returns
 */
const mapStateToProps = state => {
    return {
        stepRapprochement: state.stepSaisie.stepRapprochement,
        nouveauRapprochement: state.stepSaisie.stepRapprochement,
        status: state.declarationGrab.submitDec.response,
        lng: state.info.language,
        getRapport: state.rapport.getRapport,
        step: state.stepSaisie.step,
    }
}
// dispatch action
// dispatch action

/**
 *
 *
 * @param {*} dispatch
 */
const mapDispatchToProps = dispatch => ({
    changeStep: step => dispatch(changeStepActions.changeStepSaisie(step)),
    submitDecReq: dec => dispatch(submitDecActions.submitDecRequest(dec)),
    nouveauRapprochementReq: dec =>
        dispatch(nouveauRapprochementActions.nouveauRapprochementRequest(dec)),
    getRapportReq: payload =>
        dispatch(getRapportActions.getRapportRequest(payload)),
    validerRapportReq: payload =>
        dispatch(validerRapportActions.validerRapportRequest(payload)),
    changeStepDeclaration: step =>
        dispatch(changeStepActions.changeStepDeclaration(step)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(Index))
