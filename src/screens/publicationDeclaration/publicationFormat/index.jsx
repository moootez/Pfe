import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import PropTypes from 'prop-types'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { Tabs, Tab } from '@material-ui/core'
import changeStepActions from '../../../redux/step_saisie/index'
import PageTitle from '../../../components/ui/pageTitle'
import IdentiteDeclarant from '../../../components/declaration/publication/identiteDeclarant/FormatPublication'
import Conjoint from '../../../components/declaration/publication/conjoint/FormatPublication'
import EnfantsMineurs from '../../../components/declaration/publication/enfantsMineurs/FormatPublication'
import DeclarationBien from '../../../components/declaration/publication/decBien/ModePublication'
import DeclarationIntr from '../../../components/declaration/publication/decIntr/ModePublication'
import CtnDecDetail from '../../../components/ui/tabPanel'
import getAllFormat from '../../../redux/publication/formatPublication/getAllFormatPublication'
/* style */
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
 *     history,
 *     changeStep,
 *     getAllFormatReq,
 *     allFormats,
 * }
 * @returns
 */
const Index = ({ intl, history, changeStep, getAllFormatReq, allFormats }) => {
    /* hook member */
    const classes = useStyles()
    const theme = useTheme()
    const [value, setValue] = useState(0)
    const typeDeclaration = [
        {
            id: 0,
            name: 'identiteDeclarant',
            component: (
                <IdentiteDeclarant
                    history={history}
                    allFormatsData={allFormats}
                />
            ),
        },
        {
            id: 1,
            name: 'conjoint',
            component: (
                <Conjoint history={history} allFormatsData={allFormats} />
            ),
        },
        {
            id: 2,
            name: 'enfantsM',
            component: (
                <EnfantsMineurs history={history} allFormatsData={allFormats} />
            ),
        },
        {
            id: 3,
            name: 'decBien',
            component: (
                <DeclarationBien
                    history={history}
                    allFormatsData={allFormats}
                />
            ),
        },
        {
            id: 4,
            name: 'decIntr',
            component: (
                <DeclarationIntr
                    history={history}
                    allFormatsData={allFormats}
                />
            ),
        },
    ]

    /* life cycle */
    useEffect(() => {
        getAllFormatReq()
    }, [])
    /* functions */
    /**
     * set payload and step
     *
     * @param {*} event
     * @param {*} newValue
     */
    const handleChange = (event, newValue) => {
        setValue(newValue)
        changeStep(newValue)
    }

    return (
        <div className={classes.root}>
            <div>
                <PageTitle label="مراجعة نموذج النشر" />
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
                {(typeDeclaration || []).map((typeDec, index) => (
                    <Tab
                        key={typeDec.id}
                        label={intl.formatMessage({ id: typeDec.name })}
                        {...a11yProps(index)}
                    />
                ))}
            </Tabs>
            {(typeDeclaration || []).map((typeDecCmp, index) => (
                <CtnDecDetail
                    value={value}
                    index={index}
                    dir={theme.direction}
                    key={typeDecCmp.id}
                >
                    {typeDecCmp.component}
                </CtnDecDetail>
            ))}
        </div>
    )
}
/**
 *  declaration des props
 */
Index.propTypes = {
    intl: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    allFormats: PropTypes.object.isRequired,
    changeStep: PropTypes.func.isRequired,
    getAllFormatReq: PropTypes.func.isRequired,
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
        lng: state.info.language,
        allFormats: state.publication.formatPublication.allFormat.response,
    }
}

// dispatch action

/**
 *
 *
 * @param {*} dispatch
 */
const mapDispatchToProps = dispatch => ({
    changeStep: stepRapprochement =>
        dispatch(changeStepActions.changeStepRapprochement(stepRapprochement)),
    getAllFormatReq: () =>
        dispatch(getAllFormat.getAllFormatPublicationRequest()),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(Index))
