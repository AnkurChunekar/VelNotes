import ReactQuill from "react-quill";
import "../../../node_modules/react-quill/dist/quill.snow.css";
import "./RichTextEditor.css";

const formats = [
  "bold",
  "italic",
  "underline",
  "strike",
  "image",
  "list",
  "clean",
  "video",
  "blockquote",
  "code-block",
];

const modules = {
  toolbar: [
    ["bold", "italic", "underline", "strike"],
    [],
    [{ list: "ordered" }, { list: "bullet" }],
    [],
    ["image", "blockquote", "code-block"],
  ],
};

export function RichTextEditor({ value, setValue, className }) {
  return (
    <ReactQuill
      formats={formats}
      modules={modules}
      className={className}
      value={value}
      placeholder="Add note text here....."
      onChange={setValue}
    />
  );
}
