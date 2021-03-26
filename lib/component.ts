import fs from "fs"
import path from "path"
import parse from "html-react-parser"

export namespace Component {
    export interface IComponent {
        app_root: string,
        template: string,
        style: string
    }

    interface IEndComponent {
        parsedTemplate: string,
        pathToComponent: string
    }

    export function create_component<T extends new (...args: any[]) => IComponent>(Component: T, args: any[] = []): IEndComponent {
        class EndComponent extends Component implements IEndComponent {
            public parsedTemplate: string
            public pathToComponent: string = path.resolve(__dirname, __filename)

            constructor(...args: any[]) {
                super(...args)
                this.parsedTemplate = this.parseTemplate()
            }

            // ------------------------------------------------------------------------------
            // PARSE NEURO JAVASCRIPT XML-like (.njsx) FILE ^^
            // ------------------------------------------------------------------------------

            private replaser(match: string, _p1: string, p2: string, p3: string, offset: string, _string: string) {
                return JSON.stringify(parse(p2.trim()))
            }

            private parseTemplate(): string {
                let template = this.template.substring(0, 4) === 'njsx' ? this.template.substring(4) : fs.readFileSync(path.resolve(__dirname, this.template), 'utf-8')
                template = template.replace(/(@\()([^\⼄]*)(\)@)/gm, this.replaser)
                const app = template.substring(
                    template.lastIndexOf(`<App>`) + "App".length + 2,
                    template.lastIndexOf(`</App>`)
                ).trim()
                const script = template.split(
                    template.substring(
                        template.lastIndexOf(app),
                        template.lastIndexOf('</App>') + '</App>'.length
                    )
                ).pop()
                return `
<div id="neuro-${this.app_root}"></div>
<script>
{
${script}

const App = () => {
    ${app}
}

ReactDOM.render(App(), document.getElementById("${this.app_root}"))


}
</script>
                `
            }
        }

        return new EndComponent(...args)
    }
}

class BasicComponent implements Component.IComponent {
    public app_root: string = "basic-app"
    public template: string = `./basic-component.njsx`
    public style: string = "./basic-component.css"

    constructor(protected css: string) {}
}

const x = Component.create_component(BasicComponent, [])
console.log(x.parsedTemplate)