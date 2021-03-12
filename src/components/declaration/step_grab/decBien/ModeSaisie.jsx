import React, { useEffect } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { injectIntl } from 'react-intl'
import _ from 'lodash'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
// import SwipeableViews from 'react-swipeable-views'
import { Tabs, Tab, Grid } from '@material-ui/core'
import CtnDecDetail from '../../../ui/tabPanel/index'
import Actions from './actions/index'
import Animaux from './animaux/index'
import Assurances from './assurances/index'
import FontsCommerces from './fontCommerces/index'
import FontsSpeces from './fontsSpeces/index'
import Immeubles from './immeubles/index'
import Montants from './montants/index'
import ObjSpeciaux from './objSpeciaux/index'
import Prets from './prets/index'
import Psociales from './pSocials/index'
import Revenus from './revenus/index'
import Vehicules from './vehicules/index'
import Valeurs from './valeurs'
import changeStepActions from '../../../../redux/step_saisie/index'

// style
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
 * @param {*} { history, intl, setDisabled, step, changeStep }
 * @returns
 */
const ModeSaisie = ({ history, intl, setDisabled, step, changeStep }) => {
    /**
     * hooks numbers
     */
    const lng = history.location.state.lang
    const classes = useStyles()
    const theme = useTheme()
    // const [value, setValue] = React.useState(0)
    const [value, setValue] = React.useState(step)

    const handleChange = (event, newValue) => {
        setValue(newValue)
        changeStep(newValue)
    }
    // life cycle
    useEffect(() => {
        setValue(step)
    }, [step])

    const typeDeclarationBien = [
        {
            id: 0,
            name: 'revenus',
            component: (
                <Revenus
                    setDisabled={setDisabled}
                    handleChange={handleChange}
                    history={history}
                />
            ),
        },
        {
            id: 1,
            name: 'immeubles',
            component: (
                <Immeubles handleChange={handleChange} history={history} />
            ),
        },
        {
            id: 2,
            name: 'vehicule',
            component: (
                <Vehicules handleChange={handleChange} history={history} />
            ),
        },
        {
            id: 3,
            name: 'actions',
            component: (
                <Actions handleChange={handleChange} history={history} />
            ),
        },
        {
            id: 4,
            name: 'pSocial',
            component: (
                <Psociales handleChange={handleChange} history={history} />
            ),
        },
        {
            id: 5,
            name: 'valMobiliere',
            component: (
                <Valeurs handleChange={handleChange} history={history} />
            ),
        },
        {
            id: 6,
            name: 'fontCommerce',
            component: (
                <FontsCommerces handleChange={handleChange} history={history} />
            ),
        },
        {
            id: 7,
            name: 'animeaux',
            component: (
                <Animaux handleChange={handleChange} history={history} />
            ),
        },
        {
            id: 8,
            name: 'montants',
            component: (
                <Montants handleChange={handleChange} history={history} />
            ),
        },

        {
            id: 9,
            name: 'fontsSpece',
            component: (
                <FontsSpeces handleChange={handleChange} history={history} />
            ),
        },
        {
            id: 10,
            name: 'objSpeciaux',
            component: (
                <ObjSpeciaux handleChange={handleChange} history={history} />
            ),
        },
        {
            id: 11,
            name: 'prets',
            component: <Prets handleChange={handleChange} history={history} />,
        },
        {
            id: 12,
            name: 'assurance',
            component: (
                <Assurances handleChange={handleChange} history={history} />
            ),
        },
    ]
    // render
    return (
        <Grid container>
            <div className={classes.root}>
                {/* <AppBar position="static" color="default"> */}
                <Tabs
                    value={value}
                    orientation="vertical"
                    // eslint-disable-next-line no-shadow
                    onChange={(e, step) => handleChange(e, step)}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="scrollable"
                    aria-label="Vertical tabs example"
                    className={classes.tabs}
                >
                    {(typeDeclarationBien || []).map((type, index) => (
                        <Tab
                            key={type.id}
                            label={
                                lng === 'ar'
                                    ? _.words(
                                          intl.formatMessage({ id: type.name })
                                      )[0]
                                    : _.words(
                                          intl.formatMessage({ id: type.name })
                                      )[1]
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
                {(typeDeclarationBien || []).map((type, index) => (
                    <CtnDecDetail
                        value={value}
                        index={index}
                        dir={theme.direction}
                        key={type.id}
                    >
                        {type.component}
                    </CtnDecDetail>
                ))}
            </div>
            {/* </SwipeableViews> */}
        </Grid>
    )
}
/**
 *  declaration des props
 */
ModeSaisie.propTypes = {
    intl: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    setDisabled: PropTypes.func.isRequired,
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
