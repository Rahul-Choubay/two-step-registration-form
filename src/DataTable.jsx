import React, { useRef, useEffect } from 'react';
import 'datatables.net-dt/css/jquery.dataTables.css';
import $ from 'jquery';

const UsersDataTable = ({ data }) => {
  const tableRef = useRef(null);

  useEffect(() => {
    if (data && data.length > 0) {
      initializeDataTable();
    }

    return () => {
      destroyDataTable();
    };
  }, [data]);

  useEffect(() => {
    updateDataTable();
  }, [data]);

  const initializeDataTable = () => {
    const columns = Object.keys(data[0]).map((key) => ({ title: key, data: key }));

    if (tableRef.current) {
      $(tableRef.current).DataTable({
        data,
        columns,
      });
    } else {
      console.error('Table ref is not available.');
    }
  };

  const destroyDataTable = () => {
    if (tableRef.current) {
      const dataTable = $(tableRef.current).DataTable();
      dataTable.destroy();
    }
  };

  const updateDataTable = () => {
    if (tableRef.current) {
      const dataTable = $(tableRef.current).DataTable();
      dataTable.clear();
      dataTable.rows.add(data);
      dataTable.draw();
    }
  };

  return <table ref={tableRef}></table>;
};

export default UsersDataTable;
