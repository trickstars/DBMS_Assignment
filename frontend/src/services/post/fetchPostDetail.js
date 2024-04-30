import { makeRequest } from "../makeRequest";

export async function fetchPostDetail(id, token = null) {
    const postDetail = await makeRequest("/posts", {
        method: "post",
        headers: {
            'Authorization' : `${token}`
        },
        data: {
            postId: id

        }
    })

    return postDetail
}