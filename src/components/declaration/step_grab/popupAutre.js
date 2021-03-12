import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import { Grid } from '@material-ui/core'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import InputText from '../../ui/input'
import ButtonComponent from '../../ui/button'
// import addNewReferencialActions from '../../../redux/referencial/addNewReferencial'
import getAllReferencesActions from '../../../redux/referencial/getAllReferencial'
import { Post } from '../../../serveur/axios'

/**
 * obtenir nuombre au hasard
 *
 * @returns
 */
function rand() {
    return Math.round(Math.random() * 20) - 10
}

/**
 * obtenir top et left
 *
 * @returns
 */
function getModalStyle() {
    const top = 50 + rand()
    const left = 50 + rand()

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
        textAlign: 'right',
    }
}
/**
 * style css
 */
const useStyles = makeStyles(theme => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}))

/**
 *
 *
 * @param {*} {
 *     openModal,
 *     onClickAway,
 *     payload,
 *     id,
 *     fieldName,
 *     getAllReference,
 *     AddedField,
 * }
 * @returns
 */
function popupAutre({
    openModal,
    onClickAway,
    payload,
    id,
    fieldName,
    getAllReference,
    AddedField,
}) {
    /**
     * hooks numbers
     */
    const classes = useStyles()
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [payloadState, setPayloadState] = React.useState(payload)
    const [modalStyle] = React.useState(getModalStyle)
    // life cycle
    useEffect(() => {
        if (payload) setPayloadState(payload)
    }, [payload])

    /**
     * close mpdal
     *
     */
    const handleClose = () => {
        onClickAway(false)
    }

    /**
     * set Payload
     *
     * @memberof
     */
    const fieldChangedHandler = ({ target: { name, value } }) => {
        setPayloadState({ ...payloadState, [name]: value })
    }

    /**
     * ajouter referentiel popup
     *
     */
    const addReferencial = () => {
        Post('referenciel/new', { ...payloadState })
            .then(res => {
                if (res.status === 201 || res.status === 200) {
                    getAllReference()
                    AddedField({ name: fieldName, value: res.data.data.id }, id)
                }
            })
            .then()
    }

    const body = (
        <div style={modalStyle} className={classes.paper}>
            <Grid item xs={12} sm={12}>
                <InputText
                    label="المسمى بالعربية"
                    onchange={fieldChangedHandler}
                    type="text"
                    placeholder="المسمى بالعربية"
                    //   errorText={
                    //       errorsList[item] !== undefined
                    //           ? errorsList[item].ar
                    //           : ''
                    //   }
                    name="intituleAr"
                    //   isError={isError}
                />
            </Grid>
            <Grid item xs={12} sm={12}>
                <InputText
                    label="المسمى بالفرنسية"
                    onchange={fieldChangedHandler}
                    type="text"
                    placeholder="المسمى بالفرنسية"
                    //   errorText={
                    //       errorsList[item] !== undefined
                    //           ? errorsList[item].ar
                    //           : ''
                    //   }
                    name="intituleFr"
                    //   isError={isError}
                />
            </Grid>
            <Grid item xs={12} sm={12}>
                <InputText
                    label="المسمى بالإنجلزية"
                    onchange={fieldChangedHandler}
                    type="text"
                    placeholder="المسمى بالإنجلزية"
                    //   errorText={
                    //       errorsList[item] !== undefined
                    //           ? errorsList[item].ar
                    //           : ''
                    //   }
                    name="intituleEn"
                    //   isError={isError}
                />
            </Grid>
            <Grid
                item
                xs={12}
                sm={12}
                style={{ textAlign: 'center', display: 'flex' }}
            >
                <ButtonComponent
                    color="secondary"
                    type="contained"
                    label="حفظ"
                    clicked={addReferencial}
                />
                <ButtonComponent
                    color="secondary"
                    type="contained"
                    label="إلغاء"
                    clicked={handleClose}
                />
            </Grid>
        </div>
    )
    return (
        <div>
            <Modal
                open={openModal}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
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
    getAllReference: () =>
        dispatch(getAllReferencesActions.getAllReferenceRequest()),
})

// obtenir les données from  store state
/**
 *
 *
 * @param {*} state
 * @returns
 */
const mapStateToProps = ({ referencial }) => ({
    responseAdd: referencial.addNewReferencial.response,
})
/**
 *  declaration des props
 */
popupAutre.propTypes = {
    openModal: PropTypes.func.isRequired,
    onClickAway: PropTypes.func.isRequired,
    getAllReference: PropTypes.func.isRequired,
    AddedField: PropTypes.func.isRequired,
    payload: PropTypes.object,
    id: PropTypes.number,
    fieldName: PropTypes.string.isRequired,
}
/**
 *  Inialisation
 */
popupAutre.defaultProps = {
    payload: {},
    id: 0,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(popupAutre)
