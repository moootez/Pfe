import React from 'react'
import { Grid } from '@material-ui/core'
import PropTypes from 'prop-types'
import setListInput from './ListInput'
import SelectList from '../../../ui/select'
import DateField from '../../../ui/datePicker'
import InputText from '../../../ui/input'

/**
 *
 *
 * @param {*} {
 *     allReferenciels,
 *     intl,
 *     lng,
 *     payload,
 *     isError,
 *     isExist,
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
    isExist,
    errorsList,
    disabled,
    id,
    // listCodePostalByGov,
    fieldChangedHandler,
}) => {
    const code = 'enfant'
    let listGov = []
    let listCodePostalResidence = []
    let listDelegation = []

    try {
        listGov = allReferenciels.referenciels.RefGouvernorat.map(i => ({
            label: lng === 'ar' ? i.intituleAr : i.intituleFr,
            value: i.id,
            publiable: i.publiable,
        }))

        listGov = [...listGov, { label: intl.formatMessage({ id: 'autre' }) }]

        listDelegation = allReferenciels.referenciels.RefDelegation.filter(
            e => e.parent && e.parent.id === payload.gouvernoratResidence
        ).map(i => ({
            label: i.intituleAr,
            value: i.id,
            publiable: i.publiable,
        }))
        listDelegation = [
            ...listDelegation,
            { label: intl.formatMessage({ id: 'autre' }) },
        ]

        listCodePostalResidence = allReferenciels.referenciels.RefCodePostale.filter(
            e => e.parent && e.parent.id === payload.delegationResidence
        ).map(i => ({
            label: i.intituleAr,
            value: i.id,
            publiable: i.publiable,
        }))
        listCodePostalResidence = [
            ...listCodePostalResidence,
            { label: intl.formatMessage({ id: 'autre' }) },
        ]

        // listCodePostalResidence = listCodePostalByGov.map(i => ({
        //     label: lng === 'ar' ? i.intituleAr : i.intituleFr,
        //     value: i.id,
        // }))
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
                            isExist={isExist}
                            disabled={disabled}
                            width={item.widh}
                            list={item.list}
                            selectedItem={payload[item.name]}
                            errorText={
                                errorsList[item.name] !== undefined
                                    ? errorsList[item.name].ar
                                    : ''
                            }
                            isError={
                                isError &&
                                Object.keys(errorsList).includes(item.name)
                            }
                            selectAll={false}
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
                            attributes={{ disableFuture: true }}
                            errorText={
                                errorsList[item.name] !== undefined
                                    ? errorsList[item.name].ar
                                    : ''
                            }
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
                            disabled={disabled}
                            defaultValue={payload[item.name]}
                            errorText={
                                errorsList[item.name] !== undefined
                                    ? errorsList[item.name].ar
                                    : ''
                            }
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
