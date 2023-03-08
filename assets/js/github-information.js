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

const repoInformationHTML = (repos) =>{
    if(repos.length === 0){
        return `<div class="clearfix repo-list">No Repos!</div>`
    }

    let listItemsHTML = repos.map(repo => {
        return `
            <li>
                <a href="${repo.html_url}" target="_blank">${repo.name}</a>
            </li>
        `
    })

    return `
        <div class="clearfix repo-list">
            <p>
                <strong>Repo List:</strong>
            </p>
            <ul>
                ${listItemsHTML.join('\n')}
            </ul>
        </div>
    `
}


const fetchGitHubInformation = function(){
    document.querySelector('#gh-user-data').innerHTML = ""
    document.querySelector('#gh-repo-data').innerHTML = ""

    //Value of the username we type
    let username = document.querySelector('#gh-username').value

    if(!username){
        document.querySelector('#gh-user-data').innerHTML = '<h2>Please Enter a GitHub username</h2>'
        return;  
    }

    //using a animated gif to create a loader
    document.querySelector('#gh-user-data').innerHTML = `
        <div id="loader">
            <img src="assets/css/loader.gif" alt="loading...">
        </div>
    `
    //Using the Promise.all to get multiple Apis
    Promise.all([
        fetch(`https://api.github.com/users/${username}`),
        fetch(`https://api.github.com/users/${username}/repos`)
    ])
    .then(responses => {
        if(responses[0].status === 403){
            let resetTime = new Date(responses[0].headers.get('X-RateLimit-Reset') * 1000) //multiply by 1000 to get a valid date
            document.querySelector('#gh-user-data').innerHTML = `
                <h4>
                    You have made too many requests, please try again at ${resetTime.toLocaleTimeString()} 
                </h4>
            `
            throw new Error(`Too many requests, retry at ${resetTime.toLocaleTimeString()}`) //Use this to exit the promise chain

        } else {
            return Promise.all(responses.map(res => res.json()))
        }
        
        
    })
    .then(data =>{
        let userData = data[0];
        let repoData = data[1];
        if(userData.message === 'Not Found'){

            document.querySelector('#gh-user-data').innerHTML = `<h2>No info found for user ${username}</h2>`
            
        } else {

            document.querySelector('#gh-user-data').innerHTML = userInformationHTML(userData)
            document.querySelector('#gh-repo-data').innerHTML = repoInformationHTML(repoData)
        }
        
    })
    .catch((error)=>{
        // console.log(error) 
        console.log(`${error.name}: ${error.message}`)
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

$(document).ready(fetchGitHubInformation)