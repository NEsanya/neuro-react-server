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
            return component.content.substring(0, 3) === 'jsx' ? this.jsxResonse(component) : this.htmlResponse(component)
        }

        private findTagBody(content: string, tag: string): string {
            return content.substring(
                content.lastIndexOf(`<${tag}>`) + tag.length + 2,
                content.lastIndexOf(`</${tag}`)
            ).trim()
        }

        private jsxResonse(component: Components.EndComponent): string {
            const jsxString: string = this.findTagBody(component.content, "App")
            const scriptString: string = this.findTagBody(component.content, 'script')
            const htmlString: string = this.findTagBody(component.content.slice(3), 'body')
            return `
<div id="neuro-${component.app_root}">
    ${htmlString}
</div>

<script>
    ${scriptString}
    const App = () => (
        ${jsxString}
    )

    ReactDOM.render(App(), document.getElementById('neuro-${component.app_root}'))
</script>
            `
        }

        private htmlResponse(component: Components.EndComponent): string {
            const htmlString: string = this.findTagBody(component.content, 'body')
            const scriptString: string = this.findTagBody(component.content, 'script')
            return `
<div id="neuro-${component.app_root}">
    ${htmlString}
</div>
<script>
    ${scriptString}
</script>
            `
        }
    }
}