import { productData } from '@/static-data';

import { MdTrackChanges } from 'react-icons/md';

import { DataGrid, GridRowData } from '@material-ui/data-grid';
import Button from '@mui/material/Button';
import Link from 'next/link';

const TrackOrder = () => {
  const columns = [
    { field: 'id', headerName: 'Order ID', minWidth: 150, flex: 0.7 },

    {
      field: 'status',
      headerName: 'Status',
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params: any) => {
        return params.getValue(params.id, 'status') === 'Delivered'
          ? 'greenColor'
          : 'redColor';
      },
    },
    {
      field: 'itemsQty',
      headerName: 'Items Qty',
      type: 'number',
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: 'total',
      headerName: 'Total',
      type: 'number',
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: ' ',
      flex: 1,
      minWidth: 150,
      headerName: '',
      type: 'number',
      sortable: false,
      renderCell: (params: any) => {
        return (
          <>
            <Link href={`/user/track/order/${params.id}`}>
              <Button>
                <MdTrackChanges size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row: GridRowData[] = [];

  productData &&
    productData.forEach((item) => {
      row.push({
        id: item.id,
        itemsQty: 10,
        total: 'US$ ' + 1000,
        status: "Delivered",
      });
    });

  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
        pagination
        rowsPerPageOptions={[10]}
      />
    </div>
  );
};

export default TrackOrder;
