import React from 'react'
import { Divider, Grid } from '@material-ui/core'
import PropTypes from 'prop-types'
import setListInput from './setListInput'
import SelectList from '../../../components/ui/select'
import DateField from '../../../components/ui/datePicker'

/**
 *
 *
 * @param {*} {
 *     payload,
 *     isError,
 *     isExist,
 *     errorsList,
 *     fieldChangedHandler,
 *     type,
 *     lng,
 *     intl,
 *     form,
 * }
 * @returns
 */
const addSanctionForm = ({
    payload,
    isError,
    isExist,
    errorsList,
    fieldChangedHandler,
    type,
    lng,
    intl,
    form,
}) => {
    /* functions */

    /* render */
    const ok = true
    if (payload && form === 'ajout')
        return setListInput(payload, type, form).map(item => {
            if (item)
                if (item.isSelect)
                    /* select List */
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
                                isExist={isExist}
                                lng={lng}
                                width={item.widh}
                                list={item.list}
                                selectedItem={payload[item.name]}
                                errorText={
                                    errorsList[item.name] !== undefined
                                        ? errorsList[item.name].ar
                                        : ''
                                }
                                isError={
                                    isError &&
                                    Object.keys(errorsList).includes(item.name)
                                }
                            />
                            {item.sm === 12 && !item.isCheck && <Divider />}
                        </Grid>
                    )
                else if (item.isDate)
                    /* input date */
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
                                onchange={e =>
                                    fieldChangedHandler(e, item.name)
                                }
                                name={item.name}
                                label={item.label}
                                defaultValue={
                                    payload[item.name] === undefined
                                        ? item.name === 'createdAt'
                                            ? new Date()
                                            : null
                                        : payload[item.name]
                                }
                                isArabic={ok}
                                lng={lng}
                                intl={intl}
                                attributes={{ disableFuture: false }}
                                errorText={
                                    errorsList[item.name] !== undefined
                                        ? errorsList[item.name].ar
                                        : ''
                                }
                                isError={
                                    isError &&
                                    Object.keys(errorsList).includes(item.name)
                                }
                                required={item.required}
                                disabled={item.disabled}
                            />
                            {item.sm === 12 && !item.isCheck && <Divider />}
                        </Grid>
                    )
            return null
        })
    if (payload.length !== 0 && form === 'consultation')
        return setListInput(payload, type, form).map(item => {
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
                                    fieldChangedHandler(e, item.name)
                                }}
                                required={item.required}
                                name={item.name}
                                label={item.label}
                                isExist={isExist}
                                placeholder={payload[item.name]}
                                lng={lng}
                                width={item.widh}
                                list={item.list}
                                selectedItem={payload[item.name]}
                                errorText={
                                    errorsList[item.name] !== undefined
                                        ? errorsList[item.name].ar
                                        : ''
                                }
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
                                onchange={e =>
                                    fieldChangedHandler(e, item.name)
                                }
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
                                attributes={{ disableFuture: false }}
                                errorText={
                                    errorsList[item.name] !== undefined
                                        ? errorsList[item.name].ar
                                        : ''
                                }
                                isError={
                                    isError &&
                                    Object.keys(errorsList).includes(item.name)
                                }
                                required={item.required}
                                disabled={item.disabled}
                            />
                            {item.sm === 12 && !item.isCheck && <Divider />}
                        </Grid>
                    )
            return null
        })
    return null
}
/**
 *  Inialisation
 */
addSanctionForm.defaultProps = {
    type: '',
    form: '',
}
/**
 *  declaration des props
 */
addSanctionForm.propTypes = {
    allReferenciels: PropTypes.object.isRequired,
    payload: PropTypes.object.isRequired,
    intl: PropTypes.object.isRequired,
    type: PropTypes.string,
    form: PropTypes.string,
    onChangeNumberTel: PropTypes.func.isRequired,
    setCheck: PropTypes.func.isRequired,
    lng: PropTypes.string.isRequired,
    isExist: PropTypes.bool.isRequired,
    isEditDeclaration: PropTypes.bool.isRequired,
    getDeclarantByCinOrPass: PropTypes.func,
}
export default addSanctionForm
