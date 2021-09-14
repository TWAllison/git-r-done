var issuesContainerEl = document.querySelector("#issues-container");
var limitWarningElement = document.querySelector("#limit-warning");

var getRepoIssues = function(repo) {
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?dirrection=acs";
    console.log(repo);

    fetch(apiUrl).then(function(response) {
        //request made successfully
        if (response.ok) {
            response.json().then(function(data) {
                displayIssues(data); // pass response data to dom function
                //console.log(data)
                if (response.headers.get("link")) {
                    displayWarning(repo);
                }

            });

        } else {
            alert("there was a problem with your request!");
        }
    });

};



var displayIssues = function(issues) {

    if (issues.length === 0) {
        issuesContainerEl.textContent = "This repo has no open issues!";
        return;
    }

    for (var i = 0; i < issues.length; i++) {
        // creat a link element to take users to the issues on github
        var issuesEl = document.createElement("a");
        issuesEl.classList = "list-item flex-row justify-space-between align-center";
        issuesEl.setAttribute("href", issues[i].html_url);
        issuesEl.setAttribute("target", "_blank");

         var titleEl = document.createElement("span");
        titleEl.textContent = issues[i].title;  // create span to hold issues title 

        issuesEl.appendChild(titleEl); // append to container

        var typeEl = document.createElement("span"); // create a type element

        if (issues[i].pull_request) {
        typeEl.textContent = "(Pull Request)"; // check if issues is a pull request or an issue 
        } 
     else {
        typeEl.textContent = "(Issue)";
     }

        issuesEl.appendChild(typeEl);

        issuesContainerEl.appendChild(issuesEl);

    }
};

var displayWarning = function(repo) {
    limitWarningElement.textContent = "To see more than 30 issues, visit "; // add text to warning container
    linkEl.textContent = "See more issues on Github.com";
    linkEl.setAttribute("href", "https://github.com/" + repo + "/issues");
    linkEl.setAttribute("target", "_blank");

    limitWarningElement.appendChild(linkEl);
};

getRepoIssues("facebook/react");