import ReactQuill from "react-quill";
import "../../../node_modules/react-quill/dist/quill.snow.css";

const formats = [
  "bold",
  "italic",
  "underline",
  "strike",
  "image",
  "list",
  "clean",
  "video",
];

const modules = {
  toolbar: [
    ["bold", "italic", "underline", "strike"],
    [],
    [{ list: "ordered" }, { list: "bullet" }],
    [],
    ["image"],
  ],
};

export function RichTextEditor({ value, setValue }) {
  return (
    <ReactQuill
      formats={formats}
      modules={modules}
      className="content m-xs m-rl0"
      value={value}
      placeholder="Add note text here....."
      onChange={setValue}
    />
  );
}
