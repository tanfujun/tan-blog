export type publishBody =  {
    user_id:string,
    article_title:string,
    article_image?:string,
    article_content:string,
    article_views:number,
    article_comment_count:number,
    article_like_count:number,
    sort_id:string
}

export type changeBody = {
    article_id:string,
    article_title?:string,
    article_image?:string,
    article_content?:string
}

export type arcticleBySortIdParams = {
    sort_id:string,
    dateDesc?:boolean,
    viewsDesc?:boolean,
    offset?:number,
    limit?:number
}

export type allArcticleParams = {
    dateDesc?:boolean,
    viewsDesc?:boolean,
    offset?:number,
    limit?:number
}
