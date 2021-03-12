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
import Autocomplete from '../../ui/select/autoComplete'

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
 *     isEditDeclaration,
 *     declarantExist,
 *     ecran,
 * }
 * @returns
 */
const declarationForm = ({
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
    isEditDeclaration,
    declarantExist,
    ecran,
}) => {
    /**
     * hooks numbers
     */
    // إعادة إدخال البيانات
    let listGov = []
    let listCodePostalEtablissemnt = []
    let listCodePostalResidence = []
    let listMinistere = []
    let listCategorie = []
    let listFonction = []
    let listEtablissement = []
    let listDelegEtablissemnt = []
    let listDelegResidence = []
    let listNatio = []
    let tunNatioId

    try {
        listGov = allReferenciels.referenciels.RefGouvernorat.map(i => ({
            label: i.intituleAr,
            value: i.id,
        }))
        listGov = [...listGov, { label: 'أخر...', id: 'أخر' }]

        listEtablissement = allReferenciels.referenciels.RefEtablissement.filter(
            e => e.parent && e.parent.id === payload.ministere
        ).map(i => ({
            label: i.intituleAr,
            value: i.id,
        }))
        listEtablissement = [
            ...listEtablissement,
            { label: 'أخر...', id: 'أخر' },
        ]

        listMinistere = allReferenciels.referenciels.RefMinistere.map(i => ({
            label: i.intituleAr,
            value: i.id,
        }))

        listFonction = allReferenciels.referenciels.RefFonction.filter(
            e => e.parent && e.parent.id === payload.categorie
        ).map(i => ({
            label: i.intituleAr,
            value: i.id,
        }))

        listCategorie = allReferenciels.referenciels.RefCategorie.map(i => ({
            label: i.intituleAr,
            value: i.id,
            rang: i.rang,
        }))
        listCategorie = [...listCategorie]

        listCategorie.sort((a, b) => {
            if (a.rang < b.rang) {
                return -1
            }
            if (a.rang > b.rang) {
                return 1
            }
            return 0
        })

        listCodePostalEtablissemnt = allReferenciels.referenciels.RefCodePostale.filter(
            e => e.parent && e.parent.id === payload.delegationEtablissement
        ).map(i => ({
            label: i.intituleAr,
            value: i.id,
        }))
        listCodePostalEtablissemnt = [
            ...listCodePostalEtablissemnt,
            { label: 'أخر...', id: 'أخر' },
        ]

        listCodePostalResidence = allReferenciels.referenciels.RefCodePostale.filter(
            e => e.parent && e.parent.id === payload.delegationResidence
        ).map(i => ({
            label: i.intituleAr,
            value: i.id,
        }))
        listCodePostalResidence = [
            ...listCodePostalResidence,
            { label: 'أخر...', id: 'أخر' },
        ]

        listDelegResidence = allReferenciels.referenciels.RefDelegation.filter(
            e => e.parent && e.parent.id === payload.gouvernoratResidence
        ).map(i => ({
            label: i.intituleAr,
            value: i.id,
        }))
        listDelegResidence = [
            ...listDelegResidence,
            { label: 'أخر...', id: 'أخر' },
        ]

        listDelegEtablissemnt = allReferenciels.referenciels.RefDelegation.filter(
            e => e.parent && e.parent.id === payload.gouvernoratEtablissement
        ).map(i => ({
            label: i.intituleAr,
            value: i.id,
        }))
        listDelegEtablissemnt = [
            ...listDelegEtablissemnt,
            { label: 'أخر...', id: 'أخر' },
        ]

        listNatio = allReferenciels.referenciels.RefNationalite.map(i => {
            if (
                i.intituleFr
                    .toLowerCase()
                    .trim()
                    .indexOf('tun') === 0
            )
                tunNatioId = i.id
            return {
                label: i.intituleAr,
                value: i.id,
            }
        })
    } catch (error) {
        console.log(error)
    }
    /* functions */

    /* render */
    const ok = true
    return setListInput(
        payload,
        listCategorie,
        listDelegEtablissemnt,
        listDelegResidence,
        listEtablissement,
        listGov,
        tunNatioId,
        listCodePostalResidence,
        listNatio,
        listFonction,
        listMinistere,
        listCodePostalEtablissemnt,
        ecran,
        isEditDeclaration,
        declarantExist
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
                                fieldChangedHandler(e, item.name, tunNatioId)
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
                            disabled={
                                (item.name === 'ministere' &&
                                    ecran === 'addDeclarantAssujetti') ||
                                (item.name === 'etablissement' &&
                                    ecran === 'addDeclarantAssujetti')
                            }
                        />
                        {item.sm === 12 && !item.isCheck && <Divider />}
                    </Grid>
                )
            else if (item.isAutoComplete)
                return (
                    <Grid
                        item
                        xs={12}
                        md={item.md}
                        sm={item.sm}
                        className="gridItem"
                        key={`${item.name}`}
                    >
                        <Autocomplete
                            onchange={e => {
                                fieldChangedHandler(e, item.name, tunNatioId)
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
                            disabled={
                                (item.name === 'ministere' &&
                                    ecran === 'addDeclarantAssujetti') ||
                                (item.name === 'etablissement' &&
                                    ecran === 'addDeclarantAssujetti')
                            }
                        />
                        {/* {item.sm === 12 && !item.isCheck && <Divider />} */}
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
                            // disabled={declarantExist}
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
                            // disabled={
                            //     item.name !== 'dateFinFonction' &&
                            //     declarantExist
                            // }
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
                            // disabled={declarantExist}
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
                            // disabled={
                            //     item.name !== 'numPassport' &&
                            //     (item.name !== 'numCin' && declarantExist)
                            // }
                        />
                        {/* {item.sm === 12 && !item.isCheck && <Divider />} */}
                    </Grid>
                )
        return null
    })
}
/**
 *  declaration des props
 */
declarationForm.propTypes = {
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
    ecran: PropTypes.string,
}
export default declarationForm
