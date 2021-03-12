import React from 'react'
import { injectIntl } from 'react-intl'
import { Grid } from '@material-ui/core'
import PropTypes from 'prop-types'
import setListInput from './ListInputs'
import InputText from '../../../../ui/input'
import InputFormatted from '../../../../ui/numberFormat'

/**
 *
 *
 * @param {*} {
 *     intl,
 *     payload,
 *     isError,
 *     errorsList,
 *     lng,
 *     disabled,
 *     id,
 *     fieldChangedHandler,
 * }
 * @returns
 */
const Form = ({
    intl,
    payload,
    isError,
    errorsList,
    lng,
    disabled,
    id,
    fieldChangedHandler,
}) => {
    /* functions */
    /* render */
    const code = 'etudes'
    return setListInput(intl).map(item => {
        if (item)
            if (!item.isFormatted)
                return (
                    <Grid
                        item
                        xs={12}
                        md={item.md}
                        sm={item.sm}
                        className="gridItem"
                        key={`${code}_${item.name}`}
                    >
                        <InputText
                            onchange={(e, index) => {
                                fieldChangedHandler(e, index)
                            }}
                            lng={lng}
                            name={item.name}
                            label={item.label}
                            disabled={disabled}
                            errorText={
                                errorsList[item.name] !== undefined
                                    ? errorsList[item.name].ar
                                    : ''
                            }
                            defaultValue={payload[item.name]}
                            placeholder={item.placeholder}
                            type={item.type}
                            id={id}
                            value={payload[item.name]}
                            isError={
                                isError &&
                                Object.keys(errorsList).includes(item.name)
                            }
                            required={item.required}
                        />
                    </Grid>
                )
            else
                return (
                    <Grid
                        item
                        xs={12}
                        md={item.md}
                        sm={item.sm}
                        className="gridItem"
                        key={`${code}_${item.name}`}
                    >
                        <InputFormatted
                            onchange={(e, index) =>
                                fieldChangedHandler(e, index)
                            }
                            required={item.required}
                            name={item.name}
                            label={item.label}
                            lng={lng}
                            id={id}
                            disabled={disabled}
                            width={item.widh}
                            list={item.list}
                            selectedItem={payload[item.name]}
                            errorText={
                                errorsList[item.name] !== undefined
                                    ? errorsList[item.name].ar
                                    : ''
                            }
                            defaultValue={payload[item.name]}
                            isError={
                                isError &&
                                Object.keys(errorsList).includes(item.name)
                            }
                        />
                    </Grid>
                )
        return null
    })
}
/**
 *  declaration des props
 */
Form.propTypes = {
    payload: PropTypes.object.isRequired,
    lng: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    disabled: PropTypes.bool.isRequired,
    intl: PropTypes.object.isRequired,
}

export default injectIntl(Form)
