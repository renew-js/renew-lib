export class JsonSerializer {

    serialize (data) {
        const payload = JSON.stringify(data, null, 2);
        const mimeType = 'application/json';
        const fileExtension = '.json';
        return { payload, mimeType, fileExtension };
    }

}
