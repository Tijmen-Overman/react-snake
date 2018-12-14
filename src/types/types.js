// @flow

export type ISegment = {
  direction: string,
  x: number,
  y: number
}
export type ICoord = {
  x: number,
  y: number
}
export type IBounds = {
  minY: number,
  minX: number,
  maxY: number,
  maxX: number
}
export type IFoodItem = {
  item: string,
  coord: ICoord
}
export type ISegmentSize = {
  width: number,
  height: number
}

export type ISegments = Array<ISegment>
