import React, { useEffect } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { injectIntl } from 'react-intl'
import _ from 'lodash'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// import SwipeableViews from 'react-swipeable-views'
import { Tabs, Tab, Grid } from '@material-ui/core'
import CtnDecDetail from '../../../ui/tabPanel/index'
import ActConjoint from './actConjoint/index'
import Cadeaux from './cadeaux/index'
import Etudes from './etudes/index'
import Membres from './membres/index'
import Salarie from './salarie/index'
import ProLiberale from './professionLiberale/index'
import changeStepActions from '../../../../redux/step_saisie/index'

/**
 * style tabs
 *
 * @param {*} index
 */
const a11yProps = index => ({
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
})
/**
 * style css
 */
const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        height: 556,
        // height: 224,
    },
    tabs: {
        borderLeft: `1px solid ${theme.palette.divider}`,
        backgroundColor: '#e6e7e8',
    },
}))

/**
 *
 *
 * @param {*} { history, intl, step, changeStep }
 * @returns
 */
const ModeSaisie = ({ history, intl, step, changeStep }) => {
    /**
     * hooks numbers
     */
    const classes = useStyles()
    const theme = useTheme()
    const [value, setValue] = React.useState(0)

    /**
     * change step
     *
     * @param {*} event
     * @param {*} newValue
     */
    const handleChange = (event, newValue) => {
        setValue(newValue)
        changeStep(newValue)
    }
    // life cycle
    useEffect(() => {
        setValue(step)
    }, [step])

    const typeDeclarationIntr = [
        {
            id: 0,
            name: 'etudes',
            component: <Etudes handleChange={handleChange} history={history} />,
        },
        {
            id: 1,
            name: 'professionLiberale',
            component: (
                <ProLiberale handleChange={handleChange} history={history} />
            ),
        },
        {
            id: 2,
            name: 'salarie',
            component: (
                <Salarie handleChange={handleChange} history={history} />
            ),
        },
        {
            id: 3,
            name: 'acivitéProfessionnelConjoint',
            component: (
                <ActConjoint handleChange={handleChange} history={history} />
            ),
        },
        {
            id: 4,
            name: 'membres',
            component: (
                <Membres handleChange={handleChange} history={history} />
            ),
        },
        {
            id: 5,
            name: 'cadeaux',
            component: (
                <Cadeaux handleChange={handleChange} history={history} />
            ),
        },
    ]
    // render
    return (
        <Grid container>
            <div className={classes.root}>
                {/* <AppBar position="static" color="default"> */}
                <Tabs
                    onChange={(e, newStep) => handleChange(e, newStep)}
                    value={value}
                    orientation="vertical"
                    indicatorColor="primary"
                    textColor="primary"
                    variant="scrollable"
                    aria-label="Vertical tabs example"
                    className={classes.tabs}
                >
                    {(typeDeclarationIntr || []).map((type, index) => (
                        <Tab
                            key={type.id}
                            label={
                                type.name === 'membres'
                                    ? _.words(
                                          intl.formatMessage({ id: type.name })
                                      )[0]
                                    : `${
                                          _.words(
                                              intl.formatMessage({
                                                  id: type.name,
                                              })
                                          )[0]
                                      } ${
                                          _.words(
                                              intl.formatMessage({
                                                  id: type.name,
                                              })
                                          )[1]
                                      }`
                            }
                            {...a11yProps(index)}
                        />
                    ))}
                </Tabs>
            </div>
            <div
                style={{
                    width: '84%',
                    backgroundColor: 'white',
                }}
            >
                {/* </AppBar> */}
                {/* <SwipeableViews index={value}> */}
                {(typeDeclarationIntr || []).map((type, index) => (
                    <CtnDecDetail
                        value={value}
                        index={index}
                        dir={theme.direction}
                        key={type.id}
                    >
                        {type.component}
                    </CtnDecDetail>
                ))}
                {/* </SwipeableViews> */}
            </div>
        </Grid>
    )
}
/**
 *  declaration des props
 */
ModeSaisie.propTypes = {
    intl: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    step: PropTypes.number.isRequired,
    changeStep: PropTypes.func.isRequired,
}

// dispatch action

/**
 *
 *
 * @param {*} dispatch
 */
const mapDispatchToProps = dispatch => ({
    changeStep: step => dispatch(changeStepActions.changeStepDeclaration(step)),
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
        step: state.stepSaisie.stepDeclaration,
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(ModeSaisie))
