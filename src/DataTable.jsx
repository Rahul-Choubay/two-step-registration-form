import React, { useRef, useEffect } from 'react';
import 'datatables.net-dt/css/jquery.dataTables.css';
import $ from 'jquery';
import 'datatables.net';

const UsersDataTable = ({ data }) => {
  const tableRef = useRef(null);

  useEffect(() => {
    initializeDataTable();
    
    return () => {
      destroyDataTable();
    };
  }, [data]);

  useEffect(() => {
    updateDataTable();
  }, [data]);

  const initializeDataTable = () => {
    if (data && data.length > 0) {
      const columns = Object.keys(data[0]).map((key) => ({ title: key, data: key }));

      // Check if DataTable is already initialized
      if ($.fn.DataTable.isDataTable(tableRef.current)) {
        destroyDataTable();
      }

      // Initialize DataTable
      $(tableRef.current).DataTable({
        data,
        columns,
      });
    }
  };

  const destroyDataTable = () => {
    // Check if DataTable is initialized before destroying
    if ($.fn.DataTable.isDataTable(tableRef.current)) {
      const dataTable = $(tableRef.current).DataTable();
      dataTable.destroy();
    }
  };

  const updateDataTable = () => {
    // Destroy and reinitialize DataTable with updated data
    destroyDataTable();
    initializeDataTable();
  };

  return <table ref={tableRef}></table>;
};

export default UsersDataTable;

