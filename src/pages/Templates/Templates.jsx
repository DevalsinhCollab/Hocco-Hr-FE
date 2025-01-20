import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import TemplateModal from "./TemplateModal";
import { getTemplates } from "../../features/TemplateDetailSlice";
import { useNavigate } from "react-router-dom";
import { Button, InputAdornment, Menu, MenuItem, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from "@mui/icons-material/Edit";
import LaptopIcon from '@mui/icons-material/Laptop';

export default function Templates() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { templates, totalCount } = useSelector((state) => state.templateData);
  const [newModal, setNewModal] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    dispatch(getTemplates({
      page,
      pageSize,
      search: search || "",
    }));
  }, [page, pageSize, search]);

  const handleEdit = (event, data) => {
    event.stopPropagation();
    navigate(`/templates/edit/${data.row._id}`)
  }

  const handleClick = (event, data) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const columns = [
    {
      field: "1",
      headerName: "Actions",
      headerClassName: 'red-header',
      width: 100,
      renderCell: (params) => {
        return (
          <div className="d-flex gap-2">
            <Button
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={(event) => handleClick(event, params)}
            >
              <MoreVertIcon sx={{ color: "#838383" }} />
            </Button>

            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
              PaperProps={{
                sx: {
                  borderRadius: "12px",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                  marginLeft: "3rem",
                },
              }}
            >
              <MenuItem
                onClick={(event) => handleEdit(event, params)}
                sx={{ color: "#007c1b", gap: "0.3rem", fontSize: "19px" }}
              >
                <EditIcon />
                Edit
              </MenuItem>
              {/* <MenuItem
                onClick={() => handleDelete()}
                sx={{ color: "#a30000", gap: "0.3rem", fontSize: "19px" }}
              >
                <DeleteIcon />
                Delete
              </MenuItem> */}
            </Menu>
          </div>
        );
      },
    },
    {
      field: "templateName",
      headerName: "Template(s)",
      headerClassName: 'red-header',
      width: 250,
    },
    {
      field: "company",
      headerName: "Company Name",
      headerClassName: 'red-header',
      flex: 1,
      renderCell: ({ row }) => {
        return row && row.company && row.company.name || ""
      }
    },
  ];

  const handlePaginationModelChange = (model) => {
    setPage(model.page);
    setPageSize(model.pageSize);
  };

  return (
    <>
      <div className="home-content">
        <Box sx={{ display: "flex", justifyContent: "space-between", flexDirection: { xs: "column", sm: "row", md: "row" }, gap: "0.5rem", marginLeft: "1rem" }}>
          <TextField
            size="small"
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{
              width: "80%",
              "& .MuiOutlinedInput-root": {
                border: "2px solid #ffe7eb",
                borderRadius: "5px",
                boxShadow: "0 0 10px 5px #f7f3f4",
                "& fieldset": {
                  border: "none",
                },
              },
            }}
          />

          <Button
            variant="outlined"
            onClick={() => navigate("/templates/add")}
            sx={{ color: "#f89a74", fontWeight: "bold", border: "2px solid", marginRight: "1rem" }}
          >
            <LaptopIcon style={{ marginRight: "0.5rem" }} /> Add - Customize Template
          </Button>
        </Box>

        <div>
          <div className="card m-3">
            <Box sx={{ height: "auto", width: "100%" }}>
              <DataGrid
                rows={templates}
                columns={columns}
                pagination
                paginationMode="server"
                rowCount={totalCount}
                initialState={{
                  ...(templates &&
                    templates.length > 0 &&
                    templates.initialState),
                  pagination: {
                    ...(templates &&
                      templates.length > 0 &&
                      templates.initialState &&
                      templates.initialState?.pagination),
                    paginationModel: {
                      pageSize: pageSize,
                    },
                  },
                }}
                onPageChange={(newPage) => setPage(newPage)}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                onPaginationModelChange={handlePaginationModelChange}
                rowsPerPageOptions={[10]}
                getRowId={(e) => e._id}
              />
            </Box>
          </div>
        </div>
      </div>

      <TemplateModal modalOpen={newModal} setModalOpen={setNewModal} />

    </>
  );
}
