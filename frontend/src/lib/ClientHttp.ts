
class ClientHttp
{
    token: string = '';
    refreshToken: string = '';

    ClientHttp() 
    {
        this.token = window.sessionStorage.getItem('token') ?? '';
        this.refreshToken = window.sessionStorage.getItem('refreshToken') ?? '';
    }

    setToken(t: string)
    {
        this.token = t;
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
        
        if (this.token != '') {
            header = {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + this.token
            };
        } else {
            header = {
                "Content-Type": "application/json"
            };
        }     

        return fetch(url, {
            method: method, // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: header,
            redirect: "follow", // manual, *follow, error
            body: JSON.stringify(data) // le type utilisé pour le corps doit correspondre à l'en-tête "Content-Type"
        }).then((resp :Response) => {

            if (resp.status == 401) {
                result = resp.json();
            }

            return resp;

        });
    
    }
    
    
    fetch3() {
    
    }


}

export let http = new ClientHttp();

