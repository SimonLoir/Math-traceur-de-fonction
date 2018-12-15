import { parse } from 'url';

export default class canvas {
    private fdata: any = {};

    private ctx: CanvasRenderingContext2D;

    private canvas: HTMLCanvasElement;

    public center_x: number = 0;

    public center_y: number = 0;

    public x_unit: number = 50;

    public y_unit: number = 50;

    private stored: any = {};

    private pathes: any = {};

    private objects: any[] = [];

    public add: boolean;

    public onupdate: () => void;

    public getValues() {
        return {
            center_x: this.center_x,
            center_y: this.center_y,
            x_unit: this.x_unit,
            y_unit: this.y_unit
        };
    }

    public setValues(values: any) {
        this.center_x = values['center_x'];
        this.center_y = values['center_y'];
        this.x_unit = values['x_unit'];
        this.y_unit = values['y_unit'];
    }

    private hasUpdated() {
        if (this.onupdate) this.onupdate();
    }

    constructor(canvas: HTMLCanvasElement) {
        canvas.height = canvas.scrollHeight;
        canvas.width = canvas.scrollWidth;

        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');

        this.init();

        let start: any;

        let down: boolean = false;

        //When the user starts an action on the canvas.
        canvas.addEventListener('mousedown', (e: MouseEvent) => {
            down = true;
            start = { x: e.pageX, y: e.pageY };
            canvas.style.cursor = 'grabbing';
        });
        canvas.addEventListener('touchstart', (e: TouchEvent) => {
            down = true;
            start = {
                x: e.touches.item(0).clientX,
                y: e.touches.item(0).clientY
            };
        });
        // When the user moves on the surface of the canvas.
        canvas.addEventListener('mousemove', (e: MouseEvent) => {
            if (down == true) {
                let new_start = { x: e.pageX, y: e.pageY };
                let old = start;
                let drawn = this.move(old, new_start);
                if (drawn) {
                    start = new_start;
                }
            }
        });
        canvas.addEventListener('touchmove', (e: TouchEvent) => {
            e.preventDefault();
            if (down == true) {
                let new_start = {
                    x: e.touches.item(0).clientX,
                    y: e.touches.item(0).clientY
                };
                let old = start;
                let drawn = this.move(old, new_start);
                if (drawn) {
                    start = new_start;
                }
            }
        });

        //When the user stops clicking on teh surface
        canvas.addEventListener('mouseup', (e: MouseEvent) => {
            e.preventDefault();
            e.stopPropagation();
            down = false;
            canvas.style.cursor = 'grab';
            this.hasUpdated();
        });
        canvas.addEventListener('touchend', (e: MouseEvent) => {
            e.stopPropagation();
            e.preventDefault();
            down = false;
            this.hasUpdated();
        });

        window.addEventListener('resize', (e: Event) => {
            e.stopPropagation();
            e.preventDefault();
            this.reload();
        });

        canvas.addEventListener('mousewheel', (e: any) => {
            e.stopPropagation();
            e.preventDefault();
            let delta = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail));
            this.zoom(delta);
            this.hasUpdated();
        });
        canvas.addEventListener('DOMMouseScroll', (e: any) => {
            e.preventDefault();
            e.preventDefault();
            let delta = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail));
            this.zoom(delta);
            this.hasUpdated();
        });
    }

    public zoom(delta: number) {
        if (this.x_unit + delta * 10 > 10) {
            this.x_unit += delta * 10;
        }

        if (this.y_unit + delta * 10 > 10) {
            this.y_unit += delta * 10;
        }

        this.reload();
    }

    public init() {
        this.canvas.height = this.canvas.scrollHeight;
        this.canvas.width = this.canvas.scrollWidth;
        this.draw();
    }

    public draw() {
        this.drawGrid();
    }

    private drawGrid() {
        let max = Math.max(this.canvas.height, this.canvas.width);
        max = max / Math.min(this.x_unit, this.y_unit);
        // Clears the view
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.beginPath();
        this.ctx.fillStyle = '#fafafa';
        this.ctx.rect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fill();
        this.ctx.closePath();

        let to = Math.floor(this.center_x + max);

        let xpos = Math.floor(this.center_x - max);

        while (xpos < to) {
            this.drawLine(
                this.getRelativePositionX(xpos),
                this.getRelativePositionY(Math.floor(this.center_y + max)),
                this.getRelativePositionX(xpos),
                this.getRelativePositionY(Math.floor(this.center_y - max)),
                Math.floor(xpos) == 0 ? 'black' : undefined
            );
            this.ctx.beginPath();
            this.ctx.font = '18px Sans Serif';
            this.ctx.fillStyle = 'gray';
            this.ctx.fillText(
                xpos.toString(),
                this.getRelativePositionX(xpos),
                this.getRelativePositionY(0) + 15
            );
            this.ctx.closePath();
            xpos++;
        }

        to = Math.floor(this.center_y + max);

        let ypos = Math.floor(this.center_y - max);

        while (ypos < to) {
            this.drawLine(
                this.getRelativePositionX(Math.floor(this.center_x + max)),
                this.getRelativePositionY(ypos),
                this.getRelativePositionX(Math.floor(this.center_x - max)),
                this.getRelativePositionY(ypos),
                Math.floor(ypos) == 0 ? 'black' : undefined
            );
            this.ctx.beginPath();
            this.ctx.font = '18px Sans Serif';
            this.ctx.fillStyle = 'gray';
            this.ctx.fillText(
                ypos.toString(),
                this.getRelativePositionX(0) -
                    (ypos.toString().length * 15) / 2 -
                    5,
                this.getRelativePositionY(ypos)
            );
            this.ctx.closePath();
            ypos++;
        }
    }

    public move(previous: any, now: any): any {
        let diff_x = previous.x - now.x;

        let diff_y = previous.y - now.y;

        if (Math.sqrt(Math.pow(diff_x, 2) + Math.pow(diff_y, 2)) > 10) {
            this.center_x += diff_x / this.x_unit;

            this.center_y -= diff_y / this.y_unit;

            this.reload();
            return true;
        }
    }

    private drawLine(
        x: number,
        y: number,
        x2: number,
        y2: number,
        color?: string,
        width?: number
    ) {
        this.ctx.beginPath();
        if (color == undefined) {
            this.ctx.strokeStyle = '#D0D0D0';
        } else {
            this.ctx.strokeStyle = color;
        }

        if (y2 == Infinity) console.log((y2 = this.canvas.height), 'Inf' + y2);
        if (y == Infinity) console.log((y = this.canvas.height), 'Inf' + y);

        this.ctx.moveTo(x, y);
        this.ctx.lineTo(x2, y2);
        if (width == undefined) {
            this.ctx.lineWidth = 1;
        } else {
            this.ctx.lineWidth = width;
        }
        this.ctx.stroke();
    }

    private getRelativePositionX(point: number) {
        return (
            this.canvas.width / 2 +
            point * this.x_unit -
            this.center_x * this.x_unit
        );
    }

    private getRelativePositionY(point: number) {
        return (
            this.canvas.height / 2 -
            point * this.y_unit +
            this.center_y * this.y_unit
        );
    }

    public drawFromFunc(
        func: any,
        color: any = undefined,
        isPreview: boolean = false
    ) {
        if (!color) {
            var letters = '0123456789ABCDEF';
            color = '#';
            for (var i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
        }
        let display_size = this.canvas.width / 2 / this.x_unit;
        let x = this.center_x - display_size;
        let last = undefined;
        let label = func;

        let was_defined = true;

        if (this.pathes[label] == undefined) {
            this.pathes[label] = {};
            was_defined = false;
        }

        let xs_increment = Math.min(
            (5 * this.canvas.width) / (this.x_unit * 1000),
            0.05
        );
        let xs_save = xs_increment;

        let restore: number = undefined;

        while (x < this.center_x + display_size) {
            let pos;
            let new_y;
            let new_x;

            if (was_defined == true && this.pathes[label][x] != undefined) {
                new_y = this.getRelativePositionY(this.pathes[label][x]);
                new_x = this.getRelativePositionX(x);
            } else {
                pos = this.getFor(x, func, label);
                //console.log(x, pos);
                this.pathes[label][x] = pos;
                new_y = this.getRelativePositionY(pos);
                new_x = this.getRelativePositionX(x);
            }

            if (last != undefined) {
                let y_diff = Math.abs(new_y - last.y);
                if (y_diff > 75 && xs_increment == xs_save) {
                    //console.log(x, y_diff);
                    if (y_diff > 200) {
                        console.log(y_diff);
                        last = undefined;
                    } else {
                        x -= xs_increment;
                        xs_increment = xs_save / 50;
                        //@ts-ignore
                        new_y = last.y;
                        restore = x + 2;
                    }
                } else {
                    this.drawLine(new_x, new_y, last.x, last.y, color, 2);
                }
            }
            last = {
                x: new_x,
                y: new_y
            };

            if (isPreview == true) {
                x += 0.5;
            } else {
                if (restore && restore <= x) {
                    restore = undefined;
                    xs_increment = xs_save;
                }
                x += xs_increment;
            }
        }
        return color;
    }

    private getFor(start: number, func: any, label: string) {
        if (this.stored[label] == undefined) {
            this.stored[label] = {};
        }

        if (this.stored[label][start] != undefined) {
            return this.stored[label][start];
        } else {
            this.stored[label][start] = func(start, this.fdata);
            return this.stored[label][start];
        }
    }

    public reload(fdata?: any) {
        if (fdata != undefined) {
            this.funcs = fdata;
        }

        this.init();

        let data = Object.keys(this.fdata);

        requestAnimationFrame(() => {
            data.forEach(key => {
                if (this.fdata[key].visible == true) {
                    this.drawFromFunc(
                        this.fdata[key].array,
                        this.fdata[key].color
                    );
                }
            });

            let objs = this.objects;
            objs.forEach(obj => {
                if (obj.type == 'point') {
                    let y = NaN;
                    if (!isNaN(obj.y)) {
                        y = obj.y;
                    } else {
                        y = obj.y(parseFloat(obj.x), this.fdata);
                    }
                    this.point(obj.x, y);
                }
            });
        });
    }

    public point(x: number, y: number, text: string = '') {
        text = `${text}(${x};${y})`;
        x = this.getRelativePositionX(x);
        y = this.getRelativePositionY(y);
        this.ctx.beginPath();
        this.ctx.arc(x, y, 3, 0, 2 * Math.PI, true);
        this.ctx.fill();
        this.ctx.font = '12px Arial';
        if (text) this.ctx.fillText(text, x + 10, y + 10);
    }

    set funcs(fdata: any) {
        this.fdata = fdata;
    }
    get funcs() {
        return this.fdata;
    }

    set object_list(objects: any) {
        this.objects = objects;
    }

    get object_list() {
        return {
            objects: this.objects,
            push: function(toAdd: any) {
                this.objects.push(toAdd);
                return this.objects;
            }
        };
    }
}
