import Coordinate from "./Coordinate"

export default class EventBlockViewModel {
    private _id: string
    private _solutionId: string
    private _coordinate: Coordinate

    public set id(id: string) {
        this._id = id
    }
    public set solutionId(solutionId: string) {
        this._solutionId = solutionId
    }
    public set coordinate(coordinate: Coordinate) {
        this._coordinate = coordinate
    }
    public get id() {
        return this._id
    }
    public get solutionId() {
        return this._solutionId
    }
    public get coordinate() {
        return this._coordinate
    }
}