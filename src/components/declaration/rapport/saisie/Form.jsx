import React from 'react'
import { injectIntl } from 'react-intl'
import { Grid } from '@material-ui/core'
import PropTypes from 'prop-types'
import setListInput from './ListInputs'
import SelectList from '../../../ui/select'
import TextArea from '../../../ui/textarea'

/**
 *
 *
 * @param {*} {
 *     rubrique,
 *     sousRubrique,
 *     fieldChangedHandler,
 *     disabled,
 *     isSelectedRub,
 *     payload,
 * }
 * @returns
 */
const Form = ({
    rubrique,
    sousRubrique,
    fieldChangedHandler,
    disabled,
    isSelectedRub,
    payload,
}) => {
    /* functions */
    /* render */
    return setListInput(rubrique, sousRubrique, isSelectedRub).map(item => {
        if (item)
            if (item.isSelect)
                return (
                    <Grid
                        item
                        key={item.label}
                        xs={12}
                        md={item.md}
                        sm={item.sm}
                        className="gridItem"
                    >
                        <SelectList
                            onchange={e => {
                                fieldChangedHandler(e, item.name)
                            }}
                            required={item.required}
                            name={item.name}
                            label={item.label}
                            disabled={disabled}
                            list={item.list}
                            selectedItemRubrique={payload.idRubrique}
                            selectedItemSousRubrique={payload.idSousRubrique}
                            selectAll={false}
                        />
                    </Grid>
                )
            else
                return (
                    <Grid
                        item
                        key={item.label}
                        xs={12}
                        md={item.md}
                        sm={item.sm}
                        lg={item.lg}
                        className="gridItem"
                    >
                        <TextArea
                            onchange={e => fieldChangedHandler(e, item.name)}
                            disabled={disabled}
                            name={item.name}
                            label={item.label}
                            defaultValue={payload[item.name]}
                            placeholder={item.placeholder}
                            required={item.required}
                        />
                    </Grid>
                )
        return null
    })
}
/**
 *  intialisation du données
 */
Form.defaultProps = {
    sousRubrique: [],
    rubrique: [],
    payload: {},
}
/**
 *  declaration des props
 */
Form.propTypes = {
    sousRubrique: PropTypes.array,
    payload: PropTypes.object,
    rubrique: PropTypes.array,
    disabled: PropTypes.bool.isRequired,
    isSelectedRub: PropTypes.bool.isRequired,
    fieldChangedHandler: PropTypes.func.isRequired,
}

export default injectIntl(Form)
