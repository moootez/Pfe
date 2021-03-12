import React from 'react'
import PropTypes from 'prop-types'
import FormGroup from '@material-ui/core/FormGroup'

/**
 *
 *
 * @param {*} props
 * @returns
 */
const index = props => {
    /**
     * declaration props
     */
    const { label, defaultValue, name } = props
    // const classes = useStyles()
    return (
        <FormGroup
            className={name === 'codeInsc' ? 'w-50' : 'w-100'}
            row
            style={{ padding: '4px' }}
        >
            <div style={{ fontSize: '19px' }}>
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control,jsx-a11y/label-has-for */}
                <label>
                    <b>{label}</b>
                </label>
            </div>
            <div style={{ fontSize: '19px', paddingRight: '11px' }}>
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control,jsx-a11y/label-has-for */}
                <label
                    // htmlFor="input"
                    style={{ direction: 'ltr' }}
                >
                    {defaultValue}
                </label>
            </div>
        </FormGroup>
    )
}
/**
 *  Inialisation
 */
index.defaultProps = {
    label: '',
    defaultValue: '',
    name: '',
}
/**
 *  declaration des props
 */
index.propTypes = {
    label: PropTypes.string,
    defaultValue: PropTypes.string,
    name: PropTypes.string,
}
export default index
