'use client'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, {tableCellClasses} from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import {styled} from '@mui/material/styles'

const StyledTableCell = styled(TableCell)(({theme}) => ({
    backgroundColor: 'var(--secondly-background-color)',
    color: 'var(--font-color)',

    '&:last-child td, &:last-child th': {
        borderBottom: 0,
    },

    [`&.${tableCellClasses.head}`]: {
        borderBottom: '1px solid var(--border-color)',
        fontWeight: theme.typography.fontWeightMedium,
        paddingRight: 0,
        paddingBottom: 4,
        paddingLeft: 0,
        paddingTop: 4,
        color: 'var(--secondly-font-color)'
    },

    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        borderBottom: '1px solid var(--border-color)',
        paddingRight: 0,
        paddingBottom: 12,
        paddingLeft: 0,
        paddingTop: 12,
    },

}))

const StyledTableRow = styled(TableRow)(() => ({
    '&:last-child': {
        [`& ${StyledTableCell}`]: {
            borderBottom: 0,
        },
    },
}))

function createData(name: string, value1: number, value2: number) {
    return {name, value1, value2}
}

const rows = [
    createData('Row 1', 123, 456),
    createData('Row 2', 123, 456),
    createData('Row 3', 123, 456),
    createData('Row 4', 123, 456),
    createData('Row 5', 123, 456),
    createData('Row 6', 123, 456),
    createData('Row 7', 123, 456),
]

export default function CustomDarkTable() {
    return (
        <TableContainer
            data-testid={'table-container'}
            component={Paper}
            sx={{
                backgroundColor: 'var(--secondly-background-color)',
                border: '1px solid var(--border-color)',
                width: 575,
                boxShadow: 'none',
                padding: '24px',

                '@media (max-width: 1300px)': {
                    width: '300px'
                },
            }}
        >
            <Box sx={{
                paddingBottom: 0,
                backgroundColor: 'var(--secondly-background-color)',
            }}>
                <Typography
                    variant="h6"
                    component="h2"
                    sx={{
                        color: 'var(--font-color)',
                        fontWeight: 400,
                        fontSize: '1.25rem',
                    }}
                >
                    Title
                </Typography>
            </Box>

            <Table aria-label="custom dark table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Col 1</StyledTableCell>
                        <StyledTableCell align="right">Col 2</StyledTableCell>
                        <StyledTableCell align="right">Col 3</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <StyledTableRow key={row.name}>

                            <StyledTableCell component="th" scope="row">
                                {row.name}
                            </StyledTableCell>

                            <StyledTableCell align="right">{row.value1}</StyledTableCell>
                            <StyledTableCell align="right">{row.value2}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}