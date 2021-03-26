import { Module } from "../../index"
import Component from "./components/hi_component"
import BasicService from "./service/BasicService"

const module = new Module.Module(
    "depos", 
    [Component], 
    [BasicService]
)

export default module