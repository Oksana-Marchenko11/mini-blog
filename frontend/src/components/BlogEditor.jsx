import { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import { FontFamily } from "@tiptap/extension-font-family";
import "./BlogEditor.css";

const BlogEditor = ({ value, onChange }) => {
  const [loadingImage, setLoadingImage] = useState(false);

  const editor = useEditor({
    extensions: [StarterKit, TextStyle, Color, FontFamily, Image],
    content: value,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  const addImage = async () => {
    setLoadingImage(true);
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      if (!file) {
        setLoadingImage(false);
        return;
      }

      const formData = new FormData();
      formData.append("image", file);

      try {
        const res = await fetch("http://localhost:3000/api/upload", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();
        editor.chain().focus().setImage({ src: data.url, width: 700, height: null }).run();
      } catch (err) {
        console.error("Помилка завантаження картинки:", err);
      } finally {
        setLoadingImage(false);
      }
    };
  };

  const setFont = (font) => {
    editor.chain().focus().setFontFamily(font).run();
  };

  return (
    <div className="editor-wrapper">
      <div className="editor-toolbar" style={{ marginBottom: "10px" }}>
        <button className="btn" onClick={() => editor.chain().focus().toggleBold().run()}>B</button>
        <button className="btn" onClick={() => editor.chain().focus().toggleItalic().run()}>I</button>
        <button className="btn" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>H1</button>
        <button className="btn" onClick={addImage} disabled={loadingImage}>
          {loadingImage ? "Завантаження..." : "Image"}
        </button>
        <select onChange={(e) => setFont(e.target.value)}>
          <option value="Arial">Arial</option>
          <option value="Georgia">Georgia</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Verdana">Verdana</option>
        </select>
      </div>
      <EditorContent editor={editor} className="editor-content" />
    </div>
  );
};

export default BlogEditor;
