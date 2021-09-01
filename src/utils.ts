/**
 * Transforms a key-value object into a query string for use in a url
 * Example:
 * 
 * { event_id: 4, available: true } => '?event_id=4&available=true'
 * 
 * @param object Object to transform to a query string
 * @return { string }
 */
export function objectToQueryString(object = {}): string {
    if (typeof object !== 'object') return '';

    let params = Object
        .entries(object)
        .map(entry => entry[0] + '=' + entry[1])
        .join('&');

    return params.length ? ('?' + params) : '';
}