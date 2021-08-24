import React, { Fragment, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Grid } from '@material-ui/core'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import editReferencialActions from '../../redux/referencial/editReferencial'
import addNewReferencialActions from '../../redux/referencial/addNewReferencial'
import alertActions from '../../redux/alert'
import ReferencialAr from '../../translations/referentiel.json'
import InputText from '../../components/ui/input'
import PageTitle from '../../components/ui/pageTitle'
import ButtonComponent from '../../components/ui/button'
import SelectList from '../../components/ui/selectListRef'
import Data from '../../data/dataDeclaration.json'
import generateKey, { renameKeys } from '../../shared/utility'
import Check from '../../components/ui/checkBox'
/* style */
const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
        padding: '20px',
    },
}))

/**
 *
 *
 * @param {*} {
 *     history,
 *     location,
 *     editReferenceRequest,
 *     addNewReferenceRequest,
 *     referencial,
 *     responseAdd,
 *     alertShow,
 *     categorie,
 *     responseEdit,
 * }
 * @returns
 */
const OperationReferencial = ({
    history,
    location,
    editReferenceRequest,
    addNewReferenceRequest,
    referencial,
    responseAdd,
    alertShow,
    categorie,
    responseEdit,
}) => {
    /* hook memeber */
    const classes = useStyles()
    const typeComponent = history.location.pathname
    const ok = true
    const no = false
    const [inputs, setInputts] = useState(location.state.listInputs)
    const [isError, setIsError] = useState(false)

    // handling data from addError
    const errorsListAdd =
        responseAdd && responseAdd.data.status === 'error'
            ? responseAdd.data.data
            : {}
    // handling data from editError
    const errorsListEdit =
        responseEdit && responseEdit.data.status === 'error'
            ? responseEdit.data.data
            : {}
    // test errorList by typeComponent
    const errorsList =
        typeComponent.indexOf('edit') === -1 ? errorsListAdd : errorsListEdit

    const isDelegation = location.state.categorie === 'RefDelegation'
    const isCodePostal = location.state.categorie === 'RefCodePostale'
    const isEtablissement = location.state.categorie === 'RefEtablissement'
    const isFonction = location.state.categorie === 'RefFonction'
    const isSujet = location.state.categorie === 'RefSujet'

    let payload =
        typeComponent.indexOf('edit') !== -1
            ? JSON.parse(JSON.stringify(history.location.state.values))
            : []
    /* life cycle */

    // useEffect(() => {
    //     if (localStorage.countlogin > 1) {
    //         history.push('/dashboard')
    //     }
    // }, [])
    useEffect(() => {
        console.log('count changed', responseAdd)
        const isErrorExist = !!(
            typeComponent.indexOf('edit') === -1 &&
            !!responseAdd &&
            responseAdd.data.status === 'error' &&
            location.state.categorie === categorie
        )
        setIsError(isErrorExist)
    }, [responseAdd])

    const [selectedValue, setSelectedValue] = useState(payload.assujettie)

    const title =
        typeComponent.indexOf('edit') === -1
            ? ' إضافة مستودع  '
            : 'تعديل مستودع '

    /* life cycle */
    useEffect(() => {
        console.log('count changed', responseAdd)
        const isErrorExist = !!(
            typeComponent.indexOf('edit') === -1 &&
            !!responseAdd &&
            responseAdd.data.status === 'error' &&
            location.state.categorie === categorie
        )
        setIsError(isErrorExist)
    }, [responseAdd])
    /* life cycle */
    useEffect(() => {
        console.log('count changed', responseEdit)
        const isErrorExist = !!(
            typeComponent.indexOf('edit') !== -1 &&
            !!responseEdit &&
            responseEdit.data.status === 'error' &&
            location.state.categorie === categorie
        )
        setIsError(isErrorExist)
    }, [responseEdit])
    /* life cycle */
    useEffect(() => {
        if (typeComponent.indexOf('edit') !== -1) {
            if (typeof payload.parent !== 'undefined') {
                payload.parent = { id: payload.parent.id }
            }
            try {
                if (typeof location.state.listInputs === 'undefined') {
                    history.push('/referencial')
                }
            } catch (err) {
                history.push('/referencial')
            }
        } else
            try {
                if (typeof location.state.listInputs === 'undefined') {
                    history.push('/referencial')
                }
                location.state.listInputs.map(e => {
                    if (e !== 'id' && e !== 'children') {
                        payload.push(e)
                    }
                    return false
                })

                payload.push({ categorie: '' })
                payload = renameKeys(payload)
            } catch (err) {
                history.push('/referencial')
            }
        if (location.state.listInputs.length === 0)
            setInputts(['intituleFr', 'intituleAr', 'intituleEn'])
    }, [])

    /* functions */

    /**
     * set payload
     *
     * @param {*} { target: { name, value } }
     */
    const fileChangedHandler = ({ target: { name, value } }) => {
        payload[name] = value
    }

    /**
     * edit referenctiel
     *
     */
    const editReferencial = () => {
        payload.categorie = location.state.categorie
        payload.id = location.state.id
        payload.assujettie = selectedValue
        if (
            (payload.parent === undefined && isEtablissement) ||
            (payload.parent && payload.parent.id === '' && isEtablissement)
        ) {
            alertShow(true, {
                warning: false,
                info: false,
                error: true,
                success: false,
                message: 'الرجاء إختيار الوزارة',
            })
        } else if (
            (payload.parent === undefined && isDelegation) ||
            (payload.parent && payload.parent.id === '' && isDelegation)
        ) {
            alertShow(true, {
                warning: false,
                info: false,
                error: true,
                success: false,
                message: 'الرجاء إختيار الولاية',
            })
        } else if (
            (payload.parent === undefined && isCodePostal) ||
            (payload.parent && payload.parent.id === '' && isCodePostal)
        ) {
            alertShow(true, {
                warning: false,
                info: false,
                error: true,
                success: false,
                message: 'الرجاء إختيار المعتمدية',
            })
        } else if (
            (payload.parent === undefined && isFonction) ||
            (payload.parent && payload.parent.id === '' && isFonction)
        ) {
            alertShow(true, {
                warning: false,
                info: false,
                error: true,
                success: false,
                message: 'الرجاء إختيار الصفة الموجبة للتصريح',
            })
        } else if (
            (payload.parent === undefined && isSujet) ||
            (payload.parent && payload.parent.id === '' && isSujet)
        ) {
            alertShow(true, {
                warning: false,
                info: false,
                error: true,
                success: false,
                message: 'الرجاء إختيار الصفة الموجبة للتصريح',
            })
        } else editReferenceRequest(payload)
    }

    /**
     * add referenciel
     *
     */
    const addReferencial = () => {
        payload.categorie = location.state.categorie
        payload.publiable = true
        if (
            (payload.parent === undefined && isEtablissement) ||
            (payload.parent && payload.parent.id === '' && isEtablissement)
        ) {
            alertShow(true, {
                warning: false,
                info: false,
                error: true,
                success: false,
                message: 'الرجاء إختيار الوزارة',
            })
        } else if (
            (payload.parent === undefined && isDelegation) ||
            (payload.parent && payload.parent.id === '' && isDelegation)
        ) {
            alertShow(true, {
                warning: false,
                info: false,
                error: true,
                success: false,
                message: 'الرجاء إختيار الولاية',
            })
        } else if (
            (payload.parent === undefined && isCodePostal) ||
            (payload.parent && payload.parent.id === '' && isCodePostal)
        ) {
            alertShow(true, {
                warning: false,
                info: false,
                error: true,
                success: false,
                message: 'الرجاء إختيار المعتمدية',
            })
        } else if (
            (payload.parent === undefined && isFonction) ||
            (payload.parent && payload.parent.id === '' && isFonction)
        ) {
            alertShow(true, {
                warning: false,
                info: false,
                error: true,
                success: false,
                message: 'الرجاء إختيار الصفة الموجبة للتصريح',
            })
        } else if (
            (payload.parent === undefined && isSujet) ||
            (payload.parent && payload.parent.id === '' && isSujet)
        ) {
            alertShow(true, {
                warning: false,
                info: false,
                error: true,
                success: false,
                message: 'الرجاء إختيار الصفة الموجبة للتصريح',
            })
        } else addNewReferenceRequest(payload)
    }

    /**
     * set selected categorie
     *
     * @param {*} reff
     */
    const selectCategorie = reff => {
        payload.parent = { id: reff }
    }

    /**
     * set check assujetti
     *
     * @param {*} name
     * @param {*} checked
     */
    const /**
         * check radio bouton
         *
         * @memberof
         */
        setCheck = (name, checked) => {
            if (typeComponent.indexOf('edit') !== -1) setSelectedValue(checked)
            payload.assujettie = checked
        }

    if (typeof location.state === 'undefined') {
        return <div />
    }
    /* render */
    return (
        <div className={classes.root}>
            <PageTitle
                label={`${title} ${
                    ReferencialAr.transaltion[location.state.categorie]
                        ? ReferencialAr.transaltion[location.state.categorie]
                        : ''
                }`}
            />
            <Grid container spacing={3}>
                {inputs.map(item => {
                    if (
                        item !== 'id' &&
                        item !== 'parent' &&
                        item !== 'ministere' &&
                        item !== 'publiable' &&
                        item !== 'assujettie'
                    ) {
                        return (
                            <Grid item xs={12} sm={6} key={generateKey()}>
                                <InputText
                                    label={Data.listInputHeaders[item]}
                                    onchange={fileChangedHandler}
                                    type="text"
                                    placeholder={
                                        typeComponent.indexOf('edit') !== -1
                                            ? location.state.values[item]
                                            : `أدخل ${Data.listInputHeaders[item]}`
                                    }
                                    errorText={
                                        errorsList[item] !== undefined
                                            ? errorsList[item].ar
                                            : ''
                                    }
                                    name={item}
                                    defaultValue={
                                        typeComponent.indexOf('edit') !== -1
                                            ? location.state.values[item]
                                            : ''
                                    }
                                    isError={isError}
                                />
                            </Grid>
                        )
                    }
                    return null
                })}
                {isDelegation && (
                    <Grid inputName xs={12} sm={6} style={{ marginTop: '2vh' }}>
                        <SelectList
                            reff={ok}
                            required={no}
                            placeholder={
                                typeComponent.indexOf('edit') !== -1
                                    ? payload.parent.id
                                    : 0
                            }
                            label="الولاية"
                            list={referencial.referenciels.RefGouvernorat}
                            onchange={c => selectCategorie(c)}
                            noDefaultValue={no}
                            selectedVal={
                                typeComponent.indexOf('edit') !== -1
                                    ? payload.parent && payload.parent.id
                                    : 0
                            }
                        />
                    </Grid>
                )}
                {isCodePostal && (
                    <Grid inputName xs={12} sm={6} style={{ marginTop: '2vh' }}>
                        <SelectList
                            reff={ok}
                            required={no}
                            label="المعتمدية"
                            list={referencial.referenciels.RefDelegation}
                            onchange={c => selectCategorie(c)}
                            noDefaultValue={no}
                            selectedVal={
                                typeComponent.indexOf('edit') !== -1
                                    ? payload.parent && payload.parent.id
                                    : 0
                            }
                        />
                    </Grid>
                )}
                {isEtablissement && (
                    <Fragment>
                        <Grid
                            inputName
                            xs={6}
                            sm={6}
                            style={{ marginTop: '2vh' }}
                        >
                            <SelectList
                                reff={ok}
                                required
                                label="الوزارة"
                                list={referencial.referenciels.RefMinistere}
                                onchange={c => selectCategorie(c)}
                                noDefaultValue={no}
                                selectedVal={
                                    typeComponent.indexOf('edit') !== -1
                                        ? payload.parent && payload.parent.id
                                        : 0
                                }
                            />
                        </Grid>
                        <Grid
                            inputName
                            xs={6}
                            sm={6}
                            style={{ marginTop: '7vh' }}
                        >
                            <Check
                                label="خاضعة لواجب التصريح"
                                name="خاضعة لواجب التصريح"
                                onchange={(name, checked) =>
                                    setCheck(name, checked)
                                }
                                selectedValue={
                                    typeComponent.indexOf('edit') !== -1
                                        ? selectedValue === true
                                            ? 1
                                            : 0
                                        : payload.assujettie === true
                                        ? 1
                                        : 0
                                }
                            />
                        </Grid>
                    </Fragment>
                )}
                {isFonction && (
                    <Grid inputName xs={12} sm={6} style={{ marginTop: '2vh' }}>
                        <SelectList
                            reff={ok}
                            required
                            label="الصفة الموجبة للتصريح"
                            list={referencial.referenciels.RefCategorie}
                            onchange={c => selectCategorie(c)}
                            noDefaultValue={no}
                            selectedVal={
                                typeComponent.indexOf('edit') !== -1
                                    ? payload.parent && payload.parent.id
                                    : 0
                            }
                        />
                    </Grid>
                )}
                {isSujet && (
                    <Grid inputName xs={12} sm={6} style={{ marginTop: '2vh' }}>
                        <SelectList
                            reff={ok}
                            required
                            label="المحور"
                            list={referencial.referenciels.RefTheme}
                            onchange={c => selectCategorie(c)}
                            noDefaultValue={no}
                            selectedVal={
                                typeComponent.indexOf('edit') !== -1
                                    ? payload.parent && payload.parent.id
                                    : 0
                            }
                        />
                    </Grid>
                )}
            </Grid>
            <div style={{ textAlign: 'center', padding: 20 }}>
                <ButtonComponent
                    color="secondary"
                    type="contained"
                    label="حفظ"
                    clicked={() =>
                        typeComponent.indexOf('edit') !== -1
                            ? editReferencial()
                            : addReferencial()
                    }
                />
                <ButtonComponent
                    color="secondary"
                    type="contained"
                    label="إلغاء"
                    clicked={() => history.push('/referencial')}
                />
            </div>
        </div>
    )
}
// dispatch action

/**
 *
 *
 * @param {*} dispatch
 */
const mapDispatchToProps = dispatch => ({
    editReferenceRequest: payload =>
        dispatch(editReferencialActions.editReferenceRequest(payload)),
    addNewReferenceRequest: payload =>
        dispatch(addNewReferencialActions.addNewReferenceRequest(payload)),
    alertShow: (show, info) =>
        dispatch(
            alertActions.alertShow(show, {
                onConfirm: info.onConfirm,
                warning: info.warning,
                info: info.info,
                error: info.error,
                success: info.success,
                message: info.message,
                title: info.title,
            })
        ),
})
// obtenir les données from  store state
/**
 *
 *
 * @param {*} state
 * @returns
 */
const mapStateToProps = ({ referencial }) => ({
    referencial: referencial.allReferencials.response,
    responseEdit: referencial.editReferencial.response,
    responseAdd: referencial.addNewReferencial.response,
    categorie: referencial.addNewReferencial.categorie,
})
/**
 *  declaration des props
 */
OperationReferencial.propTypes = {
    location: PropTypes.object.isRequired,
    referencial: PropTypes.object.isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
        location: PropTypes.object,
    }).isRequired,
    editReferenceRequest: PropTypes.func.isRequired,
    addNewReferenceRequest: PropTypes.func.isRequired,
    responseAdd: PropTypes.object.isRequired,
    responseEdit: PropTypes.object.isRequired,
    alertShow: PropTypes.func.isRequired,
    categorie: PropTypes.string.isRequired,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OperationReferencial)
