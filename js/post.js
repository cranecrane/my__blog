(() => {
    const pageParams = new URLSearchParams(window.location.search); 
    const pageId = pageParams.get('id');

    function createCommentElement(data) {
        const commentElement = document.createElement('article');
        const commentHeader = document.createElement('header');
        const commentBody = document.createElement('div');
        const commentTitle = document.createElement('h3');
        const commentText = document.createElement('p');

        commentElement.classList.add('card', 'bg-light', 'mb-3');
        commentHeader.classList.add('card-header');
        commentBody.classList.add('card-body');
        commentTitle.classList.add('card-title', 'fs-5');
        commentText.classList.add('card-text');

        commentHeader.textContent = data.email;
        commentTitle.textContent = data.name;
        commentText.textContent = data.body;

        commentBody.append(commentTitle, commentText);
        commentElement.append(commentHeader, commentBody);

        return commentElement;
    }

    document.addEventListener('DOMContentLoaded', async () => {
        const postResponse = await fetch(`https://gorest.co.in/public-api/posts/${pageId}`);
        const postData = await postResponse.json();

        const commentsResponse = await fetch(`https://gorest.co.in/public-api/comments?post_id=${pageId}`);
        const commentsData = await commentsResponse.json();

        const postTitle = document.getElementById('postTitle');
        const postContent = document.getElementById('postContent');
        const commentsContainer = document.getElementById('comments');

        postTitle.innerHTML = postData.data.title;
        postContent.innerHTML = postData.data.body;

        if (commentsData.data.length) {
            commentsContainer.innerHTML = '';
            for (let commentData of commentsData.data) {
                const commentElem = createCommentElement(commentData);
                commentsContainer.append(commentElem);
            }
        }
    });
})();