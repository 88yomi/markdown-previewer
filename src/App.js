import React, { useState } from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

import './App.css';

// render carriage returns as <br/> elements
marked.setOptions({
	gfm: true,
	breaks: true
})

function App() {

	let initStr = "# Markdown Previewer  \n## Made by ↓  \n[Oluwayomi Balogun](https://github.com/88yomi)  \n`<h4>Hello, moto</h4>`  \n```html\n<body>\n  <h4>    \n    Hello, moto\n  </h4>\n</body>\n```  \n* number one thing to do \n> blockquote example  \n> end of blockquote example  \n\\\n\\\n  ![image](https://badgen.net/badge/icon/github?icon=github&label=yomi)  \n**bold text**";
	let [rawText, setRawText] = useState(initStr);

	let rawMarkdown = marked.parse(rawText);
	let cleaned = DOMPurify.sanitize(rawMarkdown);
	let htmlMD = { __html: cleaned };

	function handleChange(e) {
		setRawText(e.target.value);
	}

	return (
		<>
			<main>
				<textarea
					id="editor"
					value={rawText}
					onChange={handleChange}
				/>

				<section className="render">
					<span>Preview</span>
					<div id="preview"
						dangerouslySetInnerHTML={htmlMD}
					/>
				</section>
			</main>
			<footer>
				Oluwayomi Balogun &copy;{new Date().getFullYear()}
			</footer>
		</>
	)
}

export default App;