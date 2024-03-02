/**
 * @param {String} url
 * @param {Array} data
 */
const $request = (url, data = { method, params: {}, header: {} }) => {

    const method = data.method ? data.method : 'GET';
    let header = data.header ? data.header : {};
    let params = data.params ? data.params : {};

    try {
        new URL(url);
    } catch (error) {
        console.warn("The URL is invalid!");
    }

    return new Promise((resolve, reject) => {
        
        try {

            let httpRequest;

            // old compatibility code, now useless
            if (window.XMLHttpRequest) /* Mozilla, Safari, IE7+... */ httpRequest = new XMLHttpRequest();
            else if (window.ActiveXObject) /* IE6 */ httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
            else throw "Browser does not support XMLHttpRequest !";

            httpRequest.onreadystatechange = event => {
                if (httpRequest.readyState === XMLHttpRequest.DONE) resolve({
                    response: httpRequest.responseText,
                    status: httpRequest.status
                });
            };

            httpRequest.onerror = error => reject(error);

            httpRequest.open(method, url, true);

            httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
            httpRequest.setRequestHeader("Access-Control-Allow-Origin", "*");
            httpRequest.setRequestHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

            if (Object.keys(header).length > 0) {
                for (let index = 0; index < Object.keys(header).length; index++) {
                    const h_key = Object.keys(header)[index];
                    const h_data = header[h_key];
                    httpRequest.setRequestHeader(h_key, h_data);
                }
            }

            try {
                if (Object.keys(params).length > 0) {
                    var parameters = [];
                    for (let index = 0; index < Object.keys(params).length; index++) {
                        const p_key = Object.keys(params)[index];
                        const p_data = params[p_key];
                        parameters.push(p_key + '=' + p_data);
                    }
                    httpRequest.send(parameters.join('&'));
                } else httpRequest.send(null);
            } catch (error) {
                httpRequest.send(null);
                console.log(error);
            }

        } catch (error) {
            reject(error);
        }

    });

}