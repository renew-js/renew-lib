export class PathParser {

    constructor (path) {
        this.x = 0;
        this.y = 0;
        this.setStart();

        this.commands = PathParser.parse(path);
        this.pos = 0;
    }

    nextSegment () {
        let command = this.commands[this.pos++];

        if (!command) return false;

        switch (command.marker) {
            case 'M':
                this.moveTo(command.values[0], command.values[1]);
                this.setStart();
                return this.nextSegment();
            case 'm':
                this.move(command.values[0], command.values[1]);
                this.setStart();
                return this.nextSegment();
            case 'L':
                return this.lineTo(command.values[0], command.values[1]);
            case 'l':
                return this.line(command.values[0], command.values[1]);
            case 'H':
                return this.lineTo(command.values[0], this.y);
            case 'h':
                return this.lineTo(command.values[0], 0);
            case 'V':
                return this.lineTo(this.x, command.values[0]);
            case 'v':
                return this.lineTo(0, command.values[0]);
            case 'Z':
            case 'z':
                if (this.x === this.start.x && this.y === this.start.y) {
                    return this.nextSegment();
                }
                return this.lineTo(this.start.x, this.start.y);
            case 'C':
            case 'c':
                let x1 = command.values[0];
                let y1 = command.values[1];
                let x2 = command.values[2];
                let y2 = command.values[3];

            case 'S':
            case 's':
            case 'Q':
            case 'q':
            case 'T':
            case 't':
                // TODO
        }

        return null;
    }

    setStart () {
        this.start = { x: this.x, y: this.y };
    }

    move (dx, dy) {
        this.moveTo(this.x + dx, this.y + dy);
    }

    moveTo (x, y) {
        this.x = Number(x.toFixed(8));
        this.y = Number(y.toFixed(8));
    }

    line (dx, dy) {
        return this.lineTo(this.x + dx, this.y + dy);
    }

    lineTo (x, y) {
        let line = {
            type: 'line',
            src: { x: this.x, y: this.y },
            dest: { x: Number(x.toFixed(8)), y: Number(y.toFixed(8)) }
        };
        this.moveTo(x, y);
        return line;
    }

    /**
     * src: https://gist.github.com/shamansir/0ba30dc262d54d04cd7f79e03b281505
     *
     * @param {String} path
     * @returns {{marker: (String), values: (Number[])}[]}
     */
    static parse (path) {
        const commands = /[MmLlHhVvZzCcSsQqTtAa]/g;
        const digits = /-?\d*\.?\d+/g;

        let results = [];

        let match;
        while ((match = commands.exec(path))) {
            results.push(match);
        }

        return results.map((match) => {
            return {
                marker: path[match.index],
                index: match.index
            };
        }).reduceRight((all, match) => {
            let end = all.length ? all[all.length - 1].index : path.length;
            let chunk = path.substring(match.index, end);
            if (chunk.length > 0) {
                chunk = chunk.substr(1, chunk.length - 1);
            }
            return all.concat([
                {
                    marker: match.marker,
                    index: match.index,
                    chunk: chunk
                }
            ]);
        }, []).reverse().map((command) => {
            let values = command.chunk.match(digits);
            return {
                marker: command.marker,
                values: values ? values.map(parseFloat) : []
            };
        });
    }
}
