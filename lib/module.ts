import { Components } from "./components"
import { Injectable } from "./injectable";
import { Request, Response } from "express"

export namespace Module {
    export class Module {
        constructor(public name: string, public components: Array<Components.EndComponent>, public injects: Array<Injectable.IInjectable>) {}

        public setRoutes(): (req: Request, res: Response) => void {
            // const router = Router()

            // this.components.forEach(el => {
            //     router.get(`/${el.app_root}`, (req, res) => res.send(el.content))
            // })

            // return router

            return (req: Request, res: Response): void => {
                const component = this.components.find(component => component.app_root === req.params.component)
                component ? res.send(component.content) : res.status(404).send('Component not found')
            }
        }
    }
}