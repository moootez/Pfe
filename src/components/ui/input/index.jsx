import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'

/**
 * style input
 */
const useStyles = makeStyles(theme => ({
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
}))

const arrayOrTest = [
    'intituleFr',
    'intituleEn',
    'partProprietaire',
    'entrepriseEmettrice',
    'marque',
    'numPassport',
    'matriculeFiscale',
    'immatriculation',
    'societeEmettrice',
    'immatriculationFonciere',
    // 'intituleAr',
    'rang',
]

/**
 *
 *
 * @param {*} props
 * @returns
 */
const index = props => {
    const {
        value,
        label,
        placeholder,
        getDeclarantByCinOrPass,
        isExistMatricule,
        type,
        onchange,
        isError,
        errorText,
        defaultValue,
        disabled,
        id,
        attributes,
        required,
        name,
        lng,
    } = props

    /**
     * hooks numbers
     */
    const [inputValue, setInputValue] = useState(defaultValue)
    const [veriftext, setVerifText] = useState(false)
    const classes = useStyles()
    /**
     * pattern email pass
     */
    const verifEmail =
        inputValue !== '' &&
        type === 'email' &&
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    const passw =
        inputValue !== '' &&
        name === 'password' &&
        !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}$/g.test(value)
    const error = isError || verifEmail || veriftext || passw

    return (
        <FormControl className="w-100">
            <label
                htmlFor="input"
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
                error={error}
                className={`${classes.textField} mt-1 `}
                value={
                    name === 'intituleFr' ||
                    name === 'intituleAr' ||
                    name === 'intituleEn'
                        ? inputValue
                        : defaultValue
                }
                accept={type === 'file' && 'application/pdf'}
                placeholder={placeholder}
                id={name}
                margin="normal"
                name={name}
                disabled={disabled}
                variant="outlined"
                inputProps={{
                    autocomplete: 'new-password',
                    form: {
                        autocomplete: 'off',
                    },
                    'aria-label': 'bare',
                }}
                type={type === 'number' ? 'text' : type}
                helperText={isError && <span>{errorText}</span>}
                onChange={e => {
                    if (
                        type === 'text' &&
                        !arrayOrTest.includes(name) &&
                        lng === 'ar' &&
                        !name.includes('adress') &&
                        !name.includes('valeur')
                    ) {
                        onchange(e, id)
                        setInputValue(e.target.value)
                        setVerifText(false)
                    } else if (name === 'valeur') {
                        onchange(e, id)
                        setInputValue(e.target.value)
                        setVerifText(false)
                    } else if (name === 'intituleFr' || name === 'intituleEn') {
                        if (
                            /^[ a-z0-9._,@$%&'"àáâæçèéêëìíîïœùúû.-]+$/i.test(
                                e.target.value
                            ) ||
                            e.target.value === ''
                        ) {
                            onchange(e, id)
                            setInputValue(e.target.value)
                            setVerifText(false)
                        } else setVerifText(true)
                    } else if (name.includes('adress')) {
                        if (
                            /^[\u0621-\u064A0-9 ]+$/g.test(e.target.value) ||
                            e.target.value === ''
                        ) {
                            onchange(e, id)
                            setInputValue(e.target.value)
                            setVerifText(false)
                        } else setVerifText(true)
                    } else if (
                        name === 'password' ||
                        name === 'confirmerPassword'
                    ) {
                        if (
                            /^[a-z0-9]+$/i.test(e.target.value) ||
                            e.target.value === ''
                        ) {
                            onchange(e, id)
                            setInputValue(e.target.value)
                        }
                    } else if (name === 'pin' || name === 'confimerPin') {
                        if (
                            /^[0-9]+$/i.test(e.target.value) ||
                            e.target.value === ''
                        ) {
                            onchange(e, id)
                            setInputValue(e.target.value)
                        }
                    } else {
                        onchange(e, id, type === 'file' && e.target.files[0])
                        setInputValue(e.target.value)
                    }
                }}
                onBlur={e => {
                    if (
                        (name === 'numCin' ||
                            name === 'numPassport' ||
                            name === 'num_cin' ||
                            name === 'num_passport') &&
                        e.target.value !== '' &&
                        getDeclarantByCinOrPass
                    ) {
                        getDeclarantByCinOrPass({ number: value })
                    }

                    if (name === 'immatriculation' && e.target.value !== '')
                        isExistMatricule({
                            immatriculation: e.target.value,
                        })
                }}
                onInput={e => {
                    if (
                        e.target.value.length > 0 &&
                        (name === 'numCin' || name === 'num_cin')
                    ) {
                        e.target.value = e.target.value.toString().slice(0, 8)
                    }
                }}
                onKeyPress={e => {
                    if (type === 'number') {
                        const charCode = e.which ? e.which : e.keyCode
                        if (charCode < 48 || charCode > 57) e.preventDefault()
                    }
                }}
                {...attributes}
            ></TextField>

            {!errorText && passw && (
                <span
                    style={{
                        color: 'red',
                        fontSize: '13px',
                        marginRight: '15px',
                    }}
                >
                    حقل لا يقل عن 10 أحرف. يجب أن يكون مزيجًا من الأحرف الكبيرة
                    والصغيرة{' '}
                </span>
            )}
            {!errorText && verifEmail && (
                <span
                    style={{
                        color: 'red',
                        fontSize: '13px',
                        marginRight: '15px',
                    }}
                >
                    البريد الالكتروني غير صحيح{' '}
                </span>
            )}

            {!errorText && veriftext && (
                <span
                    style={{
                        color: 'red',
                        fontSize: '13px',
                        marginRight: '15px',
                    }}
                >
                    {name === 'intituleFr'
                        ? 'الرجاء إدخال نص بالفرنسية'
                        : name === 'intituleEn'
                        ? 'الرجاء إدخال نص بالأنجليزية'
                        : 'الرجاء إدخال نص بالعربية'}
                </span>
            )}
        </FormControl>
    )
}
/**
 *  Inialisation
 */
index.defaultProps = {
    value: '',
    label: '',
    defaultValue: '',
    placeholder: '',
    type: 'text',
    isError: false,
    required: true,
    disabled: false,
    id: null,
    errorText: '',
    lng: 'ar',
    attributes: {},
    isExistMatricule: () => {},
    onchange: () => {},
    getDeclarantByCinOrPass: () => {},
}
/**
 *  declaration des props
 */
index.propTypes = {
    value: PropTypes.string,
    id: PropTypes.number,
    lng: PropTypes.string,
    isError: PropTypes.bool,
    required: PropTypes.bool,
    label: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    defaultValue: PropTypes.string,
    placeholder: PropTypes.string,
    onchange: PropTypes.func,
    getDeclarantByCinOrPass: PropTypes.func,
    isExistMatricule: PropTypes.func,
    errorText: PropTypes.string,
    attributes: PropTypes.object,
}
export default index
