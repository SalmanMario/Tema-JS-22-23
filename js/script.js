
function loadStorageData() {
    const posts = localStorage.getItem("posts");
    if (!posts) {
        return [];
    }
    const parsedPosts = JSON.parse(posts);

    return parsedPosts;
}

let posts = loadStorageData();
displayPosts();

function deletePost(id) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, { method: "DELETE" })
        .then(() => {
            posts = posts.filter(post => post.id !== id);
            displayPosts();
        });
}

function displayPosts() {
    const root = document.querySelector("#root");
    root.innerHTML = `
        ${posts.map(post => `
        <div class="post">
            <h2>${post.title}</h2>
            <h3>Post ID: ${post.id}</h3>
            <p>${post.body}</p>
            <button id="delete-${post.id}">Delete</button>
        </div>
        `).join("")}
    `;
    posts.forEach(post => {
        const button = document.querySelector(`#delete-${post.id}`);
        button.addEventListener("click", function () {
            deletePost(post.id);
        });
    });
}

fetch("https://jsonplaceholder.typicode.com/posts")
    .then(response => response.json())
    .then(data => {
        console.log(data);
        posts = data;
        localStorage.setItem("posts", JSON.stringify(data));
        displayPosts();
    });


// tema mea
// fetch('https://jsonplaceholder.typicode.com/posts')
//     .then((response) => {
//         return response.text();
//     })
//     .then((unparsedResult) => {
//         const parsedResult = JSON.parse(unparsedResult);
//         const root = document.querySelector("#root");

//         function displayData() {
//             root.innerHTML = parsedResult.map((elem) => {
//                 return `<div id=element${elem.id}> <h2> Titlul elementelor este: ${elem.title} </h2>
//             <p> iar descrierea este: ${elem.body} </p>
//             <button id="deleteButton${elem.id}">Delete Post</button> </div>`;
//             }).join("");
//         }

//         if (localStorage.getItem("key") === null) {
//             setTimeout(() => {
//                 displayData();
//             }, 3000);

//         } else {
//             displayData();
//         }

//         localStorage.setItem("key", JSON.stringify(parsedResult));
//         JSON.parse(localStorage.getItem("key", parsedResult));

//         console.log(parsedResult);

//         // am adaugat aici un timeout deoarece daca nu avem salvat nimic in localStorage
//         // nu putem sterge postarea fara a da un refresh paginii

//         // puii mei cu functiile asincrone ii 3 dimineata,merg sa ma culc

//         parsedResult.forEach(elem => {
//             setTimeout(() => {
//                 const button = document.querySelector(`#deleteButton${elem.id}`);
//                 button.addEventListener("click", function () {
//                     fetch('https://jsonplaceholder.typicode.com/posts/' + elem.id, {
//                         method: 'DELETE',
//                     })
//                         .then(res => res.text()) // or res.json()
//                         .then(res => console.log(res));
//                     console.log(elem);

//                     const deletedDiv = document.querySelector(`#element${elem.id}`);
//                     deletedDiv.remove();
//                 });
//             }, 4000);
//         });

//     });
