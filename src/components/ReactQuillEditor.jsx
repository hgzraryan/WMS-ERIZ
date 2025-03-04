import Quill from "quill";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

function ReactQuillEditor({value,onChange,defaultValue}) {
  return (
    <>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        defaultValue={defaultValue}
      />
    </>
  )
}

export default ReactQuillEditor
