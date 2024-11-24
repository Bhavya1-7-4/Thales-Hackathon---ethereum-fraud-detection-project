# Ethereum Fraud Detection using XGBoost and React

This project aims to detect fraudulent Ethereum transactions using a machine learning model and a modern frontend framework. The project uses:
- **XGBoost** for fraud prediction.
- **Flask** for the backend API.
- **React** with **Vite** and **TypeScript** for the frontend.
- **Tailwind CSS** for styling.

---

## Features
- **Fraud Detection**: Upload a file containing Ethereum transaction data to calculate fraud percentage.
- **Modern Frontend**: A responsive and interactive user interface built with React, Vite, and TypeScript.
- **Backend Integration**: Flask-based backend that handles data processing and model prediction.
- **Real-Time Results**: Output fraud probabilities directly on the UI.
- **File Support**: Supports CSV and PDF file formats.

---

## Project Structure
```
project/
├── backend/                     
│   ├──Ethereum ML.ipynb
├── frontend/                    # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/          # Reusable React components
│   │   ├── types/               # TypeScript types
│   │   ├── App.tsx              # Main App component
│   │   ├── main.tsx             # Entry point for React
│   │   ├── index.css            # Global styles
│   │   └── vite-env.d.ts        # Vite environment definitions
│   ├── .gitignore               # Git ignore file
│   ├── index.html               # HTML template
│   ├── package.json             # Frontend dependencies
│   ├── tailwind.config.js       # Tailwind CSS configuration
│   ├── tsconfig.json            # TypeScript configuration
│   ├── vite.config.ts           # Vite configuration
│   └── postcss.config.js        # PostCSS configuration
└── README.md                    # Project documentation
```

## Tech Stack
- **Backend**: Python, Flask, XGBoost
- **Frontend**: React, Vite, TypeScript
- **Styling**: Tailwind CSS
- **File Processing**: Pandas (for CSV) and Tabula (for PDF)
- **Other Tools**: PostCSS, ESLint

---

## Setup Instructions

### Prerequisites
- **Python 3.8+** (for backend)
- **Node.js 16+** and **npm** (or **yarn**) for frontend
- **Java** (required for `tabula-py` to handle PDF files)

---

### Backend Setup
1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. (Optional) Train the model:
   ```bash
   python train.py
   ```
   This will generate `model.pkl` used for predictions.

4. Start the Flask server:
   ```bash
   python app.py
   ```
   The backend will run at `http://127.0.0.1:5000`.

---

### Frontend Setup
1. Navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install frontend dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   The frontend will run at `http://127.0.0.1:5173` by default.

4. Update the API endpoint in the frontend to point to the Flask backend (in `src/components/api.ts` or equivalent):
   ```typescript
   const BASE_URL = "http://127.0.0.1:5000";
   ```

---

## Usage
1. Open the frontend in your browser (e.g., `http://127.0.0.1:5173`).
2. Upload a **CSV** or **PDF** file containing Ethereum transaction data.
3. Submit the file to receive a fraud percentage prediction.
4. View the results displayed on the frontend.

---

## Dataset Requirements
- The uploaded file must align with the model's expected feature set.
- Preprocessing is handled by the backend (`preprocess_data()` in `app.py`).

---

## Tailwind Configuration
Tailwind CSS is configured in `tailwind.config.js` for styling. Global styles are defined in `index.css`, and components-specific styles are handled inline or in separate CSS files.

---

## Future Enhancements
- Add **visualizations** (e.g., fraud detection charts) to the frontend.
- Deploy the app to cloud services:
  - Frontend: Deploy to Netlify or Vercel.
  - Backend: Deploy to AWS, Azure, or Heroku.
- Expand support for more file formats (e.g., JSON).
- Integrate **GANs** to simulate fraud patterns for improved training.

---
## License
This project is licensed under the MIT License. See `LICENSE` for details.

---
