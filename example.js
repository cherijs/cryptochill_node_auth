const axios = require('axios');
const Base64 = require('js-base64').Base64;
const crypto = require('crypto');

const API_URL = 'https://api.cryptochill.com';
const API_KEY = 'my_api_key';
const API_SECRET = 'my_api_secret';


function cryptochill_api_request(endpoint, payload = {}, method = 'GET') {
    const request_path = '/v1/' + endpoint + '/'
    payload.request = request_path;
    payload.nonce = (new Date).getTime();

    // Encode payload to base64 format and create signature using your API_SECRET
    const encoded_payload = JSON.stringify(payload);
    const b64 = Base64.encode(encoded_payload);
    const signature = crypto.createHmac('sha256', API_SECRET).update(b64).digest('hex');


    // Add your API key, encoded payload and signature to following headers
    let request_headers = {
        'X-CC-KEY': API_KEY,
        'X-CC-PAYLOAD': b64,
        'X-CC-SIGNATURE': signature,
    };

    return axios({
        method: method,
        url: API_URL + request_path,
        headers: request_headers,
    });

}


cryptochill_api_request('profiles').then(function (response) {
    console.log(response);
}).catch(function (error) {
    console.log(error);
});
