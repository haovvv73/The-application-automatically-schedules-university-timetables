import Dbconnection from "./dbConnection.js"

class LecturerService {
    constructor(){
        this.connection = Dbconnection.getInstance().connection
        this.lecturerTable = 'lecturer'
    }

    // GET
    async getUsers(){
        const query = 'SELECT * FROM ?'
        const [row] = await this.connection.execute(query,[this.lecturerTable])
        const result = []

        

        return result
    }

    getUserById(){

    }

    getUserByEmail(){

    }

    // DELETE
    deleteUserById(){

    }

    // POST
    saveUser(){

    }

    // PUT
    updateUser(){

    }

}

const lecturerService = new LecturerService()
export default lecturerService