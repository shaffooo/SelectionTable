document.addEventListener("DOMContentLoaded", function(event) { 
  
    var allUsers = [{id:'1', name:'Monica Anderson'},{id:'2',name:'Steven Blankenship'},{id:'3',name:'Joshua Jones'},{id:'4',name:'Corry Smith'},{id:'5',name:'Vikar Hamilton'},{id:'6',name:'Chandler Bing'},{id:'7',name:'Jessica Woodsmith'},{id:'8',name:'Adams James'},{id: '9', name:'Spencer Deb'}, {id:'10',name:'Brandon Bran'}, {id:'11',name:'Yudi Man'},{id:'12',name:'George Zoto'},{id:'13',name:'Wayman Sorkinvadataker'},{id:'14', name:'Heather Minga'},{id:'15', name:'Sam David'},{id:'16', name:'Ashley Brown'},{id:'17', name:'Tiffany Johns'},{id:'18', name:'Chris Brown'},{id:'19', name:'Ginger White'},{id:'20', name:'Dyan Fowler'},{id:'21', name:'Nancy Smith'},{id:'22', name:'Heather Smith'},{id:'23', name:'Lisa Clark'},{id:'24', name:'Alexis Williams'},{id:'25', name:'Dawn Smith'}, {id:'26', name:'Adam Sorson'}];

    var editedProjectUsers = [];

	function SetProjectEditUsers (users, selectedUserIds) {

	    PopulateProjectEditUsers(users);
	    if (selectedUserIds.length){
            var actualProjectUsers = users.filter(function (user) {
                return (selectedUserIds.indexOf(user.id) > -1);
	        });
            ChangeElementSelection(actualProjectUsers);
        } else {
            // set selected elements div height and show it.
            var elementsContentsDiv = document.getElementById("elements-contents");
            var selectedElementsDiv = document.getElementById("selected-elements");
            selectedElementsDiv.style.height = ((elementsContentsDiv.clientHeight + 47) + "px");
            ShowSelectedElements(false);   
        }
	}
    
	function PopulateProjectEditUsers(users) {

	    var usersTableHTML = "";

	    //console.log(users.length);
	    users.forEach(function (user) {

	        usersTableHTML += "<tr>";

	        usersTableHTML += "<td style=\"border-right: 1px solid #99CCFF;\">";
	        usersTableHTML += "<input type=\"checkbox\" id=\"" + user.id + "\" value=\"" + user.name + "\" onclick=\"ChangeSelectedElements(this)\" >";
	        usersTableHTML += "</td>";
	        usersTableHTML += "<td>" + user.name + "</td>";

	        usersTableHTML += "</tr>";
	    });
	    document.getElementById("elements").innerHTML = usersTableHTML;
	}

	FilterElements = function (evt) {

	    var filterStr = evt.value.toLowerCase();
	    var filteredUsers = allUsers.filter(function (user) {
	        return ((user.name.toLowerCase().indexOf(filterStr)) > -1);
	    });

	    PopulateProjectEditUsers(filteredUsers);
	    ChangeElementSelection(editedProjectUsers);
	}

    GetFilteredElements = function(){

        var elementsTable = document.getElementById("elements");
        var inputs = elementsTable.getElementsByTagName("input");
        
        var filteredElements = [];
        for (var i = 0; i < inputs.length; i++) {
            if (inputs[i].type == "checkbox") {
                filteredElements.push({id:inputs[i].id, name: inputs[i].value});
            }
        }
        
        return filteredElements;
    }
    
    SelectAll = function (evt) {

        ChangeElementSelection(editedProjectUsers);
        editedProjectUsers.length = 0;
	    if (evt.checked) {
            
            var filteredElements = GetFilteredElements();
            ChangeElementSelection(filteredElements);
	    }   
	}

    function ChangeElementSelection(users) {
        
        var clonedUsers = users.slice();
	    clonedUsers.forEach(function (user) {    
            var cbUser = document.getElementById(user.id);
	        if (cbUser) {
	            cbUser.click();
	        }
	    });
	}
    
    RemoveSelectedUser = function(evt){
        
        var seletedUserDiv = evt.parentNode;
        if(seletedUserDiv){
            var selectedUsersDiv = seletedUserDiv.parentNode;
            if(selectedUsersDiv){
                selectedUsersDiv.removeChild(seletedUserDiv);
            }
            
            var selectedUserDivId = seletedUserDiv.id;
            var selectedUserDivName = seletedUserDiv.innerHTML;
            var cur_user = { 
                id: selectedUserDivId.replace('selected', ''), 
                name: selectedUserDivName.substr(0, selectedUserDivName.indexOf('<span')) 
            };
            ChangeElementSelection([cur_user]);
        }
        
        var show = ((editedProjectUsers) && (editedProjectUsers.length > 0)) ? true : false;
	    ShowSelectedElements(show);
    }
    
    ChangeSelectedElements = function(evt) {
	
	    var cur_user = { id: evt.id, name: evt.value };
	    var index = editedProjectUsers.map(function (e) { return e.id; }).indexOf(cur_user.id);
	    if (evt.checked) {

	        if (index === -1) {

	            editedProjectUsers.push(cur_user);
	            var editeUsersHTML = document.getElementById('editedusers').innerHTML;
	            editeUsersHTML += "<div id='" + cur_user.id + "selected' class=\"selected-element\">" + cur_user.name + "<span onclick=\"RemoveSelectedUser(this)\">&#10005</span></div>";
	            document.getElementById('editedusers').innerHTML = editeUsersHTML;
	        }
	    } else {

	        if (index > -1) {

	            editedProjectUsers.splice(index, 1);
	            // remove div for user by id and updates innerHTML of divinitselectedusers.
	            var elem = document.getElementById(cur_user.id + 'selected');
	            if (elem && elem.parentNode) {
	                elem.parentNode.removeChild(elem);
	                // = document.getElementById('divinitselectedusers').innerHTML;
	            }
	        }
	    }
	
	    var show = ((editedProjectUsers) && (editedProjectUsers.length > 0)) ? true : false;
	    ShowSelectedElements(show);
	}

	function ShowSelectedElements(show) {

	    if (!show) {
	        document.getElementById('selected-elements').style.display = "none";
	    } else {
	        document.getElementById('selected-elements').style.display = "block";
	    }
	}


	SaveProjectUpdates = function (evt) {

	    // issue a post request to save data in db
        


	    document.getElementById('selected-elements').innerHTML = '';
	    editedProjectUsers = [];
	    registry.byId('dialogProjectEdit').hide();
	}

	CancelProjectUpdates = function (evt) {
    
	    document.getElementById('selected-elements').innerHTML = '';
	    editedProjectUsers = [];
	    registry.byId('dialogProjectEdit').hide();
	}
  
    SetProjectEditUsers(allUsers, []);//['1']);
});
