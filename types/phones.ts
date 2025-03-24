export type Brand = {
    brandId: string
    brandCode : string
    brandName : string
    isDeleted : boolean
}
export type Model ={
    modelId: string
    brandId : string
    modelCode : string
    modelName : string
    isDeleted : boolean
}
export type Storage = {
    storageId : string
    storageCode : string
    storageValue : string
    isDeleted : boolean
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