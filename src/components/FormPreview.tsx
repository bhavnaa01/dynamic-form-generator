import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface FormPreviewProps {
  schema: string;
}

const FormPreview: React.FC<FormPreviewProps> = ({ schema }) => {
  const [submission, setSubmission] = useState<Record<string, any> | null>(null);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit: SubmitHandler<any> = (data) => {
    setSubmission(data);
    console.log(data)
    alert("Form submitted successfully!");
  };

  const downloadSubmission = () => {
    if (submission) {
      const blob = new Blob([JSON.stringify(submission, null, 2)], { type: "application/json" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "submission.json";
      link.click();
    }
  };

  const renderFields = () => {
    try {
      const parsedSchema = JSON.parse(schema);
      return parsedSchema.fields.map((field: any) => {
        const { id, label, type, required, options, placeholder, validation } = field;
        switch (type) {
          case "text":
          case "email":
          case "textarea":
            return (
              <div key={id} className="mb-4">
                <label>{label} </label>
                <input
                  {...register(id, {
                    required: required,
                    pattern: validation?.pattern ? new RegExp(validation.pattern) : undefined,
                  })}
                  type={type}
                  placeholder={placeholder}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                />
                {errors[id] && <p className="text-red-500">{validation?.message || "This field is required"}</p>}
              </div>
            );
          case "select":
            return (
              <div key={id} className="mb-4">
                <label>{label}</label>
                <select {...register(id, { required })} className="w-full p-2 border rounded dark:bg-gray-700 text-black">
                  {options.map((option: any) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors[id] && <p className="text-red-500">This field is required</p>}
              </div>
            );
          case "radio":
            return (
              <div key={id} className="mb-4">
                <label>{label}</label>
                {options.map((option: any) => (
                  <div key={option.value}>
                    <input
                      type="radio"
                      {...register(id, { required })}
                      value={option.value}
                    />
                    <label>{option.label}</label>
                  </div>
                ))}
                {errors[id] && <p className="text-red-500">This field is required</p>}
              </div>
            );
          default:
            return null;
        }
      });
    } catch (e) {
      return <p>Error loading form fields</p>;
    }
  };

  return (
    <div className="p-4">
      <h3 className="font-bold mb-4">Form Preview</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {renderFields()}
        <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded">
          Submit
        </button>
      </form>
      <button
        onClick={downloadSubmission}
        className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded"
      >
        Download Submission JSON
      </button>
      {/* {submission && <pre className="mt-4">{JSON.stringify(submission, null, 2)}</pre>} */}
    </div>
  );
};

export default FormPreview;
