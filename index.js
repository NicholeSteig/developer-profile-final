const inquirer = require("inquirer");
const fs = require('fs');
const axios = require("axios");
const util = require("util");
const pdf = require("html-pdf");
const generateHTML = require("./generateHTML");

const writeFileAsync = util.promisify(fs.writeFile);

// -prompt for username
// -prompt for color
inquirer
    .prompt([
        {
            type: "input",
            name: "username",
            message: "What is your Github username?"
        },
        {
            type: "checkbox",
            message: "What is your favorite color?",
            name: "color",
            choices: [
                "Green",
                "Blue",
                "Pink",
                "Red"
            ]
        },
        // -pull github info
    ]).then(function (input) {
        username = input.username;
        color = input.color;

        const queryUrl = `https://api.github.com/users/${username}`;
        return queryUrl;
    })
    .then(function (queryUrl) {
        axios.get(queryUrl)
            .then(function (res) {
                res.data.color = color;
                makePDF(res.data);
            })
        // // console.log(res.data);

        // //     -image
        // let imageURL = res.data.avatar_url;
        // console.log(imageURL);

        // //     -username
        // let login = res.data.login;
        // let name = res.data.name;


        // //     -links to:
        // //         -location (google maps)
        // let location = res.data.location;
        // console.log(location);

        // //         -github profile
        // let gitURL = res.data.html_url;
        // console.log(gitURL);

        // //         -blog
        // let blog = res.data.blog;
        // console.log(blog);

        // //     -bio
        // let bio = res.data.bio;
        // console.log(bio);

        // //     -number of public repos
        // let repos = res.data.public_repos;
        // console.log(repos);

        // //     -number of followers
        // let followers = res.data.followers;
        // console.log(followers);

        // //     -number of stars
        // let stars = res.data.public_gists;
        // //console.log(res.data)
        // console.log("stars: " + stars);
        // console.log("color: " + color)

        // //     -number of users following
        // let following = res.data.following;
        // console.log(following);

        // const html = generateHTML(input, res.data);

        // return writeFileAsync("index.html", html);
        // //html = generateHTML(res.data);
        // //    callGenerateHTML(stars, color, res.data);
        // //    html = generateHTML({stars, color, ...res.data})
        // //     writeToFile(`${username}_profile.html`, html);
    }).catch(function (err) {
        console.log(err);
        return;
    });



// function callGenerateHTML(stars, color, data){
//     return generateHTML({
//         stars,color,...data
//     })
//     .then(html => {
//         writeToFile(`${username}_profile.html`, html);
//     })
// }

function makePDF(info) {
    const html = generateHTML(info);
    writeFileAsync("index.html", html);
    options = { format: 'Letter' };
    pdf.create(html, options).toFile("./profile", res);
};