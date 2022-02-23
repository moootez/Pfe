/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, Fragment } from 'react'
import { useDropzone } from 'react-dropzone'
import { CloudUploadSharp } from '@material-ui/icons'
import { injectIntl } from 'react-intl'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ButtonComponent from '../../../components/ui/button'
import scanDecActions from '../../../redux/declaration_grab/scan/index'
import PageTitle from '../../../components/ui/pageTitle'
// import ExelExemple from '../../../assets/file/ExempleCsv.csv'

// style
const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16,
}

const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: '100%',
    height: '100%',
    padding: 4,
    boxSizing: 'border-box',
}

const thumbInner = {
    display: 'flex',
    margin: '0 auto',
    overflow: 'hidden',
    width: '100%',
}

const draggableInput = {
    border: '2px dashed #000000',
    outline: 0,
}
/**
 * interface scan pdf declaration
 *
 * @param {*} props
 * @returns
 */
const FormScanDeclaration = props => {
    /* hooks member */
    const [files, setFiles] = useState([])
    const [scan, setScan] = useState([])
    const [errors, setErrors] = useState([])
    const { isError, errorsList, intl, history } = props
    const { dataDeclaration } = 50
    // history.location.state

    /* life cycle */
    useEffect(
        () => () => {
            // Make sure to revoke the data uris to avoid memory leaks
            files.forEach(file => URL.revokeObjectURL(file.preview))
        },
        [files]
    )
    /* functions */

    const handleUpload = file => {
        setScan(file)
        // formData.append('document', file)
    }

    const {
        getRootProps,
        getInputProps,
        isDragAccept,
        isDragReject,
    } = useDropzone({
        accept: 'text/*, application/vnd.ms-excel',
        onDrop: acceptedFiles => {
            setFiles(
                acceptedFiles.map(file =>
                    Object.assign(
                        file
                        //     , {
                        //     preview: URL.createObjectURL(file),
                        // }
                    )
                )
            )
            handleUpload(acceptedFiles[0])
        },
        maxSize: 1048576,
        onDropRejected: () => {
            setErrors(
                intl.formatMessage({
                    id: 'WRONG_ALERT',
                })
            )
        },
        onDropAccepted: () => {
            setErrors('')
        },
    })
    const thumbs =
        files && files.length ? (
            <div style={thumb} key={files[files.length - 1].name}>
                <div style={thumbInner}>
                    <iframe
                        id="pdf_doc"
                        title={files[files.length - 1].name}
                        src={files[files.length - 1].preview}
                        type="text/*"
                        width="400"
                        height="600"
                        style={{
                            overflow: 'auto',
                            width: '100%',
                            display: 'none',
                        }}
                    ></iframe>
                </div>
            </div>
        ) : (
            <div />
        )

    /**
     *
     *
     */
    const uploadFile = () => {
        const { scanDecReq } = props
        const formData = new FormData()
        console.log(scan.type)
        formData.append('document', scan)
        formData.append('user', localStorage.codeInsc)
        formData.append('source', 'import')
        formData.append('extension', scan.type)
        const obj = {
            id_declaration: 50,
            body: formData,
            history,
        }
        scanDecReq(obj)
    }

    const fileError =
        (isError && Object.keys(errorsList).includes('file')) ||
        Object.keys(errors).length > 0

    return (
        <div style={{ padding: '1em' }}>
            <PageTitle label="Importer une commande" />
            <Fragment>
                <div
                    {...getRootProps({ className: 'dropzone' })}
                    className={`p-4 text-center ${
                        isDragAccept ? 'border-success' : null
                    } ${isDragReject || fileError ? 'border-danger' : null}`}
                    style={draggableInput}
                >
                    <input {...getInputProps()} />
                    {files && files.length ? (
                        <p style={{ color: '#000' }}>{files[0].name}</p>
                    ) : (
                        <p style={{ color: '#000' }}>
                            Faites glisser et déposez le fichier ici, ou cliquez
                            pour sélectionner le fichier
                        </p>
                    )}
                    <CloudUploadSharp color="secondary" fontSize="medium" />
                </div>
                <aside style={thumbsContainer}>{thumbs}</aside>
                {files && files.length ? (
                    <div style={{ textAlign: 'center', padding: 20 }}>
                        <ButtonComponent
                            disabled={!files && !files.length}
                            color="secondary"
                            type="contained"
                            size="medium"
                            label="Confirmer"
                            clicked={() => uploadFile()}
                        />
                        <ButtonComponent
                            color="secondary"
                            type="contained"
                            label="Retour"
                            size="medium"
                            clicked={() => {
                                history.goBack()
                            }}
                        />
                    </div>
                ) : (
                    <div style={{ textAlign: 'center' }}>
                        <ButtonComponent
                            color="secondary"
                            type="contained"
                            label="Exemple CSv"
                            size="medium"
                            clicked={() => {}}
                        />
                        <ButtonComponent
                            color="secondary"
                            type="contained"
                            label="Retour"
                            size="medium"
                            clicked={() => {
                                history.goBack()
                            }}
                        />
                    </div>
                )}
            </Fragment>
        </div>
    )
}

// obtenir les données from  store state
/**
 *
 *
 * @param {*} state
 * @returns
 */
function mapStateToProps(state) {
    return {
        scan: state,
    }
}

// dispatch action

/**
 *
 *
 * @param {*} dispatch
 */
const mapDispatchToProps = dispatch => ({
    scanDecReq: scan => dispatch(scanDecActions.scanDecRequest(scan)),
})
/**
 *  Inialisation
 */
FormScanDeclaration.defaultProps = {
    errorsList: null,
    isError: false,
}
/**
 *  declaration des props
 */
FormScanDeclaration.propTypes = {
    intl: PropTypes.object.isRequired,
    scanDecReq: PropTypes.func.isRequired,
    errorsList: PropTypes.object,
    history: PropTypes.object.isRequired,
    isError: PropTypes.bool,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(FormScanDeclaration))
