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

const natureReclamation = [
    'Périmé',
    'Abimé',
    'Étui cabossé',
    'Date proche',
    'Étanchéité',
    'Autres',
]

const graviteReclamation = ['Mineur', 'Majeur', 'Critique']

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
    } = props

    const [reclamation, setReclamation] = useState({})
    const [errorsList, setErrorsList] = useState({})
    const [isError, setIsError] = useState(false)
    const fileteredCommandes = []
    const [rows, setRows] = useState([])
    const [meta, setMeta] = useState([])
    const [isEdited, setIsEdited] = useState(false)
    const [index, setIndex] = useState(0)

    useEffect(() => {
        getAllLivraison({ user: userID })
    }, [])

    useEffect(() => {
        if (reclamation.livraison)
            getCommande({ user: userID, commande: reclamation.livraison })
    }, [reclamation.livraison])

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

    // useEffect(() => {
    //     if (newReclamation.loading === true)
    //         setTimeout(() => history.push('/mes-reclamation'), 1000)
    // }, [newReclamation.loading])

    function removeObjectWithNumRec(arr, idRec) {
        const objWithIdIndex = arr.findIndex((obj) => obj.NumReclamation === idRec);

        if (objWithIdIndex > -1) {
            arr.splice(objWithIdIndex, 1);
        }

        return arr;
    }

    const deleteRef = (itemlm, key) => {
        const newArr = removeObjectWithNumRec(rows, itemlm.NumReclamation);
        setRows([...newArr]);
        // setIndex(index - 1)
        // setPayload([...newArr]);
    }

    const submitReclamation = () => {
        const newPayload = {
            // client: userID,
            NumReclamation: reclamation.NumReclamation || index + 1,
            codePct: 'Code PCT',
            article: 'Article',
            gravite: reclamation.gravite,
            qte: reclamation.qte || 0,
            numLot: reclamation.numLot,
            numBl: 'Num BL',
            numFact: 'Num Fact',
            datePere: 'Date Péremption',
            commentaire: reclamation.commentaire,
            // dateLivraison: new Date(Date.now()),
            // codeLivraison: reclamation.livraison,
            // codeArticle: reclamation.produit,
            // nature: reclamation.nature,
            // status: null,
        }

        if (newPayload.qte <= 0) {
            alertShow(true, {
                warning: false,
                info: false,
                error: true,
                success: false,
                message: 'Quantité négative ',
            })
        } else {
            if (isEdited) deleteRef(reclamation)
            else setIndex(index + 1)
            setReclamation({});
            setIndex(index + 1)
            setRows([...rows, newPayload])
        }
        setIsEdited(false)
    }

    const [lots, setLots] = useState([])
    const changeHandler = (name, e) => {
        const { value } = e.target
        setReclamation(r => ({ ...r, [name]: value }))
    }

    const changeHandlerLot = (name, e) => {
        const { value } = e.target
        setLots([...lots, value])
        setReclamation(r => ({ ...r, [name]: [...lots, value] }))
    }

    const headers = [
        'Code PCT',
        'Article',
        'Motif',
        'Quantité à Retouner',
        'N°Lot',
        'N°BL',
        'N°Fact',
        'Date Péremption',
        'commentaire',
        'Action',
    ]
    const editAction = (row, key) => {
        setIsEdited(true)
        setReclamation(() => (row))
    }

    function removeObjectWithKey(objWithIdIndex) {
        rows.splice(objWithIdIndex, 1);
        return rows;
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
                            Code Client{' '}
                            <span className="text-danger"> * </span>
                        </p>
                    </div>
                    <div className="col-6 mt-3">
                        <p className="txt_form">
                            {userID}
                        </p>
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
                            Désignation
                            {/* {userID} */}
                        </p>
                    </div>
                </div>
                <div className="col-6 d-flex row-form-reclam">
                    <div className="col-6 mt-3">
                        <p className="txt_form">
                            Gravité réclamation{' '}
                            <span className="text-danger"> * </span>
                        </p>
                    </div>
                    <div className="col-6">
                        <FormControl className="w-100">
                            {/* <InputLabel id="select-gravite">
                                Gravité réclamation
                            </InputLabel> */}
                            <Select
                                className="border"
                                id="demo-mutiple-name"
                                labelId="select-gravite"
                                value={reclamation.gravite || ''}
                                onChange={e => changeHandler('gravite', e)}
                                input={<Input />}
                            >
                                {graviteReclamation.map(element => (
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
                                    {errorsList.gravite}
                                </span>
                            )}
                        </FormControl>
                    </div>
                </div>
                <div className="col-6 d-flex row-form-reclam">
                    <div className="col-6 mt-3">
                        <p className="txt_form">
                            Article{' '}
                            <span className="text-danger"> * </span>
                        </p>
                    </div>
                    <div className="col-6">
                        <FormControl className="w-100">
                            {/* <InputLabel id="select-gravite">
                                Gravité réclamation
                            </InputLabel> */}
                            <Select
                                className="border"
                                id="demo-mutiple-name"
                                labelId="select-gravite"
                                // value={(reclamation || {}).livraison}
                                onChange={e => changeHandler('gravite', e)}
                                input={<Input />}
                            >
                                {[].map(element => (
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
                                    {errorsList.gravite}
                                </span>
                            )}
                        </FormControl>
                    </div>
                </div>
                {/* Numero de lot */}
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
                                value={lots}
                                renderValue={selected => selected.join(',')}
                                onChange={e => changeHandlerLot('numLot', e)}
                                input={<Input />}
                                required
                            >
                                {(commandes instanceof Array
                                    ? commandes
                                    : []
                                ).map((element, index) => {
                                    return (
                                        element.Code_article ===
                                        reclamation.produit && (
                                            <MenuItem
                                                key={`${element.Lot}-${index}`}
                                                value={element.Lot}
                                            >
                                                <ListItemText
                                                    primary={element.Lot}
                                                />
                                            </MenuItem>
                                        )
                                    )
                                })}
                            </Select>
                            {/*  <TextField
                                // error="tttt"
                                // helperText="frrr"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                type="text"
                                className="d-flex border"
                                onChange={e => changeHandler('numLot', e)}
                            />  */}
                        </FormControl>
                    </div>
                </div>
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
                                value={reclamation.qte || ''}
                                defaultValue={reclamation.qte}
                                type="number"
                                className="d-flex border "
                                onChange={e => changeHandler('qte', e)}
                                name="qte_rec"
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
                            date
                        </p>
                    </div>
                </div>
                <div className="col-6 d-flex row-form-reclam">
                    <div className="col-6 mt-3">
                        <p className="txt_form">N°BL</p>
                    </div>
                    <div className="col-6">
                        <p className="txt_form">
                            N°BL
                        </p>
                    </div>
                </div>
                <div className="col-6 d-flex row-form-reclam">
                    <div className="col-6 mt-3">
                        <p className="txt_form">N°Facture</p>
                    </div>
                    <div className="col-6">
                        <p className="txt_form">
                            N°Facture
                        </p>
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
                                onChange={e =>
                                    changeHandler('commentaire', e)
                                }
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




                {/* commentaire */}
                <>
                    {/* <div className="d-flex col-6 row-form-reclam"> */}
                    {/* <div className="col-6 mt-3">
                        <p className="txt_form">
                            Code livraison{' '}
                            <span className="text-danger"> * </span>
                        </p>
                    </div> */}
                    {/* <div className="col-6"> */}
                    {/* <FormControl className="w-100"> */}
                    {/* <InputLabel id="select-livraison">
                                Code livraison
                            </InputLabel> */}
                    {/* <Select
                                className="border"
                                id="demo-mutiple-name"
                                labelId="select-livraison"
                                value={(reclamation || {}).livraison}
                                onChange={e => changeHandler('livraison', e)}
                                input={<Input />}
                                required
                            >
                                {(livraisons instanceof Array
                                    ? livraisons
                                    : []
                                ).map(element => (
                                    <MenuItem
                                        key={element.No_livraison}
                                        value={element.No_livraison}
                                    >
                                        {element.No_livraison}
                                    </MenuItem>
                                ))}
                            </Select> */}
                    {/* {isError && (
                                <span
                                    style={{
                                        color: '#f44336',
                                        fontSize: '0.8rem',
                                    }}
                                >
                                    {errorsList.codeLivraison}
                                </span>
                            )} */}
                    {/* </FormControl> */}
                    {/* </div> */}
                    {/* </div> */}
                    {/* Numero du produit */}
                    {/* <div className="col-6 d-flex row-form-reclam">
                    <div className="col-6 mt-3">
                        <p className="txt_form">
                            Code produit{' '}
                            <span className="text-danger"> * </span>
                        </p>
                    </div>
                    <div className="col-6">
                        <FormControl className="w-100">
                            {/* <InputLabel id="select-produit">
                                Code produit
                            </InputLabel> */}
                    {/* <Select
                                className="border"
                                id="demo-mutiple-name"
                                labelId="select-produit"
                                value={(reclamation || {}).livraison}
                                onChange={e => changeHandler('produit', e)}
                                input={<Input />}
                            >
                                {(commandes || []).forEach(commande => {
                                    if (
                                        fileteredCommandes.indexOf(
                                            commande.Code_article
                                        ) === -1
                                    ) {
                                        fileteredCommandes.push(
                                            commande.Code_article
                                        )
                                    }
                                })}
                                {(fileteredCommandes || []).map(element => {
                                    return (
                                        <MenuItem key={element} value={element}>
                                            {element}
                                        </MenuItem>
                                    )
                                })}
                            </Select> */}
                    {/* {isError && (
                                <span
                                    style={{
                                        color: '#f44336',
                                        fontSize: '0.8rem',
                                    }}
                                >
                                    {errorsList.codeArticle}
                                </span>
                            )} */}
                    {/* </FormControl> */}
                    {/* </div> */}
                    {/* </div> */}


                    {/* Nature reclamation */}
                    {/*reclamation.nature !== 'Autres' ? (
                    <div className="col-6 d-flex row-form-reclam">
                        <div className="col-6 mt-3">
                            <p className="txt_form">
                                Nature réclamation{' '}
                                <span className="text-danger"> * </span>
                            </p>
                        </div>
                        <div className="col-6">
                            <FormControl className="w-100">
                                {/* <InputLabel id="select-nature">
                                    Nature réclamation
                                </InputLabel> */}
                    {/* <Select
                                    className="border"
                                    id="demo-mutiple-name"
                                    labelId="select-nature"
                                    value={(reclamation || {}).livraison}
                                    onChange={e => changeHandler('nature', e)}
                                    input={<Input />}
                                >
                                    {natureReclamation.map(element => (
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
                                        {errorsList.nature}
                                    </span>
                                )} */}
                    {/* </FormControl> */}
                    {/* </div> */}
                    {/* </div> */}
                    {/* ) : ( */}
                    {/* <div className="col-6 d-flex row-form-reclam">
                        <div className="col-6 mt-3">
                            <p className="txt_form">Préciser votre situation</p>
                        </div>
                        <div className="col-6">
                            <FormControl className="w-100">
                                <TextField
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    className="d-flex border"
                                    onChange={e =>
                                        changeHandler('commentaire', e)
                                    }
                                    label="Préciser votre situation"
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
                    </div> */}
                    {/* )} */}
                    {/* Gravite du reclamation */}
                </>
            </div>

            <Button clicked={submitReclamation} label={isEdited ? "Modifier" : "Ajouter"} />
            <Divider />
            <Table
                lng={lng}
                headers={headers}
                rows={rows}
                history={history}
                type='reclamation'
                // intl={intl}
                // type={type}
                editAction={editAction}
                deleteRef={deleteRef}
                // paramTab={paramConsultTab}
                meta={meta}
            />
        </div>
    )
}

Index.propTypes = {
    newReclamation: PropTypes.object.isRequired,
    addReclamation: PropTypes.func.isRequired,
    userID: PropTypes.object.isRequired,
    getAllLivraison: PropTypes.func.isRequired,
    commandes: PropTypes.array.isRequired,
    getCommande: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    livraisons: PropTypes.array,
    alertShow: PropTypes.func.isRequired,
    lng: PropTypes.string.isRequired,
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
}) => ({
    userID: login.response.User.details.codeInsc,
    livraisons: referencial.allReferencials.response,
    commandes: statistique.getStatistique.response,
    newReclamation: reclamation.newReclamation,
    lng: info.language,
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(Index))
