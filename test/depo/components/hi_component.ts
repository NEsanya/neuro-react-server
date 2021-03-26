import { Components } from "../../../index"

class Component implements Components.INeuroReactComponent {
    constructor(private content: string) {}

    App() {
        return `jsx
            <App>
                <h1>{info}</h1>
                <h1>${this.content}</h1>
            </App>

            <script>
                let info = "Hi!"
                const x = "i"
                console.log("TEST")
            </script>
        `
    }
}

export default Components.create_component(new Component('Hi!'), {
    app_root: "depo"
})