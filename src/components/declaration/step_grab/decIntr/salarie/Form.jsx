import React from 'react'
import { injectIntl } from 'react-intl'
import { Grid } from '@material-ui/core'
import PropTypes from 'prop-types'
import setListInput from './ListInputs'
import InputText from '../../../../ui/input'
import DateField from '../../../../ui/datePicker'

/**
 *
 *
 * @param {*} {
 *     intl,
 *     payload,
 *     isError,
 *     errorsList,
 *     lng,
 *     id,
 *     disabled,
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
    id,
    disabled,
    fieldChangedHandler,
}) => {
    /* functions */
    /* render */
    const code = 'salarie'
    return setListInput(intl).map(item => {
        if (item)
            if (item.isDate)
                return (
                    <Grid
                        item
                        xs={12}
                        md={item.md}
                        sm={item.sm}
                        className="gridItem"
                        key={`${code}_${item.name}`}
                    >
                        <DateField
                            onchange={(e, index) => {
                                fieldChangedHandler(e, index)
                            }}
                            name={item.name}
                            label={item.label}
                            placeholder={item.placeholder}
                            defaultValue={
                                payload[item.name] === undefined
                                    ? null
                                    : payload[item.name]
                            }
                            isArabic={lng === 'ar'}
                            intl={intl}
                            id={id}
                            disabled={disabled}
                            errorText={
                                errorsList[item.name] !== undefined
                                    ? errorsList[item.name].ar
                                    : ''
                            }
                            attributes={item.attributes}
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
                        <InputText
                            onchange={(e, index) => {
                                fieldChangedHandler(e, index)
                            }}
                            lng={lng}
                            name={item.name}
                            label={item.label}
                            errorText={
                                errorsList[item.name] !== undefined
                                    ? errorsList[item.name].ar
                                    : ''
                            }
                            defaultValue={payload[item.name]}
                            placeholder={item.placeholder}
                            type={item.type}
                            id={id}
                            disabled={disabled}
                            value={payload[item.name]}
                            isError={
                                isError &&
                                Object.keys(errorsList).includes(item.name)
                            }
                            required={item.required}
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
    disabled: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
    intl: PropTypes.object.isRequired,
}

export default injectIntl(Form)
