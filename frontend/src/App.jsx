import React, { useState } from 'react';
import Editor from 'react-simple-code-editor';
import ReactMarkdown from 'react-markdown';
import remarkGfm from "remark-gfm";
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css';
import axios from 'axios';
import './App.css';

function App() {
  const [code, setCode] = useState(`#include <iostream>
using namespace std;

int main() {
  int num1, num2, sum;
  cin >> num1 >> num2;
  sum = num1 + num2;
  cout << "The sum of the two numbers is: " << sum;
  return 0;
}
  `);

  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [aiReview, setAiReview] = useState('');
  const [isReviewLoading, setIsReviewLoading] = useState(false);

  // Function to send code to backend for compilation and execution
  const handleRun = async () => {

    const payload = {
      language: 'cpp',
      code,
      input,
    };

    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      const { data } = await axios.post(backendUrl, payload);
      setOutput(data.output);
    } catch (error) {
      // Handle different types of errors and show user-friendly messages
      if (error.response) {
        setOutput(`Error: ${error.response.data.error || 'Server error occurred'}`);
      } else if (error.request) {
        setOutput('Error: Could not connect to server.');
      } else {
        setOutput(`Error: ${error.message}`);
      }
    }
  };


  const handleAiReview = async() => {
    if (isReviewLoading) return; // optional guard
    setIsReviewLoading(true);  // disable button

    const payload = { code };

    try {
      setAiReview('');
      const GEMINIUrl = import.meta.env.VITE_GOOGLE_GEMINI_API_URL;
      const { data } = await axios.post(GEMINIUrl, payload);
      // console.log(data.aiReview);
      // console.log(data);
      setAiReview(data.aiReview);
    } catch (error) {
      setAiReview('Error in AI review, error: ' + error.message);
    } finally {
      setIsReviewLoading(false); // re-enable button
    }
  }

  return (
    <div className="compiler-container">
      <h1 className="title">C++ Code Compiler</h1>

      <div className="grid-container">
        {/* Code Editor */}
        <div className="section code-editor">
          <h2>Code Editor</h2>
          <div className="editor-wrapper">
            <Editor
              value={code}
              onValueChange={code => setCode(code)}
              highlight={code => highlight(code, languages.js)}
              padding={15}
              style={{
                fontFamily: '"Fira Code", "Fira Mono", monospace',
                fontSize: 14,
                minHeight: '500px',
              }}
            />
          </div>
        </div>

        {/* Input, Output, AI Review */}
        <div className="section stack">
          <div className="box">
            <h2>Input</h2>
            <textarea
              rows="4"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter input values..."
            />
          </div>

          <div className="box output-box">
            <h2>Output</h2>
            <div className="output-text">{output}</div>
          </div>

          <div className="box">
            <h2>AI Review</h2>
            <div className="ai-review">
              {(() => {
                try {
                  return aiReview ? (
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {aiReview}
                    </ReactMarkdown>
                  ) : (
                    <div></div>
                  );
                } catch (err) {
                  console.error("Markdown render error:", err);
                  return <div>⚠️ Error rendering AI review</div>;
                }
              })()}
            </div>

          </div>

          <div className="button-group">
            <button className="btn run" onClick={handleRun}>Run</button>
            <button
              className="btn review"
              onClick={handleAiReview}
              disabled={isReviewLoading}
              style={{
                opacity: isReviewLoading ? 0.6 : 1,
                cursor: isReviewLoading ? 'not-allowed' : 'pointer',
              }}
            >
              {isReviewLoading ? 'Reviewing...' : 'AI Review'}
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}

export default App;