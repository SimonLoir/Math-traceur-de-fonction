export default class TimersManager {
    private timers: any = {};
    public start(name: string) {
        this.timers[name] = { start: window.performance.now() };
    }
    public end(name: string) {
        this.timers[name].end = window.performance.now();
    }
    public export() {
        let exp: any = {};
        let keys: string[] = Object.keys(this.timers).sort();
        keys.forEach(key => {
            let { start, end } = this.timers[key];
            exp[key] = {};
            exp[key].time = end - start;
        });
        console.table(exp);
    }
}
