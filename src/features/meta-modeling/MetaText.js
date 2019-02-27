import Text from 'diagram-js/lib/util/Text';


export class MetaText extends Text {
    constructor () {
        super({
            style: {
                fontFamily: 'Arial, sans-serif',
                fontSize: 12,
                fontWeight: 'normal',
                lineHeight: 1.2,
            }
        });
    }
}
