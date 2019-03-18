import { PreviewProvider } from './providers/PreviewProvider';


export default {
    __depends__: [
    ],
    __init__: [
        'preview',
    ],
    preview: [ 'type', PreviewProvider ],
};
