export class Comment{
    private _id: number;
    private _inhoud: string;
    private _auteur: string;
    private _auteurId: number;
    private _beoordeling: number;
    private _post: number;

    static fromJSON(json): Comment{
        const comment = new Comment(json.inhoud, json.auteur.username, json.post, json.beoordeling);
        comment._id = json._id;
        comment._auteurId = json.auteur._id;
        return comment;
    }

    constructor(inhoud: string, auteur: string, post: number, beoordeling?: number){
        this._inhoud = inhoud;
        this._auteur = auteur;
        this._post = post;
        this._beoordeling = beoordeling || 0;
    }

    get id(): number{
        return this._id;
    }

    get inhoud(): string{
        return this._inhoud;
    }
    
    set inhoud(inhoud: string){
        this._inhoud = inhoud;
    }

    get auteur(): string{
        return this._auteur;
    }
    
    set auteur(auteur: string){
        this._auteur = auteur;
    }

    get auteurId(): number{
        return this._auteurId;
    }

    get post(): number{
        return this._post;
    }
    
    set post(post: number){
        this._post = post;
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
            inhoud: this._inhoud,
            auteur: this._auteur,
            post: this._post,
            beoordeling: this._beoordeling
        };
    }


}