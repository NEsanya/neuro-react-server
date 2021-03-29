import { Component } from "../../../index"
import path from "path"

class BasicComponent implements Component.IComponent {
    app_root: string = "basic"
    template: string = path.resolve(__dirname, "./basic-component.njsx")
    style: string = ""

}

const component = Component.create_component(BasicComponent, [])
export default component