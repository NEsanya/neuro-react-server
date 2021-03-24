import { Components } from "./lib/components"
import { Module } from "./lib/module"
import { Injectable } from "./lib/injectable"

import express from "express"

namespace NeuroServer {
    export function createServer(settings: {
        port: string | number,
        Modules: Array<Module.Module>
    }) {
        const app = express()

        settings.Modules.forEach(el => {
            app.get(`${el.name}/`, el.setRoutes())
        })

        app.listen(settings.port, () => {
            console.log(`Neuro React server started on port ${settings.port}`)

            app._router.stack.forEach(function(r: any){
                if (r.route && r.route.path){
                  console.log(r.route.path)
                }
            })
        })
    }
}

module.exports = { NeuroServer, Components, Module, Injectable }
export { NeuroServer, Components, Module, Injectable }