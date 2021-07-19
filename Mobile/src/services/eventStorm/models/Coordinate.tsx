
export type ICoordinate = {
    x: number;
    y: number;
};

export default class Coordinate implements ICoordinate {
    private _x: number; 
    private _y: number;

    constructor(x: number, y: number) {
        this._x = x
        this._y = y
    }

    public get x(): number {
        return this._x
    }
    public get y(): number {
        return this._y
    }

    pixel = () => {
        return { x: this.x, y: this.y }
    }

    cartesian = (gridSize: number) => {
        return { x: this.x * -1 + gridSize / 2, y: this.y * -1 + gridSize / 2}
    }

    scaledCartesian = (scale: number, gridSize: number) => {
        const cartesian = this.cartesian(gridSize)
        return { x: scale * cartesian.x, y: scale * cartesian.y}
    }

    equals(coordinate: ICoordinate) {
        return coordinate.x == this._x && coordinate.y == this._y
    }
}