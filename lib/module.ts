import { Components } from "./components"
import { Injectable } from "./injectable";

export namespace Module {
    export class Module {
        constructor(public name: string, public components: Array<Components.EndComponent>, public injects: Array<Injectable.IInjectable>) {}

        public setRoutes(): (fastify: any, options: {path: string}) => Promise<void>  {
            return async (fastify: any, options: {path: string}) => {
                this.components.forEach(component => {
                    fastify.get(
                        `/${options.path}/${component.app_root}`, 
                        async (_req: any, _res: any) => this.validateContent(component)
                    )
                })
            }
        }

        private validateContent(component: Components.EndComponent): string {
            return component.content.substring(0, 3) === 'jsx' ? this.jsxResonse(component) : `
<div id="${component.app_root}">
    ${component.content}
</div>
            `
        }

        private jsxResonse(component: Components.EndComponent): string {
            return `
<div id="${component.app_root}"></div>
<script> 
    const App = () => (
        ${component.content.slice(4)}
    )
    ReactDOM.render(App(), document.getElementById("${component.app_root}"))
<script>
            `
        }
    }
}