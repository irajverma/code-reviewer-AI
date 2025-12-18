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
  const [ code, setCode ] = useState(`function sum() {
  return 1 + 1
}`)
  const [ review, setReview ] = useState(``)
  const [ loading, setLoading ] = useState(false) // New loading state

  const CodeEditor = Editor.default || Editor;

  useEffect(() => {
    prism.highlightAll()
  }, [])

  async function reviewCode() {
    setLoading(true) // Start loading
    try {
      const response = await axios.post('http://localhost:3000/ai/get-review', { code })
      setReview(response.data)
    } catch (err) {
      setReview("### ❌ Error\nFailed to connect to the AI service. Please check if the server is running.")
    } finally {
      setLoading(false) // End loading
    }
  }

  return (
    <main>
      <div className="left">
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

      <div className="right">
        {review ? (
          <Markdown rehypePlugins={[ rehypeHighlight ]}>{review}</Markdown>
        ) : (
          <div style={{color: '#666', textAlign: 'center', marginTop: '40%'}}>
             Review results will appear here...
          </div>
        )}
      </div>
    </main>
  )
}

export default App