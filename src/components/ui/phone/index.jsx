import React, { useState } from 'react'
import FormControl from '@material-ui/core/FormControl'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input'
import 'react-phone-number-input/style.css'

/**
 * style input phone
 */
const useStyles = makeStyles(theme => ({
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        border: '1px solid red',
    },
    text: {
        marginLeft: theme.spacing(1),
        marginTop: theme.spacing(0.5),
        marginRight: theme.spacing(1),
        border: '1px solid #ccc',
    },
}))

/**
 *
 *
 * @param {*} {
 *     label,
 *     onchange,
 *     isError,
 *     errorText,
 *     defaultValue,
 *     required,
 *     name,
 *     disabled,
 * }
 * @returns
 */
const index = ({
    label,
    onchange,
    isError,
    errorText,
    defaultValue,
    required,
    name,
    disabled,
}) => {
    /**
     * hooks numbers
     */
    const classes = useStyles()
    const [value, setValue] = useState()

    return (
        <FormControl className="w-100">
            <label
                htmlFor="tel"
                className="mt-3 mr-2 mb-0 ml-2 font-weight-bold text-uppercase text-primary"
            >
                {label}
                {required && <span className="text-danger"> * </span>}
            </label>
            <FormControl style={{ direction: 'ltr' }}>
                <PhoneInput
                    className={isError ? classes.textField : classes.text}
                    value={defaultValue}
                    name={name}
                    defaultCountry="TN"
                    onChange={number => {
                        setValue(number)
                        if (isValidPhoneNumber(number))
                            onchange(number, isValidPhoneNumber(number))
                    }}
                    error={
                        value
                            ? isValidPhoneNumber(value)
                                ? undefined
                                : 'Invalid phone number'
                            : 'Phone number required'
                    }
                    disabled={disabled}
                />
                {value &&
                    (isValidPhoneNumber(value) ? (
                        undefined
                    ) : (
                        <span
                            style={{
                                color: 'red',
                                fontSize: '0.75rem',
                                marginRight: '15px',
                            }}
                        >
                            رقم الهاتف خاطئ{' '}
                        </span>
                    ))}
                {isError && (
                    <span
                        style={{
                            color: 'red',
                            fontSize: '0.75rem',
                            marginRight: '15px',
                        }}
                    >
                        {errorText}
                    </span>
                )}
            </FormControl>
        </FormControl>
    )
}
/**
 *  Inialisation
 */
index.defaultProps = {
    label: '',
    name: '',
    isError: false,
    required: false,
    errorText: '',
    defaultValue: '',
    onchange: () => {},
    disabled: false,
}
/**
 *  declaration des props
 */
index.propTypes = {
    defaultValue: PropTypes.string,
    name: PropTypes.string,
    isError: PropTypes.bool,
    required: PropTypes.bool,
    label: PropTypes.string,
    onchange: PropTypes.func,
    errorText: PropTypes.string,
    disabled: PropTypes.bool,
}

export default index
