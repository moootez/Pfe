import React from 'react'
import { Grid } from '@material-ui/core'
import PropTypes from 'prop-types'
import setListInput from './ListInputs'
import SelectList from '../../../../ui/select'
import DateField from '../../../../ui/datePicker'
import InputText from '../../../../ui/input'
import InputFormatted from '../../../../ui/numberFormat'

/**
 *
 *
 * @param {*} {
 *     allReferenciels,
 *     intl,
 *     lng,
 *     payload,
 *     isError,
 *     errorsList,
 *     disabled,
 *     id,
 *     // listCodePostalByGov,
 *     fieldChangedHandler,
 * }
 * @returns
 */
const Form = ({
    allReferenciels,
    intl,
    lng,
    payload,
    isError,
    errorsList,
    disabled,
    id,
    // listCodePostalByGov,
    fieldChangedHandler,
}) => {
    const code = 'pro'
    let listGov = []
    let listCodePostalResidence = []
    let listDelegation = []

    try {
        listGov = allReferenciels.referenciels.RefGouvernorat.map(i => ({
            label: lng === 'ar' ? i.intituleAr : i.intituleFr,
            value: i.id,
        }))

        listDelegation = allReferenciels.referenciels.RefDelegation.filter(
            e => e.parent && e.parent.id === payload.gouvernorat
        ).map(i => ({
            label: i.intituleAr,
            value: i.id,
        }))
        listDelegation = [...listDelegation, { label: 'أخر', id: 'أخر' }]

        listCodePostalResidence = allReferenciels.referenciels.RefCodePostale.filter(
            e => e.parent && e.parent.id === payload.delegation
        ).map(i => ({
            label: i.intituleAr,
            value: i.id,
        }))
        listCodePostalResidence = [
            ...listCodePostalResidence,
            { label: 'أخر', id: 'أخر' },
        ]
    } catch (error) {
        console.log(error)
    }

    /* functions */

    /* render */
    const ok = true
    return setListInput(
        intl,
        listGov,
        listCodePostalResidence,
        listDelegation
    ).map(item => {
        if (item)
            if (item.isSelect)
                return (
                    <Grid
                        item
                        xs={12}
                        md={item.md}
                        sm={item.sm}
                        className="gridItem"
                        key={`${code}_${item.name}`}
                    >
                        <SelectList
                            onchange={(e, index) => {
                                fieldChangedHandler(e, index)
                            }}
                            required={item.required}
                            name={item.name}
                            label={item.label}
                            id={id}
                            disabled={disabled}
                            width={item.widh}
                            list={item.list}
                            errorText={
                                errorsList[item.name] !== undefined
                                    ? errorsList[item.name].ar
                                    : ''
                            }
                            selectedItem={payload[item.name]}
                            isError={
                                isError &&
                                Object.keys(errorsList).includes(item.name)
                            }
                            selectAll={false}
                        />
                    </Grid>
                )
            else if (item.isFormatted)
                return (
                    <Grid
                        item
                        xs={12}
                        md={item.md}
                        sm={item.sm}
                        className="gridItem"
                        key={`${code}_${item.name}`}
                    >
                        <InputFormatted
                            onchange={(e, index) =>
                                fieldChangedHandler(e, index)
                            }
                            required={item.required}
                            name={item.name}
                            label={item.label}
                            lng={lng}
                            id={id}
                            disabled={disabled}
                            width={item.widh}
                            list={item.list}
                            selectedItem={payload[item.name]}
                            errorText={
                                errorsList[item.name] !== undefined
                                    ? errorsList[item.name].ar
                                    : ''
                            }
                            defaultValue={payload[item.name]}
                            isError={
                                isError &&
                                Object.keys(errorsList).includes(item.name)
                            }
                        />
                    </Grid>
                )
            else if (item.isDate)
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
                            intl={intl}
                            parent={item.parent}
                            id={id}
                            disabled={disabled}
                            label={item.label}
                            placeholder={item.placeholder}
                            defaultValue={
                                payload[item.name] === undefined
                                    ? null
                                    : payload[item.name]
                            }
                            isArabic={ok}
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
                            selectAll={false}
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
                            onchange={(e, index) =>
                                fieldChangedHandler(e, index)
                            }
                            lng={lng}
                            id={id}
                            name={item.name}
                            label={item.label}
                            placeholder={item.placeholder}
                            type={item.type}
                            errorText={
                                errorsList[item.name] !== undefined
                                    ? errorsList[item.name].ar
                                    : ''
                            }
                            disabled={disabled}
                            defaultValue={payload[item.name]}
                            isError={
                                isError &&
                                Object.keys(errorsList).includes(item.name)
                            }
                            selectAll={false}
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
    allReferenciels: PropTypes.object.isRequired,
    listCodePostalByGov: PropTypes.array.isRequired,
    payload: PropTypes.object.isRequired,
    lng: PropTypes.string.isRequired,
    disabled: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
    intl: PropTypes.object.isRequired,
}

export default Form
