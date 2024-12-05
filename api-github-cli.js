/*
var username = "Pepisxd";

function apiGithubCli(username) {
  fetch(`https://api.github.com/users/${username}/events`)
    .then((response) => response.json())
    .then((data) => {
      //console.log(data); //Resultado de respone.json()
      
    })
    .catch((error) => {
      console.log("Error: ", error);
    });
}

apiGithubCli(username);
*/
var username = "Pepisxd";
fetch(`https://api.github.com/users/${username}/events`)
  .then((response) => response.json())
  .then((events) => {
    const commitsPerRepo = {};

    events.forEach((event) => {
      if (event.type === "PushEvent") {
        const commitsCount = event.payload.commits.length;
        const repoName = event.repo.name;

        if (!commitsPerRepo[repoName]) {
          commitsPerRepo[repoName] = 0;
        }

        commitsPerRepo[repoName] += commitsCount;
      } else if (event.type === "IssueCommentEvent") {
        const repoName = event.repo.name;
        const mensajeIssueCommentEvent = `Commented on an issue in ${repoName}`;
        console.log(mensajeIssueCommentEvent);
      } else {
        // Solo se ejecuta si no es PushEvent ni IssueCommentEvent
        const repoName = event.repo.name;
        const mensaje = `Not found Event type ${event.type} in ${repoName}`;
        console.log(mensaje);
      }
    });

    // Ahora, fuera del forEach, mostramos el resultado total de commits por repo
    for (const repoName in commitsPerRepo) {
      console.log(`Pushed ${commitsPerRepo[repoName]} commits to ${repoName}`);
    }
  })
  .catch((error) => console.error("Error:", error));

fetch(`https://api.github.com/users/${username}/starred`)
  .then((response) => response.json())
  .then((starred) => {
    starred.forEach((star) => {
      const repoName = star.full_name;
      if (starred.length === 0) {
        console.log("No starred repositories");
      } else {
        console.log(`Starred ${repoName}`);
      }
    });
  });
