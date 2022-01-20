const url = 'http://localhost:3000';

export async function getAllPosts() {
    const allPosts = await fetch(`${url}/posts`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        });

        return await allPosts.json();
}

export async function createPost(data) {
    const post = await fetch(`${url}/posts`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        return await post.json();
}

export async function deletePost(id) {
    const post = await fetch(`${url}/posts/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            },
        });

        return await post.json();
}