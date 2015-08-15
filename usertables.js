document.addEventListener("DOMContentLoaded", function(event) { 
  
    var allUsers = [{id:'1', name:'Monica Anderson'},{id:'2',name:'Steven Blankenship'},{id:'3',name:'Joshua Jones'},{id:'4',name:'Corry Smith'},{id:'5',name:'Vikar Hamilton'},{id:'6',name:'Chandler Bing'},{id:'7',name:'Jessica Woodsmith'},{id:'8',name:'Adams James'},{id: '9', name:'Spencer Deb'}, {id:'10',name:'Brandon Bran'}, {id:'11',name:'Yudi Man'},{id:'12',name:'George Zoto'},{id:'13',name:'Wayman Sorkinvadataker'},{id:'14', name:'Heather Minga'},{id:'15', name:'Sam David'},{id:'16', name:'Ashley Brown'},{id:'17', name:'Tiffany Johns'},{id:'18', name:'Chris Brown'},{id:'19', name:'Ginger White'},{id:'20', name:'Dyan Fowler'},{id:'21', name:'Nancy Smith'},{id:'22', name:'Heather Smith'},{id:'23', name:'Lisa Clark'},{id:'24', name:'Alexis Williams'},{id:'25', name:'Dawn Smith'}];

    var editedProjectUsers = [];

	function SetProjectEditUsers (users, selectedUserIds) {

	    var actualProjectUsers = users.filter(function (user) {
            return (selectedUserIds.indexOf(user.id) > -1);
	    });
	    PopulateProjectEditUsers(users);
	    ChangeUserSelection(actualProjectUsers);
	}
    
	function PopulateProjectEditUsers(users) {

	    var usersTableHTML = "<table>";

	    //console.log(users.length);
	    users.forEach(function (user) {

	        usersTableHTML += "<tr>";

	        usersTableHTML += "<td style=\"border-right: 1px solid #99CCFF;\">";
	        usersTableHTML += "<input type=\"checkbox\" id=\"" + user.id + "\" value=\"" + user.name + "\" onclick=\"ChangeSelectedUserList(this)\" >";
	        usersTableHTML += "</td>";
	        usersTableHTML += "<td>" + user.name + "</td>";

	        usersTableHTML += "</tr>";
	    });
	    usersTableHTML += "</table>";
	    document.getElementById("edit-users").innerHTML = usersTableHTML;
	}

	FilterUsers = function (evt) {

	    var filterStr = evt.value.toLowerCase();
	    var filteredUsers = allUsers.filter(function (user) {
	        return ((user.name.toLowerCase().indexOf(filterStr)) > -1);
	    });

	    PopulateProjectEditUsers(filteredUsers);
	    ChangeUserSelection(editedProjectUsers);
	}

    SelectAll = function (evt) {

        ChangeUserSelection(editedProjectUsers);
        editedProjectUsers.length = 0;
	    if (evt.checked) {
            
            ChangeUserSelection(allUsers);
	    }   
	}

    function ChangeUserSelection(users) {
        
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
            ChangeUserSelection([cur_user]);
        }
        
        var show = ((editedProjectUsers) && (editedProjectUsers.length > 0)) ? true : false;
	    ShowSelectedUsers(show);
    }
    
    ChangeSelectedUserList = function(evt) {
	
	    var cur_user = { id: evt.id, name: evt.value };
	    var index = editedProjectUsers.map(function (e) { return e.id; }).indexOf(cur_user.id);
	    if (evt.checked) {

	        if (index === -1) {

	            editedProjectUsers.push(cur_user);
	            var editeUsersHTML = document.getElementById('editedusersforproject').innerHTML;
	            editeUsersHTML += "<div id='" + cur_user.id + "selected' class=\"selecteduser\">" + cur_user.name + "<span onclick=\"RemoveSelectedUser(this)\">&#10005</span></div>";
	            document.getElementById('editedusersforproject').innerHTML = editeUsersHTML;
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
	    ShowSelectedUsers(show);
	}

	function ShowSelectedUsers(show) {

	    if (!show) {
	        document.getElementById('selected-users-list-container').style.display = "none";
	    } else {
	        document.getElementById('selected-users-list-container').style.display = "block";
	    }
	}


	SaveProjectUpdates = function (evt) {

	    // issue a post request to save data in db
        


	    document.getElementById('editedusersforproject').innerHTML = '';
	    editedProjectUsers = [];
	    registry.byId('dialogProjectEdit').hide();
	}

	CancelProjectUpdates = function (evt) {
    
	    document.getElementById('editedusersforproject').innerHTML = '';
	    editedProjectUsers = [];
	    registry.byId('dialogProjectEdit').hide();
	}
  
    SetProjectEditUsers(allUsers, ['1']);
});