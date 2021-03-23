# neuro-react-server
React build to send into electron and another application with update semantic
---
Basic project start:
```ts
import { NeuroServer, Components, Module } from "neuro-react-server"
import { createElement } from "react"

class Component implements Components.INeuroReactComponent {
    App() {
        return createElement('div', null, 'Hello World')
    }
}

const module = new Module.Module("depo", [
    Components.create_component(new Component(), { app_root: "AppComponent" })
], [])

NeuroServer.createServer({
    port: 3001,
    Modules: [module]
})
```
Now, for request `http://localhost:3001/depo/components/AppComponent` you can receive this:
```html
<div id="AppComponent"></div>

<scripts>
  const App = () => (
    <div>
      Hello World
    </div>
  )
  ReactDOM.render(App(), document.getElementById("AppComponent")
<script>
```
---

Component is most powerfull thing in this branch. He most create App method and return React Element.
```tsx
import { Components } from "neuro-react-server"

class Component implements Components.INeuroReactComponent {
  App() {
    return (
      <h1>Hi!</hi>
    )
  }
}
```
To create Neuro Component you need to use create_component function:
```ts
const component = Components.create_component(new Component(), {
  app_root: "AppComponent", // id for your div
  injectables: [] // Dependenciev and buisnes logic of your component (default: [])
})
```
How you can use that?
You can create others components with same logic and others:
```ts
class Component implements Components.INeuroReactComponent {
  constructor(public info: string) {}
  
  App() {
    return (
      <h1>{this.info}</hi>
    )
  }

const goodbye_component = Components.create_component(new Component("Hi!"), { app_root: "HiComponent" })
const hi_component = Components.create_component(new Component("GoodBye!"), { app_root: "GoodByeComponent" })
```
