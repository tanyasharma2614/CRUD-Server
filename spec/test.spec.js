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

    describe('PUT requests',()=>{

        it('should return 200 when updating a valid record',(done)=>{
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
            });
            const updatedData={
                CustomerID:'123',
                FirstName:'Tanya'
            }
            sendRequest('PUT','/update-data',updatedData,(putRes)=>{
                expect(putRes.statusCode).toBe(200);
                expect(putRes.body).toBe('Data updated successfully');
                done();
            });
        });

        it('should return 400 Bad Request for PUT request with missing or invalid data',(done)=>{
            const putData={
                FirstName:'Tanya'
            };
            sendRequest('PUT','/update-data',putData,(res)=>{
                expect(res.statusCode).toBe(400);
                expect(res.body).toBe('Bad Request: Required fields missing');
                done();
            });
        });

        it('should return 404 when route is invalid for PUT',(done)=>{
            sendRequest('PUT','/invalid',null,(res)=>{
                expect(res.statusCode).toBe(404);
                expect(res.body).toBe('Not Found');
                done();
            });
        });

    });

    describe('DELETE requests',()=>{

        it('should return 200 when deleting a record with a valid CustomerID',(done)=>{
            const postData = {
                CustomerID: '123',
                FirstName: 'John',
                LastName: 'Doe',
                Email: 'johndoe@email.com',
                Phone: '1234567890',
            };
            sendRequest('POST','/add-data',postData,(postRes)=>{
                expect(postRes.statusCode).toBe(200);
            });
            sendRequest('DELETE','/delete-data?CustomerID=123',null,(deleteRes)=>{
                expect(deleteRes.statusCode).toBe(200);
                expect(deleteRes.body).toBe('Data deleted successfully');
                done();
            });
        });

        it('should return 400 Bad Request when deleting a record with an invalid Parameter',(done)=>{
            sendRequest('DELETE','/delete-data?customerId=1',null,(deleteRes)=>{
                expect(deleteRes.statusCode).toBe(400);
                expect(deleteRes.body).toBe('Bad Request: CustomerID is missing in the query parameters');
                done();
            });
        });

        it('should return 400 Bad Request when deleting a record with a missing Parameter',(done)=>{
            sendRequest('DELETE','/delete-data',null,(deleteRes)=>{
                expect(deleteRes.statusCode).toBe(400);
                expect(deleteRes.body).toBe('Bad Request: CustomerID is missing in the query parameters');
                done();
            });
        });

        it('should return 404 when route is invalid for DELETE',(done)=>{
            sendRequest('DELETE','/invalid',null,(res)=>{
                expect(res.statusCode).toBe(404);
                expect(res.body).toBe('Not Found');
                done();
            });
        });

    });

})

