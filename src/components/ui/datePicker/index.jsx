import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { isAfter } from 'date-fns'
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers'
// import arDZ from 'date-fns/locale/ar-DZ'
import { FormControl } from '@material-ui/core'
import FrDateFnsUtils from './frDateFnsUtils'

/**
 * calendirier
 *
 * @param {*} {
 *     placeholder,
 *     label,
 *     name,
 *     onchange,
 *     isError,
 *     defaultValue,
 *     intl,
 *     disabled,
 *     id,
 *     parent = 'noChild',
 *     attributes,
 *     required,
 *     errorText,
 * }
 * @returns
 */
const index = ({
    placeholder,
    label,
    name,
    onchange,
    isError,
    defaultValue,
    intl,
    disabled,
    id,
    parent = 'noChild',
    attributes,
    required,
    errorText,
}) => {
    /**
     * format date
     *
     * @param {*} date
     * @returns
     */
    const formatDate = date => {
        const d = new Date(date)
        let month = `${d.getMonth() + 1}`
        let day = `${d.getDate()}`
        const year = d.getFullYear()
        if (month.length < 2) month = `0${month}`
        if (day.length < 2) day = `0${day}`
        return [year, month, day].join('-')
    }
    /**
     * hooks numbers
     */
    const [selectedDate, setSelectedDate] = useState('')
    const [error, setError] = useState('')

    /**
     *
     * change date
     * @param {*} date
     */
    const handleDateChange = date => {
        if (date) {
            if (
                (name !== 'dateNaissance' && Number.isNaN(date.getDate())) ||
                (attributes.disableFuture && date < new Date(1900, 1, 1))
            ) {
                setError(intl.formatMessage({ id: 'msgDateErreur' }))
            } else {
                setSelectedDate(date)
                onchange({ target: { value: formatDate(date) } }, id)
                setError('')
            }

            if (name === 'dateNaissance' && parent !== 'child' && date) {
                const dateNow = new Date()
                if (
                    isAfter(
                        new Date(date),
                        new Date(
                            dateNow.getFullYear() - 18,
                            dateNow.getMonth(),
                            dateNow.getDate() + 1
                        )
                    )
                )
                    setError(intl.formatMessage({ id: 'msgDateNai' }))
                else if (
                    Number.isNaN(date.getDate()) ||
                    (attributes.disableFuture && date < new Date(1900, 1, 1))
                ) {
                    setError(intl.formatMessage({ id: 'msgDateErreur' }))
                } else {
                    setSelectedDate(date)
                    onchange({ target: { value: formatDate(date), name } }, id)
                    setError('')
                }
            } else {
                if (name !== 'de' && name !== 'a') {
                    setSelectedDate(date)
                    onchange({ target: { value: formatDate(date), name } }, id)
                }
            }
        } else {
            setSelectedDate(date)
            onchange({ target: { value: null, name } }, id)
        }
    }

    let border = {}

    /**
     * on focus date
     *
     */
    const fucusFn = () => {
        if (name !== 'dateNaissance') {
            if (selectedDate && new Date(selectedDate).getDate()) {
                onchange(
                    { target: { value: formatDate(selectedDate), name } },
                    id
                )
                setSelectedDate(selectedDate)
            } else {
                onchange(
                    { target: { value: formatDate(new Date()), name } },
                    id
                )
                setSelectedDate(new Date())
            }
        }
    }
    if (isError || error !== '') {
        border = { border: '1px solid red' }
    } else border = { border: '1px solid black' }

    return (
        <FormControl className="w-100">
            <label
                htmlFor="datepicker"
                className="mt-3 mr-2 mb-0 ml-2 font-weight-bold text-uppercase text-primary"
            >
                {label}
                {required && !attributes.disabled ? (
                    <span className="text-danger"> * </span>
                ) : (
                    ''
                )}
            </label>
            <MuiPickersUtilsProvider utils={FrDateFnsUtils} >
                <KeyboardDatePicker
                    onFocus={fucusFn}
                    id="datepicker"
                    value={
                        defaultValue !== null && defaultValue !== '1900-01-01'
                            ? new Date(defaultValue)
                            : null
                    }
                    onChange={handleDateChange}
                    className="pl-3 pr-3 mb-0 mt-1 ml-2 mr-2 "
                    style={{
                        height: '44px',
                        borderRadius: '3px',
                        ...border,
                    }}
                    cancelLabel=""
                    clearLabel="Annuler"
                    okLabel="Valider"
                    format="dd/MM/yyyy"
                    margin="normal"
                    error={isError || error !== ''}
                    disabled={disabled}
                    label={placeholder}
                    name={name}
                    disableFuture={
                        attributes.disableFuture !== undefined
                            ? attributes.disableFuture
                            : true
                    }
                    {...attributes}
                    inputprops={{
                        disableUnderline: true,
                        margin: 'dense',
                    }}
                    helperText={
                        isError || error ? (
                            <span>{error || errorText}</span>
                        ) : (
                            ''
                        )
                    }
                    initialFocusedDate={new Date()}
                    clearable
                />
            </MuiPickersUtilsProvider>
        </FormControl>
    )
}
/**
 *  Inialisation
 */
index.defaultProps = {
    onchange: () => { },
    placeholder: ' ',
    defaultValue: null,
    label: '',
    isError: false,
    required: true,
    isArabic: false,
    disabled: false,
    attributes: {},
    errorText: '',
    id: null,
    intl: null,
    parent: null,
    name: null,
}
/**
 *  declaration des props
 */
index.propTypes = {
    onchange: PropTypes.func,
    placeholder: PropTypes.string,
    defaultValue: PropTypes.string,
    label: PropTypes.string,
    isError: PropTypes.bool,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    isArabic: PropTypes.bool,
    id: PropTypes.number,
    attributes: PropTypes.object,
    intl: PropTypes.object,
    errorText: PropTypes.string,
    parent: PropTypes.string,
    name: PropTypes.string,
}

export default index
