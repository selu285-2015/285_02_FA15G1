$(document).ready(function(){
    if (($(window).width() > 800) || ($(window).height() > 1280)) {
        document.location = "http://www.southeastern.edu/about/safe_campus/reference/index.html";
    }
});

window.addEventListener('load', function() {
    new FastClick(document.body);
}, false);

function testOrientation() {
    if(window.innerWidth > window.innerHeight){
        $("#wrapper").addClass("hidden");
        $("#landscape-modal").removeClass("hidden");
    } else {
        $("#wrapper").removeClass("hidden");
        $("#landscape-modal").addClass("hidden");
    }
}

////////////////////////////////////////////////////////////////////////////////
// BOTTOM NAVBAR
////////////////////////////////////////////////////////////////////////////////

// Store our Bottom Navbar Buttons into easily recognizable variables
var $homeMenuButton = $("#home-menu-button");
var $webviewToggleButton = $("#webview-toggle-button");
var $phoneButton = $("#phone-button");

// By default, the only visible menu will be the grid menu
var sidebarVisible = false;
var gridMenuVisible = true;
var webviewVisible = false;

var $sidebar = $('#sidebar-wrapper');
var $gridMenu = $('#grid-button-wrapper');
var $webview = $('#webview-wrapper');

// Toggle the Visibility of our menus
function toggleSidebar() {
    var $veil = $('.veil');

    if($sidebar.hasClass('open')) {
        $sidebar.velocity({
            'translateX': ['-100%', '0']
        }, {
            duration: 150
        });
    } else {
        $sidebar.velocity({
            'translateX': ['0', '-100%']
        }, {
            duration: 150
        });
    }
    $veil.toggleClass('hidden');
    $sidebar.toggleClass('open');
    sidebarVisible = toggleVisibility(sidebarVisible);
};

function toggleGridMenu() {

    if($gridMenu.hasClass('open')) {
        $gridMenu.velocity({
            'translateY': ['150%']
        }, {
            duration: 150
        });
    } else {
        $gridMenu.velocity({
            'translateY': ['0']
        }, {
            duration: 150
        });
    }
    $gridMenu.toggleClass('open');
    gridMenuVisible = toggleVisibility(gridMenuVisible);
};

function toggleWebview() {

    if($webview.hasClass('open')) {
        $webview.velocity({
            'translateX': ['100%', '0'],
            complete: function() {
                displayLoader();
            }
        }, {
            duration: 150
        });
    } else {
        $webview.velocity({
            'translateX': ['0', '100%']
        }, {
            duration: 150
        });
    }
    $webview.toggleClass('open');
    //$("#wrapper").toggleClass("webview-toggled");
    webviewVisible = toggleVisibility(webviewVisible);
};

// If item is visible, hide it; if it's hidden, make it visible
function toggleVisibility(item) {
    return item ? false : true;
};

// BOTTOM NAVBAR BUTTON ON-CLICK EVENTS
$('#sidebar-menu-toggle-button, .veil').click(function(e) {
    e.preventDefault(); // Prevents the page from refreshing
    toggleSidebar();

    //  When clicking to display sidebar, hide the grid menu
    if(sidebarVisible) {
        if(gridMenuVisible) {
            toggleGridMenu();
        }
        // When clicking to hide the sidebar, show the grid menu
    } else {
        if(!webviewVisible && !gridMenuVisible) {
            toggleGridMenu();
        }
    }
});

$homeMenuButton.click(function(e) {
    e.preventDefault(); // Prevents the page from refreshing
    hideNavIcons();
    if(sidebarVisible) {
        toggleSidebar();
    }
    if(webviewVisible) {
        toggleWebview();
    }
    if(!gridMenuVisible) {
        toggleGridMenu();
    }

});

$webviewToggleButton.click(function(e) {
    e.preventDefault(); // Prevents the page from refreshing
    /*loadPageInWebview("//www.southeastern.edu/alumni_donors/alumni_assoc/");*/
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
/*gridMenuLinks.click(function(e) {
    e.preventDefault();
    viewInWebview(this.href,toggleGridMenu);
});*/

$("#grid-button-wrapper a").click(function(e){
    e.preventDefault()
    //This is the URL of the page that you want the contents from
    var url = 'http://www.southeastern.edu/about/safe_campus/reference/index.html';

    //Set up AJAX call using JSONP to resolve cross-domain restrictions
    $.ajax({
        type    : 'GET',
        data    : {'url':url},
        url     : "http://www2.southeastern.edu/external/webapp_test/test/alumni_web/get_contents.php",
        dataType: "jsonp",
        success : function(result){
            e.preventDefault();
            //do what you want to do with the results here. you can call a function here and pass the results
            //like this
            //yourFunctionName(result);
            //Here, I am just showing the results to a div#contents.

            //result = url + '#ui-accordion-accordion_green_default_d15e80-header-0';
            result = url + '#accordion_green_default_d15e80';
            //ui-accordion-accordion_green_default_d15e80-header-0
            viewInWebview(result,toggleGridMenu);
        },
        error: function(){
            console.log("womp womp");
        }
    });
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
    var $loader = $(".loader");
    var $webWindow = $("#webview-iframe");
    $loader.delay(1500).velocity("fadeOut", { duration: 800 });
    $webWindow.attr('src', pageURL);
    showNavIcons();
};

function displayLoader() {
    var $loader = $(".loader");
    $loader.delay(500).velocity({ opacity: 1 }, { display: "block"});
}

////////////////////////////////////////////////////////////////////////////////
// SIDEBAR SPECIFIC
////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////
// iFRAME BACK & FORWARD
//
// To my knowledge, we will not be able to have a back/forward button within the
// iframe unless we are one the same domain
//
// To replicate error message, uncomment code below & the buttons in the html file
////////////////////////////////////////////////////////////////////////////////
 var backButton = $("#back-button");
 var forwardButton = $("#forward-button");

function showNavIcons() {
    backButton.removeClass("hidden");
    $phoneButton.addClass("hidden");

    forwardButton.removeClass("hidden");
    $webviewToggleButton.addClass("hidden");
};

function hideNavIcons() {
    $phoneButton.removeClass("hidden");
    backButton.addClass("hidden");

    $webviewToggleButton.removeClass("hidden");
    forwardButton.addClass("hidden");
};

// The back and forward buttons for the iframe do not currently work do to Chrome Dev Console Message:
//      Uncaught SecurityError: Blocked a frame with origin "http://localhost:63342"
//      from accessing a frame with origin "http://www.southeastern.edu".
//      Protocols, domains, and ports must match.
backButton.click(function() {
    document.getElementById("webview-iframe").contentWindow.history.back();
});

forwardButton.click(function() {
    document.getElementById("webview-iframe").contentWindow.history.forward();
});

