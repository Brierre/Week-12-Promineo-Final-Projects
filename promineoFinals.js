/* 
npm i -g json-server
json-server --watch promineoFinals.json

resources: 
http://localhost:3000/finalProjects
*/

//const URL_ENDPOINT = 'http://localhost:3000/finalProjects'
const URL_ENDPOINT = 'https://648f8f0375a96b66444536fa.mockapi.io/projects'

document.addEventListener('DOMContentLoaded', () => {
    drawTable();
});

function drawTable() { //function to redraw table contents upon any updates or deletions, as well as at the start of the program
    $.get(URL_ENDPOINT).then(data => {
        console.log(data);
        $('td').remove();
        data.map(project => { //we are going to append each project to our table, so build table in html file
            $('#projectsList').append(
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
            );
        });
    });
}


$('#addForm').click(function(e) {
    e.preventDefault();
    $.post(URL_ENDPOINT, { //two args, the URL_ENDPOINT and the object we want to get data for
        fullName: $('#fullName').val(),
        finalProject: $('#project').val(),
        github: $('#github').val(),
        jdbcOrJpa: $("[name='optradio']:checked").val(), //lists in table as "ON"
        projectCriteriaMet: $("[name='optradio2']:checked").val(), //lists in table as "ON"
        videoLink: $('#video').val()
    })
    drawTable();
    clearForm();
});


$('#updateInfo').click(function(e) {
    e.preventDefault();
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
    }).then(drawTable);
    clearForm();
}); //button updates project according to information input on form

function deleteProject(id) {
    $.ajax(`${URL_ENDPOINT}/${id}`, {
        method: 'DELETE'
    }).then(drawTable);
}

function clearForm() {
    $('#fullName').val(''),
    $('#project').val(''),
    $('#github').val(''),
    $('#video').val(''),
    $('#idSelection').val(''),
    $('#updateName').val(''),
    $('#updateProject').val(''),
    $('#updateGithub').val(''),
    $('#updateVideo').val('')
    $('#jdbcradio').prop('checked', false);
    $('#jparadio').prop('checked', false);
    $('#yesradio').prop('checked', false);
    $('#noradio').prop('checked', false);
    $('#jdbcradio2').prop('checked', false);
    $('#jparadio2').prop('checked', false);
    $('#yesradio2').prop('checked', false);
    $('#noradio2').prop('checked', false);
}