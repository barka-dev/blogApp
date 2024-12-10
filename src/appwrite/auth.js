/* eslint-disable no-useless-catch */
import { Client, Account, ID } from "appwrite";
import {conf} from '../conf/conf.js'

export class AuthService {
    client = new Client()
    account;

    constructor(){
        this.client.setProject(conf.appwriteProjectId)
        this.account = new Account(this.client)
    }

    async createAccount({email, password, name}){
        try{
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if(userAccount){
                return this.login({email, password})
            }else{
                return userAccount
            }
        }catch(error){
            throw error
        }
    }

    async login({email, password}){
        try{
            return await this.account.createEmailPasswordSession(email, password);
        }catch (error){
            throw error
        }

    }

    async getCurrentUser(){
        try{
            return await this.account.get()
        }catch(error){
            console.log("AuthService :: getCurrentUser() :: ", error)
        }
    }

    async logout(){
        try {
            return this.account.deleteSessions()
        } catch (error) {
            console.log("AuthService :: logout() :: ", error)
        }
    }
}

const authService = new AuthService()

export default authService
