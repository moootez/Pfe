import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import CurrencyFormat from 'react-currency-format'

/**
 * style text
 */
const useStyles = makeStyles(theme => ({
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
}))

/**
 *
 *
 * @param {*} props
 * @returns
 */
const index = props => {
    const {
        label,
        placeholder,
        onchange,
        defaultValue,
        disabled,
        id,
        lng,
        required,
        name,
        isError,
        errorText,
    } = props
    /**
     * hooks numbers
     */
    const [inputValue, setInputValue] = useState(defaultValue)
    const classes = useStyles()
    console.log('defaultValue', defaultValue, inputValue)
    return (
        <div dir="ltr">
            <FormControl
                style={{
                    borderColor: isError && '#f44336 !important',
                }}
                className="w-100"
            >
                <label
                    htmlFor="tel"
                    className="mt-3 mr-2 mb-0 ml-2 font-weight-bold text-uppercase text-primary"
                >
                    {required && <span className="text-danger"> * </span>}
                    {label}
                </label>
                <CurrencyFormat
                    className={`${classes.textField} mt-1 `}
                    value={defaultValue || ''}
                    placeholder={placeholder}
                    id={name}
                    decimalSeparator=","
                    margin="normal"
                    name={name}
                    disabled={disabled}
                    variant="outlined"
                    inputprops={{ 'aria-label': 'bare' }}
                    onChange={e => {
                        onchange(e, id)
                        setInputValue(e.target.value)
                    }}
                    thousandSeparator=""
                    style={{
                        height: '44px',
                        textAlign: lng === 'ar' ? 'right' : 'left',
                        paddingRight: '10px',
                        border: isError && '1px solid #f44336',
                    }}
                    onInput={e => {
                        if (e.target.value.length > 0 && name === 'annee') {
                            e.target.value = e.target.value
                                .toString()
                                .slice(0, 4)
                        }
                    }}
                />
                {isError && (
                    <span
                        style={{
                            fontSize: '0.7rem',
                            color: '#f44336',
                            paddingRight: '5%',
                        }}
                    >
                        {errorText}
                    </span>
                )}
            </FormControl>
        </div>
    )
}
/**
 *  Inialisation
 */
index.defaultProps = {
    label: '',
    defaultValue: '',
    placeholder: '',
    required: true,
    onchange: () => {},
    isError: false,
    errorText: '',
}
/**
 *  declaration des props
 */
index.propTypes = {
    id: PropTypes.number.isRequired,
    lng: PropTypes.string.isRequired,
    required: PropTypes.bool,
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    disabled: PropTypes.bool.isRequired,
    defaultValue: PropTypes.string,
    placeholder: PropTypes.string,
    onchange: PropTypes.func,
    isError: PropTypes.bool,
    errorText: PropTypes.string,
}
export default index
