import { NeuroServer, Components, Module, Injectable } from "../index"
import fs from "fs"

class BasicService implements Injectable.IInjectable {
    inject(): Object {
        return { 
            foo: fs.readFileSync
        }
    }

}

const service = Injectable.create_inject(new BasicService, {
    app_root: "test"
})

console.log(service.createInlineInjection())

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
})], [service])

NeuroServer.createServer({
    port: 3000,
    Modules: [module]
})