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






