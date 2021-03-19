# neuro-react-server
React build to send into electron and another application with update semantic
---
Build: `npx tsc` or `tsc` (if typescript installed globaly)
Publish: `npm run build:publish`
---
### Usage

Init frontend server:
```js
const FrontServer = require("neuro-react-server")
const http = requrie("http")
const path = rqeuire("path")

const simpleRequestListener = (req, res) => {
  res.writeHead(200)
  res.end("Hi!")
}

const server = http.createServer(simpleRequestListener) // you can use express.js or other frameworks to create the server
const frontendServer = new FrontServer({
  server: server,
  ClientSrc: path.resolve(__dirname, "frontend"), // Frontend src
  production: false, // use react.production.min.js or react.development.js (default: false)
  addReact: false // Add react engine on component (default: fasle)
}

server.listen(3000) // listen on 3000 port
```
Project struct:
```elixir
index.js
frontend
|> component
|> |> index.jsx
|> clock
|> |> arrow
|> |> |> index.jsx
|> |> clockFace
|> |> |> index.jsx
```
### WARNING!!
component - is folder
div for render - path to folder (example: `ReactDOM.render(Arrow(), document.getElementById("/clock/arrow"))`)
main function to render - name of component

JSX File struct:
```jsx
// Path: frontend/clock/arrow/index.jsx
const Arrow = () => (
  <h1>Hi!</h1>
)

ReactDOM.render(Arrow(), "/clock/arrow")
```

---

addComponent function - add component to project.
Example:
```js
// index.js
...
const id = "number one components" // A group of components have the same id 
frontendServer.addComponent("/component", id)
```
```jsx
// frontend/component/index.jsx
const Component = () => (
  <h1>Hi!</h1>
)

ReactDOM.render(Component(), document.getElementById("/component"))
```

---

update function - update all components
Example:
```js
// index.js
frontendServer.update() 
```

---

getComponentById and getComponentsById functions - get component or components by id
Example:
```js
// index.js
frontendServer.getComponentById("number one components", "/component") // return frontend/compontent/index.jsx body and other data
frontendServer.getComponentsById("number one components") // return all components, who have same id
```
