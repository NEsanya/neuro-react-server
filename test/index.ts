import { NeuroServer, Components } from "../index"
import { createElement } from "react"

class Component implements Components.INeuroReactComponent {
    App() {
        return createElement('div', null, 'Hello World')
    }
}

NeuroServer.createServer({
    port: 3001,
    Modules: [Components.create_component(new Component(), {
        app_root: "app-name"
    })]
})