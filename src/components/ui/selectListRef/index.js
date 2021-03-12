import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import PropTypes from 'prop-types'
import FormControl from '@material-ui/core/FormControl'
import { MenuItem } from '@material-ui/core'
import { FormattedMessage } from 'react-intl'

/**
 * select liste pour referentiel
 *
 * @param {*} {
 *     list,
 *     required,
 *     label,
 *     reff,
 *     selectedVal,
 *     selectAll,
 *     errorText,
 *     isError,
 *     attributes,
 *     onchange,
 *     placeholder,
 *     noChooseItem,
 * }
 * @returns
 */
const index = ({
    list,
    required,
    label,
    reff,
    selectedVal,
    selectAll,
    errorText,
    isError,
    attributes,
    onchange,
    placeholder,
    noChooseItem,
}) => {
    /**
     * hooks numbers
     */
    const [selectedValue, setSelectedValue] = useState(selectedVal)
    const handleChange = ({ target: { value } }) => {
        onchange(value)
        setSelectedValue(value)
    }

    // render
    return (
        <FormControl direction="rtl" className="w-100">
            <label
                htmlFor="selectref"
                className="mt-3 mr-2 mb-0 ml-2 font-weight-bold text-uppercase text-primary"
            >
                {label}
                {required && !attributes.disabled ? (
                    <span className="text-danger"> * </span>
                ) : (
                    ''
                )}
            </label>
            <TextField
                className="mt-1"
                error={isError}
                id="selectref"
                select
                style={{ marginLeft: 8, marginRight: 8 }}
                value={selectedValue || placeholder}
                onChange={e => handleChange(e)}
                margin="normal"
                variant="outlined"
                helperText={isError && <span>{errorText}</span>}
                {...attributes}
            >
                {!noChooseItem &&
                    (selectAll ? (
                        <MenuItem dir="rtl" key={0} value={0}>
                            <FormattedMessage id="all" />
                        </MenuItem>
                    ) : (
                        <MenuItem key="" value="">
                            اختيار
                        </MenuItem>
                    ))}
                {(list || []).map(item => {
                    if (!reff)
                        return (
                            <MenuItem dir="rtl" key={item} value={item}>
                                {item}
                            </MenuItem>
                        )
                    return (
                        <MenuItem key={item} value={item.id}>
                            {item.intituleAr}
                        </MenuItem>
                    )
                })}
            </TextField>
        </FormControl>
    )
}
/**
 *  Inialisation
 */
index.defaultProps = {
    list: [],
    required: true,
    label: '',
    reff: false,
    selectedVal: 0,
    selectAll: false,
    errorText: '',
    isError: false,
    attributes: {},
    onchange: () => {},
    placeholder: 0,
    noChooseItem: false,
}
/**
 *  declaration des props
 */
index.propTypes = {
    label: PropTypes.string,
    list: PropTypes.array,
    selectedVal: PropTypes.number,
    selectAll: PropTypes.bool,
    onchange: PropTypes.func,
    errorText: PropTypes.string,
    isError: PropTypes.bool,
    reff: PropTypes.bool,
    required: PropTypes.bool,
    attributes: PropTypes.object,
    placeholder: PropTypes.number,
    noChooseItem: PropTypes.bool,
}

export default index
