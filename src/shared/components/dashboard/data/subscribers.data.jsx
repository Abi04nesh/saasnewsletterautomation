'use client';
import useSubscribersData from "@/shared/hooks/useSubscribersData";
import { format } from "timeago.js";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const SubscribersData = () => {
  const { data, loading } = useSubscribersData();

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "email", headerName: "Email", flex: 0.8 },
    { field: "createdAt", headerName: "Subscribed At", flex: 0.5 },
    { field: "source", headerName: "Source", flex: 0.5 },
    {
      field: "status",
      headerName: "Status",
      flex: 0.5,
      renderCell: (params) => <span>{params.row.status}</span>
    }
  ];

  const rows = data?.map(i => ({
    id: i?._id,
    email: i?.email,
    createdAt: format(i?.createdAt),
    source: i?.source,
    status: i?.status
  })) || [];

  const gridStyles = {
    "& .MuiDataGrid-root": {
      border: "none",
      outline: "none",
      backgroundColor: "white",
      borderRadius: "8px",
      overflow: "hidden"
    },
    "& .MuiDataGrid-sortIcon": {
      color: "#000"
    },
    "& .MuiDataGrid-row": {
      color: "#000",
      borderBottom: "1px solid #0000001f!important"
    },
    "& .MuiDataGrid-cell": {
      borderBottom: "none!important"
    },
    "& .MuiDataGrid-columnHeaders": {
      backgroundColor: "#A4A9FC",
      borderBottom: "none",
      color: "#000"
    },
    "& .MuiDataGrid-virtualScroller": {
      backgroundColor: "#fff",
      color: "#000"
    },
    "& .MuiDataGrid-footerContainer": {
      color: "#000",
      borderTop: "none",
      backgroundColor: "#A4A9FC"
    },
    "& .MuiCheckbox-root": {
      color: "#3462ea !important"
    }
  };

  return (
    <div className="h-full">
      <Box 
        className="h-full w-full relative rounded-lg overflow-hidden"
        sx={{
          ...gridStyles,
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          checkboxSelection
          disableRowSelectionOnClick
          loading={loading}
          className="shadow-none"
          sx={{
            height: "100%",
            border: "none",
            '& .MuiDataGrid-columnHeader': {
              padding: '16px',
              fontSize: '0.95rem'
            },
            '& .MuiDataGrid-cell': {
              padding: '16px',
              fontSize: '0.9rem'
            }
          }}
          pageSizeOptions={[10, 25, 50]}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 25 }
            }
          }}
        />
      </Box>
    </div>
  );
};

export default SubscribersData;
