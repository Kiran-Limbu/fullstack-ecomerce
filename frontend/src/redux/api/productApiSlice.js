import { PRODUCT_URL, UPLOAD_URL } from "../constants";
import { apiSlice } from "./apiSlice";


export const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        getProduct: builder.query({
            query: ({ keyword }) => ({
                url: `${PRODUCT_URL}`,
                params: { keyword },
            }),
            keepUnusedDataFor: 5,
            providesTags: ["Products"],
        }),

        getProductById: builder.query({
            query: (productId) => ({
                url: `${PRODUCT_URL}/${productId}`,
                providesTags: (result, error, productId) => [
                    { type: "Product", id: productId }
                ]
            }),
        }),

        allProducts: builder.query({
            query: () => ({
                url: `${PRODUCT_URL}/allproducts`,
            }),
        }),

        getProductDetails: builder.query({
            query: (productId) => ({
                url: `${PRODUCT_URL}/${productId}`
            }),
            keepUnusedDataFor: 5,
        }),

        createProduct: builder.mutation({
            query: (productData) => ({
                url: `${PRODUCT_URL}`,
                method: "POST",
                body: productData
            }),
            invalidatesTags: ["Product"],
        }),

        updateProduct: builder.mutation({
            query: ({ productId, formData }) => ({
                url: `${PRODUCT_URL}/${productId}`,
                method: "PUT",
                body: formData
            }),
        }),

        uploadProductImage: builder.mutation({
            query: (data) =>({
                url: `${UPLOAD_URL}`,
                method: "POST",
                body: data
            }),
        }),

        deleteProduct: builder.mutation({
            query: (productId) => ({
                url: `${PRODUCT_URL}/${productId}`,
                method: "DELETE"
            }),
            providesTags: ["Product"]
        }),

        createReview: builder.mutation({
            query: (data) => ({
                url: `${UPLOAD_URL}/${data.productId}/reviews`,
                method: "POST",
                body: data
            }),
        }),

        getTopProduct: builder.query({
            query: () => `${PRODUCT_URL}/top`,
            keepUnusedDataFor: 5,
        }),

        getNewProduct: builder.query({
            query: () => `${PRODUCT_URL}/new`,
            keepUnusedDataFor: 5,
        }),

    }),
});


export const {
    useGetProductQuery,
    useGetProductByIdQuery,
    useAllProductsQuery,
    useGetProductDetailsQuery,
    useCreateReviewMutation,
    useCreateProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
    useGetTopProductQuery,
    useGetNewProductQuery,
    useUploadProductImageMutation
} = productApiSlice;