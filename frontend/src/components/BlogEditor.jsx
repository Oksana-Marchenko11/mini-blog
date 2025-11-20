import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import {TextStyle} from "@tiptap/extension-text-style";
import {Color} from "@tiptap/extension-color";
import {FontFamily} from "@tiptap/extension-font-family";

const BlogEditor = ({ value, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      Color,
      FontFamily,
      Image,
    ],
    content: value,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  const addImage = async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      const formData = new FormData();
      formData.append("image", file);

     const res = await fetch("http://localhost:3000/api/upload", {
  method: "POST",
  body: formData,
});

      const data = await res.json();
      editor.chain().focus().setImage({ src: data.url }).run();
    };
  };

  const setFont = (font) => {
    editor.chain().focus().setFontFamily(font).run();
  };

  return (
    <div>
      <div style={{ marginBottom: "10px" }}>
        <button onClick={() => editor.chain().focus().toggleBold().run()}>B</button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()}>I</button>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>H1</button>
        <button onClick={addImage}>Image</button>
        <select onChange={(e) => setFont(e.target.value)}>
          <option value="Arial">Arial</option>
          <option value="Georgia">Georgia</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Verdana">Verdana</option>
        </select>
      </div>
      <EditorContent editor={editor} style={{ border: "1px solid #ccc", minHeight: "300px", padding: "10px" }} />
    </div>
  );
};

export default BlogEditor;
