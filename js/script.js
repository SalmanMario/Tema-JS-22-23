fetch('https://jsonplaceholder.typicode.com/posts')
    .then((response) => {
        return response.text();
    })
    .then((unparsedResult) => {
        const parsedResult = JSON.parse(unparsedResult);
        const root = document.querySelector("#root");

        if (localStorage.getItem("key") === null) {
            setTimeout(() => {
                root.innerHTML = parsedResult.map((elem) => {
                    return `<div id=element${elem.id}> <h2> Titlul elementelor este: ${elem.title} </h2>
                <p> iar descrierea este: ${elem.body} </p>
                <button id="deleteButton${elem.id}">Delete Post</button> </div>`;
                }).join("");
            }, 3000);

        } else {
            root.innerHTML = parsedResult.map((elem) => {
                return `<div id=element${elem.id}> <h2> Titlul elementelor este: ${elem.title} </h2>
                <p> iar descrierea este: ${elem.body} </p>
                <button id="deleteButton${elem.id}">Delete Post</button> </div>`;
            }).join("");
        }

        localStorage.setItem("key", JSON.stringify(parsedResult));
        JSON.parse(localStorage.getItem("key", parsedResult));

        // root.innerHTML = parsedResult.map((elem) => {
        //     return `<div id=element${elem.id}> <h2> Titlul elementelor este: ${elem.title} </h2>
        //         <p> iar descrierea este: ${elem.body} </p>
        //         <button id="deleteButton${elem.id}">Delete Post</button> </div>`;
        // }).join("");

        console.log(parsedResult);

        parsedResult.forEach(elem => {

            const button = document.querySelector(`#deleteButton${elem.id}`);
            button.addEventListener("click", function () {
                fetch('https://jsonplaceholder.typicode.com/posts/' + elem.id, {
                    method: 'DELETE',
                })
                    .then(res => res.text()) // or res.json()
                    .then(res => console.log(res));
                console.log(elem);

                const deletedDiv = document.querySelector(`#element${elem.id}`);
                deletedDiv.remove();
            });
        });

    });


/* bug la localStorage,daca pun if-ul de mai jos parsedResult.forEach((elem) => {

    nu mai pot sterge descrierea si titlu si nici nu-mi apare apare eroare in console
    cumva button-ul cred ca este null si nu stiu cum sa-l rezolv
})

*/

 // if (localStorage.getItem("key") === null) {
    //     setTimeout(() => {
    //         root.innerHTML = parsedResult.map((elem) => {
    //             return `<div id=element${elem.id}></div> <h2> Titlul elementelor este: ${elem.title} </h2>
    //             <p> iar descrierea este: ${elem.body} </p>
    //             <button id="deleteButton${elem.id}">Delete Post</button>`;
    //         }).join("");

    //         localStorage.setItem("key", JSON.stringify(elem.id));

    //     }, 3000);

    // } else {
    //     root.innerHTML = parsedResult.map((elem) => {
    //         return `<div id=elementButton${elem.id}></div> <h2> Titlul elementelor este: ${elem.title} </h2>
    //             <p> iar descrierea este: ${elem.body} </p>
    //             <button id="deleteButton${elem.id}">Delete Post</button>`;
    //     }).join("");
    // }
