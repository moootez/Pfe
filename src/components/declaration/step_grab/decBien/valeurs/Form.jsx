import React from 'react'
import { injectIntl } from 'react-intl'
import { Grid } from '@material-ui/core'
import PropTypes from 'prop-types'
import setListInput from './ListInputs'
import SelectList from '../../../../ui/select'
import InputText from '../../../../ui/input'
import DateField from '../../../../ui/datePicker'
import InputFormatted from '../../../../ui/numberFormat'

/**
 *
 *
 * @param {*} {
 *     allReferenciels,
 *     intl,
 *     payload,
 *     isError,
 *     errorsList,
 *     lng,
 *     id,
 *     disabled,
 *     fieldChangedHandler,
 *     listDeclarant,
 * }
 * @returns
 */
const Form = ({
    allReferenciels,
    intl,
    payload,
    isError,
    errorsList,
    lng,
    id,
    disabled,
    fieldChangedHandler,
    listDeclarant,
}) => {
    const code = 'valeurs'
    let listType = []
    let listDevise = []
    try {
        listDevise = allReferenciels.referenciels.RefDevise.map(i => ({
            label: lng === 'ar' ? i.intituleAr : i.intituleFr,
            value: i.id,
        }))

        listType = allReferenciels.referenciels.RefNatureActionPart.map(i => ({
            label: lng === 'ar' ? i.intituleAr : i.intituleFr,
            value: i.id,
            publiable: i.publiable,
        }))
        listType = [...listType, { label: intl.formatMessage({ id: 'autre' }) }]
    } catch (error) {
        console.log(error)
    }
    /* functions */
    /* render */
    return setListInput(intl, listDeclarant, listType, listDevise).map(item => {
        if (item)
            if (item.isSelect)
                return (
                    <Grid
                        item
                        xs={12}
                        md={item.md}
                        sm={item.sm}
                        className="gridItem"
                        key={`${code}_${item.name}`}
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
            else if (item.isDate)
                return (
                    <Grid
                        item
                        xs={12}
                        md={item.md}
                        sm={item.sm}
                        className="gridItem"
                        key={`${code}_${item.name}`}
                    >
                        <DateField
                            onchange={(e, index) => {
                                fieldChangedHandler(e, index)
                            }}
                            name={item.name}
                            label={item.label}
                            placeholder={item.placeholder}
                            defaultValue={
                                payload[item.name] === undefined
                                    ? null
                                    : payload[item.name]
                            }
                            isArabic={lng === 'ar'}
                            intl={intl}
                            id={id}
                            disabled={disabled}
                            errorText={
                                errorsList[item.name] !== undefined
                                    ? errorsList[item.name].ar
                                    : ''
                            }
                            attributes={{ disableFuture: true }}
                            isError={
                                isError &&
                                Object.keys(errorsList).includes(item.name)
                            }
                            required={item.required}
                        />
                    </Grid>
                )
            else if (item.isFormatted)
                return (
                    <Grid
                        item
                        xs={12}
                        md={item.md}
                        sm={item.sm}
                        className="gridItem"
                        key={`${code}_${item.name}`}
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
                        xs={12}
                        md={item.md}
                        sm={item.sm}
                        className="gridItem"
                        key={`${code}_${item.name}`}
                    >
                        <InputText
                            onchange={(e, index) => {
                                fieldChangedHandler(e, index)
                            }}
                            lng={lng}
                            name={item.name}
                            label={item.label}
                            errorText={
                                errorsList[item.name] !== undefined
                                    ? errorsList[item.name].ar
                                    : ''
                            }
                            defaultValue={payload[item.name]}
                            placeholder={item.placeholder}
                            type={item.type}
                            id={id}
                            disabled={disabled}
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
    allReferenciels: PropTypes.object.isRequired,
    listDeclarant: PropTypes.array.isRequired,
    payload: PropTypes.object.isRequired,
    lng: PropTypes.string.isRequired,
    disabled: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
    intl: PropTypes.object.isRequired,
}

export default injectIntl(Form)
