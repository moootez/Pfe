import React, { useLayoutEffect, Fragment, useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Grid, Divider } from '@material-ui/core'
import Immutable from 'seamless-immutable'
import getParametresActions from '../../redux/parametres/getParametres'
import PageTitle from '../../components/ui/pageTitle'
import ButtonComponent from '../../components/ui/button'
import patchParametresActions from '../../redux/parametres/patchParametres'
import ItemTitle from '../../components/ui/itemCmp'
import ParametresStat from './parametresStat'
import ParametresWithoutStat from './parametresWithoutStat'

/**
 *
 *
 * @param {*} { getParametres, listParametres, patchParametres }
 * @returns
 */
const Index = ({ getParametres, listParametres, patchParametres }) => {
    const [payload, setPayload] = useState([])

    /* Life Cycle */
    useLayoutEffect(() => {
        getParametres()
    }, [])

    /* Life Cycle */
    useLayoutEffect(() => {
        if (listParametres) setPayload(listParametres)
    }, [listParametres])

    /**
     *
     * rendre state immutable
     * @returns
     */
    const arrayImmutable = () => {
        return Immutable.asMutable(payload).map(index =>
            Immutable.asMutable(index)
        )
    }

    /**
     *
     * checkbox change
     * @param {*} e
     * @param {*} item
     */
    const handleChange = (e, item) => {
        const payloadState = arrayImmutable()
        // eslint-disable-next-line array-callback-return
        payloadState.map((index, key) => {
            if (index.id === item.id)
                payloadState[key].valeur = e.target.checked.toString()
        })
        setPayload(payloadState)
    }

    /**
     *
     * input et date change
     * @param {*} e
     * @param {*} item
     */
    const fieldChangedHandler = (e, item) => {
        const payloadState = arrayImmutable()
        // eslint-disable-next-line array-callback-return
        payloadState.map((index, key) => {
            if (index.id === item.id) payloadState[key].valeur = e.target.value
        })
        setPayload(payloadState)
    }

    /**
     *
     * edit parametres
     */
    const handelEditParametres = () => {
        patchParametres(payload)
    }

    return (
        <Fragment>
            <Grid className="gridItem">
                <PageTitle label="ضبط الإعدادات" />
            </Grid>
            <ItemTitle label="ضبط اعداديات" />
            <Grid container>
                <ParametresWithoutStat
                    handleChange={handleChange}
                    fieldChangedHandler={fieldChangedHandler}
                    data={payload}
                />
            </Grid>
            <Divider />
            <ItemTitle label="ضبط اعداديات الإحصائيات" />
            <Grid container>
                <ParametresStat
                    handleChange={handleChange}
                    fieldChangedHandler={fieldChangedHandler}
                    data={payload}
                />
            </Grid>
            <Divider />
            <Grid
                item
                xs={12}
                style={{ textAlign: 'center', paddingTop: '2%' }}
            >
                <ButtonComponent
                    color="secondary"
                    type="contained"
                    size="medium"
                    label="تأكيد"
                    clicked={() => handelEditParametres()}
                />
            </Grid>
        </Fragment>
    )
}
/**
 *  declaration des props
 */
Index.propTypes = {
    getParametres: PropTypes.func.isRequired,
    listParametres: PropTypes.object.isRequired,
    patchParametres: PropTypes.func.isRequired,
}

const mapsStateToProps = state => {
    return {
        listParametres: state.parametres.getParametres.response,
    }
}

// dispatch action

/**
 *
 *
 * @param {*} dispatch
 */
const mapDispatchToProps = dispatch => ({
    getParametres: payload =>
        dispatch(getParametresActions.getParametresRequest(payload)),
    patchParametres: payload =>
        dispatch(patchParametresActions.patchParametresRequest(payload)),
})

export default connect(
    mapsStateToProps,
    mapDispatchToProps
)(Index)
