import React, { useState } from 'react'
import PropTypes from 'prop-types'
import FormControl from '@material-ui/core/FormControl'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { Grid } from '@material-ui/core'

/**
 *
 *
 * @param {*} {
 *     onchange,
 *     list,
 *     label = '',
 *     chosenItem = '',
 *     isError = false,
 *     errorText = '',
 * }
 * @returns
 */
const index = ({
    onchange,
    list,
    label = '',
    chosenItem = '',
    isError = false,
    errorText = '',
}) => {
    /**
     * hooks numbers
     */
    const [selectedValue, setSelectedValue] = useState('')

    /**
     * change radio payload
     *
     * @param {*} event
     */
    const handleChange = event => {
        const radix = 10
        const chosen = list.find(
            i =>
                parseInt(i.value, radix) ===
                    parseInt(event.target.value, radix) ||
                i.value === event.target.value
        )
        onchange(event)
        setSelectedValue(chosen.value)
    }

    /**
     * style css
     */
    const errorStyle = {
        color: '#f44336',
        fontSize: '12px',
        fontWeight: 500,
        fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    }
    return (
        <FormControl component="fieldset" className="myInput">
            <label htmlFor="radio" className="pull-left">
                {label}
            </label>
            <RadioGroup
                aria-label="position"
                id="radio"
                name="position"
                value={selectedValue.toString() || chosenItem.toString()}
                onChange={e => handleChange(e)}
                row
                style={{
                    padding: '17px 14px',
                    // border: 1px solid #49a0ae;
                    // padding: 0px 0px 0px 14px;
                    // margin: 14px 8px;
                    // height: 49px;
                    color: isError && 'red',
                }}
            >
                <Grid item xs={6} sm={6}>
                    <FormControlLabel
                        value={list[0].value.toString()}
                        control={<Radio color="primary" />}
                        label={list[0].label}
                        labelPlacement="end"
                    />
                </Grid>
                <Grid item xs={6} sm={6}>
                    <FormControlLabel
                        value={list[1].value.toString()}
                        control={<Radio color="primary" />}
                        label={list[1].label}
                        labelPlacement="end"
                    />
                </Grid>
            </RadioGroup>
            {isError && (
                <label htmlFor="tel2" style={errorStyle}>
                    {errorText}
                </label>
            )}
        </FormControl>
    )
}
/**
 *  declaration des props
 */
index.propTypes = {
    label: PropTypes.element.isRequired,
    errorText: PropTypes.string.isRequired,
    chosenItem: PropTypes.object.isRequired,
    list: PropTypes.object.isRequired,
    onchange: PropTypes.func.isRequired,
    isError: PropTypes.bool.isRequired,
}

export default index
