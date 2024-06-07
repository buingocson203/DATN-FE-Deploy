export interface IProduct {
    _id: string
    name: string
    price: number
    description: string
    image: string
    categoryId: any
    sizeId: { size: string }[]
    IdImages: string[]
    color: string
    importPrice: number
    promotionalPrice: number
    createdAt: Date
    updatedAt: Date
}
