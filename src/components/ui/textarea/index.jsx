/* eslint-disable react/forbid-prop-types */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import FormControl from '@material-ui/core/FormControl'
import TextareaAutosize from '@material-ui/core/TextareaAutosize'

/**
 *
 *
 * @param {*} props
 * @returns
 */
const index = props => {
    const {
        label,
        id,
        placeholder,
        onchange,
        isError,
        required,
        className,
        defaultValue,
        lng,
    } = props
    const errorStyle = {
        fontSize: '0.75rem',
    }

    /**
     * hooks numbers
     */
    const [text, setText] = useState('')
    const [errorText, setErrorText] = useState('')

    /**
     * change payload textarea
     *
     * @param {*} event
     */
    const handleChange = event => {
        onchange(event, id)
        setText(event.target.value)
    }

    return (
        <FormControl className={className}>
            <label className="mt-3 mr-2 mb-0 ml-2 font-weight-bold text-uppercase text-primary">
                {label}
                {required && <span className="text-danger"> * </span>}
            </label>
            <TextareaAutosize
                rows="2"
                aria-label="empty textarea"
                className={`${
                    isError ? 'border-danger' : 'border-secondary'
                } p-3 ml-2 mr-2 mt-1`}
                placeholder={placeholder}
                value={text || defaultValue || ''}
                onChange={e => {
                    if (lng === 'ar') {
                        if (/^[ء-ي, ]*$/g.test(e.target.value)) {
                            handleChange(e)
                            setErrorText('')
                        } else setErrorText('الرجاء إدخال نص بالعربية')
                    }
                }}
            />
            {errorText && (
                <label
                    className="text-danger font-weight-normal ml-3 mr-3"
                    style={errorStyle}
                >
                    {errorText}
                </label>
            )}
        </FormControl>
    )
}
/**
 *  Inialisation
 */
index.defaultProps = {
    label: '',
    id: null,
    placeholder: '',
    defaultValue: '',
    isError: false,
    required: true,
    onchange: () => {},
    lng: 'ar',
    className: 'col-12 col-lg-6',
}
/**
 *  declaration des props
 */
index.propTypes = {
    defaultValue: PropTypes.string,
    lng: PropTypes.string,
    isError: PropTypes.bool,
    required: PropTypes.bool,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    placeholder: PropTypes.string,
    onchange: PropTypes.func,
    className: PropTypes.string,
    id: PropTypes.number,
}
export default index
