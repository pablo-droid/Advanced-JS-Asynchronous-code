//1
const getAllBreeds = async () => {
    const request = await fetch('https://dog.ceo/api/breeds/list/all');
    if (!request.ok) {
        throw new Error("request failed");
    }
    const data = await request.json();
    return Object.keys(data.message);
};

//2
const getRandomDog = async () => {
    const request = await fetch('https://dog.ceo/api/breeds/image/random');
    if (!request.ok) {
        throw new Error("request failed");
    }
    const data = await request.json();
    return data.message;
};

//3
const getAllImagesByBreed = async (breed) => {
    const request = await fetch(`https://dog.ceo/api/breed/${breed}/images`);
    if (!request.ok) {
        throw new Error("request failed");
    }
    const data = await request.json();
    return data.message;
};

//4
const getAllImagesByBreed2 = (breed) => {
    return getAllImagesByBreed(breed);
};

//5
const getGitHubUserProfile = async (username) => {
    const request = await fetch(`https://api.github.com/users/${username}`);
    if (!request.ok) {
        throw new Error("request failed");
    }
    const data = await request.json();
    return { name: data.name, img: data.avatar_url, repos: data.public_repos, html_url: data.html_url };
};

//6
const printGithubUserProfile = (username) => {
    return getGitHubUserProfile(username);
};

//7
const getAndPrintGitHubUserProfile = async (username) => {
    const profile = await getGitHubUserProfile(username);
    return `<section>\n
    <img src="${profile.img}" alt="${profile.name}">\n
    <h1>${profile.name}</h1>\n
    <p>Public repos: ${profile.repos}</p>\n
    </section>`;
};

//8
document.addEventListener("DOMContentLoaded", () => {
    const inputElement = document.createElement("input");
    inputElement.type = "text";
    const buttonElement = document.createElement("button");
    buttonElement.innerText = "buscar";
    const articleElement = document.createElement("article");
    document.body.appendChild(inputElement);
    document.body.appendChild(buttonElement);
    document.body.appendChild(articleElement);

    buttonElement.addEventListener("click", async () => {
        try {
            articleElement.innerHTML = await getAndPrintGitHubUserProfile(inputElement.value);
        } catch (error) {
            articleElement.innerHTML = `<p>${error.message}</p>`;
        }
    });
});

//9
const fetchGithubUsers = async (userNames) => {
    const promises = userNames.map((name) => { return getGitHubUserProfile(name); });
    const users = await Promise.all(promises);
    users.forEach(({html_url, name}) => {
        console.log(html_url, name);
    });
    return users;
};