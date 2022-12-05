/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable import/order */
/* eslint-disable camelcase */
/* eslint-disable react/destructuring-assignment */
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { red, green } from '@material-ui/core/colors'
import { withStyles } from '@material-ui/core/styles'
import { injectIntl } from 'react-intl'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Paper,
} from '@material-ui/core'
import generateKey, { removeBottomDash } from '../../shared/utility'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import CheckIcon from '@material-ui/icons/Check'
/**
 * style cellule du table
 */
const StyledTableCell = withStyles(theme => ({
    head: {
        backgroundColor: '#c7c7c7',
        fontWeight: 'bold',
        color: theme.palette.common.black,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell)
/**
 * style row table
 */
const StyledTableRow = withStyles(theme => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
}))(TableRow)

/**
 * style css
 *
 * @param {*} theme
 */
const styles = theme => ({
    root: {
        boxShadow: 'none',
        width: '100%',
        margin: 'auto',
        marginTop: theme.spacing(3),
        overflowX: 'auto',
    },
    table: {
        backgroundColor: '#e6e6e6',
        marginBottom: '20px',
        overflowY: 'auto',
    },
    headTable: {
        fontSize: '15px',
        textAlign: 'center',
    },
    fab: {
        textAlign: 'center',
        margin: theme.spacing(1),
    },
    row: {
        textAlign: 'center',
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
    button: {
        margin: theme.spacing(1),
    },
})

const Index = props => {
    const { classes, apiCall, dataApi, dataReturned, dataId, validationReclamation, onValidate, onDelete } = props
    const [state, setState] = useState(
        ((dataReturned || [])[0] || {})[dataId] === props[dataId]
            ? dataReturned
            : null
    )
    useEffect(() => {
        apiCall(dataApi)
    }, [])

    useEffect(() => {
        if (((dataReturned || [])[0] || {})[dataId] === props[dataId])
            setState(dataReturned)
    }, [JSON.stringify(dataReturned)])
    console.log(state);

    return (
        <div className="column col-md-12">
            {!(state || []).length && (
                <p className="text-center m-3">Pas de données disponible!!</p>
            )}
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            {Boolean((state || []).length) &&
                                Object.keys(state[0] || {}).map(item => (
                                    (item !== 'NumReclamation' && item !== 'id_rec') && <StyledTableCell
                                        className={classes.headTable}
                                        align="center"
                                        key={generateKey()}
                                    >
                                        {removeBottomDash(item)}
                                    </StyledTableCell>
                                ))}
                            {validationReclamation &&
                                <StyledTableCell
                                    className={classes.headTable}
                                    align="center"
                                >
                                    Acceptation
                                </StyledTableCell>}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(state || []).map(item => (

                            <StyledTableRow key={generateKey()}>
                                {Object.keys(item).map((value) => {
                                    return (
                                        (value !== 'NumReclamation' && value !== 'id_rec') && <StyledTableCell
                                            className={classes.headTable}
                                            align="center"
                                            key={generateKey()}
                                        >
                                            <div key={generateKey()}>
                                                {item[value]}
                                            </div>
                                        </StyledTableCell>
                                    )
                                })}
                                {(validationReclamation) &&
                                    <StyledTableCell
                                        className={classes.headTable}
                                        align="center"
                                    >
                                        <IconButton
                                            onClick={() => onValidate(item)}
                                            style={{ color: !item.status ? green[500] : '#b5b5b5' }}
                                            disabled={item.status}
                                        // aria-label={statusAndTxt[newstatus]}
                                        >
                                            <CheckIcon />
                                        </IconButton>
                                        <IconButton
                                            onClick={() => onDelete(item)}
                                            style={{ color: !item.status ? red[500] : '#b5b5b5' }}
                                            aria-label="Annuler"
                                            disabled={item.status}
                                        >
                                            <CloseIcon />
                                        </IconButton>
                                    </StyledTableCell>}
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </div>
    )
}

/* Proptypes */
/**
 *  declaration des props
 */
Index.propTypes = {
    dataApi: PropTypes.object.isRequired,
    classes: PropTypes.func.isRequired,
    dataReturned: PropTypes.array.isRequired,
    apiCall: PropTypes.func.isRequired,
    dataId: PropTypes.string.isRequired,
    validationReclamation: PropTypes.string.isRequired,
    onDelete: PropTypes.func.isRequired,
    onValidate: PropTypes.func.isRequired,
}

export default injectIntl(withStyles(styles)(Index))
