import React, { useState } from 'react'
import { Grid } from '@material-ui/core'
import PropTypes from 'prop-types'
import FormControl from '@material-ui/core/FormControl'
import TextareaAutosize from '@material-ui/core/TextareaAutosize'
import { Button, Modal } from 'react-bootstrap'
import SelectList from '../../ui/select'
import setListInput from './setListInput'
import InputText from '../../ui/input'

/**
 *
 *
 * @param {*} {
 *     payload,
 *     isError,
 *     errorsList,
 *     fieldChangedHandler,
 *     getDeclarantByCinOrPass,
 *     showFile
 * }
 * @returns
 */
const form = ({
    payload,
    isError,
    errorsList,
    fieldChangedHandler,
    getDeclarantByCinOrPass,
    showFile,
}) => {
    /**
     * hooks numbers
     */
    const [showModal, setShowModal] = useState(false)

    /**
     * close modal
     *
     * @memberof FormLogin
     */
    const /**
         * fermer modal
         *
         * @memberof Actions
         */
        closeModal = () => {
            setShowModal(false)
        }

    /**
     * show modal
     *
     * @memberof FormLogin
     */
    const show = name => {
        setShowModal(name)
    }
    /* render */
    console.log('list', payload.nature, payload)
    return setListInput().map(item => {
        if (item)
            if (item.type === 'file')
                return (
                    <Grid
                        item
                        xs={12}
                        md={item.md}
                        sm={item.sm}
                        className="gridItem"
                        key={`${item.name}`}
                    >
                        <FormControl className="w-100">
                            <label
                                htmlFor="input"
                                className="mt-3 mr-2 mb-0 ml-2 font-weight-bold text-uppercase text-primary"
                            >
                                {item.label}
                                <span className="text-danger"> * </span>
                            </label>
                            <input
                                type="file"
                                onChange={e =>
                                    fieldChangedHandler(
                                        e,
                                        item.name,
                                        e.target.files[0]
                                    )
                                }
                                name={item.name}
                                className="form-control"
                                accept="application/pdf"
                                id={item.name}
                            />
                            {isError && (
                                <span
                                    style={{
                                        color: '#f44336',
                                        fontSize: '0.8rem',
                                    }}
                                >
                                    {errorsList[item.name]}
                                </span>
                            )}
                        </FormControl>
                        <Grid style={{ paddingTop: '2%' }}>
                            <Modal
                                show={showModal}
                                animation
                                aria-labelledby="contained-modal-title-vcenter"
                                centered
                                size="xl"
                                onHide={closeModal}
                            >
                                <iframe
                                    title={`${item.name}`}
                                    id={`${item.name}`}
                                    type="application/pdf"
                                    width="600"
                                    height="800"
                                    style={{ overflow: 'auto', width: '100%' }}
                                    src={showFile && showFile[`${showModal}`]}
                                ></iframe>
                                {/* <img src={imageState} alt="Camp 2011 logo" /> */}
                            </Modal>
                            {/* {imageState && ( */}
                            <Button
                                id={`${item.name}`}
                                variant="primary"
                                size="sm"
                                onClick={() => show(item.name)}
                            >
                                عرض الملف
                            </Button>
                            {/* )} */}
                        </Grid>
                    </Grid>
                )
            else if (item.isSelect)
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
                                fieldChangedHandler(e, item.name)
                            }}
                            required={item.required}
                            name={item.name}
                            label={item.label}
                            width={item.widh}
                            list={item.list}
                            selectedItem={payload[item.name]}
                            errorText={errorsList[item.name]}
                            isError={
                                isError &&
                                Object.keys(errorsList).includes(item.name)
                            }
                            selectAll={item.selectAll}
                        />
                    </Grid>
                )
            else if (item.isTextErea)
                return (
                    <Grid
                        item
                        xs={12}
                        md={item.md}
                        sm={item.sm}
                        className="gridItem"
                        key={`${item.name}`}
                    >
                        <FormControl className="w-100">
                            <label
                                htmlFor="input"
                                className="mt-3 mr-2 mb-0 ml-2 font-weight-bold text-uppercase text-primary"
                            >
                                {item.label}
                            </label>
                            <TextareaAutosize
                                rowsMax={5}
                                rowsMin={5}
                                name={item.name}
                                onChange={e =>
                                    fieldChangedHandler(e, item.name)
                                }
                                aria-label="maximum height"
                                placeholder={item.placeholder}
                                defaultValue={
                                    payload[item.name] === undefined
                                        ? null
                                        : payload[item.name]
                                }
                            />
                            {isError && (
                                <span
                                    style={{
                                        color: '#f44336',
                                        fontSize: '0.8rem',
                                    }}
                                >
                                    {errorsList[item.name]}
                                </span>
                            )}
                        </FormControl>
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
                            lng={item.lng}
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
form.propTypes = {
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
    showFile: PropTypes.object.isRequired,
}
export default form
