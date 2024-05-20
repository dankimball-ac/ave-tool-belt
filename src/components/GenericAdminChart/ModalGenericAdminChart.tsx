import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/DeleteOutlined'
import EditIcon from '@mui/icons-material/Edit'
import TextEditor from '@/components/TextEditor/JoditTextEditor'

import {
  Box,
  Button,
  Divider,
  FormControl,
  InputLabel,
  Modal,
  OutlinedInput,
  Paper,
  Typography,
  useTheme,
} from '@mui/material'
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridEventListener,
  GridRowEditStopReasons,
  GridRowId,
  GridRowModel,
  GridRowModesModel,
  GridRowsProp,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
  gridClasses,
} from '@mui/x-data-grid'
import { useState } from 'react'

const fullScreenModalStyle = {
  position: 'absolute',
  top: '0%',
  left: '-50%',
  width: '100%',
  height: '60%',
  overflow: 'auto',
  bgcolor: 'background.paper',
  boxShadow: 24,
}

export const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: 'none',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
  '@media (max-width: 400px)': {
    width: '100%',
  },
}

const editModalStyle = {
  transform: 'translate(50%, 25%)',
  width: '50%',
  height: '60%',
  bgcolor: 'background.paper',
  border: 'none',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
  overflow: 'auto',
  '@media (max-width: 600px)': {
    ...fullScreenModalStyle,
  },
}

export const modalButtonLocation = {
  display: 'flex', // Use flex layout
  justifyContent: 'flex-end', // Align to the start of the flex container
  alignItems: 'flex-end', // Align items to the end of the container vertically
  paddingTop: '25px',
  width: '100%', // Full width to allow flex to justify content
}

export interface DataGridChartProps {
  headers: GridColDef[]
  data: any
  baseRowType: any
  onDelete(data: any): void
  onEdit(data: any): void
  onCreate(data: any): void
  pageName: string
}

interface EditToolbarProps {
  baseRowType: any
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel
  ) => void
  setAddOpen: (open: boolean) => void // new
  setNewHeader: (header: string) => void // new
  setNewContent: (content: string) => void // new
}

interface DataRow {
  id: number
  header: string
  body: string
}

// interface HtmlContentProps {
//   html: string
// }

export function EditToolbar(props: EditToolbarProps) {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarExport />
    </GridToolbarContainer>
  )
}

function ModalGenericAdminChart({
  headers,
  data,
  baseRowType,
  onDelete,
  onEdit,
  onCreate,
  pageName,
}: DataGridChartProps) {
  const [rows, setRows] = useState(data)
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({})
  const [open, setOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [id, setId] = useState(-1)
  //edit modal states
  const [editedHeader, setEditedHeader] = useState('')
  const [editedContent, setEditedContent] = useState('')
  //add record states
  const [addOpen, setAddOpen] = useState(false)
  const [newHeader, setNewHeader] = useState('')
  const [newContent, setNewContent] = useState('')

  const theme = useTheme()
  const mode = theme.palette.mode

  const handleClose = () => {
    setOpen(false)
    setEditOpen(false)
  }

  const handleClick = () => {
    setNewHeader('') // Reset the header for new entry
    setNewContent('') // Reset the content for new entry
    setAddOpen(true) // Open the add modal
  }

  const handleModalAdd = () => {
    const newId = Math.max(...rows.map((r: DataRow) => r.id), 0) + 1 // Generate a new ID
    const newRow = {
      id: newId,
      header: newHeader,
      body: newContent,
      isNew: true,
    }
    setRows([newRow, ...rows])
    onCreate(newRow)
    setAddOpen(false)
  }

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (
    params,
    event
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true
    }
  }

  const handleEditClick = (id: GridRowId) => () => {
    const currentRow = rows.find((row: DataRow) => row.id === id)
    if (currentRow) {
      setEditedHeader(currentRow.header)
      setEditedContent(currentRow.body)
    }
    setId(Number(id))
    setEditOpen(true)
  }

  const handleModalSave = () => {
    const updatedRow: DataRow = {
      ...rows.find((row: DataRow) => row.id === id),
      header: editedHeader,
      body: editedContent,
    }

    setRows((prevRows: DataRow[]) => {
      return prevRows.map((row) => (row.id === id ? updatedRow : row))
    })

    onEdit(updatedRow)
    setEditOpen(false)
  }

  const handleDeleteClick = (id: GridRowId) => {
    setOpen(false)
    setRows(rows.filter((row: any) => row.id !== (id as number)))
    setId(-1)
    onDelete(rows.find((row: any) => row.id === (id as number)))
  }

  const processRowUpdate = (newRow: GridRowModel, oldRow: GridRowModel) => {
    if (newRow?.isNew) {
      onCreate(newRow)
    } else if (
      Object.values(newRow).toString() !== Object.values(oldRow).toString()
    ) {
      onEdit(newRow)
    }

    const updatedRow = { ...newRow, isNew: false }
    setRows(rows.map((row: any) => (row.id === newRow.id ? updatedRow : row)))
    return updatedRow
  }

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel)
  }

  const actionColumns: GridColDef[] = [
    {
      field: 'edit',
      type: 'actions',
      headerName: 'Edit',
      width: 70,
      cellClassName: 'edit-action',
      getActions: ({ id }) => [
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Edit"
          onClick={handleEditClick(id)}
          color="inherit"
          key={`e${id}`}
        />,
      ],
    },
    {
      field: 'delete',
      type: 'actions',
      headerName: 'Delete',
      width: 70,
      cellClassName: 'delete-action',
      getActions: ({ id }) => [
        <GridActionsCellItem
          icon={<DeleteIcon color="error" />}
          label="Delete"
          onClick={() => {
            setOpen(true)
            setId(id as number)
          }}
          color="inherit"
          key={`d${id}`}
        />,
      ],
    },
  ]

  //used to convert html text to what it should be
  const modifiedHeaders = headers.map((col) => {
    if (col.field === 'header' || col.field === 'body') {
      return {
        ...col,
        renderCell: (params) => (
          <Typography dangerouslySetInnerHTML={{ __html: params.value }} />
        ),
      }
    }
    return col
  })

  const columnsWithActions = modifiedHeaders.concat(actionColumns)

  return (
    <>
      <Box display="flex" justifyContent="flex-end" alignItems="center">
        <Button
          variant="contained"
          color="success"
          startIcon={<AddIcon />}
          onClick={handleClick}
          sx={{ marginBottom: 1 }}
        >
          Add {pageName}
        </Button>
      </Box>
      <Paper>
        <DataGrid
          rows={rows}
          columns={columnsWithActions}
          getRowHeight={() => 'auto'}
          getEstimatedRowHeight={() => 200}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          autoHeight
          slots={{ toolbar: EditToolbar }}
          slotProps={{
            toolbar: {
              baseRowType,
              setRows,
              setRowModesModel,
              setAddOpen,
              setNewHeader,
              setNewContent,
            },
          }}
          sx={{
            [`& .${gridClasses.cell}`]: {
              paddingTop: '20px',
              paddingBottom: '20px',
            },
            [`& .${gridClasses.columnHeaders}`]: {
              position: 'sticky',
              backgroundColor: mode === 'light' ? 'white' : '#1F2A40',
              zIndex: '1',
            },
            [`& .${gridClasses.toolbarContainer}`]: {
              position: 'sticky',
              top: '0',
              backgroundColor: mode === 'light' ? 'white' : '#1F2A40',
              zIndex: '1',
            },
            [`& .${gridClasses.main}`]: {
              overflow: 'inherit',
            },
          }}
        />
      </Paper>

      <Modal key={`M${id}`} open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Typography sx={{ fontWeight: 'bold' }}>Delete FAQ</Typography>
          <Divider sx={{ margin: '10px 0', backgroundColor: 'gray' }} />
          <Typography>Are you sure you want to delete this FAQ?</Typography>
          <br />
          <Typography sx={{ fontWeight: 'bold' }}>
            {data[id - 1]?.header}
          </Typography>
          <Box sx={modalButtonLocation}>
            <Button onClick={handleClose}>No</Button>
            <Button
              onClick={() => handleDeleteClick(id)}
              style={{ color: 'red' }}
            >
              Delete FAQ
            </Button>
          </Box>
        </Box>
      </Modal>

      <Modal open={editOpen} onClose={() => setEditOpen(false)}>
        <Box sx={editModalStyle}>
          <h3>Edit {pageName}</h3>
          <FormControl fullWidth sx={{ marginBottom: '15px' }}>
            <InputLabel>Header</InputLabel>
            <OutlinedInput
              value={editedHeader}
              onChange={(e) => setEditedHeader(e.target.value)}
              label="Header"
            />
          </FormControl>
          <TextEditor data={editedContent} onChange={setEditedContent} />
          <Box sx={modalButtonLocation}>
            <Button onClick={() => setEditOpen(false)}>Close</Button>
            <Button onClick={handleModalSave}>Save</Button>
          </Box>
        </Box>
      </Modal>

      <Modal open={addOpen} onClose={() => setAddOpen(false)}>
        <Box sx={editModalStyle}>
          <h3>Add New Record</h3>
          <FormControl fullWidth sx={{ marginBottom: '15px' }}>
            <InputLabel>Header</InputLabel>
            <OutlinedInput
              value={newHeader}
              onChange={(e) => setNewHeader(e.target.value)}
              label="Header"
            />
          </FormControl>
          <TextEditor data={newContent} onChange={setNewContent} />
          <Box sx={modalButtonLocation}>
            <Button onClick={() => setAddOpen(false)}>Close</Button>
            <Button onClick={handleModalAdd}>Add Record</Button>
          </Box>
        </Box>
      </Modal>
    </>
  )
}

export default ModalGenericAdminChart
