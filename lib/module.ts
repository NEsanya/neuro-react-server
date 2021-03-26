import { Components } from "./components"
import { Injectable } from "./injectable";
import parse from "html-react-parser"

export namespace Module {
    export class Module {
        constructor(public name: string, public components: Array<Components.EndComponent>, public injects: Array<Injectable.EndInject>) {}

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

        public setDependencies(): (fastify: any, options: {path: string}) => Promise<void>  {
            return async (fastify: any, options: {path: string}) => {
                fastify.get(
                    `/${options.path}/neuro-dependencies`,
                    async (_req: any, _res: any) => this.validateDependences(this.injects)
                )
            }
        }

        // ---------------------------------------------------------------------------------------------------------------
        // VALIDATE AND SET DEPENDENCIES INJECTIONS FOR PROJECT 
        // ---------------------------------------------------------------------------------------------------------------

        private validateDependences(services: Array<Injectable.EndInject>): string {
            let script = services[0] ? services[0].createInlineInjection() : '' 
            for(let i = 1; i < services.length; i++) script += services[i].createInlineInjection()
            return `
<script src="https://unpkg.com/react@17/umd/react.production.min.js" crossorigin></script>
<script src="https://unpkg.com/react-dom@17/umd/react-dom.production.min.js" crossorigin></script>
<script>
${script.trim()}
</script>
            `
        }

        // ---------------------------------------------------------------------------------------------------------------
        // JSX AND HTML VALIDATE COMPONENTS AND GET INJECTIONS
        // ---------------------------------------------------------------------------------------------------------------


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
            return `
<div id="neuro-${component.app_root}"></div>
<script>
    {
        ${scriptString}
        const App = () => ${JSON.stringify(parse(jsxString))}

        ReactDOM.render(App(), document.getElementById('neuro-${component.app_root}'))
    }
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
    {
        const NEURO_ID = "${component.app_root}"
        ${scriptString}
    }
</script>
            `
        }
    }
}