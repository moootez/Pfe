import React from 'react'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import PropTypes from 'prop-types'

/**
 *
 *
 * @export
 * @param {*} {
 *     label,
 *     name,
 *     onchange,
 *     selectedValue,
 * }
 * @returns
 */
export default function index({ label, name, onchange, selectedValue }) {
    /**
     * hooks numbers
     */
    // const [defaultValue, setDefaultValue] = useState(true)
    /**
     * change checked
     *
     * @param {*} e
     */
    const handleChange = e => {
        onchange(e.target.name, e.target.checked)
        // setDefaultValue(e.target.checked)
    }

    return (
        <FormGroup className="font-weight-bold text-uppercase text-primary" row>
            <FormControlLabel
                control={
                    <Checkbox
                        checked={selectedValue}
                        onChange={handleChange}
                        value={selectedValue}
                        color="primary"
                        name={name}
                    />
                }
                label={label}
            />
        </FormGroup>
    )
}
/**
 *  declaration des props
 */
index.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onchange: PropTypes.func.isRequired,
    selectedValue: PropTypes.bool.isRequired,
}
