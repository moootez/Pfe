import React, { useEffect, useState } from 'react'
import TextField from '@material-ui/core/TextField'
import PropTypes from 'prop-types'
import FormControl from '@material-ui/core/FormControl'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { makeStyles } from '@material-ui/core'

/**
 * style css
 */
const useStyles = makeStyles({
    noOptions: {
        direction: 'rtl',
        textAlign: 'right',
    },
})

/**
 *
 *
 * @param {*} {
 *     label,
 *     list,
 *     name,
 *     isExist,
 *     onchange,
 *     required,
 *     selectedItem,
 *     selectAll,
 *     isError,
 *     disabled,
 *     errorText,
 *     id,
 *     declarantExist,
 * }
 * @returns
 */
const autoComplete = ({
    label,
    list,
    name,
    isExist,
    onchange,
    required,
    selectedItem,
    selectAll,
    isError,
    disabled,
    errorText,
    id,
    declarantExist,
}) => {
    /**
     * hooks numbers
     */
    const [listOptions, setListOptions] = useState(list)
    const [value, setValue] = useState('')
    const [inputValue, setInputValue] = useState('')
    const styles = useStyles()

    /* life cycle */
    useEffect(() => {
        if (list) {
            setListOptions(list)
            if (selectAll)
                setListOptions([{ label: 'اختيار', value: 0 }, ...list])

            const selectedValue = (selectAll
                ? [{ label: 'اختيار', value: 0 }, ...list]
                : list || []
            ).filter(index => selectedItem === index.value && index.label)

            if (selectedValue.length === 0) {
                setValue('')
                setInputValue('')
            } else {
                setValue(selectedValue[0])
                setInputValue(selectedValue[0])
            }
        }
    }, [list])

    /**
     * change input payload
     *
     * @param {*} event
     * @param {*} option
     */
    const handleChange = (event, option) => {
        setValue(option)

        if (option) onchange({ target: { name, value: option.value } }, id)
    }

    /* life cycle */
    useEffect(() => {
        if (declarantExist === true || isExist === true) {
            const selectedValue = (list || []).filter(
                index => selectedItem === index.value && index.label
            )

            if (selectedValue.length > 0) {
                setValue(selectedValue[0])
                setInputValue(selectedValue[0])
            }
        }
    }, [declarantExist, isExist])

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
            <Autocomplete
                classes={{
                    noOptions: styles.noOptions,
                    option: styles.noOptions,
                }}
                noOptionsText="لا يوجد شيئاً"
                name={name}
                onChange={(e, options) => handleChange(e, options)}
                options={listOptions}
                value={value}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue)
                }}
                getOptionLabel={option => option.label}
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
                style={
                    name === 'typeDeclaration'
                        ? {
                              marginRight: '50%',
                              width: '100%',
                          }
                        : {
                              marginLeft: 8,
                              marginRight: 8,
                              backgroundCwolor: 'white',
                          }
                }
                fullWidth
                renderInput={params => (
                    <TextField
                        {...params}
                        name={name}
                        value={value}
                        error={isError}
                        variant="outlined"
                        style={
                            (name === 'etablissement' ||
                                name === 'nature' ||
                                name === 'societeEmettrice' ||
                                name === 'typeValeur') &&
                            params.publiable === false
                                ? { display: 'none' }
                                : {}
                        }
                        fullWidth
                        helperText={isError && <span>{errorText}</span>}
                    />
                )}
            />
        </FormControl>
    )
}
/**
 *  Inialisation
 */
autoComplete.defaultProps = {
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
    selectAll: false,
    isExist: false,
    declarantExist: null,
}
/**
 *  declaration des props
 */
autoComplete.propTypes = {
    label: PropTypes.string,
    placeholder: PropTypes.string,
    list: PropTypes.array,
    selectedItem: PropTypes.number,
    selectedItemRubrique: PropTypes.number,
    selectedItemSousRubrique: PropTypes.number,
    selectAll: PropTypes.bool,
    onchange: PropTypes.func,
    errorText: PropTypes.string,
    name: PropTypes.string,
    id: PropTypes.number,
    isError: PropTypes.bool,
    disabled: PropTypes.bool,
    isExist: PropTypes.bool,
    required: PropTypes.bool,
    attributes: PropTypes.object,
    declarantExist: PropTypes.object,
}

export default autoComplete
