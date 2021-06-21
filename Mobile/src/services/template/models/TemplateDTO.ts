
import { Mappable } from "../../../helpers/hooks";
import { FormModel } from "../../../utils/FormModel";
import Validation from "../../../utils/Validation";
import TemplateViewModel from "./TemplateViewModel";

export class TemplateDTO extends FormModel implements Mappable {
    public id: string = "";
    @Validation.Rule({ required: true, message: "Please provide a template name"})
    public name: string = "";
    public description: string = "";
    public codeBase: string = "";
    public useEventStorm: boolean = false;
    public useModelRepository: boolean = false;
    public useTaskStack: boolean = false;

    public Map(): TemplateViewModel {
        var template = new TemplateViewModel()

        template.id = this.id
        template.name = this.name
        template.description = this.description
        template.codeBase = this.codeBase
        template.useEventStorm = this.useEventStorm;
        template.useModelRepository = this.useModelRepository;
        template.useTaskStack = this.useTaskStack;

        return template
    }
}