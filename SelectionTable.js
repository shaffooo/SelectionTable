document.addEventListener("DOMContentLoaded", function (event) {

    var allEntities = [{
        id: '1',
        name: 'Monica Anderson'
    }, {
        id: '2',
        name: 'Steven Blankenship'
    }, {
        id: '3',
        name: 'Joshua Jones'
    }, {
        id: '4',
        name: 'Corry Smith'
    }, {
        id: '5',
        name: 'Vikar Hamilton'
    }, {
        id: '6',
        name: 'Chandler Bing'
    }, {
        id: '7',
        name: 'Jessica Woodsmith'
    }, {
        id: '8',
        name: 'Adams James'
    }, {
        id: '9',
        name: 'Spencer Deb'
    }, {
        id: '10',
        name: 'Brandon Bran'
    }, {
        id: '11',
        name: 'Yudi Man'
    }, {
        id: '12',
        name: 'George Zoto'
    }, {
        id: '13',
        name: 'Wayman Sorkinvadataker'
    }, {
        id: '14',
        name: 'Heather Minga'
    }, {
        id: '15',
        name: 'Sam David'
    }, {
        id: '16',
        name: 'Ashley Brown'
    }, {
        id: '17',
        name: 'Tiffany Johns'
    }, {
        id: '18',
        name: 'Chris Brown'
    }, {
        id: '19',
        name: 'Ginger White'
    }, {
        id: '20',
        name: 'Dyan Fowler'
    }, {
        id: '21',
        name: 'Nancy Smith'
    }, {
        id: '22',
        name: 'Heather Smith'
    }, {
        id: '23',
        name: 'Lisa Clark'
    }, {
        id: '24',
        name: 'Alexis Williams'
    }, {
        id: '25',
        name: 'Dawn Smith'
    }, {
        id: '26',
        name: 'Adam Sorson'
    }];

    var editedEntities = [];

    function SetProjectEditEntities(entities, selectedEntityIds) {

        PopulateProjectEditEntities(entities);
        if (selectedEntityIds.length) {
            var actualProjectEntities = entities.filter(function (entity) {
                return (selectedEntityIds.indexOf(entity.id) > -1);
            });
            ChangeEntitySelection(actualProjectEntities);
        } else {
            // set selected entities div height and show it.
            var entitiesContentsDiv = document.getElementById("entities-contents");
            var selectedEntitiesDiv = document.getElementById("selected-entities");
            selectedEntitiesDiv.style.height = ((entitiesContentsDiv.clientHeight + 47) + "px");
            ShowSelectedEntities(false);
        }
    }

    function PopulateProjectEditEntities(entities) {

        var entitiesTableHTML = "";

        //console.log(entities.length);
        entities.forEach(function (entity) {

            entitiesTableHTML += "<tr>";

            entitiesTableHTML += "<td style=\"border-right: 1px solid #99CCFF;\">";
            entitiesTableHTML += "<input type=\"checkbox\" id=\"" + entity.id + "\" value=\"" + entity.name + "\" onclick=\"ChangeSelectedEntities(this)\" >";
            entitiesTableHTML += "</td>";
            entitiesTableHTML += "<td>" + entity.name + "</td>";

            entitiesTableHTML += "</tr>";
        });
        document.getElementById("entities").innerHTML = entitiesTableHTML;
    }

    FilterEntities = function (evt) {

        var filterStr = evt.value.toLowerCase();
        var filteredEntities = allEntities.filter(function (entity) {
            return ((entity.name.toLowerCase().indexOf(filterStr)) > -1);
        });

        PopulateProjectEditEntities(filteredEntities);
        ChangeEntitySelection(editedEntities);
    }

    GetFilteredEntities = function () {

        var entitiesTable = document.getElementById("entities");
        var inputs = entitiesTable.getElementsByTagName("input");

        var filteredEntities = [];
        for (var i = 0; i < inputs.length; i++) {
            if (inputs[i].type == "checkbox") {
                filteredEntities.push({
                    id: inputs[i].id,
                    name: inputs[i].value
                });
            }
        }

        return filteredEntities;
    }

    ChangeAll = function (evt) {

        ChangeEntitySelection(editedEntities);
        editedEntities.length = 0;
        if (evt.checked) {

            var filteredEntities = GetFilteredEntities();
            ChangeEntitySelection(filteredEntities);
        }
    }

    function ChangeEntitySelection(entities) {

        var clonedEntities = entities.slice();
        clonedEntities.forEach(function (entity) {
            var cbEntity = document.getElementById(entity.id);
            if (cbEntity) {
                cbEntity.click();
            }
        });
    }

    RemoveSelectedEntity = function (evt) {

        var seletedEntityDiv = evt.parentNode;
        if (seletedEntityDiv) {
            var selectedEntitiesDiv = seletedEntityDiv.parentNode;
            if (selectedEntitiesDiv) {
                selectedEntitiesDiv.removeChild(seletedEntityDiv);
            }

            var selectedEntityDivId = seletedEntityDiv.id;
            var selectedEntityDivName = seletedEntityDiv.innerHTML;
            var cur_entity = {
                id: selectedEntityDivId.replace('selected', ''),
                name: selectedEntityDivName.substr(0, selectedEntityDivName.indexOf('<span'))
            };
            ChangeEntitySelection([cur_entity]);
        }

        var show = ((editedEntities) && (editedEntities.length > 0)) ? true : false;
        ShowSelectedEntities(show);
    }

    ChangeSelectedEntities = function (evt) {

        var cur_entity = {
            id: evt.id,
            name: evt.value
        };
        var index = editedEntities.map(function (e) {
            return e.id;
        }).indexOf(cur_entity.id);
        if (evt.checked) {

            if (index === -1) {

                editedEntities.push(cur_entity);
                var editeEntitiesHTML = document.getElementById('selected-entities-contents').innerHTML;
                editeEntitiesHTML += "<div id='" + cur_entity.id + "selected' class=\"selected-entity\">" + cur_entity.name + "<span onclick=\"RemoveSelectedEntity(this)\">&#10005</span></div>";
                document.getElementById('selected-entities-contents').innerHTML = editeEntitiesHTML;
            }
        } else {

            if (index > -1) {

                editedEntities.splice(index, 1);

                // remove div for entity by id and updates innerHTML of divinitselectedentities.
                var elem = document.getElementById(cur_entity.id + 'selected');
                if (elem && elem.parentNode) {
                    elem.parentNode.removeChild(elem);
                }
            }
        }

        var show = ((editedEntities) && (editedEntities.length > 0)) ? true : false;
        ShowSelectedEntities(show);
    }

    function ShowSelectedEntities(show) {

        if (!show) {
            document.getElementById('selected-entities').style.display = "none";
        } else {
            document.getElementById('selected-entities').style.display = "block";
        }
    }


    SaveProjectUpdates = function (evt) {

        // issue a post request to save data in db



        document.getElementById('selected-entities').innerHTML = '';
        editedEntities = [];
        registry.byId('dialogProjectEdit').hide();
    }

    CancelProjectUpdates = function (evt) {

        document.getElementById('selected-entities').innerHTML = '';
        editedEntities = [];
        registry.byId('dialogProjectEdit').hide();
    }

    SetProjectEditEntities(allEntities, []);
});