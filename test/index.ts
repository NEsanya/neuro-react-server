import { NeuroServer } from "../index"
import module from "./depo/index"

const server = new NeuroServer.NeuroServer
server.createServer({
    "port": 3000,
    "Modules": [module]
})