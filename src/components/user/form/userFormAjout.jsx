import React from 'react'
import { Divider, Grid } from '@material-ui/core'
import PropTypes from 'prop-types'
import setListInput from './setListInput'
import SelectList from '../../ui/select'
import RadioField from '../../ui/radio'
import DateField from '../../ui/datePicker'
import InputText from '../../ui/input'
import Check from '../../ui/checkBox'
import Phone from '../../ui/phone'
import InputFormatted from '../../ui/numberFormat'

/**
 *
 *
 * @param {*} {
 *     allReferenciels,
 *     payload,
 *     isError,
 *     isExist,
 *     errorsList,
 *     fieldChangedHandler,
 *     getDeclarantByCinOrPass,
 *     setCheck,
 *     onChangeNumberTel,
 *     lng,
 *     intl,
 *     declarantExist,
 *     allRoles,
 * }
 * @returns
 */
const userFormAjout = ({
    allReferenciels,
    payload,
    isError,
    isExist,
    errorsList,
    fieldChangedHandler,
    getDeclarantByCinOrPass,
    setCheck,
    onChangeNumberTel,
    lng,
    intl,
    declarantExist,
    allRoles,
}) => {
    /**
     * inialisation des listes
     */
    let listGov = []
    let listCodePostalResidence = []
    let listDelegResidence = []
    let listRoles = []

    try {
        listRoles = allRoles.map(i => ({
            label: i.role,
            value: i.id,
        }))

        listGov = allReferenciels.referenciels.RefGouvernorat.map(i => ({
            label:
                lng === 'ar'
                    ? i.intituleAr
                    : lng === 'fr'
                    ? i.intituleFr
                    : i.intituleEn,
            value: i.id,
        }))

        listDelegResidence = allReferenciels.referenciels.RefDelegation.filter(
            e => e.parent && e.parent.id === payload.gouvernoratResidence
        ).map(i => ({
            label:
                lng === 'ar'
                    ? i.intituleAr
                    : lng === 'fr'
                    ? i.intituleFr
                    : i.intituleEn,
            value: i.id,
        }))

        listCodePostalResidence = allReferenciels.referenciels.RefCodePostale.filter(
            e => e.parent && e.parent.id === payload.delegationResidence
        ).map(i => ({
            label:
                lng === 'ar'
                    ? i.intituleAr
                    : lng === 'fr'
                    ? i.intituleFr
                    : i.intituleEn,
            value: i.id,
        }))
        // listCodePostalResidence = [
        //     ...listCodePostalResidence,
        //     { label: 'أخر', id: 'أخر' },
        // ]
    } catch (error) {
        console.log(error)
    }
    /* functions */

    /* render */

    const ok = true
    return setListInput(
        intl,
        listDelegResidence,
        listGov,
        listCodePostalResidence,
        listRoles
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
                        key={`${item.name}`}
                    >
                        <SelectList
                            onchange={e => {
                                fieldChangedHandler(e, item.name, null)
                            }}
                            required={item.required}
                            name={item.name}
                            label={item.label}
                            isExist={isExist}
                            lng={lng}
                            width={item.widh}
                            list={item.list}
                            selectedItem={payload[item.name]}
                            errorText={errorsList[item.name]}
                            isError={
                                isError &&
                                Object.keys(errorsList).includes(item.name)
                            }
                            declarantExist={declarantExist}
                            selectAll={item.selectAll}
                        />
                        {item.sm === 12 && !item.isCheck && <Divider />}
                    </Grid>
                )
            else if (item.isRadio)
                return (
                    <Grid
                        item
                        xs={12}
                        md={item.md}
                        sm={item.sm}
                        className="gridItem"
                        key={`${item.name}`}
                    >
                        <RadioField
                            onchange={e => {
                                fieldChangedHandler(e, item.name)
                            }}
                            name={item.name}
                            label={item.label}
                            list={item.list}
                            lng={lng}
                            chosenItem={payload[item.name]}
                            errorText={errorsList[item.name]}
                            isError={
                                isError &&
                                Object.keys(errorsList).includes(item.name)
                            }
                        />
                        {item.sm === 12 && !item.isCheck && <Divider />}
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
                        key={`${item.name}`}
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
                            isArabic={ok}
                            lng={lng}
                            intl={intl}
                            attributes={{ disableFuture: true }}
                            errorText={errorsList[item.name]}
                            isError={
                                isError &&
                                Object.keys(errorsList).includes(item.name)
                            }
                            required={item.required}
                        />
                        {item.sm === 12 && !item.isCheck && <Divider />}
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
                        />
                        {item.sm === 12 && !item.isCheck && <Divider />}
                    </Grid>
                )
            else if (item.isCheck)
                return (
                    <Grid
                        item
                        xs={12}
                        sm={item.sm}
                        className="gridItem"
                        style={{ marginTop: '15px' }}
                        key={`${item.name}`}
                    >
                        <Check
                            label={item.label}
                            name={item.name}
                            onchange={(name, checked) =>
                                setCheck(name, checked)
                            }
                        />
                        {item.sm === 12 && !item.isCheck && <Divider />}
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
                    >
                        <InputFormatted
                            onchange={(e, index) =>
                                fieldChangedHandler(e, index)
                            }
                            required={item.required}
                            name={item.name}
                            label={item.label}
                            lng={lng}
                            width={item.widh}
                            list={item.list}
                            selectedItem={payload[item.name]}
                            errorText={
                                errorsList[item.name] !== undefined
                                    ? errorsList[item.name]
                                    : ''
                            }
                            defaultValue={payload[item.name]}
                            isError={
                                isError &&
                                Object.keys(errorsList).includes(item.name)
                            }
                            selectAll={false}
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
                        key={`${item.name}`}
                    >
                        <InputText
                            onchange={e => fieldChangedHandler(e, item.name)}
                            name={item.name}
                            label={item.label}
                            getDeclarantByCinOrPass={getDeclarantByCinOrPass}
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
                        {item.sm === 12 && !item.isCheck && <Divider />}
                    </Grid>
                )
        return null
    })
}
/**
 *  declaration des props
 */
userFormAjout.propTypes = {
    allReferenciels: PropTypes.object.isRequired,
    payload: PropTypes.object.isRequired,
    declarantExist: PropTypes.object,
    intl: PropTypes.object.isRequired,
    onChangeNumberTel: PropTypes.func.isRequired,
    setCheck: PropTypes.func.isRequired,
    lng: PropTypes.string.isRequired,
    isExist: PropTypes.bool.isRequired,
    isEditDeclaration: PropTypes.bool.isRequired,
    getDeclarantByCinOrPass: PropTypes.func,
    allRoles: PropTypes.object,
}
export default userFormAjout
