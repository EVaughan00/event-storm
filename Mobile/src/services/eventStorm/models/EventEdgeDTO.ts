import { Mappable } from "../../../helpers/hooks";
import { FormModel } from "../../../utils/FormModel";
import Coordinate from "./Coordinate";
import EventEdgeViewModel from "./EventEdgeViewModel";

export class EventEdgeDTO extends FormModel implements Mappable {
    public id: string = "";
    public solutionId: string = ""; 
    public source: Coordinate = new Coordinate(0,0);
    public destination: Coordinate = new Coordinate(0,0);

    public Map(): EventEdgeViewModel {
        var edge = new EventEdgeViewModel()

        edge.id = this.id,
        edge.solutionId = this.solutionId
        edge.source = this.source
        edge.destination = this.destination

        return edge

    }
}