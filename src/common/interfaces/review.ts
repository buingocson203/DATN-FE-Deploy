export interface IReview {
    _id: string
    idAccount: {
        _id: string
        userName: string
        email: string
    }
    productId: string
    content: string
    createdAt: Date
    updatedAt: Date
}
