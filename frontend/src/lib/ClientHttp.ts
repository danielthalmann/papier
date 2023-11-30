
class ClientHttp
{

    ClientHttp() 
    {
    }

    getToken()
    {
        return window.sessionStorage.getItem('token') ?? '';
    }

    setToken(t: string)
    {
        window.sessionStorage.setItem('token', t);
    }
    
    /**
     * execute query post at specified url
     * 
     * @param url url of the resource
     * @param data data passed to url
     */
    async postData(url : string, data: object = {}) : Promise<Response>
    {
        return this.fetchData(url, "POST", data);
    }

    /**
     * execute query get  at specified url
     * 
     * @param url url of the resource
     * @param data data passed to url
     */
    async getData(url : string, data: Array<string> = []) : Promise<Response>
    {
        let params : Array<string> = new Array();
        for (const x in data) {
            params.push(x + "=" + (data[x] ?? ''));
        }        
        return this.fetchData(url + '?' + params.join('&'), "GET");
    }


    async fetchData(url : string, method : string, data: object = {}) : Promise<Response>
    {

        let result = null;

        let header : HeadersInit;
        let reqInit : RequestInit;
        
        header = {
            "Content-Type": "application/json"
        };
    
        if (this.getToken() != '') {
            header.Authorization = "Bearer " + this.getToken();
        }

        reqInit = {
            method: method, // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: header,
            redirect: "follow", // manual, *follow, error
        };

        if (method == 'POST') {
            reqInit.body = JSON.stringify(data); 
        }

        console.log(reqInit);
        
        return fetch(url, reqInit).then((resp :Response) => {

            if (resp.status == 401) {
                result = resp.json();
            }

            return resp;

        });
    
    }

}

export let http = new ClientHttp();

