import { $ } from './extjs';

export default class Menu {
    constructor() {}

    public fdata: any;

    public update(fdata: any, object_list: any) {
        let container = $('#functions');
        container.html('');
        let keys = Object.keys(fdata);
        keys.forEach(key => {
            let item = container.child('div').addClass('item');
            let span = item.child('span').html(
                `<i style="background:${
                    fdata[key].color
                }; width:5px;height:5px;border-radius:5px;display:inline-block;"></i>
                    ${key}(x) = ${fdata[key].initial}`
            );
        });
        let obj_container = $('#objs');
        obj_container.html('');

        let grid = obj_container.child('div').addClass('item');

        let letters = 'abcdefghijklmnopqrstuvwxyz';
        let li = 0;
        let row = 0;

        object_list.forEach((object: any) => {
            let item = grid.child('div').addClass('item');
            if (object.type == 'point') {
                let letter = '';
                letter += letters[li].toUpperCase();
                if (row != 0) letter += row;
                li++;
                if (li > 25) {
                    li = 0;
                    row++;
                }
                let span = item
                    .child('span')
                    .text(`${letter}(${object.x};${object.yString})`);
            } else {
                let span = item.child('span').text(`${object.type}`);
            }
            console.log(object);
        });

        grid.child('span').text('Grille');
        grid.child('button').html('&#128393;');
    }

    public updateCallback(callback: (fdata: any) => {}) {}
}
