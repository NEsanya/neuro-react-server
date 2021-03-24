import { Components } from "./lib/components"
import { Module } from "./lib/module"
import { Injectable } from "./lib/injectable"

import fastify from "fastify"

namespace NeuroServer {
    export function createServer(settings: {
        port: string | number,
        Modules: Array<Module.Module>
    }) {
        const app = fastify()

        settings.Modules.forEach(el => {
            app.register(el.setRoutes(), {
                path: el.name
            })
        })

        app.listen(settings.port, () => {
            console.log(`Neuro React server started on ${settings.port}`)
        })
    }
}

module.exports = { NeuroServer, Components, Module, Injectable }
export { NeuroServer, Components, Module, Injectable }