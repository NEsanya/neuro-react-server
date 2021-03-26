import { Injectable } from "../../../index"

class BasicService implements Injectable.IInjectable {
    inject() {
        return `
            foo: () => console.log("TEST"),
            bar: (a, b) => a + b
        `
    }

}

export default Injectable.create_inject(new BasicService, {
    app_root: "basic"
})