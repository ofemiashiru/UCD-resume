const userInformationHTML = (user) =>{
    return`
        <h2>${user.name}
            <span class="small-name">
            (@<a href="${user.html_url}" target="_blank">${user.login}</a>)
        </span>
        </h2>
        <div class="gh-content">
            <div class="gh-avatar">
                <a href="${user.html_url}" target="_blank">
                    <img src="${user.avatar_url}" width="80" height="80" alt="${user.login}" />
                </a>
            </div>
            <p>Followers: ${user.followers} - Following ${user.following} <br> Repos: ${user.public_repos}</p>
        </div>`;
}


const fetchGitHubInformation = function(event){

    let username = document.querySelector('#gh-username').value
    let userDataDisplay = document.querySelector('#gh-user-data')

    if(!username){
        userDataDisplay.innerHTML = '<h2>Please Enter a GitHub username</h2>'
        return;  
    }

    //using a animated gif to create a loader
    userDataDisplay.innerHTML = `
        <div id="loader">
            <img src="assets/css/loader.gif" alt="loading...">
        </div>
    `
    //Using the Promis.all to get multiple Apis
    Promise.all([
        fetch(`https://api.github.com/users/${username}`),
        fetch(`https://api.github.com/users/${username}/repos`)
    ])
    .then(responses =>{

        return Promise.all(responses.map(res => res.json()))
        
    })
    .then(data =>{
        let userData = data[0];
        let userRepos = data[1];

        if(userData.message === 'Not Found'){

            userDataDisplay.innerHTML = `<h2>No info found for user ${username}</h2>`
            
        } else {

            userDataDisplay.innerHTML = userInformationHTML(userData)
        }
        
    })
    .catch((error)=>{
        console.log('error', error)
    })

    /** fetch for a single item */
    // fetch(`https://api.github.com/users/${username}`)
    // .then(res =>{

    //     return res.json()
        
    // })
    // .then(data =>{
    //     if(data.message === 'Not Found'){

    //         userData.innerHTML = `<h2>No info found for user ${username}</h2>`
            
    //     } else {

    //         userData.innerHTML = userInformationHTML(data)
    //     }
        
    // })
    // .catch((error)=>{
    //     console.log('error', error.status)
    // })


}