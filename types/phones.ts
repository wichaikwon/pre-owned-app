export type Brand = {
    brandId: string
    brandName : string
}
export type Model ={
    modelId: string
    brandId : string
    modelName : string
}
export type Storage = {
    strorageId : string
    storageValue : string
}
export type Phone = {
    phoneId : string
    brandId : string
    modelId : string
    storageId : string
    price : number
    minPrice : number
}

export type Lang = {
    id : string
    name : {
        en : string
        th : string
    }
}