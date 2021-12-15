import React from 'react'
import TextField from '@material-ui/core/TextField'
import PropTypes from 'prop-types'
import FormControl from '@material-ui/core/FormControl'
import { MenuItem } from '@material-ui/core'
// import { FormattedMessage } from 'react-intl'
import generateKey from '../../../shared/utility'
/* eslint-disable no-unused-vars */
/**
 *
 *
 * @param {*} {
 *     label,
 *     placeholder,
 *     list,
 *     name,
 *     ecran,
 *     onchange,
 *     required,
 *     selectedItem,
 *     selectAll,
 *     isError,
 *     disabled,
 *     errorText,
 *     id,
 *     attributes = {},
 * }
 * @returns
 */
const index = ({
    label,
    placeholder,
    list,
    name,
    ecran,
    onchange,
    required,
    selectedItem,
    selectAll,
    isError,
    disabled,
    errorText,
    id,
    attributes = {},
}) => {
    /**
     * change input payload
     *
     * @param {*} event
     */
    const handleChange = event => {
        onchange(event, id)
    }

    /**
     * style input select
     */
    const style = {
        backgroundColor: 'transparent',
        borderRadius: 0,
        marginRight: '8px',
        marginLeft: '8px',
        width: 'auto',
        height: '49px',
        lineHeight: '10px',
    }
    return (
        <FormControl className={name === 'typeDeclaration' ? 'w-50' : 'w-100'}>
            <label htmlFor="select">
                {label}
                {required ? <span className="text-danger"> * </span> : ''}
            </label>
            {console.log('disabled', disabled)}
            <TextField
                className="mt-1"
                error={isError}
                direction="rtl"
                id="select"
                select
                name={name}
                style={
                    name === 'userRoles' && ecran
                        ? {
                              ...style,
                              marginRight: '50%',
                              width: '100%',
                              color: 'red',
                              display: 'none',
                          }
                        : {
                              ...style,
                              marginLeft: 8,
                              marginRight: 8,
                              backgroundColor: 'green',
                          }
                }
                label={placeholder}
                value={selectedItem}
                onChange={e => handleChange(e)}
                margin="normal"
                variant="outlined"
                helperText={isError && <span>{errorText}</span>}
                {...attributes}
            >
                {(selectAll
                    ? [{ label: 'Choisir', value: 0 }, ...list]
                    : list || []
                ).map(option => (
                    <MenuItem
                        value={option.value}
                        name={name}
                        key={generateKey()}
                        style={
                            option.publiable === false
                                ? { display: 'none' }
                                : {}
                        }
                    >
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>
        </FormControl>
    )
}
/**
 *  Inialisation
 */
index.defaultProps = {
    onchange: () => {},
    placeholder: ' ',
    label: '',
    selectedItem: 0,
    isError: false,
    required: true,
    disabled: false,
    attributes: {},
    errorText: '',
    id: null,
    name: null,
    list: [],
    selectAll: false,
    ecran: false,
}
/**
 *  declaration des props
 */
index.propTypes = {
    label: PropTypes.string,
    placeholder: PropTypes.string,
    list: PropTypes.array,
    selectedItem: PropTypes.number,
    selectAll: PropTypes.bool,
    errorText: PropTypes.string,
    name: PropTypes.string,
    id: PropTypes.number,
    isError: PropTypes.bool,
    disabled: PropTypes.bool,
    ecran: PropTypes.bool,
    required: PropTypes.bool,
    attributes: PropTypes.object,
    onchange: PropTypes.func,
}

export default index
