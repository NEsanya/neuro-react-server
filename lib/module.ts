import { Components } from "./components"
import { Injectable } from "./injectable";

export namespace Module {
    export class Module {
        constructor(public name: string, public components: Array<Components.EndComponent>, public injects: Array<Injectable.IInjectable>) {}

        public setRoutes(): (fastify: any, options: {path: string}) => Promise<void>  {
            // const router = Router()

            // this.components.forEach(el => {
            //     router.get(`/${el.app_root}`, (req, res) => res.send(el.content))
            // })

            // return router

            return async (fastify: any, options: {path: string}) => {
                this.components.forEach(el => {
                    fastify.get(`/${options.path}/${el.app_root}`, async (_req: any, _res: any) => el.content)
                })
            }
        }
    }
}