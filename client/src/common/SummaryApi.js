
export const baseURL = "http://localhost:8000"

const SummaryApi = {
    register: {
        url: "/api/user/register",
        method: "post"
    },
    login: {
        url: "/api/user/login",
        method: "post"
    },
    forgot_password: {
        url: "/api/user/forgot-password",
        method: "put"
    },
    verify_otp: {
        url: "/api/user/verify-otp",
        method: "post"
    },
    reset_password: {
        url: "/api/user/reset-password",
        method: "put"
    },
    refreshToken: {
        url: "/api/user/refresh-token",
        method: "post"
    },
    userDetails: {
        url: "/api/user/user-details",
        method: "get"
    },
    logout: {
        url: "/api/user/logout",
        method: "get"
    },
    uploadAvatar: {
        url: "/api/user/upload-avatar",
        method: "put"
    },
    updateUserDetails: {
        url: "/api/user/update-user",
        method: "put"
    },
    addCategory: {
        url: "/api/category/add-category",
        method: "post"
    },
    uploadImage: {
        url: "/api/file/upload",
        method: "post"
    },
    getCategories: {
        url: "/api/category/get-categories",
        method: "get"
    },
    updateCategory: {
        url: "/api/category/update-category",
        method: "put"
    },
    deleteCategory: {
        url: "/api/category/delete-category",
        method: "delete"
    },
    createSubCategory: {
        url: "/api/subcategory/add-subcategory",
        method: "post"
    },
    getSubCategory: {
        url: "/api/subcategory/get-subcategory",
        method: "post"
    },
    updateSubCategory: {
        url: "/api/subcategory/update-subcategory",
        method: "put"
    },
    deleteSubCategory: {
        url: "/api/subcategory/delete-subcategory",
        method: "delete"
    },
    addProduct: {
        url: "/api/product/add-product",
        method: "post"
    },
    getProducts: {
        url: "/api/product/get-products",
        method: "get"
    },
}

export default SummaryApi