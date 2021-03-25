import { NeuroServer, Components, Module, Injectable } from "../index"

class BasicService implements Injectable.IInjectable {
    inject() {
        return `
            foo: () => console.log("TEST"),
            bar: (a, b) => a + b
        `
    }

}

class SecondService implements Injectable.IInjectable {
    inject() {
        return `
            bar: () => alert("WARNING!")
        `
    }
}

const service = Injectable.create_inject(new BasicService, {
    app_root: "test"
})
const service2 = Injectable.create_inject(new SecondService, {
    app_root: "test2"
})

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
})], [service, service2])

NeuroServer.createServer({
    port: 3000,
    Modules: [module]
})