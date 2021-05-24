import { FormModel } from "../../../utils/FormModel";
import Validation from "../../../utils/Validation";

export class SolutionBlueprint extends FormModel {
    @Validation.Rule({ required: true, message: "Please provide a solution name"})
    public name: string = "";

    public description: string = "";
        
    public eventStorm: boolean = false;

    public modelRepository: boolean = false;

    public taskStack: boolean = false;

    public contributorEmail: string = "";

    public contributorName: string = "";

    public ToDto(userId: string): SolutionBlueprintDTO {

        var dto = new SolutionBlueprintDTO();

        if (this.contributorName != "" && this.contributorEmail != "") {
            var contributor = new ContributorDTO()
            contributor.name = this.contributorName
            contributor.email = this.contributorEmail
            dto.contributors.push(contributor)
        }

        dto.ownerId = userId
        dto.name = this.name
        dto.description = this.description
        dto.templateId = ""
        dto.selectedTools.eventStorm = this.eventStorm
        dto.selectedTools.modelRepository = this.modelRepository
        dto.selectedTools.taskStack = this.taskStack

        return dto;
    }
}

export class SolutionBlueprintDTO extends FormModel {
    public ownerId: string = "";
    public name: string = "";
    public description: string = "";
    public templateId: string = "";
    public selectedTools: SelectedTools = new SelectedTools();
    public contributors: Array<ContributorDTO> = new Array<ContributorDTO>()

}

class SelectedTools {
    public eventStorm: boolean = false;
    public modelRepository: boolean = false;
    public taskStack: boolean = false;
}

class ContributorDTO {
    public name: string = "";

    public email: string = "";
}