/**
 * Created by Bcraft on 10/20/15.
 */

// Fade Arrow on Scroll Down within Sidebar
var downArrow = $('#scroll-down-arrow');
$("#sidebar-wrapper").scroll(function(){
    if($("#sidebar-wrapper").scrollTop()<20){
        downArrow.fadeIn(500);
    } else {
        downArrow.fadeOut(500);
    }
});

// Toggle Sidebar Menu on Hamburger Button click within bottom-navbar
var toggleSidebarMenu = function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("sidebar-toggled");
};

// Toggle the Webview
var toggleWebview = function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("webview-toggled");
};

// Toggle Main Grid Menu on Grid Button Click within bottom-navbar
var toggleMainGridMenu = function(e) {
    e.preventDefault();
    $("#grid-button-wrapper").toggleClass("sidebar-toggled");
};
$("#grid-menu-toggle").click(toggleMainGridMenu);

// External Link test to display in the iframe
// This should be templated and applied to each link
// This specific one disables the "Go to Desktop" link in
// the sidebar and should switch the "Go to Desktop" icon to
// a go to mobile icon when desktop  view is enabled
$(".desktop-link").click(function(e) {
    e.preventDefault();
    var $webWindow = $("#webview-iframe");
    $webWindow.attr('src', "https://www.southeastern.edu/alumni_donors/alumni_assoc/");
    toggleWebview(e);
    toggleMainGridMenu(e);
});


$("#menu-toggle").click(function(e) {
    toggleSidebarMenu(e);
    toggleMainGridMenu(e);
});

$("#webview-iframe").load(function() {
    $(".loader").delay(300).fadeOut("slow");
})