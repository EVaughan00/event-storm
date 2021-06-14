
import { FormModel } from "../../../utils/FormModel";
import Validation from "../../../utils/Validation";
import Template from "./Template";
import Solution from "./Template";

export class TemplateDTO extends FormModel {
    @Validation.Rule({ required: true, message: "Please provide a solution name"})
    public name: string = "";
    public description: string = "";
    public codeBase: string = "";

    public Map(): Template {
        var solution = new Template()

        solution.name = this.name
        solution.description = this.description
        solution.codeBase = this.codeBase

        return solution

    }
}