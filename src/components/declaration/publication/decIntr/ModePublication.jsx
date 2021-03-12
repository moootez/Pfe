import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { injectIntl } from 'react-intl'
import _ from 'lodash'
import PropTypes from 'prop-types'
import { Tabs, Grid, Tab } from '@material-ui/core'
import CtnDecDetail from '../../../ui/tabPanel/index'
import ActConjoint from './actConjoint/FormatPublication'
import Cadeaux from './cadeaux/FormatPublication'
import Etudes from './etudes/FormatPublication'
import Membres from './membres/FormatPublication'
import Salarie from './salarie/FormatPublication'
import ProLiberale from './professionLiberale/FormatPublication'

// style tabs
/**
 *
 *
 * @param {*} index
 */
const a11yProps = index => ({
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
})
/**
 * style
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
    /* hooks numbers */

    const classes = useStyles()
    const theme = useTheme()
    const [value, setValue] = React.useState(0)

    /**
     * change value step
     *
     * @param {*} event
     * @param {*} newValue
     */
    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    const typeModePublication = [
        {
            id: 0,
            name: 'acivitéProfessionnelConjoint',
            component: (
                <ActConjoint
                    handleChange={handleChange}
                    history={history}
                    allFormatsData={allFormatsData}
                />
            ),
        },
        {
            id: 1,
            name: 'cadeaux',
            component: (
                <Cadeaux
                    handleChange={handleChange}
                    history={history}
                    allFormatsData={allFormatsData}
                />
            ),
        },
        {
            id: 2,
            name: 'membres',
            component: (
                <Membres
                    handleChange={handleChange}
                    history={history}
                    allFormatsData={allFormatsData}
                />
            ),
        },
        {
            id: 3,
            name: 'etudes',
            component: (
                <Etudes
                    handleChange={handleChange}
                    history={history}
                    allFormatsData={allFormatsData}
                />
            ),
        },
        {
            id: 4,
            name: 'professionLiberale',
            component: (
                <ProLiberale
                    handleChange={handleChange}
                    history={history}
                    allFormatsData={allFormatsData}
                />
            ),
        },
        {
            id: 5,
            name: 'salarie',
            component: (
                <Salarie
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
