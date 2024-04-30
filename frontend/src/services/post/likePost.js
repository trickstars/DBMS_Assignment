import { makeRequest } from "../makeRequest";

export async function likePost(userToken, postId) {
    const response = await makeRequest("/posts/favorite", {
        method: "post",
        headers: {
            'Authorization': `Bearer ${userToken}`
        },
        data: { 
            postId: postId
        }
    })

    return response
}