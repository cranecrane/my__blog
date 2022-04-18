(() => {
    const paginationElement = document.getElementById('pagination');
    const postsList = document.getElementById('postsList');

    const pageParams = new URLSearchParams(window.location.search); 
    let pageNum = pageParams.get('page');
    if (!pageNum) pageNum = 1;

    function createPostsList(data, container) {
        for (const postData of data) {
            const postElem = document.createElement('li');
            const postLinkElem = document.createElement('a');

            postElem.classList.add('list-group-item', 'pt-4', 'pb-4', 'title-2');
            postLinkElem.classList.add('link-dark', 'text-decoration-none');
            postLinkElem.innerHTML = postData.title;
            postLinkElem.href = `../post.html?id=${postData.id}`;

            postElem.append(postLinkElem);
            container.append(postElem);
        }
    }

    function createPagination(elem, data) {
        const paginationBtns = elem.querySelectorAll('.page-num');
        const arrowPrev = elem.querySelector('.arrow-prev');
        const arrowNext = elem.querySelector('.arrow-next');
        const activeClass = 'active';
        
        //нумеруем кнопки навигации
        if (data.page > 1 && data.page < data.pages - 1) {
            for (let i = data.page - 1, j = 0; j < paginationBtns.length; i++, j++) {
                paginationBtns[j].textContent = i;
            } 
        } else if (data.page == 1) {
            for (let i = 1, j = 0; j < paginationBtns.length; i++, j++) {
                paginationBtns[j].textContent = i;
            } 
        } else if (data.page >= data.pages - 1) {
            for (let i = data.pages, j = paginationBtns.length - 1; j >= 0; i--, j--) {
                paginationBtns[j].textContent = i;
            } 
        }

        for (let i = 0; i < paginationBtns.length; i++) {
            if (paginationBtns[i].textContent == data.page) {
                paginationBtns.forEach(btn => {
                    btn.parentElement.classList.remove(activeClass);
                });
                paginationBtns[i].parentElement.classList.add(activeClass);
            }
            paginationBtns[i].textContent == 1 
                ? paginationBtns[i].href = `index.html`
                : paginationBtns[i].href = `index.html?page=${paginationBtns[i].textContent}`;
        }
      
        if (paginationBtns[0].textContent == 1 && paginationBtns[0].parentElement.classList.contains('active')) {
            arrowPrev.parentElement.classList.add('disabled');
        } else {
            arrowPrev.parentElement.classList.remove('disabled');
        }
        if (paginationBtns[paginationBtns.length - 1].textContent == data.pages 
            && paginationBtns[paginationBtns.length - 1].parentElement.classList.contains('active')) {
            arrowNext.parentElement.classList.add('disabled');
        } else {
            arrowNext.parentElement.classList.remove('disabled');
        }
        arrowPrev.addEventListener('click', () => {
            if (pageNum != 1) {
                arrowPrev.href = `index.html?page=${Number(pageNum) - 1}`
                for (let i = 0; i < paginationBtns.length; i++) {
                    paginationBtns[i].textContent = Number(paginationBtns[i].textContent) - 1;
                }
            }
        });
        arrowNext.addEventListener('click', () => {
            if (pageNum != data.pages) {
                arrowNext.href = `index.html?page=${Number(pageNum) + 1}`
                for (let i = 0; i < paginationBtns.length; i++) {
                    paginationBtns[i].textContent = Number(paginationBtns[i].textContent) + 1;
                }
            }
        });
    }

    document.addEventListener('DOMContentLoaded', async () => {
        const response = await fetch(`https://gorest.co.in/public-api/posts?page=${pageNum}`);
        const pageData = await response.json();
        const paginationData = pageData.meta.pagination;
        const postsData = pageData.data;

        createPostsList(postsData, postsList);
        createPagination(paginationElement, paginationData);
    });
})();