import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { Tabs, Tab } from '@material-ui/core'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import PageTitle from '../../../components/ui/pageTitle'
import CtnDecDetail from '../../../components/ui/tabPanel'
import ButtonComponent from '../../../components/ui/button'
import changeStepActions from '../../../redux/step_saisie/index'
import submitDecActions from '../../../redux/declaration_grab/submitDecSaisie/index'
import Conjoint from '../../../components/declaration/step_grab/conjoint/index'
import EnfantsMineurs from '../../../components/declaration/step_grab/enfantsMineurs/index'
import DeclarationBien from '../../../components/declaration/step_grab/decBien/ModeSaisie'
import DeclarationIntr from '../../../components/declaration/step_grab/decIntr/ModeSaisie'

/* style */
const a11yProps = index => ({
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
})

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
 *     step,
 *     history,
 *     changeStep,
 *     submitDecReq,
 *     changeStepDeclaration,
 * }
 * @returns
 */
const FormDetailDeclaration = ({
    intl,
    step,
    history,
    changeStep,
    submitDecReq,
    changeStepDeclaration,
}) => {
    /* hook member */
    const classes = useStyles()
    const theme = useTheme()
    const [value, setValue] = React.useState(step)
    const [disabled, setDisabled] = React.useState(true)
    const { dataDeclaration, role } = history.location.state
    const disabledComponent = dataDeclaration.user.situationCivile !== 'marié'
    /* list rubrique */
    const typeDeclaration = [
        {
            id: 0,
            name: 'conjoint',
            component: <Conjoint history={history} />,
        },
        {
            id: 1,
            name: 'enfantsM',
            component: <EnfantsMineurs history={history} />,
        },
        {
            id: 2,
            name: 'decBien',
            component: (
                <DeclarationBien setDisabled={setDisabled} history={history} />
            ),
        },
        {
            id: 3,
            name: 'decIntr',
            component: <DeclarationIntr history={history} />,
        },
    ]
    const [typeDclarationFinal] = useState(typeDeclaration)

    /**
     * set value step
     *
     * @param {*} event
     * @param {*} newValue
     */
    const handleChange = (event, newValue) => {
        setValue(newValue)
        changeStep(newValue)
        changeStepDeclaration(0)
    }
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
    }, [])
    /* life cycle */
    useEffect(() => {
        setValue(step)
    }, [step])

    /* functions */
    /**
     * valider declaration
     *
     */
    const submitDeclaration = () => {
        submitDecReq({
            id_declaration: dataDeclaration.id,
            body: {
                statusDeclaration: 'saisie',
            },
        })
        // })
    }

    /**
     *
     * back to last interface
     */
    const retour = () => {
        const pathname = history.location.pathname.split('/')
        history.push({
            pathname: `/${pathname[1]}/${dataDeclaration.id}`,
            state: {
                idDeclaration: history.location.state.dataDeclaration.id,
                role: history.location.state.role,
                type: history.location.state.role,
                dataDeclaration: history.location.state.dataDeclaration,
                lang: 'ar',
                label: history.location.state.label,
            },
        })
    }

    /* render */
    return (
        <div className={classes.root}>
            <div>
                <PageTitle
                    label={intl.formatMessage({ id: 'detailDeclaration' })}
                />
            </div>
            <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
                aria-label="full width tabs example"
                className={classes.tabs}
            >
                {(typeDclarationFinal || []).map((type, index) => (
                    <Tab
                        key={type.id}
                        label={intl.formatMessage({ id: type.name })}
                        {...a11yProps(index)}
                        disabled={
                            disabledComponent && index === 0
                            // (index === 1 || index === 0)
                        }
                    />
                ))}
            </Tabs>
            {/* <SwipeableViews index={value}> */}
            {(typeDclarationFinal || []).map((type, index) => (
                <CtnDecDetail
                    key={type.id}
                    value={value}
                    index={index}
                    dir={theme.direction}
                >
                    {type.component}
                </CtnDecDetail>
            ))}
            {/* </SwipeableViews> */}
            {role ? (
                <div style={{ textAlign: 'center' }}>
                    <ButtonComponent
                        color="secondary"
                        type="contained"
                        size="medium"
                        label="Retour إلى المعاينة"
                        clicked={() => retour()}
                    />
                </div>
            ) : (
                <div style={{ textAlign: 'center' }}>
                    <ButtonComponent
                        disabled={disabled}
                        color="white"
                        type="contained"
                        size="medium"
                        label="تأكيد"
                        clicked={() => submitDeclaration()}
                    />
                </div>
            )}
        </div>
    )
}
/**
 *  Inialisation
 */
FormDetailDeclaration.defaultProps = {}
/**
 *  declaration des props
 */
FormDetailDeclaration.propTypes = {
    intl: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    changeStep: PropTypes.func.isRequired,
    changeStepDeclaration: PropTypes.func.isRequired,
    step: PropTypes.number.isRequired,
    submitDecReq: PropTypes.func.isRequired,
}

// dispatch action

/**
 *
 *
 * @param {*} dispatch
 */
const mapDispatchToProps = dispatch => ({
    changeStep: step => dispatch(changeStepActions.changeStepSaisie(step)),
    changeStepDeclaration: step =>
        dispatch(changeStepActions.changeStepDeclaration(step)),
    submitDecReq: dec => dispatch(submitDecActions.submitDecRequest(dec)),
})
// obtenir les données from  store state
/**
 *
 *
 * @param {*} state
 * @returns
 */
const mapStateToProps = state => {
    return {
        step: state.stepSaisie.step,
        status: state.declarationGrab.submitDec.response,
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(FormDetailDeclaration))
