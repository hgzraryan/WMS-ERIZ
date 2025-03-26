import React from 'react';
import { Resizable } from 'react-resizable';

const ResizableTitle = ({ onResize, width, ...restProps }) => {
    if (!width) {
      return <th {...restProps} />;
    }
  
    return (
      <Resizable
        width={width}
        height={0}
        handle={<span className="react-resizable-handle" />}
        onResize={onResize}
        draggableOpts={{ enableUserSelectHack: false }}
      >
        <th {...restProps} />
      </Resizable>
    );
  };
  
  export default ResizableTitle;