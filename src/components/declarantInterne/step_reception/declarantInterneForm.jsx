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
 * }
 * @returns
 */
const declarantInterneForm = ({
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
}) => {
    // intialisation des données
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
    let listDelegNaissance = []
    let listCodePostalNaissance = []
    let tunNatioId
    try {
        // fix les listes de réferenctiel
        listGov = allReferenciels.referenciels.RefGouvernorat.map(i => ({
            label: i.intituleAr,
            value: i.id,
        }))
        listGov = [...listGov, { label: 'أخر', id: 'أخر' }]
        // fix les listes de réferenctiel
        listEtablissement = allReferenciels.referenciels.RefEtablissement.filter(
            e => e.parent && e.parent.id === payload.ministere
        ).map(i => ({
            label: i.intituleAr,
            value: i.id,
        }))
        // fix les listes de réferenctiel
        listMinistere = allReferenciels.referenciels.RefMinistere.map(i => ({
            label: i.intituleAr,
            value: i.id,
        }))
        listMinistere = [...listMinistere, { label: 'أخر', id: 'أخر' }]
        // fix les listes de réferenctiel
        listFonction = allReferenciels.referenciels.RefFonction.filter(
            e => e.parent && e.parent.id === payload.categorie
        ).map(i => ({
            label: i.intituleAr,
            value: i.id,
        }))
        listFonction = [...listFonction, { label: 'أخر', id: 'أخر' }]
        // fix les listes de réferenctiel
        listCategorie = allReferenciels.referenciels.RefCategorie.map(i => ({
            label: i.intituleAr,
            value: i.id,
            rang: i.rang,
        }))
        // fix les listes de réferenctiel
        listCategorie = [...listCategorie, { label: 'أخر', id: 'أخر' }]
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
            { label: 'أخر', id: 'أخر' },
        ]
        // fix les listes de réferenctiel
        listCodePostalNaissance = allReferenciels.referenciels.RefCodePostale.filter(
            e => e.parent && e.parent.id === payload.delegationNaissance
        ).map(i => ({
            label: i.intituleAr,
            value: i.id,
        }))
        listCodePostalNaissance = [
            ...listCodePostalNaissance,
            { label: 'أخر', id: 'أخر' },
        ]
        // fix les listes de réferenctiel
        listCodePostalResidence = allReferenciels.referenciels.RefCodePostale.filter(
            e => e.parent && e.parent.id === payload.delegationResidence
        ).map(i => ({
            label: i.intituleAr,
            value: i.id,
        }))
        listCodePostalResidence = [
            ...listCodePostalResidence,
            { label: 'أخر', id: 'أخر' },
        ]
        // fix les listes de réferenctiel
        listDelegNaissance = allReferenciels.referenciels.RefDelegation.filter(
            e => e.parent && e.parent.id === payload.gouvernoratNaissance
        ).map(i => ({
            label: i.intituleAr,
            value: i.id,
        }))
        listDelegNaissance = [
            ...listDelegNaissance,
            { label: 'أخر', id: 'أخر' },
        ]
        // fix les listes de réferenctiel
        listDelegResidence = allReferenciels.referenciels.RefDelegation.filter(
            e => e.parent && e.parent.id === payload.gouvernoratResidence
        ).map(i => ({
            label: i.intituleAr,
            value: i.id,
        }))
        listDelegResidence = [
            ...listDelegResidence,
            { label: 'أخر', id: 'أخر' },
        ]
        // fix les listes de réferenctiel
        listDelegEtablissemnt = allReferenciels.referenciels.RefDelegation.filter(
            e => e.parent && e.parent.id === payload.gouvernoratEtablissement
        ).map(i => ({
            label: i.intituleAr,
            value: i.id,
        }))
        listDelegEtablissemnt = [
            ...listDelegEtablissemnt,
            { label: 'أخر', id: 'أخر' },
        ]
        // fix les listes de réferenctiel
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
        isEditDeclaration,
        listDelegNaissance,
        listCodePostalNaissance
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
                        {/* component select list */}
                        <SelectList
                            onchange={e => {
                                fieldChangedHandler(e, item.name, tunNatioId)
                            }}
                            selectAll={false}
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
                        {/* component autoCoplete */}
                        <Autocomplete
                            onchange={e => {
                                fieldChangedHandler(e, item.name, tunNatioId)
                            }}
                            selectAll={item.selectAll}
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
declarantInterneForm.propTypes = {
    allReferenciels: PropTypes.object.isRequired,
    payload: PropTypes.object.isRequired,
    intl: PropTypes.object.isRequired,
    onChangeNumberTel: PropTypes.func.isRequired,
    setCheck: PropTypes.func.isRequired,
    lng: PropTypes.string.isRequired,
    isExist: PropTypes.bool.isRequired,
    isEditDeclaration: PropTypes.bool.isRequired,
    getDeclarantByCinOrPass: PropTypes.func,
}
export default declarantInterneForm
