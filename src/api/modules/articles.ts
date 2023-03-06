import request from '../request'

import type {publishBody,changeBody,allArcticleParams,arcticleBySortIdParams} from '@/types/article'

export function publishArticle(article:publishBody){
        return request.post('/article/publish',article)
}

export function deleteArticle(article_id:string){
    return request.delete(`/article/delete?article_id=${article_id}`)
}

export function updateArticle(newArticle:changeBody){
    return request.post('/article/change',newArticle)
}

export function getArticleById(user_id:string){
    return request.get(`/article/getUserArticle?user_id=${user_id}`)
}

export function getAllSort(){
    return request.get('/article/allSort')
}

export function getAllArcticleBySortId(params:arcticleBySortIdParams){
    return request.get('/article/getAllArcticleBySortId',{
        params
    })
}

export function getAllArcticle(params:allArcticleParams){
    return request.get('/article/getAllArcticle',{
        params
    })
}

export function getDetailByArcticleId(article_id:string){

    return request.get(`/article/getDetailByArcticleId?article_id=${article_id}`)
}

export function addArticleViews(article_id:string){
    return request.get(`/article/addViews?article_id=${article_id}`)
}

export function searchArticleAndUserByKey(key:string){
    
    return request.get(`/article/searchArcticle?key=${key}`)    
}