export const blogCategories = [
  { value: "software-development", label: "Software Development" },
  { value: "frontend-development", label: "Frontend Development" },
  { value: "backend-development", label: "Backend Development" },
  { value: "mobile-app-development", label: "Mobile App Development" },
  { value: "devops", label: "DevOps" },
  { value: "software-testing", label: "Software Testing & QA" },
  { value: "programming-languages", label: "Programming Languages" },
  { value: "web-development", label: "Web Development" },
  { value: "data-science", label: "Data Science" },
  { value: "machine-learning", label: "Machine Learning" },
  { value: "artificial-intelligence", label: "Artificial Intelligence" },
  { value: "big-data", label: "Big Data" },
  { value: "cloud-computing", label: "Cloud Computing" },
  { value: "cybersecurity", label: "Cybersecurity" },
  { value: "networking", label: "Networking" },
  { value: "it-infrastructure", label: "IT Infrastructure" },
  { value: "blockchain", label: "Blockchain" },
  { value: "augmented-reality", label: "Augmented Reality" },
  { value: "virtual-reality", label: "Virtual Reality" },
  { value: "iot", label: "Internet of Things (IoT)" }
];


//   custom style

export const customStyles = {
  menu: (provided) => ({
    ...provided,
    top: 'auto',
    bottom: '100%',
  })
};

export const alphabetColors = [
  { start: "A", color: "#5c23fa" },
  { start: "B", color: "#ff5733" },
  { start: "C", color: "#33ff57" },
  { start: "D", color: "#3357ff" },
  { start: "E", color: "#ff33a8" },
  { start: "F", color: "#a833ff" },
  { start: "G", color: "#ff8c33" },
  { start: "H", color: "#33ffa1" },
  { start: "I", color: "#a1ff33" },
  { start: "J", color: "#33a1ff" },
  { start: "K", color: "#ff33d4" },
  { start: "L", color: "#d433ff" },
  { start: "M", color: "#ffb833" },
  { start: "N", color: "#33ffcc" },
  { start: "O", color: "#ccff33" },
  { start: "P", color: "#33ccff" },
  { start: "Q", color: "#ff33e1" },
  { start: "R", color: "#e133ff" },
  { start: "S", color: "#ffd433" },
  { start: "T", color: "#33ffe6" },
  { start: "U", color: "#e6ff33" },
  { start: "V", color: "#33e6ff" },
  { start: "W", color: "#ff33f8" },
  { start: "X", color: "#f833ff" },
  { start: "Y", color: "#ffed33" },
  { start: "Z", color: "#33f8ff" }
];



export const editorConfig = {

  toolbarButtonSize: 'large',
  readonly: false, // Enable editing
  // Editor height
  removeButtons: ['video',
    'image',
    'video',
    "source",
    "undo",
    'redo',
    'eraser',
    'copyformat', '|',
    'symbol',
    'fullsize',
    'print',
    'link',       // Remove insert link button
    'microphone',  // Remove mic button
    'about'],
  // Specify only the desired toolbar buttons
  buttons: [
    'bold',        // Bold text
    'underline',   // Underline text
    'italic',      // Italicize text
    'ul',          // Unordered list
    'ol',          // Ordered list
    'font',        // Font style
    'fontsize',    // Font size
    'paragraph',   // Paragraph format
    'align',       // Text alignment
  ],
  textIcons: false,
  placeholder: ""
};


export const BASE_URL = "https://blogserver-7ymx.onrender.com"