import React, { useState, useEffect } from 'react'
import "prismjs/themes/prism-tomorrow.css"
import Editor from "react-simple-code-editor"
import prism from "prismjs"
import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from 'axios'
import './App.css'

function App() {
  const [code, setCode] = useState(`function sum() {
  return 1 + 1
}`)
  const [review, setReview] = useState(``)
  const [loading, setLoading] = useState(false)
  const [leftWidth, setLeftWidth] = useState(50); // State for resizable split

  const CodeEditor = Editor.default || Editor;

  useEffect(() => {
    prism.highlightAll()
  }, [])

  // Handle Resizing logic
  const startResizing = (mouseDownEvent) => {
    const startX = mouseDownEvent.clientX;
    const startWidth = leftWidth;

    const onMouseMove = (mouseMoveEvent) => {
      const newWidth = startWidth + ((mouseMoveEvent.clientX - startX) / window.innerWidth) * 100;
      if (newWidth > 20 && newWidth < 80) { // Limit resizing between 20% and 80%
        setLeftWidth(newWidth);
      }
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  async function reviewCode() {
    setLoading(true);
    try {
      const response = await axios.post('https://code-reviewer-ai-3sxh.onrender.com/ai/get-review', { code });
      setReview(response.data);
    } catch (err) {
      setReview("### ❌ Error\nFailed to connect to the AI service.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="logo">
          <span className="icon">⚡</span>
          <h1>AI Powered Code Reviewer</h1>
        </div>
        <div className="status">Senior Dev Mode Active</div>
      </header>

      <main>
        <div className="left" style={{ width: `${leftWidth}%`, flexBasis: 'auto' }}>
          <div className="code">
            <CodeEditor
              value={code}
              onValueChange={code => setCode(code)}
              highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
              padding={20}
              style={{
                fontFamily: '"Fira Code", monospace',
                fontSize: 16,
                minHeight: "100%",
              }}
            />
          </div>
          <button 
            onClick={reviewCode} 
            disabled={loading}
            className="review">
            {loading ? "Analyzing..." : "Review Code"}
          </button>
        </div>

        {/* This is the Draggable Slider Bar */}
        <div className="resizer" onMouseDown={startResizing} />

        <div className="right" style={{ width: `${100 - leftWidth}%`, flexBasis: 'auto' }}>
          {review ? (
            <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
          ) : (
            <div className="placeholder">
               Review results will appear here...
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default App