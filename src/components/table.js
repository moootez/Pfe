import React, { Fragment, PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import Fab from '@material-ui/core/Fab'
import TableFooter from '@material-ui/core/TableFooter'
import TablePagination from '@material-ui/core/TablePagination'
import Immutable from 'seamless-immutable'
import Data from '../data/dataDeclaration.json'
import ButtonPlus from './ui/buttonPlus/index'
import generateKey from '../shared/utility'

/**
 * style table cellule
 */
const CustomTableCell = withStyles(() => ({
    head: {
        backgroundColor: '#1d1d1b',
        color: 'white',
    },
    body: {
        fontSize: 10,
    },
}))(TableCell)
/**
 * style css
 * @param {*} theme
 */
const styles = theme => ({
    root: {
        boxShadow: 'none',
        width: '94%',
        marginInlineStart: '4%',
        marginTop: theme.spacing(3),
        overflowX: 'auto',
    },
    table: {
        backgroundColor: '#e6e6e6',
        marginBottom: '20px',
        minWidth: 700,
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
})

/**
 *
 *
 * @class CustomizedTable
 * @extends {PureComponent}
 */
class CustomizedTable extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            page: 0,
            rowsPerPage: 5,
            rowsS: Immutable.asMutable(props.rows.slice(0, 5)),
        }
    }

    /**
     *
     *
     * @param {*} nextProps
     * @memberof
     */
    componentWillReceiveProps(nextProps) {
        const { rows, searchValue, headers } = this.props
        if (nextProps.rows !== rows) {
            this.setState(previousState => ({
                rowsS: Immutable.asMutable(
                    nextProps.rows.slice(0, previousState.count)
                ),
                page: 0,
            }))
        }
        if (nextProps.searchValue !== searchValue) {
            this.filterReferentials(nextProps.searchValue)
        }
        console.log(headers)
    }

    /**
     * filter recherche
     *
     * @memberof CustomizedTable
     */
    filterReferentials = value => {
        let filtredRef = null
        filtredRef = []
        const { rows } = this.props
        if (value.length === 0) {
            this.setState(previousState => ({
                rowsS: Immutable.asMutable(rows.slice(0, previousState.count)),
            }))
        } else {
            Immutable.asMutable(rows).forEach(ref =>
                Object.keys(ref).forEach(e => {
                    if (
                        ref[e]
                            .toString()
                            .toLowerCase()
                            .indexOf(value.toLowerCase()) > -1 &&
                        filtredRef.indexOf(ref) === -1
                    ) {
                        filtredRef.push(ref)
                    }
                })
            )
            this.setState({ rowsS: filtredRef })
        }
    }

    /**
     * changer page
     *
     * @memberof CustomizedTable
     */
    handleChangePage = (event, newPage) => {
        this.setState({ page: newPage })
    }

    /**
     * set state limit page
     *
     * @memberof CustomizedTable
     */
    setRowsPerPage = nb => {
        this.setState({ rowsPerPage: nb })
    }

    /**
     * changer limit
     *
     * @memberof CustomizedTable
     */
    handleChangeRowsPerPage = event => {
        this.setRowsPerPage(parseInt(event.target.value, 10))
        this.setState({ page: 0 })
    }

    returnValue = (value, element) => {
        if (value) {
            if (typeof value === 'object') return value.intituleAr
            if (element === 'assujettie') {
                if (value.toString() === 'true') return 'Oui'
                return 'Non'
            }
            return value.toString()
        }
        return ''
    }

    /* render */
    /**
     *
     *
     * @returns
     * @memberof Actions
     */
    render() {
        const {
            classes,
            headers,
            rows,
            editAction,
            deleteAction,
            categorie,
            history,
            lng,
        } = this.props
        const { page, rowsPerPage, rowsS } = this.state
        const actions = 'Choisir'

        return (
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            {headers.map(head => {
                                if (
                                    head !== 'categorie' &&
                                    head !== 'id' &&
                                    head !== 'publiable' &&
                                    !head.includes('published')
                                ) {
                                    return (
                                        <CustomTableCell key={generateKey()}>
                                            <p className={classes.headTable}>
                                                <b>
                                                    {
                                                        Data.listInputHeaders[
                                                            head
                                                        ]
                                                    }
                                                </b>
                                            </p>
                                        </CustomTableCell>
                                    )
                                }
                                return (
                                    <CustomTableCell key={generateKey()}>
                                        {null}
                                    </CustomTableCell>
                                )
                            })}
                            {deleteAction || editAction ? (
                                <CustomTableCell>
                                    <p className={classes.headTable}>
                                        {actions}
                                    </p>
                                </CustomTableCell>
                            ) : (
                                <Fragment />
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rowsS
                            .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                            )
                            .map(item => (
                                <TableRow className={classes.row} key={item.id}>
                                    {Object.keys(item).map(element => {
                                        if (
                                            element !== 'deleted' &&
                                            element !== 'children' &&
                                            element !== 'categorie' &&
                                            element !== 'annee' &&
                                            element !== 'id' &&
                                            element !== 'publiable' &&
                                            !element.includes('published')
                                        ) {
                                            return (
                                                <CustomTableCell
                                                    className={
                                                        classes.headTable
                                                    }
                                                    component="th"
                                                    scope="row"
                                                    key={generateKey()}
                                                >
                                                    <div key={generateKey()}>
                                                        {this.returnValue(
                                                            item[element],
                                                            element
                                                        )}
                                                    </div>
                                                </CustomTableCell>
                                            )
                                        }
                                        return (
                                            <CustomTableCell
                                                key={generateKey()}
                                            >
                                                {null}
                                            </CustomTableCell>
                                        )
                                    })}
                                    <CustomTableCell>
                                        {editAction && (
                                            <Fab
                                                color="secondary"
                                                aria-label="edit"
                                                className={classes.fab}
                                                size="small"
                                            >
                                                <EditIcon
                                                    onClick={() =>
                                                        editAction(item)
                                                    }
                                                />
                                            </Fab>
                                        )}
                                        {deleteAction && (
                                            <Fab
                                                aria-label="delete"
                                                className={classes.fab}
                                                size="small"
                                            >
                                                <DeleteIcon
                                                    onClick={() =>
                                                        deleteAction(item.id)
                                                    }
                                                    color="primary"
                                                />
                                            </Fab>
                                        )}
                                    </CustomTableCell>
                                </TableRow>
                            ))}
                        <TableRow>
                            {rowsS.length > 0 &&
                                Object.keys(rowsS[0]).map((key, i) => {
                                    if (i !== Object.keys(rowsS[0]).length - 1)
                                        return (
                                            <CustomTableCell
                                                key={generateKey()}
                                            />
                                        )
                                    return null
                                })}
                            {rows.length > 0 && (
                                <CustomTableCell>
                                    <ButtonPlus
                                        color="primary"
                                        classes={classes}
                                        fn={() =>
                                            history.push({
                                                pathname: 'referencial/add',
                                                state: {
                                                    categorie,
                                                    listInputs: headers,
                                                },
                                            })
                                        }
                                    />
                                </CustomTableCell>
                            )}
                        </TableRow>
                    </TableBody>
                    <TableFooter style={{ backgroundColor: '#f4f4f4' }}>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                labelRowsPerPage={
                                    lng === 'ar'
                                        ? 'خطوط لكل صفحة'
                                        : 'Lignes par page'
                                }
                                count={rows.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                backIconButtonProps={{
                                    'aria-label': 'next page',
                                }}
                                nextIconButtonProps={{
                                    'aria-label': 'previous page',
                                }}
                                onChangePage={this.handleChangePage}
                                onChangeRowsPerPage={
                                    this.handleChangeRowsPerPage
                                }
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </Paper>
        )
    }
}
/**
 *  Inialisation
 */
CustomizedTable.defaultProps = {
    editAction: null,
    deleteAction: null,
    searchValue: '',
    row: null,
}
/**
 *  declaration des props
 */
CustomizedTable.propTypes = {
    classes: PropTypes.object.isRequired,
    headers: PropTypes.array.isRequired,
    rows: PropTypes.array.isRequired,
    row: PropTypes.object,
    editAction: PropTypes.func,
    deleteAction: PropTypes.func,
    searchValue: PropTypes.string,
    lng: PropTypes.string.isRequired,
    categorie: PropTypes.string.isRequired,
    history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
}
export default withStyles(styles)(CustomizedTable)
