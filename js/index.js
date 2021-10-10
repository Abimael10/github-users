/*
    ***Acá voy a realizar las peticiones asincronas a ser utilizadas por el evento de Search.
*/

class Github {
    constructor() {
        this.client_id = 'ef9b4a52f04e5799c2e7';
        this.client_secret = 'aee1fa69a1b4dd553a8054deb26eedb33869d39c';
    }

    async getUser(user) {
        const response = await fetch(`https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`);

        const profile = await response.json();

        return {
            profile
        }
    }
}

/*
///////////////////////////////////////////////////////////////////////////////////
*/

/*
    ***Componente para mostrar los datos dinámicos.
*/

class UI {
    constructor() {
        this.profile = document.querySelector(".profile-data");
        this.userAvatar = document.querySelector('.user-image__avatar');
        this.name = document.querySelector('.user-data__info-name');
        this.createdAt = document.querySelector('.user-data__info-date');
        this.username = document.querySelector('.user-data__username');
        this.bio = document.querySelector('.user-data__bio');
        this.reposData = document.querySelector('.user-data__stats-repos .data');
        this.followersData = document.querySelector('.user-data__stats-followers .data');
        this.followingData = document.querySelector('.user-data__stats-following .data');
        this.location = document.querySelector('.location .data');
        this.twitter = document.querySelector('.twitter .data');
        this.website = document.querySelector('.website .data');
        this.company = document.querySelector('.company .data');
    }

    showData(user) {

        this.profile.classList.remove('hidden');

        const parseDate = (date) => {
            let systemDate = new Date(Date.parse(date));
            return `Joined on ${systemDate.getUTCFullYear()}`;
        }

        this.userAvatar.setAttribute("src", `${user.avatar_url}`);
        this.name.innerHTML = `${user.name}`;
        this.createdAt.innerHTML = `${parseDate(user.created_at)}`;
        this.username.innerHTML = `${user.login}`;

        if(this.bio !== 'null') {
            this.bio.innerHTML = `This profile has no bio...`;
        } else {
            this.bio.innerHTML = `${user.bio}`;
        };

        this.reposData.innerHTML = `${user.public_repos}`;
        this.followersData.innerHTML = `${user.followers}`;
        this.followingData.innerHTML = `${user.following}`;

        this.location.innerHTML = `${user.location}`;
        this.twitter.innerHTML = `${user.twitter}`;
        this.website.innerHTML = `${user.blog}`;
        this.company.innerHTML = `${user.company}`;
        //console.log(user);
    };
};

/*
    ***Inicio las variables con el constructor para hacer uso de los datos recibidos.
*/

const github = new Github;

const ui = new UI;
/*
///////////////////////////////////////////////////////////////////////////////////
*/

const userSearch = document.querySelector(".input__value");
const searchBtn = document.querySelector(".btn");
const altHidden = document.querySelector('.profile-data');
const alertMsg = document.querySelector('.not-found');

searchBtn.addEventListener('click', (e) => {

    let userValue = userSearch.value;

    github.getUser(userValue)
        .then(data => {
            
            if(data.profile.message === "Not Found") {
                //Show alert
                alertMsg.classList.remove('hidden');
                altHidden.classList.add('hidden');
                userSearch.value = '';
            } else {
                // Show profile
                alertMsg.classList.add('hidden');
                ui.showData(data.profile);
                
                userSearch.value = '';
            }
        })

    e.preventDefault;
});