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
    let userData = document.querySelector('#gh-user-data')

    if(!username){
        userData.innerHTML = '<h2>Please Enter a GitHub username</h2>'
        return;  
    }

    //using a animated gif to create a loader
    document.querySelector('#gh-user-data').innerHTML = `
        <div id="loader">
            <img src="assets/css/loader.gif" alt="loading...">
        </div>
    `

    fetch(`https://api.github.com/users/${username}`)
    .then(res =>{

        return res.json()
        
    })
    .then(data =>{
        if(data.message === 'Not Found'){

            userData.innerHTML = `<h2>No info found for user ${username}</h2>`
            
        } else {

            userData.innerHTML = userInformationHTML(data)
        }
        
    })
    .catch((error)=>{
        console.log('error', error.status)
    })


}