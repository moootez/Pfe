import React, { Fragment, useState, useLayoutEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Grid, makeStyles, withStyles } from '@material-ui/core'
import Pagination from '@material-ui/lab/Pagination'
import Immutable from 'seamless-immutable'
import ButtonComponent from '../../components/ui/button'
import PageTitle from '../../components/ui/pageTitle'
import FormatStat from './formStat'
import publierStatistiqueActions from '../../redux/statistique/publierStatistique'
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
 * @param {*} { publierStatistique, getStatistique, statistique }
 * @returns
 */
const Index = ({ publierStatistique, getStatistique, statistique }) => {
    /* hook memeber */
    const [data, setData] = useState(statistique && statistique.data)
    const [payload, setPayload] = useState([])
    const [arrayExterne, setArrayExterne] = useState([])
    const [arrayInterne, setArrayInterne] = useState([])
    const classes = useStyles()
    const [page, setPage] = useState(1)

    /* life cycle */
    useLayoutEffect(() => {
        getStatistique({ type: 'allGraphe', page })
    }, [])

    /* life cycle */
    useLayoutEffect(() => {
        if (statistique) {
            setData(statistique.data)
        }
    }, [statistique])

    /* functions */
    /**
     * get all check publiacation ext et int
     *
     * @param {*} name
     * @returns
     */
    const getCurruntState = name => {
        if (name === 'publiableExterne') return arrayExterne
        return arrayInterne
    }
    /**
     *
     * set publication externe et interne
     * @param {*} name
     * @param {*} checked
     * @param {*} id
     */
    const /**
         * check radio bouton
         *
         * @memberof
         */
        setCheck = (name, checked, id) => {
            const array = Immutable.asMutable(data).map(e =>
                Immutable.asMutable(e)
            )
            array[id][name] = checked
            setData(array)
            setPayload({ ...payload, [name]: data[id].id })
        }

    /**
     * set payload
     *
     * @param {*} name
     * @param {*} checked
     * @param {*} id
     */
    const handleChange = (name, checked, id) => {
        const tabTmpExterne = getCurruntState(name)
        const tabTmpInterne = getCurruntState(name)

        if (checked) {
            if (name === 'publiableExterne')
                setArrayExterne([...tabTmpExterne, data[id].id])
            else setArrayInterne([...tabTmpInterne, data[id].id])
        } else if (name === 'publiableExterne')
            setArrayExterne(tabTmpExterne.filter(dec => dec !== data[id].id))
        else setArrayInterne(tabTmpInterne.filter(dec => dec !== data[id].id))
    }

    /* life cycle */
    useLayoutEffect(() => {
        if (statistique) {
            setArrayExterne(
                statistique.data
                    .filter(dec => dec.publiableExterne === true)
                    .map(i => i.id)
            )
            setArrayInterne(
                statistique.data
                    .filter(dec => dec.publiableInterne === true)
                    .map(i => i.id)
            )
        }
    }, [statistique])

    /**
     * publier stat
     *
     */
    const publierStat = () => {
        const arrayPubliable = {
            publiableExterne: arrayExterne,
            publiableInterne: arrayInterne,
        }
        publierStatistique(arrayPubliable)
    }

    /**
     *
     * change page pagination
     * @param {*} event
     * @param {*} value
     */
    const handleChangeagination = (event, value) => {
        setPage(value)
        getStatistique({ type: 'allGraphe', page: value })
        setData(statistique.data)
    }

    return (
        <Fragment>
            <Grid className="gridItem">
                <PageTitle label="نشر الإحصائيات" />
            </Grid>
            {data && (
                <Fragment>
                    <FormatStat
                        data={data}
                        onchange={setCheck}
                        handelCheck={handleChange}
                    />
                    <StyledPagination
                        count={statistique && statistique.meta.pages}
                        page={page}
                        onChange={handleChangeagination}
                        size="large"
                        variant="outlined"
                        classes={{
                            root: classes.pagination,
                        }}
                    />
                </Fragment>
            )}

            <Grid
                item
                xs={12}
                md={12}
                sm={12}
                style={{ textAlign: 'center' }}
                className="gridItem"
            >
                <ButtonComponent
                    color="secondary"
                    type="contained"
                    size="medium"
                    label="نشر"
                    clicked={publierStat}
                />
            </Grid>
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
    publierStatistique: payload =>
        dispatch(publierStatistiqueActions.publierStatistiqueRequest(payload)),
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
Index.propTypes = {
    getStatistique: PropTypes.func.isRequired,
    publierStatistique: PropTypes.func.isRequired,
    statistique: PropTypes.object.isRequired,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Index)
