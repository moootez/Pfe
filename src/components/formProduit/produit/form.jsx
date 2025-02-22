import React from 'react'
import { Divider, Grid } from '@material-ui/core'
import PropTypes from 'prop-types'
import FormControl from '@material-ui/core/FormControl'
import TextareaAutosize from '@material-ui/core/TextareaAutosize'
import setListInput from './setListInput'
import InputText from '../../ui/input'
import DateField from '../../ui/datePicker'
import SelectList from '../../ui/select'

/**
 *
 *
 * @param {*} { payload, isError, errorsList, fieldChangedHandler }
 * @returns
 */
const form = ({
    payload,
    isError,
    errorsList,
    fieldChangedHandler,
}) => {


    /* render */
    return setListInput().map(item => {
        if (item)
            if (item.type === 'file' || item.type === 'image')
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
                                type={item.type}
                                onChange={e =>
                                    fieldChangedHandler(
                                        e,
                                        item.name,
                                        e.target.files[0]
                                    )
                                }
                                name={item.name}
                                className="form-control"
                                accept="application/image"
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
                        {/* <Grid style={{ paddingTop: '2%' }}>
                            <Modal
                                show={showModal}
                                onHide={closeModal}
                                animation
                                size="lg"
                            >
                                <img src={imageState} alt=" Voir les images" />
                            </Modal>
                            {imageState && (
                                <Button
                                    variant="primary"
                                    size="sm"
                                    onClick={show}
                                >
                                    Voir l&acute;image
                                </Button>
                            )}
                        </Grid> */}
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
                                aria-label="maximum height"
                                name={item.name}
                                onChange={e =>
                                    fieldChangedHandler(e, item.name)
                                }
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
                            isArabic
                            attributes={{ disableFuture: false }}
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
                                fieldChangedHandler(e, item.name, null)
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
                            // declarantExist={declarantExist}
                            selectAll={item.selectAll}
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
    payload: PropTypes.object.isRequired,
    imageState: PropTypes.object.isRequired,
}
export default form
