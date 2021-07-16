import Coordinate from "./Coordinate"

export default class EventEdgeViewModel {
    
    private _id: string
    private _solutionId: string
    private _source: Coordinate
    private _destination: Coordinate

    public set id(id: string) {
        this._id = id
    }
    public set solutionId(solutionId: string) {
        this._solutionId = solutionId
    }
    public set source(source: Coordinate) {
        this._source = source
    }
    public set destination(destination: Coordinate) {
        this._destination = destination
    }
    public get id() {
        return this._id
    }
    public get solutionId() {
        return this._solutionId
    }
    public get source() {
        return this._source
    }
    public get destination() {
        return this._destination
    }
}