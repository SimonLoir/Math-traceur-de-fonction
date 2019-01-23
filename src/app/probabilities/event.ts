import { ExtJsObject } from '../../extjs';

export default class ProbEvent {
    private obj: ExtJsObject;
    constructor(parent: ExtJsObject) {
        this.obj = parent.child('div');
    }
}

export class EventManager {
    public static get events(): any {
        return [];
    }
}
