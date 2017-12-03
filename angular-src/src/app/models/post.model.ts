import { Comment } from './comment.model';

export class Post{
    private _id: number;
    private _title: string;
    private _inhoud: string;
    private _auteur: string;
    private _beoordeling: number;
    private _category: string;
    private _comments: Comment[];

    static fromJSON(json): Post{
        const post = new Post(json.title, json.inhoud, json.auteur.username, json.category.name, json.beoordeling, json.comments);
        post._id = json._id;
        return post;
    }

    constructor(title: string, inhoud: string, auteur: string, category?: string, beoordeling?: number, comments?: Comment[]){
        this._title = title;
        this._inhoud = inhoud;
        this._auteur = auteur;
        this._category = category || "algemeen";
        this._beoordeling = beoordeling || 0;
        this._comments = comments || new Array<Comment>();
    }

    get id(): number{
        return this._id;
    }

    get title(): string{
        return this._title;
    }

    set title(title: string){
        this._title = title;
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

    get category(): string{
        return this._category;
    }

    set category(category: string){
        this._category = category;
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

    get comments(): Comment[]{
        return this._comments;
    }

    addComment(comment: Comment){
        this._comments.push(comment);
    }



    toJSON(){
        return{
            _id: this._id,
            _title: this._title,
            inhoud: this._inhoud,
            auteur: this._auteur,
            category: this._category,
            beoordeling: this._beoordeling,
            comments: this._comments
        };
    }


}