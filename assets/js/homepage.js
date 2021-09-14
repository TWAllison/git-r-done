var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");

var formSubmitHandler = function(event) {
    event.preventDefault();
    var username = nameInputEl.value.trim();

    if (username) {
        getUserRepos(username);
        nameInputEl.value = "";
    }else{
        alert("please enter a GitHub username");
    }
};

var getUserRepos = function(user) {
var apiUrl = "https://api.github.com/users/" + user + "/repos";

fetch(apiUrl).then(function(response){
    if (response.ok){
    response.json().then(function(data) {
        displayRepos(data, user);
    });
    } else {
        alert("Error: GitHub User Not Found");
    }
})


    .catch(function(error){
       alert("unable to connect to GitHub") 
    });
};

var displayRepos = function(repos, searchTerm) {
    if (repos.length === 0){
        repoContainerEl.textContent = "No repositories found.";
        return;
    }
    repoContainerEl.textContent = ""; //clear old content
    repoSearchTerm.textContent = searchTerm;
    console.log(repos);
    console.log(searchTerm);

    for (var i =0; i < repos.length; i++) { // loop over repos
        // format repo name
        var repoName = repos[i].owner.login + "/" + repos[i].name;

        var reopEl = document.createElement("a"); // create a container for each repo
        reopEl.classList = "list-item flex-row justify-space-between aligh-center";
        reopEl.setAttribute("href", "single-repo.html?repo=" + repoName);

        //create a span element to hold repo name
        var titleEl = document.createElement("span");
        titleEl.textContent = repoName;

        // append to container
        reopEl.appendChild(titleEl);

        var statusEl = document.createElement("span"); // create a status element
        statusEl.classList = " flex-row align-center";

        //check if curent repo has issues or not 
        if (repos[i].open_issues_count > 0) {
            statusEl.innerHTML = "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
            } else {
                statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
            }

            //append to container
            reopEl.appendChild(statusEl);

        //append container to the DOM
        repoContainerEl.appendChild(reopEl);

    }
};

userFormEl.addEventListener("submit", formSubmitHandler);



