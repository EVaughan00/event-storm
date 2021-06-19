
import { FormModel } from "../../../utils/FormModel";
import Validation from "../../../utils/Validation";
import TemplateViewModel from "./TemplateViewModel";
import Solution from "./TemplateViewModel";

export class TemplateDTO extends FormModel {
    public id: string = "";
    @Validation.Rule({ required: true, message: "Please provide a template name"})
    public name: string = "";
    public description: string = "";
    public codeBase: string = "";

    public Map(): TemplateViewModel {
        var template = new TemplateViewModel()

        template.id = this.id
        template.name = this.name
        template.description = this.description
        template.codeBase = this.codeBase

        return template

    }
}