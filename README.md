# Online C++ Compiler with user input

A modern, web-based C++ compiler and code execution platform built with React and Node.js. This application allows users to write, execute, and review C++ code in real-time. It features a clean, intuitive interface with a code editor, input/output sections, and AI-powered code review capabilities using Google's Gemini AI.


## Features

- **Code Editor**: Write and edit C++ code with syntax highlighting
- **Real-time Execution**: Compile and run code directly in the browser
- **Custom Input**: Provide custom input for your code execution
- **AI Code Review**: Get instant feedback and suggestions on your code using Google's Gemini AI
- **Responsive Design**: User-friendly interface that works across devices


## Tech Stack

### Frontend
- **React 18** - Modern JavaScript framework
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **PrismJS** - Syntax highlighting library
- **Axios** - HTTP client for API requests
- **React Simple Code Editor**
- **React Markdown** - for rendering AI reviews

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **GCC** - GNU Compiler Collection for C++
- **Google Gemini AI API** - Code Review
- **CORS** - Cross-origin resource sharing


## Installation and Setup

### Prerequisites
- Node.js (v22 or higher)
- npm or yarn
- C++ compiler on your system


### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with the following variables:
   ```
   PORT=8000
   GOOGLE_GEMINI_API_KEY=your_google_api_key
   ```

4. Start the server:
   ```bash
   node index.js
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173` (or the port shown in your terminal)


## API Endpoints

- `GET /`: Health check endpoint
- `POST /run`: Execute code with input
  - Body: `{ language: 'cpp', code: string, input: string }`
- `POST /ai-review`: Get AI feedback on code
  - Body: `{ code: string }`


## Docker Support

The backend includes Docker configuration for containerized deployment:

```bash
# Build the Docker image
docker build -t cpp-compiler-backend .

# Run the container
docker run -p 8000:8000 cpp-compiler-backend
```


## Usage

1. Write C++ code in the editor or use the default example
2. Add input values if your program requires them
3. Click "Run" to execute the code and see the output
4. Click "AI Review" to get feedback and suggestions on your code


## Contributing

Contributions are welcome! Feel free to submit a pull request or open an issue for any bugs or feature requests.
