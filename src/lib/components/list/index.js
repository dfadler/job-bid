
import React from 'react'
import { List as RVList, AutoSizer } from 'react-virtualized'

export default ({ children, rowHeight, rowCount }) =>
    <AutoSizer>
      {({ width, height }) =>
          <RVList
            width={width}
            height={height}
            rowCount={rowCount}
            rowHeight={rowHeight}
            rowRenderer={children} />}
    </AutoSizer>
