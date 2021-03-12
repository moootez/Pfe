import React from 'react'
import { injectIntl } from 'react-intl'
import { Grid } from '@material-ui/core'
import PropTypes from 'prop-types'
import setListInput from './ListInputs'
import SelectList from '../../../../ui/select'
import InputText from '../../../../ui/input'
import InputFormatted from '../../../../ui/numberFormat'

/**
 *
 *
 * @param {*} {
 *     intl,
 *     payload,
 *     isError,
 *     errorsList,
 *     lng,
 *     id,
 *     disabled,
 *     fieldChangedHandler,
 *     listDeclarant,
 *     allReferenciels,
 * }
 * @returns
 */
const Form = ({
    intl,
    payload,
    isError,
    errorsList,
    lng,
    id,
    disabled,
    fieldChangedHandler,
    listDeclarant,
    allReferenciels,
}) => {
    /* functions */
    let listDevise = []
    try {
        listDevise = allReferenciels.referenciels.RefDevise.map(i => ({
            label: lng === 'ar' ? i.intituleAr : i.intituleFr,
            value: i.id,
        }))
    } catch (error) {
        console.log(error)
    }
    /* render */
    const code = 'cadeaux'
    return setListInput(intl, listDeclarant, listDevise).map(item => {
        if (item)
            if (item.isSelect)
                return (
                    <Grid
                        item
                        key={`${code}_${item.name}`}
                        xs={12}
                        md={item.md}
                        sm={item.sm}
                        className="gridItem"
                    >
                        <SelectList
                            onchange={(e, index) => {
                                fieldChangedHandler(e, index)
                            }}
                            required={item.required}
                            name={item.name}
                            label={item.label}
                            lng={lng}
                            id={id}
                            disabled={disabled}
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
                            selectAll={false}
                        />
                    </Grid>
                )
            else if (item.isFormatted)
                return (
                    <Grid
                        item
                        key={`${code}_${item.name}`}
                        xs={12}
                        md={item.md}
                        sm={item.sm}
                        className="gridItem"
                    >
                        <InputFormatted
                            onchange={(e, index) =>
                                fieldChangedHandler(e, index)
                            }
                            required={item.required}
                            name={item.name}
                            label={item.label}
                            lng={lng}
                            id={id}
                            disabled={disabled}
                            width={item.widh}
                            list={item.list}
                            selectedItem={payload[item.name]}
                            errorText={
                                errorsList[item.name] !== undefined
                                    ? errorsList[item.name].ar
                                    : ''
                            }
                            defaultValue={payload[item.name]}
                            isError={
                                isError &&
                                Object.keys(errorsList).includes(item.name)
                            }
                        />
                    </Grid>
                )
            else
                return (
                    <Grid
                        item
                        key={`${code}_${item.name}`}
                        xs={12}
                        md={item.md}
                        sm={item.sm}
                        className="gridItem"
                    >
                        <InputText
                            onchange={(e, index) => {
                                fieldChangedHandler(e, index)
                            }}
                            lng={lng}
                            name={item.name}
                            label={item.label}
                            disabled={disabled}
                            errorText={
                                errorsList[item.name] !== undefined
                                    ? errorsList[item.name].ar
                                    : ''
                            }
                            defaultValue={payload[item.name]}
                            placeholder={item.placeholder}
                            type={item.type}
                            id={id}
                            value={payload[item.name]}
                            isError={
                                isError &&
                                Object.keys(errorsList).includes(item.name)
                            }
                            required={item.required}
                        />
                    </Grid>
                )
        return null
    })
}
/**
 *  declaration des props
 */
Form.propTypes = {
    listDeclarant: PropTypes.array.isRequired,
    payload: PropTypes.object.isRequired,
    lng: PropTypes.string.isRequired,
    disabled: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
    intl: PropTypes.object.isRequired,
    allReferenciels: PropTypes.object.isRequired,
}

export default injectIntl(Form)
