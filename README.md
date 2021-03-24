# neuro-react-server

React build to send into electron and another application with update semantic

---
Basic project start:
```ts
import { NeuroServer, Components, Module } from "neuro-react-server"

class Component implements Components.INeuroReactComponent {
    App() {
        return `
            <h1>Hi!</h1>
        `
    }
}

const module = new Module.Module("depos", [Components.create_component(new Component(), {
    app_root: "depo"
})], [])

NeuroServer.createServer({
    port: 3000,
    Modules: [module]
})
```
Now, for request `http://localhost:3000/depos/depo` you can receive this:
```html
<h1>Hi!</h1>
```
---

Component is most powerfull thing in this branch. He most create App method and return html or jsx string.
```tsx
import { Components } from "neuro-react-server"

class Component implements Components.INeuroReactComponent {
  App() {
    return `
      <h1>Hi!</hi>
    `
  }
}
```
To create Neuro Component you need to use create_component function:
```ts
const component = Components.create_component(new Component(), {
  app_root: "AppComponent", // id for your div and link param in module router
  injectables: [] // Dependenciev and buisnes logic of your component (default: [])
})
```
How you can use that?

You can create others components with same logic and others:
```ts
class Component implements Components.INeuroReactComponent {
  constructor(public info: string) {}
  
  App() {
    return `
      <h1>${this.info}</hi>
    `
  }

const goodbye_component = Components.create_component(new Component("Hi!"), { app_root: "HiComponent" })
const hi_component = Components.create_component(new Component("GoodBye!"), { app_root: "GoodByeComponent" })
```
