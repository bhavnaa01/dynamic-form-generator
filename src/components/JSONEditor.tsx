import React, { useState } from "react";

interface JSONEditorProps {
  schema: string;
  setSchema: (value: string) => void;
}

const JSONEditor: React.FC<JSONEditorProps> = ({ schema, setSchema }) => {
  const [error, setError] = useState<string | null>(null);

  const validateJSON = (value: string) => {
    try {
      JSON.parse(value);
      setError(null);
      setSchema(value);
    } catch {
      setError("Invalid JSON format");
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(schema);
    alert("Copied JSON to clipboard!");
  };

  return (
    <div className="p-4">
      <h3 className="font-bold mb-2">JSON Editor</h3>
      <textarea
        className="w-full h-80 p-2 border rounded text-black"
        value={schema}
        onChange={(e) => validateJSON(e.target.value)}
      />
      {error && <p className="text-red-500">{error}</p>}
      <button
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={copyToClipboard}
      >
        Copy Form JSON
      </button>
    </div>
  );
};

export default JSONEditor;
