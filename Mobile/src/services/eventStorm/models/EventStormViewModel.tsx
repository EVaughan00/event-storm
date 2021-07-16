import Coordinate from "./Coordinate";
import EventBlockViewModel from "./EventBlockViewModel";
import EventEdgeViewModel from "./EventEdgeViewModel";

export default class EventStormViewModel {

  private _blocks: Array<EventBlockViewModel> = []
  private _edges: Array<EventEdgeViewModel> = []

  public get blocks(): Array<EventBlockViewModel> {
    return this._blocks;
  }
  public get edges(): Array<EventEdgeViewModel> {
    return this._edges;
  }
  public set blocks(blocks: Array<EventBlockViewModel>) {
    this._blocks = blocks;
  }
  public set edges(edges: Array<EventEdgeViewModel>) {
    this._edges = edges;
  }

  
  public GetBlockByCoordinate = (coordinate: Coordinate) => {

    return this.GetBlockByXY(coordinate.x, coordinate.y)
  }
  public GetBlockByXY = (x: number, y: number) => {

    return this._blocks.find(block => block.coordinate == new Coordinate(x,y))
  }

  public GetEdgeBySource = (x: number, y: number) => {

    return this._edges.find(edge => edge.source == new Coordinate(x,y))
  }
}
