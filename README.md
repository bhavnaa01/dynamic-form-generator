# Dynamic Form Generator

A web application for generating real-time, styled, and validated forms from JSON schemas. Designed with responsiveness, proper validation, and error handling.

---

## 🚀 Features
- Real-time JSON schema-based form generation.
- Syntax highlighting and JSON validation.
- Responsive layout with Tailwind CSS.
- Validation for form fields using React Hook Form and Zod.
- Mobile-first design for better usability on small screens.

---

## 📂 Folder Structure
```plaintext
src/
├── components/          # Reusable components like FormPreview
├── hooks/               # Custom React hooks
├── utils/               # Utility functions like JSON validation
├── App.tsx              # Main application file
├── index.tsx            # React entry point
├── App.css              # Styling file (Tailwind CSS configured)

📖 Example JSON Schema

{
  "formTitle": "Project Requirements Survey",
  "formDescription": "Please fill out this survey about your project needs",
  "fields": [
    {
      "id": "name",
      "type": "text",
      "label": "Full Name",
      "required": true,
      "placeholder": "Enter your full name"
    },
    {
      "id": "email",
      "type": "email",
      "label": "Email Address",
      "required": true,
      "placeholder": "you@example.com",
      "validation": {
        "pattern": "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
        "message": "Please enter a valid email address"
      }
    },
    {
      "id": "comments",
      "type": "textarea",
      "label": "Additional Comments",
      "required": false,
      "placeholder": "Any other details you'd like to share..."
    }
  ]
}
