import React from 'react'
import { Grid } from '@material-ui/core'
import PropTypes from 'prop-types'
import FormControl from '@material-ui/core/FormControl'
import TextareaAutosize from '@material-ui/core/TextareaAutosize'
import setListInput from './setListInput'
import InputText from '../../ui/input'
import SelectList from '../../ui/select'

/**
 *
 *
 * @param {*} {
 *     allReferenciels,
 *     payload,
 *     isError,
 *     errorsList,
 *     fieldChangedHandler,
 * }
 * @returns
 */
const form = ({
    allReferenciels,
    payload,
    isError,
    errorsList,
    fieldChangedHandler,
}) => {
    console.log('payload', payload)
    /* render */
    {
        let listTheme = []
        let listSujet = []
        try {
            listTheme = allReferenciels.referenciels.RefTheme.map(i => ({
                label: i.intituleAr,
                value: i.id,
            }))

            listSujet = allReferenciels.referenciels.RefSujet.filter(
                e => e.parent && e.parent.id === payload.theme
            ).map(i => ({
                label: i.intituleAr,
                value: i.id,
            }))
        } catch (error) {
            console.log(error)
        }
        return setListInput(listTheme, listSujet).map(item => {
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
                                onchange={e =>
                                    fieldChangedHandler(e, item.name)
                                }
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
                            />
                        </Grid>
                    )
            return null
        })
    }
}
/**
 *  declaration des props
 */
form.propTypes = {
    payload: PropTypes.object.isRequired,
    allReferenciels: PropTypes.object.isRequired,
}
export default form
