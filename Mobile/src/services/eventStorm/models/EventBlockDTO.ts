import Coordinate from "./Coordinate";
import { Mappable } from "../../../helpers/hooks";
import { FormModel } from "../../../utils/FormModel";
import EventBlockViewModel from "./EventBlockViewModel";

export class EventBlockDTO extends FormModel implements Mappable {
    public id: string = "";
    public solutionId: string = ""; 
    public coordinate: Coordinate = new Coordinate(0,0);

    public Map(): EventBlockViewModel {
        var block = new EventBlockViewModel()
        
        block.id = this.id,
        block.solutionId = this.solutionId
        block.coordinate = this.coordinate

        return block
    }
}