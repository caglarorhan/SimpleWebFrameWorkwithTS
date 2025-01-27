import axios, {AxiosResponse, AxiosPromise} from 'axios';


interface HasId {
    id?:number;
}

export class ApiSync<T extends HasId>{
    constructor(public rootUrl: string){}



    fetch(id: number):AxiosPromise{
        return axios.get(`${this.rootUrl}/${id}`);
    }


    save(data:T):AxiosPromise{
        const {id} = data;
        
        if(id){
            //put
            return axios.put(`${this.rootUrl}/${id}`, data); // an update process
        }else{
            //post
            return axios.post( this.rootUrl, data); // an insert process for new record
        }

    }




}