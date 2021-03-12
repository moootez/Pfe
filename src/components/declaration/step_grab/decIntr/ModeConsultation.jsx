import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { injectIntl } from 'react-intl'
import _ from 'lodash'
import PropTypes from 'prop-types'
import { Tabs, Tab } from '@material-ui/core'
import CtnDecDetail from '../../../ui/tabPanel/index'
import ActConjoint from './actConjoint/Detail'
import Cadeaux from './cadeaux/Detail'
import Etudes from './etudes/Detail'
import Membres from './membres/Detail'
import Salarie from './salarie/Detail'
import ProLiberale from './professionLiberale/Detail'

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
 * @param {*} { history, intl }
 * @returns
 */
const ModeConsultation = ({ history, intl }) => {
    /**
     * hokks numbers
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
    }

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
        <div className={classes.root}>
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
            <div
                style={{
                    width: '84%',
                    backgroundColor: 'white',
                }}
            >
                {(typeDeclarationIntr || []).map((type, index) => (
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
        </div>
    )
}
/**
 *  declaration des props
 */
ModeConsultation.propTypes = {
    intl: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
}

export default injectIntl(ModeConsultation)
