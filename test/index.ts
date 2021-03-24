import { NeuroServer, Components, Module } from "../index"

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