import React, { useLayoutEffect, Fragment, useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Grid, Checkbox, makeStyles } from '@material-ui/core'
import getParametresActions from '../../redux/parametres/getParametres'
import InputText from '../../components/ui/input'
import patchParametresActions from '../../redux/parametres/patchParametres'

/* style */
const useStyles = makeStyles(() => ({
    table: {
        width: '100%',
    },
    td: {
        width: '70%',
    },
    floatTd: {
        textAlign: 'center',
    },
}))

/**
 *
 *
 * @param {*} { data,  handleChange, fieldChangedHandler }
 * @returns
 */
const ParametresStat = ({ data, handleChange, fieldChangedHandler }) => {
    const classes = useStyles()
    const [payload, setPayload] = useState([])

    /* Life Cycle */
    useLayoutEffect(() => {
        if (data) setPayload(data)
    }, [data])

    return (
        <Fragment>
            <Grid container>
                {payload &&
                    (payload || [])
                        .filter(index => index.key.match('StatIndice_'))
                        .map((item, k) => (
                            <Grid
                                item
                                xs={6}
                                sm={6}
                                className="gridItem"
                                style={{ marginTop: '15px', direction: 'rtl' }}
                                // eslint-disable-next-line react/no-array-index-key
                                key={`${item.id}-${k}`}
                            >
                                <table className={classes.table}>
                                    <tr>
                                        <td className={classes.td}>
                                            <label htmlFor="select">
                                                <b>{item.text}</b>
                                            </label>
                                        </td>
                                        <td className={classes.floatTd}>
                                            {item.type === 'boolean' && (
                                                <Checkbox
                                                    key={item.text}
                                                    checked={
                                                        item.valeur ===
                                                            'true' ||
                                                        item.valeur === true
                                                    }
                                                    onChange={e =>
                                                        handleChange(e, item)
                                                    }
                                                    value={item.valeur}
                                                    color="primary"
                                                    name={item.text}
                                                />
                                            )}
                                            {item.type === 'integer' && (
                                                <InputText
                                                    onchange={e =>
                                                        fieldChangedHandler(
                                                            e,
                                                            item
                                                        )
                                                    }
                                                    name={item.valeur}
                                                    label={item.name}
                                                    defaultValue={item.valeur}
                                                    placeholder={item.valeur}
                                                    type="number"
                                                    value={item.valeur}
                                                    required={false}
                                                />
                                            )}
                                        </td>
                                    </tr>
                                </table>
                            </Grid>
                        ))}
            </Grid>
        </Fragment>
    )
}
ParametresStat.defaultValue = {
    handleChange: () => {},
    fieldChangedHandler: () => {},
}
/**
 *  declaration des props
 */
ParametresStat.propTypes = {
    data: PropTypes.object.isRequired,
    handleChange: PropTypes.func.isRequired,
    fieldChangedHandler: PropTypes.func.isRequired,
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
)(ParametresStat)
