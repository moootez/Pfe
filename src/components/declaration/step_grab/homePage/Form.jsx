import React, { useEffect, useState } from 'react'
import { Grid } from '@material-ui/core'
import PropTypes from 'prop-types'
import setListInput from './ListInput'
import DateField from '../../../ui/datePicker'
import SelectList from '../../../ui/select'
import MultiSelect from '../../../ui/select/multiSelect'
import Autocomplete from '../../../ui/select/autoComplete'

/**
 *
 *
 * @param {*} {
 *     allReferenciels,
 *     intl,
 *     lng,
 *     fieldChangedHandler,
 *     type,
 *     listStatus,
 *     listStatusPublication,
 *     listStatusPublicationDec,
 *     listStatusDeclarant,
 *     listStatusInscription,
 *     payload,
 *     roles,
 *     listStatusCoursDesComptes,
 * }
 * @returns
 */
const Form = ({
    allReferenciels,
    intl,
    lng,
    fieldChangedHandler,
    type,
    listStatus,
    listStatusPublication,
    listStatusPublicationDec,
    listStatusDeclarant,
    listStatusInscription,
    payload,
    roles,
    listStatusCoursDesComptes,
}) => {
    /**
     * hooks numbers
     */
    const [payloadCategorie, setPayloadCategorie] = useState([])
    // life cycle
    useEffect(() => {
        if (payload) {
            setPayloadCategorie(payload.categorie)
        }
    }, [payload])
    /**
     * obtenir parent fonction
     *
     * @param {*} e
     * @returns
     */
    const checkParent = e => {
        const keys = ['parent']
        // eslint-disable-next-line func-names
        return keys.every(function(a) {
            return e[a] && (payload.categorie || []).includes(e[a].id)
        })
    }

    let listCategorie = []
    let listFonction = []
    let listEtablissement = []
    let listMinistere = []
    let listEtablissementFiltred = []
    let listRoles = []
    try {
        if (roles)
            listRoles = roles.map(i => ({
                label: i.role,
                value: i.id,
            }))

        listFonction = allReferenciels.referenciels.RefFonction.filter(
            checkParent
        ).map(i => ({
            label: lng === 'ar' ? i.intituleAr : i.intituleFr,
            value: i.id,
        }))

        listCategorie = allReferenciels.referenciels.RefCategorie.map(i => ({
            label: lng === 'ar' ? i.intituleAr : i.intituleFr,
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

        if (type === 'publication')
            listCategorie = listCategorie.filter(e => e.rang < 9)

        listEtablissement = allReferenciels.referenciels.RefEtablissement.map(
            i => ({
                label: lng === 'ar' ? i.intituleAr : i.intituleFr,
                value: i.id,
            })
        )

        listMinistere = allReferenciels.referenciels.RefMinistere.map(i => ({
            label: lng === 'ar' ? i.intituleAr : i.intituleFr,
            value: i.id,
        }))

        listEtablissementFiltred = allReferenciels.referenciels.RefEtablissement.filter(
            e => e.parent && e.parent.id === payload.ministere
        ).map(i => ({
            label: i.intituleAr,
            value: i.id,
        }))
    } catch (error) {
        console.log(error)
    }
    /* functions */

    /* render */
    return setListInput(
        intl,
        listFonction,
        listCategorie,
        type,
        listStatus,
        listMinistere,
        listEtablissement,
        listStatusPublication,
        listStatusPublicationDec,
        listStatusDeclarant,
        listStatusInscription,
        listEtablissementFiltred,
        listRoles,
        listStatusCoursDesComptes
    ).map(item => {
        if (item)
            if (item.isSelect)
                return (
                    <Grid
                        key={item.name}
                        item
                        xs={12}
                        md={item.md}
                        sm={item.sm}
                        className="gridItem"
                    >
                        <SelectList
                            onchange={e => {
                                fieldChangedHandler(e, item.name)
                            }}
                            selectedItem={payload[item.name]}
                            required={item.required}
                            name={item.name}
                            label={item.label}
                            width={item.widh}
                            list={item.list}
                        />
                    </Grid>
                )
            else if (item.multiple)
                return (
                    <Grid
                        key={item.name}
                        item
                        xs={12}
                        md={item.md}
                        sm={item.sm}
                        className="gridItem"
                    >
                        {item.name === 'fonction' ? (
                            payload.categorie &&
                            payload.categorie === payloadCategorie && (
                                <MultiSelect
                                    onchange={e => {
                                        fieldChangedHandler(e, item.name)
                                    }}
                                    selectedItem={payload[item.name]}
                                    required={item.required}
                                    name={item.name}
                                    label={item.label}
                                    width={item.widh}
                                    list={item.list}
                                />
                            )
                        ) : (
                            <MultiSelect
                                onchange={e => {
                                    fieldChangedHandler(e, item.name)
                                }}
                                selectedItem={payload[item.name]}
                                required={item.required}
                                name={item.name}
                                label={item.label}
                                width={item.widh}
                                list={item.list}
                            />
                        )}
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
                                fieldChangedHandler(e, item.name)
                            }}
                            required={item.required}
                            name={item.name}
                            label={item.label}
                            lng={lng}
                            width={item.widh}
                            list={item.list}
                            type={type}
                            selectedItem={payload[item.name]}
                            selectAll={item.selectAll}
                        />
                        {/* {item.sm === 12 && !item.isCheck && <Divider />} */}
                    </Grid>
                )
            else if (item.isDate)
                return (
                    <Grid
                        key={item.name}
                        item
                        xs={12}
                        md={item.md}
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
                            attributes={{ disableFuture: true }}
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
    listStatus: [],
    listStatusPublication: [],
    listStatusPublicationDec: [],
    listStatusDeclarant: [],
    listStatusInscription: [],
    type: '',
    listStatusCoursDesComptes: [],
}
/**
 *  declaration des props
 */
Form.propTypes = {
    allReferenciels: PropTypes.object.isRequired,
    listStatus: PropTypes.array,
    listStatusPublication: PropTypes.array,
    listStatusDeclarant: PropTypes.array,
    listStatusInscription: PropTypes.array,
    type: PropTypes.string,
    roles: PropTypes.object.isRequired,
    listStatusCoursDesComptes: PropTypes.array,
}

export default Form
