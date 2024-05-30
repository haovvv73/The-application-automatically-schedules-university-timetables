import mysql from 'mysql2/promise.js'

class Dbconnection{
    static instance = null

    constructor() {
        this.connection = mysql.createPool({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'hcmus_automatic_schedule'
        });

        this.connection.query('SELECT 1')
            .then(()=>{
                console.log('CONNECT DATABASE SUCCESS');
            })
            .catch((err)=>{
                console.log('CONNECT DATABASE FAILED ' + err);
            });
    }

    static getInstance(){
        if(Dbconnection.instance == null){
            Dbconnection.instance = new Dbconnection()
        }

        return Dbconnection.instance
    } 
}

export default Dbconnection