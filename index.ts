import { Components } from "./lib/components"
import { Module } from "./lib/module"
import { Injectable } from "./lib/injectable"

import express from "express"

export namespace NeuroServer {
    export function createServer(settings: {
        port: string | number,
        Modules: Array<Module.Module>
    }) {
        const app = express()

        settings.Modules.forEach(el => {
            app.use(el.setRoutes())
        })

        app.listen(settings.port, () => {
            console.log(`Neuro React server started on port ${settings.port}`)
        })
    }
}

export { Components, Module, Injectable }