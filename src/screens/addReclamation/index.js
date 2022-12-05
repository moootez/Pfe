/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
/* eslint-disable radix */
/* eslint-disable */
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { Grid, Divider } from '@material-ui/core'
import Select from '@material-ui/core/Select'
// import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Input from '@material-ui/core/Input'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import ListItemText from '@material-ui/core/ListItemText'
import PropTypes from 'prop-types'
import getCommandes from '../../redux/statistique/getStatistique'
import getAllLivraisons from '../../redux/referencial/getAllReferencial'
import addReclamationActions from '../../redux/reclamation/newReclamation'
import PageTitle from '../../components/ui/pageTitle'
import Button from '../../components/ui/button'
import alertActions from '../../redux/alert'
import Table from '../../components/ui/table'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import axios from 'axios'
import baseUrl from '../../serveur/baseUrl'
import getAllProductActions from '../../redux/commande/getAllProduct'
import DateField from '../../components/ui/datePicker'
import getReclamationLignes from '../../redux/reclamation/getReclamationLigne'
import Immutable from 'seamless-immutable'
import { async } from 'q'

const natureReclamation = [
    'Périmé',
    'Abimé',
    'Étui cabossé',
    'Date proche',
    'Étanchéité',
    'Autres',
]

const motifReclamation = ['Mineur', 'Majeur', 'Critique']

const Index = props => {
    const {
        alertShow,
        addReclamation,
        userID,
        getAllLivraison,
        lng,
        commandes,
        getCommande,
        newReclamation,
        history,
        getAllProduct,
        products,
        userNamePre,
        getReclamationLigne,
        reclamationDetails
    } = props
    const { OpaliaToken } = window.localStorage

    const [reclamation, setReclamation] = useState({})
    const [errorsList, setErrorsList] = useState({})
    const [isError, setIsError] = useState(false)
    const fileteredCommandes = []
    const [rows, setRows] = useState([])
    const [meta, setMeta] = useState([])
    const [isEdited, setIsEdited] = useState(false)
    const [index, setIndex] = useState(0)
    const [listLot, setListLot] = useState([])
    const [listBl, setListBl] = useState([])
    const [show, setShow] = useState(false)

    useEffect(() => {
        getAllProduct()
    }, [])


    useEffect(() => {
        if (reclamationDetails) {
            setReclamation(reclamationDetails)
            setRows(Immutable.asMutable(reclamationDetails))
        }
    }, [reclamationDetails])

    useEffect(() => {
        if (history.location.state !== undefined) {
            getReclamationLigne({ id: history.location.state.index.id })
        }
    }, [history.location.state])

    useEffect(() => {
        if (reclamation.article)
            axios({
                method: 'get',
                url: `${baseUrl}reclamation/${userID}/${reclamation.article}`,
                headers: {
                    'Accept-Version': 1,
                    Accept: 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json; charset=utf-8',
                    Authorization: `Bearer ${OpaliaToken}`,
                },
                timeout: 30000,
            }).then(res => {
                setShow(true)
                setListLot(res.data.lot)
                setListBl(res.data.bl)
                // const listUser = []
                // res.data.data.map(e => {
                //     return listUser.push({
                //         label: e.codeInsc,
                //         value: e.id,
                //         codeInsc: e.codeInsc,
                //     })
                // })
                // setList(listUser)
            })
    }, [reclamation.article])

    let errorredirect = null

    useEffect(() => {
        if (props.newReclamation.error === true) {
            errorredirect = false
            try {
                Object.keys(props.newReclamation.response.data.data).forEach(
                    key => {
                        const item =
                            props.newReclamation.response.data.data[key]
                        if (item) {
                            const errorText = item.fr
                            errorsList[key] = errorText
                        }
                    }
                )
            } catch (e) {
                console.log(e)
            }
            setIsError(true)
            setErrorsList(errorsList)
        } else if (errorredirect) {
            // if (errorredirect === false) {
            setTimeout(() => history.push('/mes-reclamation'), 1000)
            //  }
            errorredirect = true
        }
    }, [newReclamation.loading])

    function removeObjectWithNumRec(arr, idRec) {

        const objWithIdIndex = arr.findIndex(
            obj => parseInt(obj.NumReclamation) === parseInt(idRec)
        )
        let result = [];
        if (objWithIdIndex > -1) {
            // arr = [...Immutable.asMutable(arr).slice(0, objWithIdIndex), ...Immutable.asMutable(arr).slice(objWithIdIndex + 1)]
            result = [...Immutable.asMutable(arr).slice(0, objWithIdIndex), ...Immutable.asMutable(arr).slice(objWithIdIndex + 1)]
        }

        return result
    }

    const deleteRef = (itemlm, key) => {

        const newArr = removeObjectWithNumRec(rows, parseInt(itemlm.NumReclamation))

        if (isEdited)
            return newArr;
        else
            setRows(newArr)
        // setIndex(index - 1)
        // setPayload([...newArr]);
    }

    const submitReclamation = () => {

        const newPayload = {
            // client: userID,
            NumReclamation: parseInt(reclamation.NumReclamation) || index + 1,
            motif: reclamation.motif,
            article: reclamation.article,
            code_Pct: reclamation.code_Pct,
            quantite: reclamation.quantite || 0,
            num_Lot: reclamation.num_Lot,
            num_Bl: reclamation.num_Bl,
            date_Peremption: reclamation.date_Peremption,
            num_Fact: 'Num Fact',
            commentaire: reclamation.commentaire,
            id: reclamation.id || null,
            quantite_Valide: reclamation.quantite_Valide || 0,
        }

        if (newPayload.quantite <= 0) {
            alertShow(true, {
                warning: false,
                info: false,
                error: true,
                success: false,
                message: 'Quantité négative ',
            })
        } else {
            if (isEdited) {
                setRows([...deleteRef(reclamation), newPayload])
            }
            else {
                setRows([...rows, newPayload])
                setIndex(index + 1)
            }
            setReclamation({})
            setLots([])
            setBls([])
            setIndex(index + 1)
            setIsEdited(false)
        }
    }

    const [lots, setLots] = useState([])
    const [bls, setBls] = useState([])
    const changeHandler = (name, e) => {
        const { value } = e.target
        if (name === 'article') {
            setShow(false)
            let listFiltred = products.filter(
                element => element.codeArticleX3 === value
            )
            setReclamation(r => ({ ...r, code_Pct: listFiltred[0].codePct }))
        }
        setReclamation(r => ({ ...r, [name]: value }))
    }

    const changeHandlerBl = (name, e) => {
        const { value } = e.target
        setBls([...bls, value])
        setReclamation(r => ({ ...r, [name]: [...bls, value] }))
    }

    const changeHandlerLot = (name, e) => {
        const { value } = e.target
        setLots([...lots, value])
        setReclamation(r => ({ ...r, [name]: [...lots, value] }))
    }

    const headers = [
        'Motif',
        'Article',
        'Code PCT',
        'Quantité à Retouner',
        'N°Lot',
        'N°BL',
        'Date Péremption',
        'N°Fact',
        'commentaire',
        'Quantité Valide',
        'Action',
    ]
    const editAction = (row, key) => {
        setIsEdited(true)
        setReclamation(() => row)
        // setShow(true)
    }

    const ValiderReclamation = () => {
        if (history.location.state !== undefined) {
            axios({
                method: 'patch',
                url: `${baseUrl}reclamation/${history.location.state.index.id}`,
                headers: {
                    'Accept-Version': 1,
                    Accept: 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json; charset=utf-8',
                    Authorization: `Bearer ${OpaliaToken}`,
                },
                data: { data: rows, client: userID, status: 'en attente' },
            }).then(res => {
                console.log('res', res);

                if (res.status === 202 || res.code === 200) {
                    alertShow(true, {
                        onConfirm: false,
                        warning: false,
                        info: false,
                        error: false,
                        success: true,
                        message: 'Modifier avec succés',
                    })
                    history.push({
                        pathname: 'validation-reclamation',
                    })
                }
            })
        } else
            axios({
                method: 'post',
                url: `${baseUrl}reclamation/new`,
                headers: {
                    'Accept-Version': 1,
                    Accept: 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json; charset=utf-8',
                    Authorization: `Bearer ${OpaliaToken}`,
                },
                data: { data: rows, client: userID, status: 'en attente' },
            }).then(res => {
                console.log(res);

                if (res.status === 201 || res.code === 200) {
                    alertShow(true, {
                        onConfirm: false,
                        warning: false,
                        info: false,
                        error: false,
                        success: true,
                        message: 'Ajouter avec succés',
                    })
                    history.push({
                        pathname: 'mes-reclamation',
                    })
                    // window.location.reload()
                }
            })
    }

    return (
        <div className="column col-md-12 text-center style-table form-reclam">
            <Grid className="gridItem">
                <PageTitle label="Déposer une réclamation" />
            </Grid>
            <Divider />
            <div className="row mt-3 mb-3">
                <div className="d-flex col-6 row-form-reclam">
                    <div className="col-6 mt-3">
                        <p className="txt_form">
                            Code Client <span className="text-danger"> * </span>
                        </p>
                    </div>
                    <div className="col-6 mt-3">
                        <p className="txt_form">{userID}</p>
                    </div>
                </div>
                <div className="d-flex col-6 row-form-reclam">
                    <div className="col-6 mt-3">
                        <p className="txt_form">
                            Désignation Client{' '}
                            <span className="text-danger"> * </span>
                        </p>
                    </div>
                    <div className="col-6 mt-3">
                        <p className="txt_form">
                            {userNamePre.nom} {userNamePre.prenom}
                            {/* {userID} */}
                        </p>
                    </div>
                </div>
                {/* Gravité réclamation */}
                <div className="col-6 d-flex row-form-reclam">
                    <div className="col-6 mt-3">
                        <p className="txt_form">
                            Gravité réclamation{' '}
                            <span className="text-danger"> * </span>
                        </p>
                    </div>
                    <div className="col-6">
                        <FormControl className="w-100">
                            {/* <InputLabel id="select-motif">
                                Gravité réclamation
                            </InputLabel> */}
                            <Select
                                className="border"
                                id="demo-mutiple-name"
                                labelId="select-motif"
                                value={reclamation.motif || ''}
                                onChange={e => changeHandler('motif', e)}
                                input={<Input />}
                            >
                                {motifReclamation.map(element => (
                                    <MenuItem key={element} value={element}>
                                        {element}
                                    </MenuItem>
                                ))}
                            </Select>
                            {isError && (
                                <span
                                    style={{
                                        color: '#f44336',
                                        fontSize: '0.8rem',
                                    }}
                                >
                                    {errorsList.motif}
                                </span>
                            )}
                        </FormControl>
                    </div>
                </div>
                {/* Article */}
                <div className="col-6 d-flex row-form-reclam">
                    <div className="col-6 mt-3">
                        <p className="txt_form">
                            Article <span className="text-danger"> * </span>
                        </p>
                    </div>
                    <div className="col-6">
                        <FormControl className="w-100">
                            {/* <InputLabel id="select-motif">
                                Gravité réclamation
                            </InputLabel> */}
                            <Select
                                className="border"
                                id="demo-mutiple-name"
                                labelId="select-motif"
                                value={reclamation.article || ''}
                                onChange={e => changeHandler('article', e)}
                                input={<Input />}
                            >
                                {(products || []).map(element => (
                                    <MenuItem
                                        key={element.codeArticleX3}
                                        value={element.codeArticleX3}
                                    >
                                        {element.codePct} -{' '}
                                        {element.codeArticleX3} -{' '}
                                        {element.designation1}
                                    </MenuItem>
                                ))}
                            </Select>
                            {isError && (
                                <span
                                    style={{
                                        color: '#f44336',
                                        fontSize: '0.8rem',
                                    }}
                                >
                                    {errorsList.motif}
                                </span>
                            )}
                        </FormControl>
                    </div>
                </div>
                {/* Numero de lot */}
                {show && (
                    <div className="col-6 d-flex row-form-reclam">
                        <div className="col-6 mt-3">
                            <p className="txt_form">Numéro de lot</p>
                        </div>
                        <div className="col-6">
                            <FormControl className="w-100">
                                <Select
                                    className="border"
                                    labelId="demo-multiple-checkbox-label"
                                    id="demo-mutiple-checkbox"
                                    // value={lots || ''}
                                    value={reclamation.num_Lot || ''}
                                    // renderValue={selected => selected.join(',')}
                                    onChange={e =>
                                        changeHandler('num_Lot', e)
                                        // changeHandlerLot('num_Lot', e)
                                    }
                                    input={<Input />}
                                    required
                                >
                                    {listLot.map((element, index) => (
                                        <MenuItem key={element} value={element}>
                                            {element}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {/*  <TextField
                                // error="tttt"
                                // helperText="frrr"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                type="text"
                                className="d-flex border"
                                onChange={e => changeHandler('num_Lot', e)}
                            />  */}
                            </FormControl>
                        </div>
                    </div>
                )}
                {/* Quantite reclame */}
                <div className="col-6 d-flex row-form-reclam">
                    <div className="col-6 mt-3">
                        <p className="txt_form">Quantité concernée</p>
                    </div>
                    <div className="col-6">
                        <FormControl className="w-100">
                            <TextField
                                inputProps={{ min: 1 }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={reclamation.quantite || ''}
                                defaultValue={reclamation.quantite}
                                type="number"
                                className="d-flex border "
                                onChange={e => changeHandler('quantite', e)}
                                name="quantite_rec"
                            />
                        </FormControl>
                    </div>
                </div>
                <div className="col-6 d-flex row-form-reclam">
                    <div className="col-6 mt-3">
                        <p className="txt_form">Date Péremption</p>
                    </div>
                    <div className="col-6">
                        <p className="txt_form">
                            <DateField
                                key="date_Peremption"
                                id="date_Peremption"
                                onchange={e => changeHandler('date_Peremption', e)}
                                value={reclamation.date_Peremption}
                                name="date_Peremption"
                                isArabic={false}
                                attributes={{
                                    disableFuture: false,
                                }}
                                required={false}
                            />
                        </p>
                    </div>
                </div>
                {/* BL*/}
                {show && (
                    <div className="col-6 d-flex row-form-reclam">
                        <div className="col-6 mt-3">
                            <p className="txt_form">N°BL</p>
                        </div>
                        <div className="col-6">
                            <FormControl className="w-100">
                                <Select
                                    className="border"
                                    labelId="demo-multiple-checkbox-label"
                                    id="demo-mutiple-checkbox"
                                    value={reclamation.num_Bl || ''}
                                    // renderValue={selected => selected.join(',')}
                                    onChange={e => changeHandler('num_Bl', e)}
                                    input={<Input />}
                                    required
                                >
                                    {(listBl || []).map((element, index) => (
                                        <MenuItem key={element} value={element}>
                                            {element}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {/*  <TextField
                                // error="tttt"
                                // helperText="frrr"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                type="text"
                                className="d-flex border"
                                onChange={e => changeHandler('num_Lot', e)}
                            />  */}
                            </FormControl>
                        </div>
                    </div>
                )}
                <div className="col-6 d-flex row-form-reclam">
                    <div className="col-6 mt-3">
                        <p className="txt_form">N°Facture</p>
                    </div>
                    <div className="col-6">
                        <p className="txt_form">N°Facture</p>
                    </div>
                </div>
                <div className="col-6 d-flex row-form-reclam">
                    <div className="col-6 mt-3">
                        <p className="txt_form">Commentaire</p>
                    </div>
                    <div className="col-6">
                        <FormControl className="w-100">
                            <TextField
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={reclamation.commentaire || ''}
                                defaultValue={reclamation.commentaire}
                                className="d-flex border"
                                onChange={e => changeHandler('commentaire', e)}
                                label="Commentaire"
                            />
                            {isError && (
                                <span
                                    style={{
                                        color: '#f44336',
                                        fontSize: '0.8rem',
                                    }}
                                >
                                    {errorsList.nature}
                                </span>
                            )}
                        </FormControl>
                    </div>
                </div>
            </div>

            <Button
                clicked={submitReclamation}
                label={isEdited ? 'Modifier' : 'Ajouter'}
            />
            <Divider />
            <Table
                lng={lng}
                headers={headers}
                rows={rows}
                history={history}
                type="reclamation"
                // intl={intl}
                // type={type}
                editAction={editAction}
                deleteRef={deleteRef}
                // paramTab={paramConsultTab}
                meta={meta}
            />
            <Button clicked={ValiderReclamation} label="Valider" />
        </div>
    )
}

Index.propTypes = {
    newReclamation: PropTypes.object.isRequired,
    addReclamation: PropTypes.func.isRequired,
    userID: PropTypes.object.isRequired,
    userNamePre: PropTypes.object.isRequired,
    getAllLivraison: PropTypes.func.isRequired,
    commandes: PropTypes.array.isRequired,
    getCommande: PropTypes.func.isRequired,
    reclamationDetails: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    livraisons: PropTypes.array,
    alertShow: PropTypes.func.isRequired,
    lng: PropTypes.string.isRequired,
    products: PropTypes.array.isRequired,
}

Index.defaultProps = {
    livraisons: [],
}
/* redux */

// dispatch action

/**
 *
 *
 * @param {*} dispatch
 */
const mapDispatchToProps = dispatch => ({
    getAllLivraison: userID =>
        dispatch(getAllLivraisons.getAllReferenceRequest(userID)),
    getCommande: data => dispatch(getCommandes.getStatistiqueRequest(data)),
    addReclamation: payload =>
        dispatch(addReclamationActions.addNewReclamationRequest(payload)),
    getAllProduct: () => dispatch(getAllProductActions.getAllProductRequest()),
    getReclamationLigne: data =>
        dispatch(getReclamationLignes.getReclamationLigneRequest(data)),
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
const mapStateToProps = ({
    info,
    login,
    referencial,
    statistique,
    reclamation,
    commande,
}) => ({
    userID: login.response.User.details.codeInsc,
    userNamePre: login.response.User.details,
    livraisons: referencial.allReferencials.response,
    commandes: statistique.getStatistique.response,
    reclamationDetails: reclamation.getReclamationLigne.response,
    newReclamation: reclamation.newReclamation,
    lng: info.language,
    products: commande.getAllProduct.response,
})

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Index))
