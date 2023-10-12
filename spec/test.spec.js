const http=require('http');
const {createServer,handleRequest}=require('../main');
const mysql=require('mysql');


const dbConfig={
    connectionLimit:10,
    host:'localhost',
    user:'root',
    password:'password',
    database:'hw5_test'
};

const dbPool=mysql.createPool(dbConfig);

const sendRequest=(method,path,postData,callback)=>{
   
    const options={
        hostname:'localhost',
        port:8081,
        path,
        method,
        headers:{
            'Content-Type':'application/json',
        },
    };

    const req=http.request(options,(res)=>{
        let data='';
        res.setEncoding('utf-8');
        res.on('data',(chunk)=>{
            data+=chunk;
        });
        res.on('end',()=>{
            res.body=data;
            callback(res);
        });
    });

    if(postData){
        req.write(JSON.stringify(postData));
    }
    req.end();
}

const clearDatabase=(done)=>{
    const connection=mysql.createConnection(dbConfig);
    connection.connect();
    connection.query('DELETE FROM People',(error)=>{
        connection.end();
        done();
    });
};

describe('Server API',()=>{
    let server;

    beforeAll((done)=>{
        server= createServer(handleRequest,dbPool);
        server.listen(8081,done);
    });

    afterAll((done)=>{
        server.close(()=>{
            dbPool.end(done);
        });
    });

    afterEach((done)=>{
        clearDatabase(done);
    });


    describe('GET requests',()=>{

        it('should return 200 when retrieving records',(done)=>{
            sendRequest('GET','/get-data',null,(res)=>{
                expect(res.statusCode).toBe(200);
                expect(res.headers['content-type']).toContain('application/json');
                done();
            });
        });

        it('should return 404 when route is invalid for GET',(done)=>{
            sendRequest('GET','/invalid',null,(res)=>{
                expect(res.statusCode).toBe(404);
                expect(res.body).toBe('Not Found');
                done();
            });
        });

    });

    describe('POST requests',()=>{
        
        it('should return 200 when adding a new record to the database with valid POST data',(done)=>{
            const postData={
                CustomerID:'123',
                FirstName:'T',
                LastName:'Doe',
                Email:'johndoe@email.com',
                Phone:'1234567890',
                Address:'123 Main St',
                City:'Anytown',
                State:'NJ',
                ZipCode:'12345',
            };
            sendRequest('POST','/add-data',postData,(res)=>{
                expect(res.statusCode).toBe(200);
                expect(res.body).toBe('Data Added Successfully');
                done();
            });

        });

        it('should return 400 Bad Request for a POST request with missing data',(done)=>{
            const postData={ };
            sendRequest('POST','/add-data',postData,(res)=>{
                expect(res.statusCode).toBe(400);
                expect(res.body).toBe('Bad Request: Required Fields Missing');
                done();
            });
        });

        it('should return 400 Bad Request for a POST request with invalid JSON data', (done) => {
            const invalidData = 'This is not valid JSON data';
            sendRequest('POST', '/add-data', invalidData, (res) => {
                expect(res.statusCode).toBe(400);
                done();
            });
        });

        it('should return 404 when route is invalid for POST',(done)=>{
            sendRequest('POST','/invalid',null,(res)=>{
                expect(res.statusCode).toBe(404);
                expect(res.body).toBe('Not Found');
                done();
            });
        });

    });

})

