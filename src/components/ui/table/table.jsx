import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
// import clsx from 'clsx'
import { FormattedMessage } from 'react-intl'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import Immutable from 'seamless-immutable'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button'
import TableCell from '@material-ui/core/TableCell'
import DeleteIcon from '@material-ui/icons/Delete'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'
// import Toolbar from '@material-ui/core/Toolbar'
// import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import { Fab, Typography } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import Checkbox from '@material-ui/core/Checkbox'
import Link from '@material-ui/core/Link'
import generateKey from '../../../shared/utility'
import './table.css'

// import Checkbox from '@material-ui/core/Checkbox'
// import IconButton from '@material-ui/core/IconButton'
// import Tooltip from '@material-ui/core/Tooltip'
// import FormControlLabel from '@material-ui/core/FormControlLabel'
// import Switch from '@material-ui/core/Switch'
// import DeleteIcon from '@material-ui/icons/Delete'
// import FilterListIcon from '@material-ui/icons/FilterList'

// function createData(name, calories, fat, carbs, protein) {
//     return { name, calories, fat, carbs, protein }
// }

/**
 * style cellule table
 */
const CustomTableCell = withStyles(() => ({
    head: {
        backgroundColor: '#1d1d1b',
        color: 'white',
        borderBottom: '0px',
    },
}))(TableCell, TableSortLabel)

/**
 * style ligne table
 */
const StyledTableRow = withStyles(theme => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        padding: '3% 5% 1% ',
    },
}))(TableRow)

// function descendingComparator(a, b, orderBy) {
//     if (
//         b[orderBy] &&
//         a[orderBy] &&
//         b[orderBy].toUpperCase() < a[orderBy].toUpperCase()
//     ) {
//         return -1
//     }
//     if (
//         b[orderBy] &&
//         a[orderBy] &&
//         b[orderBy].toUpperCase() > a[orderBy].toUpperCase()
//     ) {
//         return 1
//     }
//     return 0
// }

// function getComparator(order, orderBy) {
//     return order === 'desc'
//         ? (a, b) => descendingComparator(a, b, orderBy)
//         : (a, b) => -descendingComparator(a, b, orderBy)
// }

// function stableSort(array, comparator) {
//     const stabilizedThis = array.map((el, index) => [el, index])
//     stabilizedThis.sort((a, b) => {
//         const order = comparator(a[0], b[0])
//         if (order !== 0) return order
//         return a[1] - b[1]
//     })
//     return stabilizedThis.map(el => el[0])
// }

/**
 * function pour head table
 *
 * @param {*} props
 * @returns
 */
function EnhancedTableHead(props) {
    const {
        classes,
        headCells,
        // onSelectAllClick,
        order,
        orderBy,
        // numSelected,
        // rowCount,
        onRequestSort,
        pagination,
        type,
    } = props

    /**
     * sort table
     *
     * @param {*} property
     */
    const createSortHandler = property => event => {
        onRequestSort(event, property)
    }
    return (
        <TableHead>
            <TableRow
                style={{ textAlign: type === 'saisieAssujetti' && 'center' }}
            >
                {/* <TableCell padding="checkbox">
                    <Checkbox
                        indeterminate={
                            numSelected > 0 && numSelected < rowCount
                        }
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{ 'aria-label': 'select all desserts' }}
                    />
                </TableCell> */}
                {(headCells || []).map(headCell => (
                    <CustomTableCell
                        key={headCell.id}
                        align="centre"
                        padding={headCell.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        {pagination ? (
                            headCell.id !== 'action' ? (
                                <TableSortLabel
                                    active={orderBy === headCell.id}
                                    direction={
                                        orderBy === headCell.id ? order : 'asc'
                                    }
                                    onClick={createSortHandler(headCell.id)}
                                    style={{ fontSize: '1.02rem' }}
                                >
                                    <b>{headCell.label}</b>
                                    {orderBy === headCell.id ? (
                                        <span
                                            className={classes.visuallyHidden}
                                        >
                                            {order === 'desc'
                                                ? 'sorted descending'
                                                : 'sorted ascending'}
                                        </span>
                                    ) : null}
                                </TableSortLabel>
                            ) : (
                                headCell.id !== 'id' && (
                                    <TableSortLabel>
                                        {headCell.label}
                                    </TableSortLabel>
                                )
                            )
                        ) : (
                            <CustomTableCell style={{ padding: '6px' }}>
                                <b>{headCell.label}</b>
                            </CustomTableCell>
                        )}
                    </CustomTableCell>
                ))}
            </TableRow>
        </TableHead>
    )
}
/**
 *  declaration des props
 */
EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    // numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    // onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    headCells: PropTypes.object.isRequired,
    // rowCount: PropTypes.number.isRequired,
    pagination: PropTypes.bool.isRequired,
    type: PropTypes.string.isRequired,
}
/**
 * style css
 */
const useStyles = makeStyles(theme => ({
    root: {
        // width: '95%',
        // paddingInlineStart: '62px',
        // padding: '3% 0% 0% 0%',
        // paddingBlockStart: '44px',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
        backgroundColor: '#f4f4f4',
        boxShadow: '0 0 #f4f4f4',
    },
    table: {
        minWidth: 750,
        boxShadow:
            ' 0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 0px 3px 0px rgba(0,0,0,0.12)',
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
}))

/**
 *
 *
 * @param {*} {
 *     lng,
 *     rowsS,
 *     headers,
 *     searchValue,
 *     consulterAction,
 *     paramTab,
 *     pagination,
 *     consultation,
 *     meta,
 *     getReceviedAction,
 *     status,
 *     fn,
 *     type,
 *     saisieAction,
 *     scanAction,
 *     setArrayDecAffecter,
 *     editAction,
 *     filtredTable,
 *     deleteRef,
 * }
 * @returns
 */
const EnhancedTable = ({
    lng,
    rowsS,
    headers,
    searchValue,
    consulterAction,
    paramTab,
    pagination,
    consultation,
    meta,
    getReceviedAction,
    status,
    fn,
    type,
    saisieAction,
    scanAction,
    setArrayDecAffecter,
    editAction,
    filtredTable,
    deleteRef,
}) => {
    /**
     * hooks numbers
     */
    // export default function EnhancedTable() {
    const classes = useStyles()
    const [order, setOrder] = React.useState('asc')
    const [orderBy, setOrderBy] = React.useState('')
    const [selected, setSelected] = React.useState([])
    const [page, setPage] = React.useState(1)
    // const [dense, setDense] = React.useState(false)
    const [rowsPerPage, setRowsPerPage] = React.useState(5)
    const [rows, setRows] = React.useState([])
    const [arrayDec, setArrayDec] = React.useState([])

    /* life cycle */

    useEffect(() => {
        setRows(Immutable.asMutable(rowsS))
        setRowsPerPage(meta.limit)
        setPage(meta.page)
    }, [rowsS])

    /**
     * sort table
     *
     * @param {*} event
     * @param {*} property
     */
    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc'
        setOrder(isAsc ? 'desc' : 'asc')
        setOrderBy(property)
        paramTab({
            limit: rowsPerPage,
            page,
            key: property,
            order: isAsc ? 'desc' : 'asc',
        })
    }

    /**
     * filter table
     *
     * @param {*} value
     */
    const filter = value => {
        let filtredRef = null
        filtredRef = []

        if (value === '') {
            setRows(Immutable.asMutable(rowsS))
        } else {
            Immutable.asMutable(rowsS).forEach(ref =>
                Object.keys(ref).forEach(e => {
                    console.log('object', typeof ref[e] === 'object')

                    if (
                        typeof ref[e] === 'object' &&
                        ref[e] &&
                        (lng === 'ar'
                            ? ref[e].intituleAr
                            : lng === 'fr'
                            ? ref[e].intituleFr
                            : ref[e].intituleEn
                        )
                            .toString()
                            .toLowerCase()
                            .indexOf(value.toLowerCase()) > -1 &&
                        filtredRef.indexOf(ref) === -1
                    ) {
                        filtredRef.push(ref)
                    }
                    if (
                        typeof ref[e] !== 'object' &&
                        ref[e] &&
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
            setRows(filtredRef)
        }
    }

    /* life cycle */

    useEffect(() => {
        filter(searchValue)
    }, [searchValue])

    /**
     * select all rows
     *
     * @param {*} event
     */
    const handleSelectAllClick = event => {
        if (event.target.checked) {
            const newSelecteds = rows.map(n => n.name)
            setSelected(newSelecteds)
            return
        }
        setSelected([])
    }

    /**
     *
     *
     * @param {*} event
     * @param {*} name
     */
    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name)
        let newSelected = []

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name)
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1))
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1))
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            )
        }

        setSelected(newSelected)
    }

    /**
     * change page table
     *
     * @param {*} event
     * @param {*} newPage
     */
    const handleChangePage = (event, newPage) => {
        setPage(newPage + 1)
        if (orderBy !== '')
            paramTab({
                limit: rowsPerPage,
                page: newPage + 1,
                key: orderBy,
                order,
            })
        else
            paramTab({
                limit: rowsPerPage,
                page: newPage + 1,
                order,
            })
    }

    /**
     * change limit table
     *
     * @param {*} event
     */
    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10))
        if (orderBy !== '')
            paramTab({
                limit: parseInt(event.target.value, 10),
                page: 1,
                key: orderBy,
                order,
            })
        else
            paramTab({
                limit: parseInt(event.target.value, 10),
                page: 1,
                order,
            })
        setPage(1)
    }

    // const handleChangeDense = event => {
    //     setDense(event.target.checked)
    // }

    const isSelected = name => selected.indexOf(name) !== -1

    // const emptyRows =
    //     rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage)

    /**
     *
     *
     * @returns
     */
    const getCurruntState = () => {
        return arrayDec
    }

    /**
     * chnage checked
     *
     * @param {*} { target: { checked } }
     * @param {*} item
     */
    const handleChange = ({ target: { checked } }, item) => {
        const tabTmp1 = getCurruntState()
        if (checked) {
            setArrayDec([...tabTmp1, item.id])
            const tabTmp2 = getCurruntState()
            setArrayDecAffecter(tabTmp2)
        } else {
            setArrayDec(tabTmp1.filter(dec => dec !== item.id))
            const tabTmp3 = getCurruntState()
            setArrayDecAffecter(tabTmp3)
        }
    }

    /**
     * chnage list assujjeti
     *
     * @param {*} { target: { checked } }
     * @param {*} item
     */
    const handleChangeAssujjeti = ({ target: { checked } }, item) => {
        const tabTmp1 = getCurruntState()
        if (checked) {
            setArrayDec([...tabTmp1, filtredTable[item.index]])
            const tabTmp2 = getCurruntState()
            setArrayDecAffecter(tabTmp2)
        } else {
            setArrayDec(tabTmp1.filter(dec => dec !== filtredTable[item.index]))
            const tabTmp3 = getCurruntState()
            setArrayDecAffecter(tabTmp3)
        }
    }

    /*
     * life cycle
     */
    useEffect(() => {
        setArrayDecAffecter(arrayDec)
    }, [arrayDec])

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
                <TableContainer>
                    <Table
                        className={classes.table}
                        // aria-labelledby="tableTitle"
                        // size={dense ? 'small' : 'medium'}
                        size="medium"
                        aria-label="enhanced table"
                    >
                        <EnhancedTableHead
                            classes={classes}
                            headCells={headers}
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={meta}
                            pagination={pagination}
                            type={type}
                        />
                        <TableBody
                            style={{
                                textAlign:
                                    type === 'saisieAssujetti' && 'center',
                            }}
                        >
                            {rows.slice(0, rowsPerPage).map((row, index) => (
                                // const isItemSelected = isSelected(row.name)
                                // const labelId = `enhanced-table-checkbox-${index}`
                                <StyledTableRow
                                    hover
                                    onClick={event =>
                                        handleClick(event, row.index)
                                    }
                                    role="checkbox"
                                    align="centre"
                                    // eslint-disable-next-line jsx-a11y/aria-proptypes
                                    aria-checked={`enhanced-table-checkbox-${index}`}
                                    tabIndex={-1}
                                    // key={row.index}
                                    key={row.id}
                                    selected={isSelected(row.index)}
                                >
                                    {Object.keys(row).map(key => {
                                        if (
                                            key !== 'id' &&
                                            key !== 'index' &&
                                            key !== 'isDisabled' &&
                                            key !== 'users' &&
                                            key !== 'statusDeclarationSaisie'
                                        ) {
                                            return (
                                                <TableCell
                                                    component="th"
                                                    // id={labelId}
                                                    scope="row"
                                                    padding="11px"
                                                    key={generateKey()}
                                                >
                                                    {key !==
                                                        'codeDeclaration' &&
                                                    key !== 'intituleAr' &&
                                                    key !== 'codeInsc' ? (
                                                        key !==
                                                        'rapport_De_Contrôle' ? (
                                                            row[key] && (
                                                                <div>
                                                                    {row[key] &&
                                                                        row[
                                                                            key
                                                                        ].toString()}
                                                                </div>
                                                            )
                                                        ) : (
                                                            <div>
                                                                <Typography>
                                                                    <Link
                                                                        href=""
                                                                        onClick={() => {
                                                                            fn(
                                                                                row
                                                                            )
                                                                        }}
                                                                    >
                                                                        {row[
                                                                            key
                                                                        ] &&
                                                                            row[
                                                                                key
                                                                            ].toString()}
                                                                    </Link>
                                                                </Typography>
                                                            </div>
                                                        )
                                                    ) : (
                                                        <div>
                                                            <Typography>
                                                                <Link
                                                                    href={
                                                                        type ===
                                                                            'validationAssujetti' ||
                                                                        type ===
                                                                            'listAssujetti'
                                                                            ? ' '
                                                                            : null
                                                                    }
                                                                    onClick={() => {
                                                                        fn(row)
                                                                    }}
                                                                    className="focus"
                                                                >
                                                                    {row[key] &&
                                                                        row[
                                                                            key
                                                                        ].toString()}
                                                                </Link>
                                                            </Typography>
                                                        </div>
                                                    )}
                                                </TableCell>
                                            )
                                        }
                                        return null
                                    })}
                                    {consultation && (
                                        <TableCell align="centre">
                                            <Button
                                                aria-label="add"
                                                className={classes.button}
                                                size="small"
                                                type="submit"
                                                style={{
                                                    marginTop: '13px',
                                                    backgroundColor: '#cd121a',
                                                    color: '#fff',
                                                }}
                                                onClick={() =>
                                                    consulterAction(row.id)
                                                }
                                            >
                                                <FormattedMessage id="consultation" />
                                            </Button>
                                        </TableCell>
                                    )}
                                    {status === 'en attente de saisie' && (
                                        <Button
                                            aria-label="add"
                                            className={classes.button}
                                            size="small"
                                            type="submit"
                                            style={{
                                                marginTop: '13px',
                                                backgroundColor: '#cd121a',
                                                color: '#fff',
                                            }}
                                            onClick={() =>
                                                getReceviedAction(row)
                                            }
                                        >
                                            إستخراج وصل
                                        </Button>
                                    )}
                                    {(type === 'user' ||
                                        type === 'listQuide' ||
                                        type === 'listTextJuridique' ||
                                        type === 'listLien' ||
                                        type === 'listRapport') && (
                                        <Fab
                                            color="secondary"
                                            aria-label="edit"
                                            className={classes.fab}
                                            size="small"
                                        >
                                            <EditIcon
                                                onClick={() => editAction(row)}
                                            />
                                        </Fab>
                                    )}

                                    {(type === 'listTextJuridique' ||
                                        type === 'listLien' ||
                                        type === 'listRapport') && (
                                        <Fab
                                            aria-label="delete"
                                            className={classes.fab}
                                            size="small"
                                        >
                                            <DeleteIcon
                                                onClick={() =>
                                                    deleteRef(row.id)
                                                }
                                                color="primary"
                                            />
                                        </Fab>
                                    )}
                                    {type === 'saisie_declaration' &&
                                        row.statusDeclarationSaisie ===
                                            'en attente de saisie' && (
                                            <Button
                                                aria-label="add"
                                                className={classes.button}
                                                size="small"
                                                type="submit"
                                                style={{
                                                    marginTop: '13px',
                                                    marginRight: '13px',
                                                    backgroundColor: '#cd121a',
                                                    color: '#fff',
                                                }}
                                                onClick={() =>
                                                    saisieAction(row)
                                                }
                                            >
                                                إدخال البيانات
                                            </Button>
                                        )}
                                    {status === 'saisie' && (
                                        <Button
                                            variant="contained"
                                            color="default"
                                            className={classes.button}
                                            onClick={() => scanAction(row)}
                                        >
                                            إضافة نسخة
                                        </Button>
                                    )}
                                    {(type === 'affectation' ||
                                        type === 'validation' ||
                                        type === 'verification' ||
                                        type === 'publication' ||
                                        type === 'publicationEtablissement' ||
                                        type === 'publierDeclarant' ||
                                        type === 'validationAssujetti') && (
                                        <Checkbox
                                            variant="contained"
                                            color="primary"
                                            style={{
                                                margin: 'auto',
                                                marginTop: '0.6em',
                                            }}
                                            key={row.id}
                                            id={row.id}
                                            onClick={e =>
                                                type === 'validationAssujetti'
                                                    ? handleChangeAssujjeti(
                                                          e,
                                                          row
                                                      )
                                                    : handleChange(e, row)
                                            }
                                            disabled={
                                                (type === 'validation' &&
                                                    row.statutDeclaration ===
                                                        'مصادق عليها') ||
                                                (type === 'affectation' &&
                                                    row.statutDeclaration ===
                                                        'تمت مقاربتها') ||
                                                (type === 'verification' &&
                                                    row.statutDeclaration ===
                                                        'تامة التثبت') ||
                                                (type === 'publierDeclarant' &&
                                                    row.publishedDeclarant ===
                                                        'تم النشر') ||
                                                (type === 'publication' &&
                                                    row.listStatusPublication ===
                                                        'تم النشر')
                                            }
                                        />
                                    )}
                                    {type === 'history' && (
                                        <TableCell align="centre">
                                            <Button
                                                aria-label="add"
                                                className={classes.button}
                                                size="small"
                                                type="submit"
                                                style={{
                                                    marginTop: '13px',
                                                    backgroundColor: '#cd121a',
                                                    color: '#fff',
                                                }}
                                                onClick={() =>
                                                    consulterAction(row.id)
                                                }
                                            >
                                                تاريخ التغييرات
                                                {/* <FormattedMessage id="consultation" /> */}
                                            </Button>
                                        </TableCell>
                                    )}
                                </StyledTableRow>
                            ))}

                            {/* {emptyRows > 0 && (
                                <StyledTableRow
                                // style={{
                                //     height: (dense ? 33 : 53) * emptyRows,
                                // }}
                                >
                                    <TableCell colSpan={6} />
                                </StyledTableRow>
                            )} */}
                        </TableBody>
                    </Table>
                </TableContainer>
                {pagination && (
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={meta.total}
                        rowsPerPage={rowsPerPage}
                        page={page - 1}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                        labelRowsPerPage=""
                        labelDisplayedRows={({ from, to, count }) =>
                            lng === 'ar'
                                ? `خطوط لكل صفحة ${to}-${from} من ${count}`
                                : lng === 'fr'
                                ? `Lignes par page ${from}-${to} sur ${count}`
                                : `Rows per page ${from}-${to} of ${count}`
                        }
                        style={{
                            boxShadow:
                                ' 0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 0px 3px 0px rgba(0,0,0,0.12)',
                        }}
                    />
                )}
            </Paper>
        </div>
    )
}
/**
 *  Inialisation
 */
EnhancedTable.defaultProps = {
    searchValue: '',
    consulterAction: () => {},
    paramTab: () => {},
    pagination: true,
    consultation: false,
    meta: 0,
    getReceviedAction: () => {},
    status: '',
    fn: () => {},
    type: '',
    saisieAction: () => {},
    scanAction: () => {},
    setArrayDecAffecter: () => {},
    editAction: () => {},
    deleteRef: () => {},
    filtredTable: [],
}
/**
 *  declaration des props
 */
EnhancedTable.propTypes = {
    lng: PropTypes.string.isRequired,
    rowsS: PropTypes.object.isRequired,
    headers: PropTypes.object.isRequired,
    searchValue: PropTypes.string,
    consulterAction: PropTypes.func,
    paramTab: PropTypes.func,
    pagination: PropTypes.bool,
    consultation: PropTypes.bool,
    history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
    meta: PropTypes.number,
    status: PropTypes.string,
    getReceviedAction: PropTypes.object,
    fn: PropTypes.object,
    type: PropTypes.string,
    saisieAction: PropTypes.object,
    scanAction: PropTypes.object,
    editAction: PropTypes.func,
    setArrayDecAffecter: PropTypes.func,
    filtredTable: PropTypes.object,
    deleteRef: PropTypes.func,
}

// obtenir les données from  store state
/**
 *
 *
 * @param {*} state
 * @returns
 */
const mapStateToProps = state => {
    return {
        lng: state.info.language,
    }
}

export default connect(mapStateToProps)(EnhancedTable)
