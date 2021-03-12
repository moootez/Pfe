/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/forbid-prop-types */
import React from 'react'
import PropTypes from 'prop-types'
import FormControl from '@material-ui/core/FormControl'
import {
    MenuItem,
    Select,
    Input,
    ListItemText,
    Checkbox,
} from '@material-ui/core'

/**
 * style menu select props
 */
const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
            textAlign: 'right',
        },
    },
}
/**
 *
 *
 * @class multiSelect
 * @extends {React.Component}
 */
class multiSelect extends React.Component {
    /**
     * declaration des props
     *
     * @static
     * @memberof multiSelect
     */
    static propTypes = {
        label: PropTypes.element,
        list: PropTypes.array.isRequired,
        selectedItem: PropTypes.object,
        onchange: PropTypes.func.isRequired,
        name: PropTypes.element.isRequired,
        onClose: PropTypes.func,
        errorText: PropTypes.string,
        isError: PropTypes.bool,
    }

    static defaultProps = {
        label: '',
        selectedItem: 0,
        errorText: '',
        isError: false,
        onClose: () => {},
    }

    constructor(props) {
        super(props)
        const { selectedItem, list } = props

        let value = []
        if (selectedItem.length && list.length)
            value = selectedItem
                .toString()
                .split(',')
                .map(
                    i =>
                        list.find(l => l.value.toString() === i.toString())
                            .label
                )
        this.state = {
            selectedValue: value,
        }
    }

    /**
     * change input payload
     *
     * @memberof multiSelect
     */
    handleChange = event => {
        const { onchange, list, name } = this.props
        let selectedIds = []

        if (name === 'categorie')
            try {
                selectedIds = list
                    .filter(i => event.target.value.includes(i.rang))
                    .map(i => i.value)
                // .join(',')
            } catch (error) {
                selectedIds = []
            }
        else
            try {
                selectedIds = list
                    .filter(i => event.target.value.includes(i.label))
                    .map(i => i.value)
                // .join(',')
            } catch (error) {
                selectedIds = []
            }
        onchange({ target: { value: selectedIds, name } })
        this.setState({ selectedValue: event.target.value })
    }

    /* render */
    /**
     *
     *
     * @returns
     * @memberof Actions
     */
    render() {
        const { label, list, isError, errorText, onClose, name } = this.props

        const { selectedValue } = this.state
        const style = {
            backgroundColor: 'transparent',
            border: '1px solid #000000',
            borderRadius: 0,
            marginRight: '8px',
            marginLeft: '8px',
            width: 'auto',
            height: '49px',
            lineHeight: '10px',
        }
        const errorStyle = {
            color: '#f44336',
            fontSize: '12px',
            margin: '2px 16px',
            fontFamily: '"Open Sans", sans-serif',
        }

        return (
            <FormControl className="w-100">
                <label htmlFor="select">{label}</label>
                <Select
                    style={{
                        ...style,
                        borderColor: isError ? '#f44336' : '#000000',
                    }}
                    multiple
                    value={selectedValue}
                    onChange={this.handleChange}
                    input={<Input id="select-multiple-checkbox" />}
                    renderValue={selected => selected.join(', ')}
                    MenuProps={MenuProps}
                    className="mt-1"
                    onClose={onClose}
                >
                    {name === 'categorie' &&
                        list.map(item => (
                            <MenuItem
                                key={item.value}
                                value={item.rang}
                                name={name}
                            >
                                <Checkbox
                                    checked={
                                        selectedValue.indexOf(item.rang) > -1
                                    }
                                />
                                <ListItemText primary={item.rang} />
                            </MenuItem>
                        ))}
                    {name === 'fonction' &&
                        list.map(item => (
                            <MenuItem
                                key={item.value}
                                value={item.label}
                                name={name}
                            >
                                <Checkbox
                                    checked={
                                        selectedValue.indexOf(item.label) > -1
                                    }
                                />
                                <ListItemText primary={item.label} />
                            </MenuItem>
                        ))}
                </Select>
                {isError && <label style={errorStyle}>{errorText}</label>}
            </FormControl>
        )
    }
}

export default multiSelect
