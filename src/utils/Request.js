// const host = "Evolearn.ddns.net:63000";
//const host = "localhost:3000";
const host = "localhost:63367";

export function request(url, method="GET",header={"Content-type": "application/json"},data){
    var token = localStorage.getItem("token");
    if(token != null){
        header["Authorization"] = "Bearer "+ token;
    }
    return fetch("http://"+host+"/"+url,{
        method: method,
        headers:header,
        cache: 'default',
        body: data
    })
}