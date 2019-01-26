import { graphObject } from './graph';

export default class Point implements graphObject {
    public type: string;
    public coordinates: number[][];
    constructor(public X: number, public Y: number) {
        this.type = 'point';
        this.coordinates = [[X, Y]];
    }
}
