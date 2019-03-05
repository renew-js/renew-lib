export const UID = (prefix) => {
    return [
        prefix || '',
        Date.now().toString(36).substr(-6),
        Math.random().toString(36).substr(2, 8)
    ].filter(Boolean).join('-');
};
