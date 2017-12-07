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
    private _datum: string;
    private _comments: Comment[];

    static fromJSON(json): Post{
        console.log(json);
        const post = new Post(json.title, json.inhoud, json.auteur.username, json.category.name, json.beoordeling, json.comments);
        post._id = json._id;
        post._auteurId = json.auteur._id;
        post._datum = json.datum;
        return post;
    }

    constructor(title: string, inhoud: string, auteur: string, category: string, beoordeling?: Rating[], comments?: Comment[]){
        this._title = title;
        this._inhoud = inhoud;
        this._auteur = auteur;
        this._category = category;
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

    get datum(): string{
        return this.datum;
    }

    set datum(datum: string){
        this._datum = datum;
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

    get averageRond(): number{
        return Math.round(this.average);
    }

    get aantalRates(): number{
        return this._beoordeling.length;
    }

    get score(): number{
        //post op datum, voor 3 dagen
        //na 3 dagen, zeker niet meer in eerste pagina
        //1ste dag = 10
        //2de = 9, 3de= 7, 4de= 4, 5de=2, 6-x = 1
        var dagScore: number;
        var today = new Date();
        var datumlang: String[] = this._datum.split("-");
        var jaar = datumlang[0];
        var maand = datumlang[1];
        var dag = datumlang[2].substring(0,2);
        var daatuum = new Date(maand+"/"+dag+"/"+jaar);
        var dagen = Math.ceil((today.getTime() - daatuum.getTime()) / (1000 * 3600 * 24));
        switch(dagen){
            case 0: dagScore = 10; break;
            case 1: dagScore = 10; break;
            case 2: dagScore = 9; break;
            case 3: dagScore = 7; break;
            case 4: dagScore = 4; break;
            case 5: dagScore = 2; break;
            default: dagScore = 1; break;
        }
        //aantal ratings + average
        //
        let rateScore = 0;
            if(this._beoordeling.length != 0){
            this._beoordeling.forEach(x => {
                if(x.beoordeling > 5){
                    rateScore += x.beoordeling;
                }if(x.beoordeling < 5){
                    rateScore -= (5-x.beoordeling);
                }
            })
        }
        if(rateScore < 0){
            rateScore = 0;
        }else{
            rateScore = rateScore/5;
        }
        //aantal comments
        let commentScore = this.comments.length * 1.5;
        
        var een = rateScore * dagScore + commentScore * dagScore;

        return een;

        //return 0;
    }
    
    get scoreRond(): number{
        return Math.round(this.score);
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