import { Comment } from './comment.model';
import { Rating } from './rating.model';

export class Post{
    private _id: number;
    private _title: string;
    private _inhoud: string;
    private _auteur: string;
    private _auteurId: number;
    private _beoordeling: Rating[];
    private _category: string;
    private _comments: Comment[];

    static fromJSON(json): Post{
        const post = new Post(json.title, json.inhoud, json.auteur.username, json.category.name, json.beoordeling, json.comments);
        post._id = json._id;
        post._auteurId = json.auteur._id;
        return post;
    }

    constructor(title: string, inhoud: string, auteur: string, category?: string, beoordeling?: Rating[], comments?: Comment[]){
        this._title = title;
        this._inhoud = inhoud;
        this._auteur = auteur;
        this._category = category || "algemeen";
        this._beoordeling = beoordeling || new Array<Rating>();
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

    get auteurId(): number{
        return this._auteurId;
    }

    get category(): string{
        return this._category;
    }

    set category(category: string){
        this._category = category;
    }


    get beoordeling(): Rating[]{
        //let gemiddelde = 0
        //this._beoordeling.forEach(x => gemiddelde += x);
        //gemiddelde / this._beoordeling.length;
        return this._beoordeling;
    }

    addBeoordeling(beoordeling: Rating){
        this._beoordeling.push(beoordeling);
    }

    get average(): number{
        if(this._beoordeling.length > 0){
            let gem = 0;
            this._beoordeling.forEach(x => gem += x.beoordeling);
            return gem / this._beoordeling.length;
          }
        return 0;
    }

    get aantalRates(): number{
        return this._beoordeling.length;
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