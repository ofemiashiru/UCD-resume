const fetchGitHubInformation = function(event){

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

    fetch(`https://api.github.com/users/${username}`)
    .then(res =>{
        return res.json()
    })
    .then(data =>{
        console.log(data)
    })
    .catch((error)=>{
        console.log('error', error)
    })
}