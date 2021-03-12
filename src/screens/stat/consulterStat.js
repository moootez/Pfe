import React, { Fragment, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Grid, makeStyles, withStyles } from '@material-ui/core'
import Pagination from '@material-ui/lab/Pagination'
import PageTitle from '../../components/ui/pageTitle'
import FormatStat from './formStat'
import getStatistiqueActions from '../../redux/statistique/getStatistique'

/* style */
const useStyles = makeStyles(theme => ({
    pagination: {
        '& > *': {
            marginTop: theme.spacing(2),
        },
        textAlign: 'center',
    },
}))

const StyledPagination = withStyles({
    ul: {
        display: 'inline-flex',
    },
    root: {
        color: 'red',
    },
})(Pagination)

/**
 *
 *
 * @param {*} { getStatistique, statistique }
 * @returns
 */
const ConsulterStat = ({ getStatistique, statistique }) => {
    /* hook memeber */
    const [data, setData] = useState(statistique && statistique.data)
    const classes = useStyles()
    const [page, setPage] = useState(1)

    /* life cycle */
    useEffect(() => {
        getStatistique({ type: 'publiableInterne', page })
    }, [])

    /* life cycle */
    useEffect(() => {
        if (statistique && statistique.data) setData(statistique.data)
    }, [statistique])

    /* functions */
    /**
     *
     * change page pagination
     * @param {*} event
     * @param {*} value
     */
    const handleChange = (event, value) => {
        setPage(value)
        getStatistique({ type: 'publiableInterne', page: value })
        setData(statistique.data)
    }

    return (
        <Fragment>
            <Grid className="gridItem">
                <PageTitle label="الإحصائيات" />
            </Grid>
            {data && data.length !== 0 && (
                <Fragment>
                    <FormatStat data={data} type="consultation" />
                    {/* pagination   */}
                    <StyledPagination
                        count={statistique && statistique.meta.pages}
                        page={page}
                        onChange={handleChange}
                        size="large"
                        variant="outlined"
                        classes={{
                            root: classes.pagination,
                        }}
                    />
                </Fragment>
            )}
        </Fragment>
    )
}

// dispatch action

/**
 *
 *
 * @param {*} dispatch
 */
const mapDispatchToProps = dispatch => ({
    getStatistique: payload =>
        dispatch(getStatistiqueActions.getStatistiqueRequest(payload)),
})

// obtenir les données from  store state
/**
 *
 *
 * @param {*} state
 * @returns
 */
const mapStateToProps = state => ({
    statistique: state.statistique.getStatistique.response,
})
/**
 *  declaration des props
 */
ConsulterStat.propTypes = {
    getStatistique: PropTypes.func.isRequired,
    statistique: PropTypes.object.isRequired,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ConsulterStat)
