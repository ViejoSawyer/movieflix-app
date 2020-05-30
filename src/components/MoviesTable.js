import React from 'react';

import MaterialTable from 'material-table';

export default function MoviesTable(props) {
  return (
    <MaterialTable
      title='Movies'
      columns={[
        { title: 'Title', field: 'title' },
        { title: 'Cast', field: 'cast' },
        { title: 'Release date', field: 'released', type: 'date' },
        { title: 'Plot', field: 'plot' },
        { title: 'Rated', field: 'rated' },
        { title: 'Directors', field: 'directors' },
        { title: 'IMDb', field: 'imdb' },
      ]}
      data={props.data}
      options={{
        search: true,
        sorting: true,
        cellStyle: {
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          maxWidth: 100,
        },
      }}
      localization={{ toolbar: { searchPlaceholder: 'Filter' } }}
      onRowClick={props.onClick}
    />
  );
}
