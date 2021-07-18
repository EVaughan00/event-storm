

export class GridSettings {
    static nodePixelOffset: number = 100
    static rows: number = 8
    static columns: number = 8
  
    static get size(): number {
      return GridSettings.nodePixelOffset * Math.sqrt(GridSettings.rows * GridSettings.columns)
    }
}
