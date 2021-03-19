import React, { Fragment, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Grid, Divider } from '@material-ui/core'
import PropTypes from 'prop-types'
import { injectIntl } from 'react-intl'
import PageTitle from '../../components/ui/pageTitle'

const Index = ({ intl }) => {
    const [year, setYear] = useState(2020)

    /* life cycle */
    useEffect(() => {
        setYear(2021)
    }, [])

    return (
        <Fragment className="gridItem">
            <Grid className="gridItem">
                <PageTitle label="News" />
            </Grid>
            <Divider />
            <span>{intl.formatMessage({ id: 'username' }) + year}</span>
        </Fragment>
    )
}

// dispatch action

/**
 *
 *
 * @param {*} dispatch
 */
const mapDispatchToProps = null

// obtenir les données from  store state
/**
 *
 *
 * @param {*} state
 * @returns
 */
const mapStateToProps = state => ({
    state,
})
/**
 *  declaration des props
 */
Index.propTypes = {
    intl: PropTypes.object.isRequired,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(Index))
