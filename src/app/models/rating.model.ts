
export class Rating{
    private _id: number;
    private _user: string;
    private _post: number;
    private _beoordeling: number;
    private _datum: string;

    static fromJSON(json): Rating{
        const rating = new Rating(json.user, json.beoordeling, json.post);
        rating._id = json._id;
        rating._datum = json.datum;
        return rating;
    }

    constructor(user: string, beoordeling: number, post: number){
        this._user = user;
        this._beoordeling = beoordeling || 0;
        this._post = post;
    }

    get id(): number{
        return this._id;
    }

    get user(): string{
        return this._user;
    }

    set user(user: string){
        this._user = user;
    } 

    get post(): number{
        return this._post;
    }

    set post(post: number){
        this._post = post;
    } 

    get datum(): string{
        return this.datum;
    }

    set datum(datum: string){
        this._datum = datum;
    }


    get beoordeling(): number{
        //let gemiddelde = 0
        //this._beoordeling.forEach(x => gemiddelde += x);
        //gemiddelde / this._beoordeling.length;
        return this._beoordeling;
    }

    set beoordeling(beoordeling: number){
        this._beoordeling = beoordeling
    }

    //addBeoordeling(beoordeling: number){
      //  this._beoordeling.push(beoordeling);
    //}



    toJSON(){
        return{
            _id: this._id,
            _user: this._user,
            beoordeling: this._beoordeling,
            post: this._post
        };
    }


}