////////////////////////////////////////////////////////////////////////////////
// BOTTOM NAVBAR
////////////////////////////////////////////////////////////////////////////////

// Store our Bottom Navbar Buttons into easily recognizable variables
var sidebarButton = $("#sidebar-menu-toggle-button");
var gridMenuButton = $("#grid-menu-toggle-button");
var webviewToggleButton = $("#webview-toggle-button");

// By default, the only visible menu will be the grid menu
var sidebarVisible = false;
var gridMenuVisible = true;
var webviewVisible = false;

// Toggle the Visibility of our menus
function toggleSidebar() {
    $("#wrapper").toggleClass("sidebar-toggled");
    sidebarVisible = toggleVisibility(sidebarVisible);
};

function toggleGridMenu() {
    $("#grid-button-wrapper").toggleClass("sidebar-toggled");
    gridMenuVisible = toggleVisibility(gridMenuVisible);
};

function toggleWebview() {
    $("#wrapper").toggleClass("webview-toggled");
    webviewVisible = toggleVisibility(webviewVisible);
};

// If item is visible, hide it; if it's hidden, make it visible
function toggleVisibility(item) {
    return item ? false : true;
};

// BOTTOM NAVBAR BUTTON ON-CLICK EVENTS

sidebarButton.click(function(e) {
    e.preventDefault(); // Prevents the page from refreshing
    toggleSidebar();

    //  When clicking to display sidebar, hide the grid menu
    if(sidebarVisible) {
        if(gridMenuVisible) {
            toggleGridMenu();
        } 
         // When clicking to hide the sidebar, show the grid men
    } else {
        if(!webviewVisible && !gridMenuVisible) {
            toggleGridMenu();
        }
    }
});

gridMenuButton.click(function(e) {
    e.preventDefault(); // Prevents the page from refreshing
    toggleGridMenu();

    //  If sidebar is visible on click, hide it
    if(gridMenuVisible && sidebarVisible) {
        toggleSidebar();
    }
});

webviewToggleButton.click(function(e) {
    e.preventDefault(); // Prevents the page from refreshing
    loadPageInWebview("https://www.southeastern.edu/alumni_donors/alumni_assoc/");
    toggleWebview();

    //  Always hide the sidebar on click
    if(sidebarVisible) {
        toggleSidebar();
    }
    //  Hide the Grid Menu when clicking to display webview
    if(webviewVisible) {
        if(gridMenuVisible) {
            toggleGridMenu();
        }
    //  Show the Grid Menu when click to hide webview
    } else {
        if(!gridMenuVisible) {
            toggleGridMenu();
        }
    }
});

////////////////////////////////////////////////////////////////////////////////
// SIDEBAR & GRID MENU BUTTON LINK FUNCTIONALITY
////////////////////////////////////////////////////////////////////////////////

var sidebarLinks = $(".sidebar-nav > li:gt(0) a"); // Excludes the 1st (title link) bc it should not open in webview
var gridMenuLinks = $("#grid-button-wrapper a");

// Links within the sidebar open in the webview rather than redirecting
sidebarLinks.click(function(e) {
    e.preventDefault();
    viewInWebview(this.href,toggleSidebar);
});

// Links within the grid menu open in the webview rather than redirecting
gridMenuLinks.click(function(e) {
    e.preventDefault();
    viewInWebview(this.href,toggleGridMenu);
});

// Load the url of the link within the webview, hide its parent menu, make webview visible if hidden
function viewInWebview(url, action) {
    loadPageInWebview(url);

    // Hides the corresponding menu of the link clicked (e.g. Sidebar, Grid Menu)
    action();

    if(!webviewVisible) {
        toggleWebview();
    }
};

function loadPageInWebview(pageURL) {
    $(".loader").delay(1000).fadeOut("slow");
    var $webWindow = $("#webview-iframe");
    $webWindow.attr('src', pageURL);

    if ($webWindow.readyState !== "complete") {
        $(".loader").show();
    }
};

////////////////////////////////////////////////////////////////////////////////
// SIDEBAR SPECIFIC
////////////////////////////////////////////////////////////////////////////////

// The arrow within the sidebar will fade out as the user scrolls to the bottom of the page
var downArrow = $('#scroll-down-arrow');
$("#sidebar-wrapper").scroll(function(){
    if($("#sidebar-wrapper").scrollTop()<20){
        downArrow.fadeIn(500);
    } else {
        downArrow.fadeOut(500);
    }
});