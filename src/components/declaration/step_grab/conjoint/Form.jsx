import React from 'react'
import { injectIntl } from 'react-intl'
import { Grid } from '@material-ui/core'
import PropTypes from 'prop-types'
import setListInput from './ListInput'
import SelectList from '../../../ui/select'
import DateField from '../../../ui/datePicker'
import InputText from '../../../ui/input'
import Phone from '../../../ui/phone'

/**
 *
 *
 * @param {*} {
 *     allReferenciels,
 *     intl,
 *     payload,
 *     isError,
 *     isExist,
 *     errorsList,
 *     disabled,
 *     onChangeNumberTel,
 *     lng,
 *     fieldChangedHandler,
 * }
 * @returns
 */
const Form = ({
    allReferenciels,
    intl,
    payload,
    isError,
    isExist,
    errorsList,
    disabled,
    onChangeNumberTel,
    lng,
    fieldChangedHandler,
}) => {
    // declaration des attributs
    const code = 'conjoint'
    let listGov = []
    let listCodePostalResidence = []
    let listNatio = []
    let listDelegation = []
    let tunNatioId
    let isTunisian

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
        listDelegation = [...listDelegation, { label: 'أخر', id: 'أخر' }]

        listCodePostalResidence = allReferenciels.referenciels.RefCodePostale.filter(
            e => e.parent && e.parent.id === payload.delegationResidence
        ).map(i => ({
            label: i.intituleAr,
            value: i.id,
            publiable: i.publiable,
        }))
        listCodePostalResidence = [
            ...listCodePostalResidence,
            { label: 'أخر', id: 'أخر' },
        ]

        // listCodePostalResidence = listCodePostalByGov.map(i => ({
        //     label: lng === 'ar' ? i.intituleAr : i.intituleFr,
        //     value: i.id,
        // }))
        // listCodePostalResidence = [
        //     ...listCodePostalResidence,
        //     { label: intl.formatMessage({ id: 'autre' }) },
        // ]

        listNatio = allReferenciels.referenciels.RefNationalite.map(i => {
            if (
                i.intituleFr
                    .toLowerCase()
                    .trim()
                    .indexOf('tun') === 0
            )
                tunNatioId = i.id
            return {
                label: lng === 'ar' ? i.intituleAr : i.intituleFr,
                value: i.id,
            }
        })
        isTunisian = payload.nationalite && payload.nationalite === tunNatioId
    } catch (error) {
        console.log(error)
    }

    /* functions */
    /* render */
    return setListInput(
        intl,
        isTunisian,
        listGov,
        listCodePostalResidence,
        listNatio,
        listDelegation
    ).map(item => {
        if (item)
            if (item.isSelect)
                return (
                    <Grid
                        item
                        key={`${code}_${item.name}`}
                        xs={12}
                        md={item.md}
                        sm={item.sm}
                        className="gridItem"
                    >
                        <SelectList
                            onchange={e => {
                                fieldChangedHandler(e, item.name)
                            }}
                            required={item.required}
                            name={item.name}
                            label={item.label}
                            lng={lng}
                            isExist={isExist}
                            width={item.widh}
                            disabled={disabled}
                            list={item.list}
                            selectedItem={payload[item.name]}
                            errorText={errorsList[item.name]}
                            isError={
                                isError &&
                                Object.keys(errorsList).includes(item.name)
                            }
                            selectAll={false}
                        />
                    </Grid>
                )
            else if (item.isTel)
                return (
                    <Grid
                        item
                        xs={12}
                        md={item.md}
                        sm={item.sm}
                        className="gridItem"
                        key={`${item.name}`}
                    >
                        <Phone
                            onchange={(value, status) => {
                                onChangeNumberTel(value, status)
                            }}
                            name={item.name}
                            label={item.label}
                            lng={lng}
                            defaultValue={payload[item.name]}
                            placeholder={item.placeholder}
                            errorText={errorsList[item.name]}
                            isError={
                                isError &&
                                Object.keys(errorsList).includes(item.name)
                            }
                            required
                            // disabled={declarantExist}
                        />
                    </Grid>
                )
            else if (item.isDate)
                return (
                    <Grid
                        item
                        xs={12}
                        md={item.md}
                        key={`${code}_${item.name}`}
                        sm={item.sm}
                        className="gridItem"
                    >
                        <DateField
                            onchange={e => fieldChangedHandler(e, item.name)}
                            name={item.name}
                            label={item.label}
                            placeholder={item.placeholder}
                            defaultValue={
                                payload[item.name] === undefined
                                    ? null
                                    : payload[item.name]
                            }
                            isArabic={lng === 'ar'}
                            intl={intl}
                            disabled={disabled}
                            errorText={errorsList[item.name]}
                            attributes={{ disableFuture: true }}
                            isError={
                                isError &&
                                Object.keys(errorsList).includes(item.name)
                            }
                            required={item.required}
                        />
                    </Grid>
                )
            else
                return (
                    <Grid
                        item
                        key={`${code}_${item.name}`}
                        xs={12}
                        md={item.md}
                        sm={item.sm}
                        className="gridItem"
                    >
                        <InputText
                            onchange={e => fieldChangedHandler(e, item.name)}
                            name={item.name}
                            label={item.label}
                            lng={lng}
                            defaultValue={payload[item.name]}
                            placeholder={item.placeholder}
                            type={item.type}
                            value={payload[item.name]}
                            errorText={errorsList[item.name]}
                            isError={
                                isError &&
                                Object.keys(errorsList).includes(item.name)
                            }
                            required={item.required}
                        />
                    </Grid>
                )
        return null
    })
}
/**
 *  Inialisation
 */
Form.defaultProps = {
    // listCodePostalByGov: PropTypes.array,
}
/**
 *  declaration des props
 */
Form.propTypes = {
    allReferenciels: PropTypes.object.isRequired,
    onChangeNumberTel: PropTypes.func.isRequired,

    payload: PropTypes.object.isRequired,
    lng: PropTypes.string.isRequired,
    disabled: PropTypes.bool.isRequired,
    intl: PropTypes.object.isRequired,
}

export default injectIntl(Form)
