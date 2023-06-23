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

const tableDataElem = document.querySelector('#projects'); //#projects is <tbody> id
const dataArray = [];

//GET METHODS
function drawTable() {
    $.get(URL_ENDPOINT).then(data => {
        $('td').remove(); //clear all <td> info
        data.map(project => { //append each project to our table, so build table in html file
            $('#projects').append( //append rows to <tbody>
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


//POST METHODS
//modal popup for adding projects
function addProject(e) {
    e.preventDefault();
    $.post(URL_ENDPOINT, { //two args, the URL_ENDPOINT and the object we want to get data for
        fullName: $('#fullName').val(),
        finalProject: $('#project').val(),
        github: $('#github').val(),
        jdbcOrJpa: $("[name='optradio']:checked").val(),
        projectCriteriaMet: $("[name='optradio2']:checked").val(),
        videoLink: $('#video').val()
    }).then (drawTable)
    .then($("#addModal").modal("hide"));
}

$('#addForm').on('submit', (e) => {
    addProject(e);
    document.getElementById('addForm').reset();
}); //button adds new project according to input on form


//PUT METHODS
//modal popup for updating projects
function updateProject(e) {
    e.preventDefault();
    let id = $('#idSelection').val()
    $.ajax(`${URL_ENDPOINT}/${id}`, {
        method: 'PUT',
        data: {
            fullName: $('#updateName').val(),
            finalProject: $('#updateProject').val(),
            github: $('#updateGithub').val(),
            jdbcOrJpa: $("[name='optradio']:checked").val(),
            projectCriteriaMet: $("[name='optradio2']:checked").val(),
            videoLink: $('#updateVideo').val()
        }
    }).then(drawTable)
    .then($("#updateModal").modal("hide")); 

}
    
$('#updateForm').on('submit', (e) => {
        updateProject(e);
        document.getElementById('updateForm').reset();
}); //button updates project according to input on form


//DELETE METHODS
function deleteProject(id) {
    $.ajax(`${URL_ENDPOINT}/${id}`, {
        method: 'DELETE'
    }).then(drawTable);
}


//SEARCH FILTER METHODS
let matchingIDs = []; //store matching record IDs
function createFilteredTable(matchingIDs) {
    tableDataElem.innerHTML = "";
    let searchIndex = 0;
    let tableInd = 1;
    $.get(URL_ENDPOINT).then(data => { //****putting data into a standard array for later use. IS THIS EVEN NECESSARY or can I just use the table itself later?****
        data.forEach(item => {
        dataArray.push(item);
        });
        console.log(dataArray[0]);
    });    

    if (typeof matchingIDs === "undefined") {
        let i = 0;
        while(i < Object.keys(dataArray).length){
            tableDataElem.innerHTML += `
                <tr>
                    <td>${tableInd}</td>
                    <td>${dataArray[tableInd][0]}</td>
                    <td>${dataArray[tableInd][1]}</td>
                    <td>${dataArray[tableInd][2]}</td>
                    <td>${dataArray[tableInd][3]}</td>
                    <td>${dataArray[tableInd][4]}</td>
                    <td>${dataArray[tableInd][5]}</td>
                    <td>${dataArray[tableInd][6]}</td>
                    <td>
                    <button id="delete" onclick="deleteProject(${project.id})">🗑</button>
                    </td>
                </tr>
            `;
            i++;
            tableInd++;
        }
    } else if (matchingIDs.length !== 0) {
        while(searchIndex < matchingIDs.length){ //append data to table as long as the search term matches something in the row
            tableDataElem.innerHTML+=`
                <tr>
                    <td>${tableInd}</td>
                    <td>${dataArray[matchingIDs[searchIndex]][0]}</td>
                    <td>${dataArray[matchingIDs[searchIndex]][1]}</td>
                    <td>${dataArray[matchingIDs[searchIndex]][2]}</td>
                    <td>${dataArray[matchingIDs[searchIndex]][3]}</td>
                    <td>${dataArray[matchingIDs[searchIndex]][4]}</td>
                    <td>${dataArray[matchingIDs[searchIndex]][5]}</td>
                    <td>${dataArray[matchingIDs[searchIndex]][6]}</td>
                    <td>
                    <button id="delete" onclick="deleteProject(${project.id})">🗑</button>
                    </td>
                </tr>
            `;
            searchIndex++;
            tableInd++;
        }
    } else { 
        tableDataElem.innerHTML+=`
            <tr>
                <td colspan="5">
                    NO DATA FOUND
                </td>
            </tr>
        `;
    }
}

//attach event listener
document.querySelector('#searchText').addEventListener('input', function() {
    let value = this.value.trim(); //store the search query
    if (value) { //check if value is not empty
        let tr = 1;

        while (tr < Object.keys(dataArray).length) { //loop through the data to find matching text
            if (dataArray[tr][0].includes(value) || //check if current property contains the search query
                dataArray[tr][1].includes(value) ||
                dataArray[tr][2].includes(value) ||
                dataArray[tr][3].includes(value) ||
                dataArray[tr][4].includes(value) ||
                dataArray[tr][5].includes(value) ||
                dataArray[tr][6].includes(value)) {
                    matchingIDs.push(tr);
            }
            tr++;
        }
        createFilteredTable(matchingIDs);
    } else {
        drawTable();
    }
});
