import { productData } from '@/static-data';

import { AiOutlineArrowRight } from 'react-icons/ai';

import { DataGrid, GridRowData } from '@material-ui/data-grid';
import Button from '@mui/material/Button';
import Link from 'next/link';

const Refund = () => {
  const eligibleOrders = productData && productData.filter((item) => item);

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
            <Link href={`/user/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row: GridRowData[] = [];

  eligibleOrders &&
    eligibleOrders.forEach((item) => {
      row.push({
        id: item.id,
        itemsQty: 1,
        total: 'US$ ' + 100,
        status: 'Refund',
      });
    });

  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        autoHeight
        disableSelectionOnClick
        rowsPerPageOptions={[10]}
        pagination
      />
    </div>
  );
};

export default Refund;
