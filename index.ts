import fs from "fs"
import WebSocket from "ws"
import http from "http"

interface IFrontendServerSettings {
    ClientSrc: string,
    server: http.Server,
    addReact?: boolean,
    production?: boolean
}

class Component {
    constructor(public updateId: string, public jsComponent: string, public path: string, public react: boolean) {}
}

export default class FrontendServer {
    private wsUpdate?: (id: string) => void 

    constructor(private settings: IFrontendServerSettings, private components: Array<Component>) {
        new WebSocket.Server({
            server: this.settings.server
        }).on('connection', wss => {
            console.info("Some App connected")
            wss.on("updated", () => {
                console.info("Some App is upddated")
            })

            this.wsUpdate = (id: string): void => {
                wss.send(`update:${id}`)
            }
        })
    }

    private createComponent(componentPath: string, updateId: string | number, addReact: boolean): Component {
        const jsFile = fs.readFileSync(this.settings.ClientSrc + componentPath + "/index.js", 'utf-8')
        const html = `
            <div id=${componentPath}>
            </div>

            <script>
                ${jsFile}
            </script>
        ` + addReact ? `
            ${this.settings.production ? 
            '<script src="https://unpkg.com/react@17/umd/react.production.min.js"" crossorigin></script>' 
            : 
            '<script src="https://unpkg.com/react@17/umd/react.development.js" crossorigin></script>'
            }
            <script src="https://unpkg.com/react-dom@17/umd/react-dom.development.js" crossorigin></script>
        ` : ''
        return new Component(`${updateId}`, html, componentPath, addReact)
    }

    public addComponent(componentPath: string, updateId: string | number, addReact: boolean | undefined = this.settings.addReact): string {
        const component = this.createComponent(componentPath, updateId, addReact ? addReact : false)
        this.components.push(component)
        return component.jsComponent
    }

    public update(id: string | number): void {
        const updateComponents = this.components
            .filter(component => component.updateId === `${id}`)
            .map(component => this.createComponent(component.path, component.updateId, component.react))
        
        this.components = this.components.filter(component => component.updateId !== `${id}`)
        this.components = [...this.components, ...updateComponents]
        if(this.wsUpdate) this.wsUpdate(`${id}`)
    }
}