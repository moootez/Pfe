import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { injectIntl } from 'react-intl'
import _ from 'lodash'
import PropTypes from 'prop-types'
import { Tabs, Tab, Grid } from '@material-ui/core'
import CtnDecDetail from '../../../ui/tabPanel/index'
import Revenus from './revenus/FormatPublication'
import Actions from './actions/FormatPublication'
import Animaux from './animaux/FormatPublication'
import Assurances from './assurances/FormatPublication'
import FontsCommerces from './fontCommerces/FormatPublication'
import FontsSpeces from './fontsSpeces/FormatPublication'
import Immeubles from './immeubles/FormatPublication'
import Montants from './montants/FormatPublication'
import ObjSpeciaux from './objSpeciaux/FormatPublication'
import Prets from './prets/FormatPublication'
import Psociales from './pSocials/FormatPublication'
import Vehicules from './vehicules/FormatPublication'
import Valeurs from './valeurs/FormatPublication'

// style
/**
 * style tab
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
 * @param {*} { history, intl, allFormatsData }
 * @returns
 */
const ModePublication = ({ history, intl, allFormatsData }) => {
    // const lng = history.location.state.lang
    // hooks numbers
    const lng = 'ar'
    const classes = useStyles()
    const theme = useTheme()
    const [value, setValue] = React.useState(0)
    const handleChange = (event, newValue) => {
        setValue(newValue)
    }
    const typeModePublication = [
        {
            id: 0,
            name: 'revenus',
            component: (
                <Revenus
                    handleChange={handleChange}
                    history={history}
                    allFormatsData={allFormatsData}
                />
            ),
        },
        {
            id: 1,
            name: 'immeubles',
            component: (
                <Immeubles
                    handleChange={handleChange}
                    history={history}
                    allFormatsData={allFormatsData}
                />
            ),
        },
        {
            id: 2,
            name: 'vehicule',
            component: (
                <Vehicules
                    handleChange={handleChange}
                    history={history}
                    allFormatsData={allFormatsData}
                />
            ),
        },
        {
            id: 3,
            name: 'actions',
            component: (
                <Actions
                    handleChange={handleChange}
                    history={history}
                    allFormatsData={allFormatsData}
                />
            ),
        },
        {
            id: 4,
            name: 'pSocial',
            component: (
                <Psociales
                    handleChange={handleChange}
                    history={history}
                    allFormatsData={allFormatsData}
                />
            ),
        },
        {
            id: 12,
            name: 'valMobiliere',
            component: (
                <Valeurs
                    handleChange={handleChange}
                    history={history}
                    allFormatsData={allFormatsData}
                />
            ),
        },
        {
            id: 5,
            name: 'animeaux',
            component: (
                <Animaux
                    handleChange={handleChange}
                    history={history}
                    allFormatsData={allFormatsData}
                />
            ),
        },
        {
            id: 6,
            name: 'montants',
            component: (
                <Montants
                    handleChange={handleChange}
                    history={history}
                    allFormatsData={allFormatsData}
                />
            ),
        },
        {
            id: 7,
            name: 'fontCommerce',
            component: (
                <FontsCommerces
                    handleChange={handleChange}
                    history={history}
                    allFormatsData={allFormatsData}
                />
            ),
        },
        {
            id: 8,
            name: 'fontsSpece',
            component: (
                <FontsSpeces
                    handleChange={handleChange}
                    history={history}
                    allFormatsData={allFormatsData}
                />
            ),
        },
        {
            id: 9,
            name: 'objSpeciaux',
            component: (
                <ObjSpeciaux
                    handleChange={handleChange}
                    history={history}
                    allFormatsData={allFormatsData}
                />
            ),
        },
        {
            id: 10,
            name: 'assurance',
            component: (
                <Assurances
                    handleChange={handleChange}
                    history={history}
                    allFormatsData={allFormatsData}
                />
            ),
        },
        {
            id: 11,
            name: 'prets',
            component: (
                <Prets
                    handleChange={handleChange}
                    history={history}
                    allFormatsData={allFormatsData}
                />
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
                    {(typeModePublication || []).map((type, index) => (
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
                {(typeModePublication || []).map((type, index) => (
                    <CtnDecDetail
                        key={type.id}
                        value={value}
                        index={index}
                        dir={theme.direction}
                    >
                        {type.component}
                    </CtnDecDetail>
                ))}
            </div>
        </Grid>
    )
}
/**
 *  declaration des props
 */

ModePublication.propTypes = {
    intl: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    allFormatsData: PropTypes.object.isRequired,
}

export default injectIntl(ModePublication)
