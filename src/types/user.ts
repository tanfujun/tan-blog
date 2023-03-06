export type loginParams = {
    user_name:string,
    user_password:string
}

export type registerBody = {
    user_name:string,
    user_password:string,
    user_email:string,
    user_profile_photo?:string,
    user_age?:number,
    user_nickname:string

}

export type updateBody = {
    user_nickname?:string
    user_email?:string,
    user_age?:number
}