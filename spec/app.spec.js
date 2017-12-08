let Request = require('request');

describe("Server", ()=>{
    let server;
    beforeAll(() =>{
        server = require('../app');
    });
    afterAll(()=>{

    });

    describe("GET /alles", ()=>{
        let data ={};

        beforeAll((done)=>{
            Request(
                { method: 'GET',
                uri: 'http://localhost:3000/alles',
                json: true
            }, (error, response, body) => {
                data.status = response.statusCode;
                data.body = body;
                done();
            })
        });
        it("status 200", ()=>{
            expect(data.status).toBe(200);
        });
        it("check body", ()=>{
            expect(data.body.length).toBe(2);
            let post = data.body[0];
            expect(post.title).toBe("hoi");
            expect(post.comments.length).toBe(2);
        });
    });

    describe("GET /id", () => {
        var data = {};
        beforeAll((done) => {
            Request(
                { method: 'GET'
                , uri: 'http://localhost:3000/5a27d47d04cc4d12341c9726'
                , json: true
                }, (error, response, body) => {
                data.status = response.statusCode;
                data.body = body;
                done();
            })
        });
        it("Status 200", () => {
            expect(data.status).toBe(200);
        });
        it("Body", () => {
            expect(data.body.title).toBe("hoi");
            expect(data.body.comments.length).toBe(2);
        });
    });

    describe("Post /users/checkusername", () => {
        var data = {};
        beforeAll((done) => {
            Request(
                { method: 'Post'
                , uri: 'http://localhost:3000/users/checkusername'
                , json: true,
                body:{username:"Stijn"}
                }, (error, response, body) => {
                data.status = response.statusCode;
                data.body = body;
                done();
            })
        });
        it("Status 200", () => {
            expect(data.status).toBe(200);
        });
        it("Body", () => {
            expect(data.body.username).toBe("alreadyexists");
        });
    });
    
});