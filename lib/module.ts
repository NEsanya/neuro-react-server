import { Components } from "./components"
import { Injectable } from "./injectable";
import { Router } from "express"

export namespace Module {
    export class Module {
        constructor(public name: string, public components: Array<Components.EndComponent>, public injects: Array<Injectable.IInjectable>) {}

        public setRoutes(): Router {
            const router = Router()

            this.components.forEach(el => {
                router.get(`${this.name}/components/${el.app_root}`, async (req, res) => {
                    res.send(el.ContentToString())
                })
            })

            return router
        }
    }
}