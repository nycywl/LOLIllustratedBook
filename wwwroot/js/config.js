var primary = localStorage.getItem("primary") || '#4d8aff';
var secondary = localStorage.getItem("secondary") || '#f73164';

window.WingoAdminConfig = {
	primary: primary,
	secondary: secondary,
};

$("#default-demo").click(function(){      
    localStorage.setItem('page-wrapper', 'page-wrapper compact-wrapper');
    localStorage.setItem('page-body-wrapper', 'sidebar-icon');
});


$("#compact-demo").click(function(){   
    localStorage.setItem('page-wrapper', 'page-wrapper compact-wrapper compact-sidebar');
    localStorage.setItem('page-body-wrapper', 'sidebar-icon');
});


$("#modern-demo").click(function(){   
    localStorage.setItem('page-wrapper', 'page-wrapper compact-wrapper material-type');
    localStorage.setItem('page-body-wrapper', 'compact-wrapper material-type');
});
