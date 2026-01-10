# markdown-processor

A small, focused Node.js project that parses Markdown files and transforms them into HTML (and optionally other targets) using a configurable pipeline. This README explains the project purpose, structure, installation, usage (CLI + programmatic), configuration, internals, testing, development workflow, and extension points in detail.

---

Table of contents

- Project overview
- Features
- Prerequisites
- Installation
- Quick start
  - CLI examples
  - Programmatic API examples
- Configuration
- File processing pipeline
- Code structure (what each file/folder does)
- Plugin API (how to extend)
- Error handling & diagnostics
- Testing
- Performance & security notes
- Development workflow
- Contributing
- License

---

Project overview
This project is a lightweight Markdown processor written for learning and small-production uses. It reads Markdown files, runs them through a parsing/rendering pipeline (tokenizer → AST → transformation → renderer), and outputs HTML (or other formats with plugins). The design emphasizes clarity, testability, and extensibility rather than maximum performance.

Goals

- Teach and demonstrate Node.js modular design and pipeline processing.
- Provide a small, extensible Markdown->HTML tool suitable for CLI and programmatic use.
- Support plugins for custom rendering, AST transforms, and output formats.

Non-goals

- Not intended as a full replacement for CommonMark/remark/markdown-it in production.
- No built-in server or heavy UI components.

---

Features

- CLI and programmatic API
- Pluggable pipeline stages (parsers, transforms, renderers)
- Simple configuration via .mdprocrc or package.json under "markdown-processor"
- Basic Markdown support: headings, paragraphs, lists, code blocks, inline code, emphasis, links, images
- Syntax highlighting integration points (via plugin)
- Safe HTML output by default (HTML sanitization option)
- Unit tests included (Jest/Mocha depending on project choice)

---

Prerequisites

- Node.js 14+ (LTS recommended)
- npm or yarn
- Basic familiarity with Node.js and command line

---

Installation
From the repository root:

1. Install dependencies

- npm:
  npm install
- yarn:
  yarn install

2. Optionally link CLI for development
   npm link
   This exposes a `mdproc` command globally for local testing.

---

Quick start

CLI usage
Assumes a CLI entry at bin/mdproc or pages/cli.js.

- Process a file to stdout:
  npx ./bin/mdproc input.md

- Process and write to file:
  npx ./bin/mdproc input.md -o output.html

- Read stdin and write stdout:
  cat input.md | npx ./bin/mdproc

- Use a config file:
  npx ./bin/mdproc input.md --config .mdprocrc.json

Basic CLI help (example):
mdproc [options] <input>
Options:
-o, --output <path> Write result to path (default: stdout)
-f, --format <format> Output format: html (default), ast, json
-c, --config <path> Path to config file
--no-sanitize Disable HTML sanitization (use with caution)
-h, --help Show help

Programmatic API (Node.js)
Example usage in code:

const { processFile, processString, createPipeline } = require('markdown-processor');

// Simple string to HTML
const html = await processString('# Hello\n\nThis is **Markdown**.');

// Process a file
await processFile('docs/readme.md', { output: 'docs/readme.html' });

// Create a custom pipeline
const pipeline = createPipeline()
.use(require('./plugins/frontmatter'))
.use(require('./plugins/syntax-highlighter'));
const result = await pipeline.processString(markdownSource);

Synchronous vs asynchronous

- The main API is async (returns Promise) to support I/O and async plugins (e.g. fetching remote content or async syntax highlighters).
- There may be sync helper variants for pure CPU-bound transforms; consult the exported API.

---

Configuration
Supported config sources (in order):

1. Command-line --config
2. .mdprocrc(.json|.js) in project root
3. package.json under "markdown-processor" key
4. Defaults

Example .mdprocrc.json
{
"outputFormat": "html",
"sanitizeHtml": true,
"plugins": [
"./plugins/frontmatter.js",
{ "name": "./plugins/syntax-highlighter.js", "options": { "theme": "dark" } }
],
"extensions": ["md", "markdown"]
}

Configuration keys

- outputFormat: "html" | "ast" | "json"
- sanitizeHtml: boolean - whether to sanitize generated HTML
- plugins: array of plugin module paths or objects {name, options}
- extensions: array of file extensions to treat as Markdown
- baseUrl: string - base URL used when resolving relative links (optional)

---

File processing pipeline (conceptual)

1. Input stage
   - Accepts file path or string
   - Detects encoding
2. Parser
   - Tokenizes and builds AST (simple CommonMark-style AST)
3. Transformer(s)
   - Plugin transforms operate on the AST (front-matter extraction, link rewriting, template injection)
4. Renderer
   - Converts AST to target format (HTML by default)
   - Renderer can accept options (sanitize, allowRawHtml)
5. Post-processing
   - Minification, syntax highlighting, injection of front matter metadata
6. Output
   - Write to file or stdout

Each stage is a pluggable function in the pipeline and can be sync or async.

---

Code structure
(Provide mapping for typical layout)

- package.json
  - project metadata, dependencies, scripts (test, build, lint)
- bin/mdproc (executable)
  - CLI entry that parses args, loads config, runs pipeline
- src/
  - index.js — main exports and pipeline factory
  - cli.js — CLI argument parsing and bootstrap
  - pipeline.js — Pipeline implementation and runner
  - parser.js — Markdown tokenizer and AST builder
  - renderer/
    - htmlRenderer.js — default HTML renderer
    - jsonRenderer.js — renderer for AST/JSON output
  - transforms/
    - frontmatter.js — extract YAML front-matter
    - linkRewriter.js — rewrite relative links using baseUrl
  - plugins/ — built-in plugin implementations
  - utils/
    - fs.js — small fs helpers (readFileUtf8/writeFileUtf8)
    - sanitize.js — HTML sanitization wrapper (uses DOMPurify or sanitize-html)
    - logger.js — simple logger used in CLI/dev mode
- test/
  - unit tests for parser, renderer, pipeline
- examples/
  - example input files and sample CLI runs
- .mdprocrc.example.json
  - example config

Key files and responsibilities

- src/pipeline.js: exposes createPipeline(), which returns an object with .use(plugin), .processFile(path, options), .processString(text, options).
- src/parser.js: minimal CommonMark-like parser. Export parseMarkdownToAst(string).
- src/renderer/htmlRenderer.js: Walks AST and outputs HTML safely. Accepts transform hooks for code blocks and inline nodes.
- bin/mdproc: uses yargs/commander to parse args then calls pipeline with config.

---

Plugin API (how to extend)
A plugin is a function or object that integrates into the pipeline. Two plugin types:

- AST transform plugin: function(ast, options, ctx) -> ast | Promise<ast>
- Renderer plugin: object with renderNode(node, ctx) overrides

Plugin signature examples:

// AST transform plugin (module.exports = function(options) { return async function(ast, ctx) { ... }})
module.exports = function examplePlugin(options = {}) {
return async function transform(ast, ctx) {
// mutate or return new AST
return ast;
};
};

Renderer plugin example:

module.exports = {
name: 'codeHighlighter',
init(options, ctx) {
// optional init that returns context
},
renderNode(node, ctx) {
if (node.type === 'code') {
return highlight(node.value, ctx.options.theme);
}
return null; // fallback to default renderer
}
};

Plugin lifecycle

- init(options, globalContext) — called once when pipeline loads plugin
- transform(ast, fileContext) — called in transform stage
- renderNode(node, renderContext) — called by renderer as override

Best practices

- Keep plugins small and single-purpose.
- Prefer returning new AST nodes instead of mutating deep structures unless documented.
- Use async only when necessary.

---

Error handling & diagnostics

- CLI returns non-zero exit codes on error.
- Errors include file path and line/column positions whenever parser detects invalid input.
- Logger supports verbosity flags (quiet/normal/verbose).
- In CI, use --format json to get machine-readable diagnostics.

Common errors

- "Unknown plugin" — check config plugin path/exports.
- "Invalid config" — schema validation failed; run with --config to debug.
- "EACCES" or file permission errors — check file permissions and output path.

Recovery and fallback

- If a plugin fails, pipeline can be configured to either fail-fast (default) or skip failing plugin and continue. Use config option pluginFailure: "strict" | "warn".

---

Testing

- Unit tests are in /test using Jest (or Mocha, see package.json).
- Typical test categories:
  - Parser should produce expected AST for input fixtures
  - Renderer should produce expected HTML for AST fixtures
  - Plugin unit tests
  - Integration tests: file → output comparisons
- Run tests:
  npm test
- Add new tests when changing parser or renderer behavior. Fixtures under test/fixtures/ contain sample markdown and expected outputs.

---

Performance & security notes
Performance

- The parser is intentionally simple. For large documents, consider streaming or switching to a faster parser (e.g., remark) if needed.
- Plugins may introduce async operations; measure and cache results if repeated.

Security

- HTML sanitization is enabled by default when rendering to HTML. This prevents injection from raw HTML in Markdown.
- If you disable sanitization, be aware of XSS risks when rendering untrusted input.
- Avoid loading remote content in plugins without validation.

---

Development workflow

- Branching: feature branches off main. Use PR with at least one review.
- Linting: eslint configured; pre-commit hook runs lint and tests.
- CI: Run tests and lint on each push (GitHub Actions example in .github/workflows).
- Releases: bump version in package.json, update changelog, and create a git tag. Optionally publish to npm.

Useful scripts (package.json)

- "start": "node bin/mdproc"
- "test": "jest"
- "lint": "eslint src"
- "build": (if transpiling) "babel src -d lib"
- "prepublishOnly": "npm test && npm run lint"

---

Examples

1. Convert README.md to HTML (CLI)
   mdproc README.md -o README.html

2. Use front-matter plugin to extract metadata (programmatic)
   const { createPipeline } = require('markdown-processor');
   const pipeline = createPipeline().use(require('./src/transforms/frontmatter')());
   const result = await pipeline.processFile('post.md');
   console.log(result.meta); // { title, date, tags }
   console.log(result.html);

3. Custom renderer outputting JSON AST
   mdproc input.md -f ast > input.ast.json

---

FAQ
Q: Can I use custom markdown syntax/extensions?
A: Yes — write a parser extension or a transform plugin that converts custom syntax to supported AST nodes before rendering.

Q: How do I add syntax highlighting?
A: Use or implement a renderer plugin that intercepts code nodes and returns HTML from a highlighter (Prism, highlight.js, shiki). Ensure async support if the highlighter is async.

Q: Can I embed templates?
A: Yes. Use a transform plugin to extract front matter and render using a templating engine (Handlebars, EJS) before final rendering.

---

Contributing

- Fork the repository
- Create a feature branch
- Ensure tests pass and add tests for new behavior
- Open a pull request with clear description and changelog entry

Include:

- Issue/bug description
- Steps to reproduce
- Proposed change and rationale
- Tests covering change

Code style

- Follow repository's eslint rules and node style guide (arrow functions, const/let, async/await).

---

License
This project is provided under the MIT License. See LICENSE for details.

---

Contacts & support

- For bugs, open an issue in the repository.
- For design discussions, open a draft PR or issue labeled "discussion".

---

Appendix: Minimal API reference

exports.createPipeline([options])
.use(plugin) // register plugin or transform
.processString(markdown, opts) -> Promise<{ html, ast, meta }>
.processFile(path, opts) // reads file, returns same shape

exports.processString(markdown, opts) // convenience wrapper
exports.processFile(path, opts) // convenience wrapper

Options (common)

- output: string (file path) — output destination
- format: "html" | "ast" | "json"
- sanitizeHtml: boolean
- plugins: array to load for this invocation

---

If you need a specific part of the README expanded (examples, plugin templates, parser internals, or a ready-to-run package.json and CLI implementation), indicate which section and I will generate the code and config files.
