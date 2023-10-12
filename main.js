const http = require('http');
const url = require('url');
const mysql = require('mysql');
const querystring = require('querystring');


const dbPool = mysql.createPool({
  connectionLimit: 10, 
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'hw5',
});

const server=http.createServer((req,res)=>{
    const parsedUrl=url.parse(req.url,true);
    
    if(req.method==='GET' && parsedUrl.pathname==='/get-data'){
        dbPool.getConnection((err,connection)=>{
            if(err){
                res.writeHead(500,{'Content-Type':'text/plain'});
                res.end('Internal Server Error');
            }

            const sql= `SELECT * FROM People`;
            connection.query(sql,(err,result)=>{
                connection.release();
                if(err){
                    res.writeHead(500,{'Content-Type':'text/plain'});
                    res.end('Internal Server Error');
                }else{
                    res.writeHead(200,{'Content-Type':'application/json'});
                    res.end(JSON.stringify(result));
                }
            });
        });
    }

    else if(req.method==='POST' && parsedUrl.pathname==='/add-data'){
        let body='';
        req.on('data',(chunk)=>{
            body+=chunk.toString();
        });
        req.on('end',()=>{
            try{
            const postData=JSON.parse(body);
            if(!postData.FirstName && !postData.LastName && !postData.CustomerID && !postData.Email && !postData.Phone){
                res.writeHead(400,{'Content-Type':'text/plain'});
                res.end('Bad Request: Required Fields Missing');
                return;
            }
            dbPool.getConnection((err,connection)=>{
                if(err){
                    res.writeHead(500,{'Content-Type':'text/plain'});
                    res.end('Internal Server Error');
                    return;
                }
                const sql = 'INSERT INTO People (CustomerID,FirstName, LastName, Email, Phone, Address, City, State, ZipCode, RegistrationDate) VALUES (?,?, ?, ?, ?, ?, ?, ?, ?, ?)';
                const values = [
                postData.CustomerID,
                postData.FirstName,
                postData.LastName,
                postData.Email,
                postData.Phone || null, 
                postData.Address || null,
                postData.City || null,
                postData.State || null,
                postData.ZipCode || null,
                new Date(), 
                ];

                connection.query(sql,values,(err,result)=>{
                    connection.release();
                    if(err){
                        res.writeHead(500,{'Content-Type':'text/plain'});
                        res.end('Internal Server Error');
                        return;
                    }else{
                        res.writeHead(200,{'Content-Type':'text/plain'});
                        res.end('Data Added Successfully');
                        return;
                    }
                });
            });
        }catch(error){
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end('Bad Request: Invalid JSON data');
        }
        });
    }

    else if(req.method==='DELETE' && parsedUrl.pathname==='/delete-data'){
        const customerID=parsedUrl.query.CustomerID;
        if(!customerID){
            res.writeHead(400,{'Content-Type':'text/plain'});
            res.end('Bad Request: CustomerID is missing in the query parameters');
        }
        dbPool.getConnection((err,connection)=>{
            if(err){
                res.writeHead(400,{'Content-Type':'text/plain'});
                res.end('Internal Server error');
                return;
            }
            const sql='DELETE FROM People WHERE CustomerID=?';
            const values=[customerID];
            connection.query(sql,values,(err,result)=>{
                connection.release();
                if(err){
                    res.writeHead(500,{'Content-Type':'text/plain'});
                    res.end('Internal Server Error');
                }else{
                    res.writeHead(200,{'Content-Type':'text/plain'});
                    res.end('Data deleted successfully');
                }
            });
        });
    }

    else if(req.method==='PUT' && parsedUrl.pathname==='/update-data'){
        let body='';
        req.on('data',(chunk)=>{
            body+=chunk.toString();
        });

        req.on('end',()=>{
            try{
                const postData=JSON.parse(body);
                if(!postData.CustomerID){
                    res.writeHead(400,{'Content-Type':'text/plain'});
                    res.end('Bad Request: Required fields missing');
                    return;
                }

                dbPool.getConnection((err,connection)=>{
                    if(err){
                        res.writeHead(500,{'Content-Type':'text/plain'});
                        res.end('Internal server error');
                        return;
                    }

                    let sql='UPDATE People SET ';
                    const values=[];
                    if(postData.FirstName){
                        sql+=' FirstName=?,';
                        values.push(postData.FirstName);
                    }
                    if(postData.LastName){
                        sql+=' LastName=?,';
                        values.push(postData.LastName);
                    }
                    if (postData.Email) {
                        sql += ' Email = ?,';
                        values.push(postData.Email);
                    }
                    if (postData.Phone) {
                        sql += ' Phone = ?,';
                        values.push(postData.Phone);
                    }
                    if (postData.Address) {
                        sql += ' Address = ?,';
                        values.push(postData.Address);
                    }
                    if (postData.City) {
                        sql += ' City = ?,';
                        values.push(postData.City);
                    }
                    if (postData.State) {
                        sql += ' State = ?,';
                        values.push(postData.State);
                    }
                    if (postData.ZipCode) {
                        sql += ' ZipCode = ?,';
                        values.push(postData.ZipCode);
                    }
                    sql=sql.slice(0,-1)+'WHERE CustomerID=?';
                    values.push(postData.CustomerID);

                    connection.query(sql,values,(err,result)=>{
                        connection.release();
                        if(err){
                            res.writeHead(500,{'Content-Type':'text/plain'});
                            res.end('Internal server error');
                        }else{
                            res.writeHead(200,{'Content-Type':'text/plain'});
                            res.end('Data updated successfully');
                        }
                    });
                });
            }catch(error){
                res.writeHead(400,{'Content-Type':'text/plain'});
                res.end('Bad Request: Invalid JSON data');
            }
        });
    }

    
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
      }

});

const port = 8080;
server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
