import React from 'react'
import { Grid } from '@material-ui/core'
import { Button } from 'react-bootstrap'
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
 *     getDeclarantByCinOrPass,
 * }
 * @returns
 */
const form = ({
    payload,
    isError,
    errorsList,
    fieldChangedHandler,
    getDeclarantByCinOrPass,
}) => {
    /* render */

    return setListInput().map(item => {
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
                    {item.name === 'link' && (
                        <a href={payload[item.name]} target="blank">
                            <Button variant="primary" size="sm">
                                افتح الرابط
                            </Button>
                        </a>
                    )}
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
}
export default form
