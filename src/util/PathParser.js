export class PathParser {

    constructor (path) {
        this.x = 0;
        this.y = 0;
        this.setStart();

        this.commands = PathParser.parse(path);
        this.pos = 0;

        this.controlPoint = { x: 0, y: 0 };
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
                return this.cubicCurveTo(
                    command.values[0], command.values[1],
                    command.values[2], command.values[3],
                    command.values[4], command.values[5]
                );
            case 'c':
                return this.cubicCurve(
                    command.values[0], command.values[1],
                    command.values[2], command.values[3],
                    command.values[4], command.values[5]
                );
            case 'S':
                return this.cubicCurveTo(
                    this.x + (this.x - this.controlPoint.x),
                    this.y + (this.y - this.controlPoint.y),
                    command.values[0], command.values[1],
                    command.values[2], command.values[3]
                );
            case 's':
                return this.cubicCurve(
                    this.x + (this.x - this.controlPoint.x),
                    this.y + (this.y - this.controlPoint.y),
                    command.values[0], command.values[1],
                    command.values[2], command.values[3]
                );
            case 'Q':
                return this.quadraticCurveTo(
                    command.values[0], command.values[1],
                    command.values[2], command.values[3],
                );
            case 'q':
                return this.quadraticCurve(
                    command.values[0], command.values[1],
                    command.values[2], command.values[3],
                );
            case 'T':
                return this.quadraticCurveTo(
                    this.x + (this.x - this.controlPoint.x),
                    this.y + (this.y - this.controlPoint.y),
                    command.values[0], command.values[1],
                );
            case 't':
                return this.quadraticCurve(
                    this.x + (this.x - this.controlPoint.x),
                    this.y + (this.y - this.controlPoint.y),
                    command.values[0], command.values[1],
                );
            case 'A':
            case 'a':
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

    cubicCurve (dx1, dy1, dx2, dy2, dx, dy) {
        return this.cubicCurveTo(
            this.x + dx1, this.y + dy1,
            this.x + dx2, this.y + dy2,
            this.x + dx, this.y + dy,
        );
    }

    cubicCurveTo (x1, y1, x2, y2, x, y) {
        let curve = this.lineTo(x, y);
        curve.type = 'cubic';
        curve.bezier1 = { x: x1, y: y1 };
        curve.bezier2 = { x: x2, y: y2 };
        this.controlPoint = curve.bezier2;
        return curve;
    }

    quadraticCurve (dx1, dy1, dx, dy) {
        return this.quadraticCurveTo(
            this.x + dx1, this.y + dy1,
            this.x + dx, this.y + dy,
        );
    }

    quadraticCurveTo (x1, y1, x, y) {
        let curve = this.lineTo(x, y);
        curve.type = 'quadratic';
        curve.bezier = { x: x1, y: y1 };
        this.controlPoint = curve.bezier;
        return curve;
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
