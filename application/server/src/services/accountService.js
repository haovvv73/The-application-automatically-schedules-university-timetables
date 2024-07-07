import { Account } from "../models/account.js"
import Dbconnection from "./dbConnection.js"

class AccountService {
    constructor() {
        this.connection = Dbconnection.getInstance().connection
        this.table = 'account'
        this.subTable = 'permission'
    }

    // READ
    async getAccountByID(accountID) {
        const query = `
        SELECT * FROM ${this.table} 
        LEFT JOIN ${this.subTable} ON ${this.table}.accountID = ${this.subTable}.accountID 
        WHERE ${this.table}.accountID = ?`
        const [row] = await this.connection.execute(query, [accountID])
        const result = []

        if (row.length > 0) {
            for (let account of row) {
                result.push(new Account(
                    account.accountID,
                    account.email,
                    account.password,
                    account.permissionRead,
                    account.permissionCreate,
                    account.permissionUpdate,
                    account.permissionDelete,
                ))
            }
        }

        return result
    }

    async getAccounts() {
        const query = `SELECT * FROM ${this.table} 
        LEFT JOIN ${this.subTable} ON ${this.table}.accountID = ${this.subTable}.accountID `
        const [row] = await this.connection.execute(query)
        const result = []

        if (row.length > 0) {
            for (let account of row) {
                result.push(new Account(
                    account.accountID,
                    account.email,
                    account.password,
                    account.permissionRead,
                    account.permissionCreate,
                    account.permissionUpdate,
                    account.permissionDelete,
                ))
            }
        }

        return result
    }

    async getAccountByEmail(email) {
        const query = `
        SELECT * FROM ${this.table} 
        LEFT JOIN ${this.subTable} ON ${this.table}.accountID = ${this.subTable}.accountID 
        WHERE ${this.table}.email = ?`
        const [row] = await this.connection.execute(query, [email])
        const result = []

        if (row.length > 0) {
            for (let account of row) {
                result.push(new Account(
                    account.accountID,
                    account.email,
                    account.password,
                    account.permissionRead,
                    account.permissionCreate,
                    account.permissionUpdate,
                    account.permissionDelete,
                ))
            }
        }

        return result
    }

    // DELETE
    async deleteAccount(accountID) {
        try {
            // Start a transaction
            await this.connection.query('START TRANSACTION');

            const query = `DELETE FROM ${this.table} WHERE accountID = ?`
            const subQuery = `DELETE FROM ${this.subTable} WHERE accountID = ?`

            // delete account
            const result = await this.connection.execute(query, [accountID])
            // delete permission
            await this.connection.execute(subQuery, [accountID])

            // Commit the transaction
            await this.connection.query('COMMIT');

            return result[0].affectedRows;
        } catch (error) {
            // Rollback the transaction if there's an error
            await this.connection.query('ROLLBACK');
            throw error; // Re-throw the error for the caller to handle
        }

    }

    // CREATE
    async saveAccount(account) {
        try {
            // Start a transaction
            await this.connection.query('START TRANSACTION');

            const query = `INSERT INTO ${this.table}(email,password) VALUES(?,?)`
            const result = await this.connection.execute(query, [
                account.email,
                account.password
            ])

            const insertID = result[0].insertId            
            const subQuery = `INSERT INTO ${this.subTable}(accountID,permissionRead,permissionCreate,permissionUpdate,permissionDelete) VALUES(?,?,?,?,?)`
            await this.connection.execute(subQuery, [insertID,0,0,0,0])

            // Commit the transaction
            await this.connection.query('COMMIT');

            return result[0].affectedRows
        } catch (error) {
            // Rollback the transaction if there's an error
            await this.connection.query('ROLLBACK');
            throw error; // Re-throw the error for the caller to handle
        }
    }

    // UPDATE
    async updateAccount(account) {
        try {
            // Start a transaction
            await this.connection.query('START TRANSACTION');

            const query = `UPDATE ${this.table} SET email = ?,password = ? WHERE AccountID = ?`
            const result = await this.connection.execute(query, [
                account.email,
                account.password,
                account.AccountID
            ])
            
            // Commit the transaction
            await this.connection.query('COMMIT');

            return result[0].affectedRows
        } catch (error) {
            // Rollback the transaction if there's an error
            await this.connection.query('ROLLBACK');
            throw error; // Re-throw the error for the caller to handle
        }
    }

}

const accountService = new AccountService()
export default accountService