export {}

interface IUser {
    
    "data": "65b9888558a526c7765270de",
    "status": 200,
    "statusText": "OK",
    "headers": {
        "content-length": "26",
        "content-type": "application/json; charset=utf-8"
    },
    "config": {
        "transitional": {
            "silentJSONParsing": true,
            "forcedJSONParsing": true,
            "clarifyTimeoutError": false
        },
        "adapter": [
            "xhr",
            "http"
        ],
        "transformRequest": [
            null
        ],
        "transformResponse": [
            null
        ],
        "timeout": 0,
        "xsrfCookieName": "XSRF-TOKEN",
        "xsrfHeaderName": "X-XSRF-TOKEN",
        "maxContentLength": -1,
        "maxBodyLength": -1,
        "env": {},
        "headers": {
            "Accept": "application/json, text/plain, */*",
            "Content-Type": "application/json"
        },
        "withCredentials": true,
        "method": "post",
        "url": "http://localhost:5000/api/register",
        "data": "{\"name\":\"Renee-Louise \",\"email\":\"renee.nzems@hotmil.com\",\"password\":\"@zino123\"}"
    },
    "request": {}
}