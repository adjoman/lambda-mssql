const sql = require('mssql');
var file_config = require('./conn.json');

exports.handler = function(event, context, callback) {  
    
    const config = {
        user: file_config.dbuser,
        password: file_config.dbpassword,
        server: file_config.dbhost,
        database: file_config.dbname
    };
    
    sql.connect(config, (err) => {
    
    if (err) 
    {
      console.log('Error ' + err);
      callback(err);
    } 
    else 
    {
        const req = new sql.Request();
        req.query('SELECT * FROM [table]', (error, result) => {
        
        if (error) 
        {
          console.log('Error' + error);
          callback(error);
        } 
        else 
        {
          console.log('Result' + result);
          sql.close();
          callback(null, result.recordset);
        }
        
      });
    }
  });
    
};