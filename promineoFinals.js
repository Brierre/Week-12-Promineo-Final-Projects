console.log(`-------------------------- 
Part 1: Setup your JSON server`)
/* 
npm i -g json-server
json-server --watch promineoFinals.json

resources: 
http://localhost:3000/finalProjects
*/

const URL_ENDPOINT = 'http://localhost:3000/finalProjects'


console.log(
`-------------------------- 
Part 2: GET and displaying the information`
)

//$.get(URL_ENDPOINT).then(data => console.log(data)) rather than logging it, we are going to  build it

$.get(URL_ENDPOINT).then(data => {
    data.map(project => { //we are going to append each project to our table, so build table in html file
        $('tbody').append(
            $(`
            <tr>
                <td>${project.id}</td>
                <td>${project.fullName}</td>
                <td>${project.finalProject}</td>
                <td>${project.github}</td>
                <td>${project.jdbcOrJpa}</td>
                <td>${project.projectCriteriaMet}</td>
                <td>${project.videoLink}</td>
                <td>
                    <button id="delete" onclick="deleteProject(${project.id})">🗑</button>
                </td>
            </tr>
            `)
        )
    })
})

console.log(
    `-------------------------- 
    Part 3: POST and adding new students`
    )
// $('#submitForm').click(function(e) { //button by default refreshes page, this would prevent that refreshing, but that's not in the instructions
//     e.preventDefault();
//     console.log('pls work');
// });

$('#submitForm').click(function() {
    $.post(URL_ENDPOINT, { //two args, the URL_ENDPOINT and the object we want to get data for
        fullName: $('#fullName').val(),
        finalProject: $('#project').val(),
        github: $('#github').val(),
        jdbcOrJpa: $("[name='optradio']:checked").val(), //lists in table as "ON"
        projectCriteriaMet: $("[name='optradio2']:checked").val(), //lists in table as "ON"
        videoLink: $('#video').val()
    })
})

console.log(
    `-------------------------- 
    Part 4: DELETE and deleting individual students`
    )

function deleteProject(id) {
    $.ajax(`${URL_ENDPOINT}/${id}`, {
        method: 'DELETE'
    })
}

console.log(
    `-------------------------- 
    Part 4: PUT and updating the information`
    )

function updateProject() {
    let id = $('#idSelection').val()

    $.ajax(`${URL_ENDPOINT}/${id}`, {
        method: 'PUT',
        data: {
            fullName: $('#updateName').val(),
            finalProject: $('#updateProject').val(),
            github: $('#updateGithub').val(),
            jdbcOrJpa: $("[name='optradio']:checked").val(), //lists in table as "ON"
            projectCriteriaMet: $("[name='optradio2']:checked").val(), //lists in table as "ON"
            videoLink: $('#updateVideo').val()
        }
    })
}

$('#updateInfo').click(updateProject)






// {
//     "finalProjects": [
//       {
//         "fullName": "Amier Hajyassin",
//         "finalProject": "bakery",
//         "github": "https://github.com/AmierHajyassin/bakery-finalproject",
//         "jdbcOrJpa": "",
//         "projectCriteriaMet": "false",
//         "videoLink": "",
//         "id": 2
//       },
//       {
//         "fullName": "Travis Stokes",
//         "finalProject": "bike build",
//         "github": "https://github.com/tstokes433/BikeBuildFinal",
//         "jdbcOrJpa": "jdbc",
//         "projectCriteriaMet": "true",
//         "videoLink": "",
//         "id": 3
//       },
//       {
//         "fullName": "Stephanie Back",
//         "finalProject": "woopies",
//         "github": "https://github.com/stephback/WooPies-Final-Project",
//         "jdbcOrJpa": "jdbc",
//         "projectCriteriaMet": "true",
//         "videoLink": "",
//         "id": 4
//       },
//       {
//         "fullName": "Jacob Udel",
//         "finalProject": "sar dogs",
//         "github": "https://github.com/JacobUdel/Sar_Dogs",
//         "jdbcOrJpa": "jbdc",
//         "projectCriteriaMet": "true",
//         "videoLink": "",
//         "id": 5
//       },
//       {
//         "fullName": "Raina Gulbrandsen",
//         "finalProject": "cruise itinerary",
//         "github": "",
//         "jdbcOrJpa": "jdbc",
//         "projectCriteriaMet": "true",
//         "videoLink": "",
//         "id": 6
//       },
//       {
//         "fullName": "Kyle Miles",
//         "finalProject": "demo for jpa",
//         "github": "https://github.com/Kyle-Miles/demo-for-jpa",
//         "jdbcOrJpa": "jpa",
//         "projectCriteriaMet": "true",
//         "videoLink": "",
//         "id": 7
//       },
//       {
//         "fullName": "Michael Goeres",
//         "finalProject": "twilight zone",
//         "github": "https://github.com/MichaelG2022/Final-Project-Twilight-Zone",
//         "jdbcOrJpa": "",
//         "projectCriteriaMet": "true",
//         "videoLink": "",
//         "id": 8
//       },
//       {
//         "fullName": "Kent Ma",
//         "finalProject": "pc builder",
//         "github": "https://github.com/KentMa-6534/Backend-Final-Project---PC-Builder",
//         "jdbcOrJpa": "jdbc",
//         "projectCriteriaMet": "true",
//         "videoLink": "",
//         "id": 9
//       },
//       {
//         "fullName": "Jolene Melanson",
//         "finalProject": "saxy saxophone repair tracker",
//         "github": "https://github.com/JoleneMel/SaxySaxophoneRepairTracker",
//         "jdbcOrJpa": "jdbc",
//         "projectCriteriaMet": "true",
//         "videoLink": "",
//         "id": 10
//       },
//       {
//         "fullName": "Brandee McKinney",
//         "finalProject": "b cakes",
//         "github": "https://github.com/McKinney93/b_cakes",
//         "jdbcOrJpa": "jdbc",
//         "projectCriteriaMet": "",
//         "videoLink": "",
//         "id": 11
//       },
//       {
//         "fullName": "Kyle Miles",
//         "finalProject": "nfl mock draft",
//         "github": "https://github.com/Kyle-Miles/Final-Project-NFL-Mock-Draft-Web-API",
//         "jdbcOrJpa": "jpa",
//         "projectCriteriaMet": "",
//         "videoLink": "",
//         "id": 12
//       },
//       {
//         "fullName": "Darrell Terry",
//         "finalProject": "alarm and automation",
//         "github": "https://github.com/dsterry2000/AlarmAndAutomationCIM",
//         "jdbcOrJpa": "jpa",
//         "projectCriteriaMet": "false",
//         "videoLink": "",
//         "id": 13
//       },
//       {
//         "fullName": "Gma Betty",
//         "finalProject": "CarpenterBeeeeeeez",
//         "github": "github.com",
//         "jdbcOrJpa": "on",
//         "projectCriteriaMet": "on",
//         "videoLink": "rumble.com",
//         "id": 15
//       },
//       {
//         "fullName": "Li'l Abner",
//         "finalProject": "Progress",
//         "github": "rootofallevil.com",
//         "jdbcOrJpa": "on",
//         "projectCriteriaMet": "on",
//         "videoLink": "rumble.com",
//         "id": 16
//       },
//       {
//         "fullName": "Hedro Haigh",
//         "finalProject": "FFXI Helper",
//         "github": "github.com",
//         "jdbcOrJpa": "on",
//         "projectCriteriaMet": "on",
//         "videoLink": "rumble.com",
//         "id": 17
//       }
//     ]
//   }