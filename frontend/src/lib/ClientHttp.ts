
class ClientHttp
{
    token: string = '';
    refreshToken: string = '';

    ClientHttp() 
    {
        this.token = window.sessionStorage.getItem('token') ?? '';
        this.refreshToken = window.sessionStorage.getItem('refreshToken') ?? '';
    }
    
    /**
     * execute query post at specified url
     * 
     * @param url url of the resource
     * @param data data passed to url
     */
    async postData(url : string, data: object = {}) : Promise<null | object>
    {
        return this.fetchData(url, "POST", data);
    }

    /**
     * execute query get  at specified url
     * 
     * @param url url of the resource
     * @param data data passed to url
     */
    async getData(url : string, data: object = {}) : Promise<null | object>
    {
        let params : Array<string> = new Array();
        for (const x in data) {
            params.push(x + "=" + <string>(data[x] ?? ''));
        }        
        return this.fetchData(url + '?' + params.join('&'), "GET");
    }


    async fetchData(url : string, method : string, data: object = {}) : Promise<null | object>
    {

        let result = null;

        await fetch(url, {
            method: method, // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
                "Content-Type": "application/json",
            },
            redirect: "follow", // manual, *follow, error
            body: JSON.stringify(data) // le type utilisé pour le corps doit correspondre à l'en-tête "Content-Type"
        }).then((resp :Response) => {

            console.log(resp);

            if (resp.status == 201) {
                result = resp.json();
            }

            return null;

        });

        return result;
    
    }
    
    
    fetch3() {
    
    }


}

export let http = new ClientHttp();

