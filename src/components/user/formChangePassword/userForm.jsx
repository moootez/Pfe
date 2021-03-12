import React from 'react'
import { Divider, Grid } from '@material-ui/core'
import PropTypes from 'prop-types'
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
 *     lng,
 *     intl,
 * }
 * @returns
 */
const UserForm = ({
    payload,
    isError,
    errorsList,
    fieldChangedHandler,
    lng,
    intl,
}) => {
    // eslint-disable-next-line no-lone-blocks
    {
        /* render */
        return setListInput(intl).map(item => {
            if (item)
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
}
/**
 *  declaration des props
 */
UserForm.propTypes = {
    allReferenciels: PropTypes.object.isRequired,
    payload: PropTypes.object.isRequired,
    declarantExist: PropTypes.object,
    intl: PropTypes.object.isRequired,
    onChangeNumberTel: PropTypes.func.isRequired,
    setCheck: PropTypes.func.isRequired,
    lng: PropTypes.string.isRequired,
    allRoles: PropTypes.object,
}
export default UserForm
