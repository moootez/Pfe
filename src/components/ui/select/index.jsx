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
 *      isExist,
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
    isExist,
    onchange,
    required,
    selectedItem,
    selectedItemRubrique,
    selectedItemSousRubrique,
    selectAll,
    isError,
    disabled,
    errorText,
    id,
    declarantExist,
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
            <label
                htmlFor="select"
                className={
                    name !== 'typeDeclaration'
                        ? 'mt-3 mr-2 mb-0 ml-2 font-weight-bold text-uppercase text-primary'
                        : null
                }
                style={name === 'typeDeclaration' ? { marginRight: '50%' } : {}}
            >
                {label}
                {required ? <span className="text-danger"> * </span> : ''}
            </label>
            {console.log('disabled', disabled)}
            <TextField
                className="mt-1"
                error={isError}
                direction="rtl"
                disabled={
                    (isExist &&
                        [
                            'fonction',
                            'categorie',
                            'etablissement',
                            'ministere',
                        ].includes(name)) ||
                    disabled
                }
                id="select"
                select
                name={name}
                style={
                    name === 'typeDeclaration'
                        ? {
                              ...style,
                              marginRight: '50%',
                              width: '100%',
                          }
                        : {
                              ...style,
                              marginLeft: 8,
                              marginRight: 8,
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
                        disabled={
                            name === 'typeDeclaration'
                                ? declarantExist === null
                                    ? option.id === 2
                                    : declarantExist === false
                                    ? option.id === 2
                                    : option.id === 1
                                : false
                        }
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
    selectedItemRubrique: 0,
    selectedItemSousRubrique: 0,
    isError: false,
    required: true,
    disabled: false,
    attributes: {},
    errorText: '',
    id: null,
    name: null,
    list: [],
    selectAll: true,
    isExist: false,
    declarantExist: null,
}
/**
 *  declaration des props
 */
index.propTypes = {
    label: PropTypes.string,
    placeholder: PropTypes.string,
    list: PropTypes.array,
    selectedItem: PropTypes.number,
    selectedItemRubrique: PropTypes.number,
    selectedItemSousRubrique: PropTypes.number,
    selectAll: PropTypes.bool,
    errorText: PropTypes.string,
    name: PropTypes.string,
    id: PropTypes.number,
    isError: PropTypes.bool,
    disabled: PropTypes.bool,
    isExist: PropTypes.bool,
    required: PropTypes.bool,
    attributes: PropTypes.object,
    declarantExist: PropTypes.object,
    onchange: PropTypes.func,
}

export default index
