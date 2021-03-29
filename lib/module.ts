import { Component } from "./component"
import { Injectable } from "./injectable";

export namespace Module {
    export class Module {
        constructor(public name: string, public components: Array<Component.IEndComponent>, public injects: Array<Injectable.EndInject>) {}

        public setRoutes(): (fastify: any, options: {path: string}) => Promise<void>  {
            return async (fastify: any, options: {path: string}) => {
                this.components.forEach(component => {
                    fastify.get(
                        `/${options.path}/${component.app_root}`, 
                        async (_req: any, res: any) => component.parsedTemplate
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
    }
}