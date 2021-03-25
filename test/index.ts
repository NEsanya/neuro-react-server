import { NeuroServer, Components, Module } from "../index"

class Component implements Components.INeuroReactComponent {
    constructor(private content: string) {}

    App() {
        return `jsx
            <App>
                <h1>${this.content}</h1>
            </App>

            <script>
                console.log("TEST")
            </script>
        `
    }
}

const module = new Module.Module("depos", [Components.create_component(new Component('Hi!'), {
    app_root: "depo"
})], [])

NeuroServer.createServer({
    port: 3000,
    Modules: [module]
})