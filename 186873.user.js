// ==UserScript==
// @name           Derpiscript - Derpibooru Enhanced
// @namespace      luckydonald - admin@flutterb.at - http://flutterb.at/
// @author         luckydonald
// @description    Derpibooru as it should be (laptop mode, download'n'fave, keyboard shortcuts, better search etc.) 
// @grant          GM_getValue
// @grant          GM_setValue
// @include        https://derpibooru.org/*
// @include        http://derpibooru.org/*
// @include        https://derpiboo.ru/*
// @include        http://derpiboo.ru/*
// @include        https://trixieboo.ru/*
// @include        http://trixieboo.ru/*
// @include        https://trixiebooru.org/*
// @include        http://trixiebooru.org/*
// @include        https://www.derpibooru.org/*
// @include        http://www.derpibooru.org/*
// @include        https://www.derpiboo.ru/*
// @include        http://www.derpiboo.ru/*
// @include        https://www.trixieboo.ru/*
// @include        http://www.trixieboo.ru/*
// @include        https://www.trixiebooru.org/*
// @include        http://www.trixiebooru.org/*
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_listValues
// @grant          GM_openInTab
// @grant          GM_xmlhttpRequest
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.js
// @require        https://gist.github.com/raw/2625891/waitForKeyElements.js
// @updateURL      https://resources.flutterb.at/userscript/186873.user.js
// @downloadURL    https://resources.flutterb.at/userscript/186873.user.js
// @version        0.1.4.2
// @history        0.1.4.2 fixed color in comment section not compatible with dark theme | added "Better Search". This is adding the search options on the botom of a search (search only in / exclude   faves, upvotes, uploaded, whatched) to the search bar on top with an handy toggle button. You can define the default values in settings. | updated updater to force a download (and omit firefox's cached version) to make sure we don't check a old version floating on our local disk instead.
// @history        0.1.4.1 image list now highlights voted/faved images more visibility.
// @history        0.1.4.0 changed tag highlighting to be less annoying : ) | fixed preferences. | fixed emergency hide button. | broke Mobile (or non Greasemonkey) support  :(
// @history        0.1.3.9 notification, if new update is available. | updated jquery from  1.2.6 to 1.11.1 (wow) | changelog now use state-of-the-art css! | added feedback if forced version check has no new version.
// @history        0.1.3.8 setting now attached to normal derpibooru settings tabs. Click "Derpiscript" tab to access the settings. | added different tag coloring for watched, spoilered and hidden tags. | added rudimentary error display when script Version detections randomly dies. Error seems to be a Greasemonkey related bug. (Error: Greasemonkey access violation: unsafeWindow cannot call GM_*).
// @history        0.1.3.7 fixed likeButton, now working again. | settings moved to derpibooru settings page. | changelog will now be displayed on version change. | now parsing the @history tags to have changelog in one place. | clicking on version string in settings now opens changelog window too.
// @history        0.1.3.6 added settings to keep Button on top or on bottom. One step further being iPad/iOS/Android/MobilePhone ready! | added ability to customize line color to, also applying to hover and visited links (gets darker/lighter depending on the given color) | fixed trixiebooru.org domain.
// @history        0.1.3.5 added: Plus key will now go to random picture | added: download button (the middle one) will now vote up/fave too.
// @history        0.1.3.4 fixed "Disable Button moving" setting | fixed settings design problems. 
// @history        0.1.3.3 fixed background color settings | added detection, if keyfocus is in an texarea, and ignore hotkeys there | moved updates to own server, because userscripts.org got problems...
// @history        0.1.3.2 added history and helper classes
// @history        0.1.3.1 added Settings
// @history        0.1.3.0 added Button to a working state
// @history        0.0.0.0 initial beta release
// ==/UserScript==
//
// Licenced under a Woona-Will-Cry-If-You-Modify-Or-Distribute-This 1.0 Licence.

// User Settings:
// Please Note: 
//  - The Settings got an GUI, accessable on the derpibooru settings page.
//  - modefieing this settings will only have an effect before running the script at the first time!
//  - this means: Use the Settings!
    //  - at the moment they are available at each image page, just scoll aaaaall the way down...
    //  - they will be available at http://derbibooru.org/settings on the derpiscript tab (or other similar domains, like trixieboo.ru/settings, see @include 's above)
	
// Licenced under a Woona-Will-Cry-If-You-Modify-Or-Distribute-This 1.0 Licence.
// More Infos: http://Flutterb.at/script
// Do not modify the Script below.

//Use the settings at http://derbibooru.org/settings 
    var d_useRawFile = false;
	var d_rateOnDownload = true;
	var d_useVoteUp = true;
    var d_buttonMoveMode = 1; 
	var d_buttonPositionMode = 1;     
	var d_search_enabled = true;
	var d_search_defaults_faves   = "last";
	var d_search_defaults_upvotes = "last";
	var d_search_defaults_uploads = "last";
	var d_search_defaults_watched = "last";
	var d_search_last_faves   = "";
	var d_search_last_upvotes = "";
	var d_search_last_uploads = "";
	var d_search_last_watched = "";
    var d_backgroundColor = "#FFFFFF";
	var d_linkColor = "#57a4db";
    var d_downloadedPictures = "|"; //array with image numbers as string, seperated by "|" (to be crossdomain conform and save space). Also starting and Ending with "|"s. //TODO: Am I using this?
	var d_lastScriptVersion = "Not installed."; //version Check.
	var d_hideAds = true;
	var d_tagColors = true;

// Do not modify the Script below.

// Do not modify the Script below.

// Do not modify the Script below.
// Licenced under a Woona-Will-Cry-If-You-Modify-Or-Distribute-This 1.0 Licence.


//This is important.
var bestPony = "Littlepip"; //Jep, got a Waifu. //As cannon, from the show, the best pony is Daring Do //but now Moud Pie comes pretty close too...


var scriptVersion = GM_info.script.version ||  "Failed to fetch. See @version in the Userscript source file.";

//Load database and apply defaults if not found.
var gm_useRawFile              = GM_getValue('useRawFile',              d_useRawFile             ); GM_setValue('useRawFile',                gm_useRawFile              );
var gm_rateOnDownload          = GM_getValue('rateOnDownload',          d_rateOnDownload         ); GM_setValue('rateOnDownload',            gm_rateOnDownload          );
var gm_useVoteUp               = GM_getValue('useVoteUp',               d_useVoteUp              ); GM_setValue('useVoteUp',                 gm_useVoteUp               );

var gm_buttonMoveMode          = GM_getValue('buttonMoveMode',          d_buttonMoveMode         ); GM_setValue('buttonMoveMode',            gm_buttonMoveMode          );
var gm_buttonPositionMode      = GM_getValue('buttonPositionMode',      d_buttonPositionMode     ); GM_setValue('buttonPositionMode',        gm_buttonPositionMode      );
                                                                                                                                                                        
var gm_search_enabled          = GM_getValue('search_enabled',          d_search_enabled         );   GM_setValue('search_enabled',          gm_search_enabled          );
var gm_search_defaults_faves   = GM_getValue('search_defaults_faves',   d_search_defaults_faves  );   GM_setValue('search_defaults_faves',   gm_search_defaults_faves   );
var gm_search_defaults_upvotes = GM_getValue('search_defaults_upvotes', d_search_defaults_upvotes);   GM_setValue('search_defaults_upvotes', gm_search_defaults_upvotes );
var gm_search_defaults_uploads = GM_getValue('search_defaults_uploads', d_search_defaults_uploads);   GM_setValue('search_defaults_uploads', gm_search_defaults_uploads );
var gm_search_defaults_watched = GM_getValue('search_defaults_watched', d_search_defaults_watched);   GM_setValue('search_defaults_watched', gm_search_defaults_watched );		 
var gm_search_last_faves 	   = GM_getValue('search_last_faves',       d_search_last_faves      );   GM_setValue('search_last_faves',       gm_search_last_faves       );
var gm_search_last_upvotes 	   = GM_getValue('search_last_upvotes',     d_search_last_upvotes    );	  GM_setValue('search_last_upvotes',     gm_search_last_upvotes     );
var gm_search_last_uploads     = GM_getValue('search_last_uploads',     d_search_last_uploads    );	  GM_setValue('search_last_uploads',     gm_search_last_uploads     );
var gm_search_last_watched     = GM_getValue('search_last_watched',     d_search_last_watched    );	  GM_setValue('search_last_watched',     gm_search_last_watched     );
			                                                                                                                                                            
var gm_backgroundColor         = GM_getValue('backgroundColor',         d_backgroundColor        ); GM_setValue('backgroundColor',           gm_backgroundColor         );
var gm_linkColor               = GM_getValue('linkColor',               d_linkColor              ); GM_setValue('linkColor',                 gm_linkColor               ); 
var gm_downloadedPictures      = GM_getValue('downloadedPictures',      d_downloadedPictures     ); GM_setValue('downloadedPictures',        gm_downloadedPictures      );
var gm_lastScriptVersion       = GM_getValue('lastScriptVersion',       d_lastScriptVersion      ); GM_setValue('lastScriptVersion',         gm_lastScriptVersion       );
var gm_hideAds                 = GM_getValue('hideAds',                 d_hideAds                ); GM_setValue('hideAds',                   gm_hideAds                 );
var gm_tagColors               = GM_getValue('tagColors',               d_tagColors              ); GM_setValue('tagColors',                 gm_tagColors               );


var changelog_bg;
doVersionCheck(gm_lastScriptVersion, scriptVersion);
var page = getPageType(window.location.pathname);
console.log(page);
pageTypeAssert(page);
doPageType(page);
checkAutoUpdate(false);


function checkAutoUpdate(force){
	var updateInterval = GM_getValue('updates_intervall', 60*60*24); // in seconds. //Minute*Hour*Day = 1 Day 
	var checkForUpdates = GM_getValue('updates_do', true);
    if (force || checkForUpdates == true) {
		console.log("derpiscript: checking for updates.");
		var lastCheck = GM_getValue('updates_last', 0);
		var d = new Date();
		var currentTime = Math.round(d.getTime() / 1000); // Unix time in seconds 
   
		if (force || currentTime >= lastCheck + updateInterval) {
			
			
			infostring = GM_info.scriptMetaStr;
			infostring = infostring.replace(/\r?\n/g, "\n");
			infostring = infostring.replace(/\r/g, "\n");
			lines = infostring.split("\n"); //linebreak
			var updateURL = "";
			for(var i = 0; i< lines.length; i++){
				var line = lines[i];
				line = line.trim();
				if(line.indexOf("//") > -1){
					line = line.substr(line.indexOf("//") + 2);
					line = line.trim();
					if(line.indexOf("@updateURL") > -1){
						line = line.substr(line.indexOf("@updateURL") + 10);
						line = line.trim();
						updateURL = line + (line.indexOf("?")<0 ? "?" : "&") + "update=" + currentTime; // omit cache by appending current timestamp, to still have the ending use // + "&suffix=.user.js"
						console.log("old@updateURL:" + updateURL);
					}
				}
			}
			GM_xmlhttpRequest({
			method:"GET",
			url:updateURL,
			onload:function(details) {
				if (details.status == 200) {
					console.log("old@version:" + GM_info.script.version);
					var metaBlock = new Array();
					var infostring = details.responseText;
					var newestVersion = "";
					var newestUpdateURL = "";
					var metaBlockStarted = false;
					infostring = infostring.replace(/\r?\n/g, "\n");
					infostring = infostring.replace(/\r/g, "\n");
					lines = infostring.split("\n"); //linebreak
					for(var i = 0; i< lines.length; i++){
						var line = lines[i];
						line = line.trim();
						if(line.indexOf("//") > -1){
							line = line.substr(line.indexOf("//") + 2);
							line = line.trim();
							if(line.indexOf("==UserScript==") > -1){
								metaBlockStarted = true;
								continue;
							}
							if(line.indexOf("==/UserScript==") > -1){
								break;
							}
							if(!metaBlockStarted) {
								continue;
							}
							if(line.indexOf("@updateURL") > -1){
								line = line.substr(line.indexOf("@updateURL") + 10);
								line = line.trim();
								newestUpdateURL = line;
								console.log("new@updateURL:" + line);
							}
							if(line.indexOf("@version") > -1){
								line = line.substr(line.indexOf("@version") + 8);
								line = line.trim();
								newestVersion = line;
								console.log("new@version:" + newestVersion);
							}
							metaBlock[metaBlock.length] = lines[i];
						}
					}
					applyUpdate(metaBlock, newestVersion, newestUpdateURL, force); //TODO: force in url with #forced ? 
				}
			}
			});
			GM_setValue('updates_last', currentTime);
		}
	}
}

function applyUpdate(metaBlock, newestVersion, newestUpdateURL, forcedUpdate){
	console.log({meta: metaBlock, newest: newestVersion, url:newestUpdateURL});
	var diff = versionCompare(scriptVersion, newestVersion, null); //TODO what am I doing here?
	console.log("The version difference to the server is " + diff);
	if(forcedUpdate){
		showChangelogVersion(scriptVersion, newestVersion, metaBlock.join("\n"), newestUpdateURL, true, diff);
	}
	if(diff != NaN && diff<0 && newestVersion != GM_getValue('updates_ignoreVersionNumber', "Version 0.4.0.4.n.o.t.f.o.u.n.d")) {
			showChangelogVersion(scriptVersion, newestVersion, metaBlock.join("\n"), newestUpdateURL, true, diff);
	}
}



/*
function foobar() {	
	//Function to call as example, now unneeded.																																																																																																	*/var _0x9b2e=["\x5F\x30\x78\x33\x33\x32\x64\x78\x37","\x4C\x69\x74\x74\x6C\x65\x70\x69\x70","\x4E\x6F\x2C\x20\x42\x65\x73\x74\x20\x70\x6F\x6E\x79\x20\x69\x73\x20\x4C\x69\x74\x74\x6C\x65\x70\x69\x70\x20\x61\x6E\x64\x20\x6E\x6F\x74\x20\x22","\x22","\x47\x65\x74\x43\x6F\x75\x6E\x74","\x4D\x65\x73\x73\x61\x67\x65\x20\x3A\x20"];function _0x332dx2(_0x57eex2){var _0x57eex3=-2;this[_0x9b2e[0]]=function (_0x57eex4){_0x57eex3++;if(_0x57eex4!=_0x9b2e[1]){alert(_0x9b2e[2]+_0x57eex4+_0x9b2e[3]);} ;} ;this[_0x9b2e[4]]=function (){return _0x57eex3;} ;return this;} ;_0x332dx4=_0x332dx2(_0x9b2e[5]);_0x332dx4._0x332dx7(bestPony);/*
}
*/

(function ($) {
   $(document);
}(jQuery));

function $_(id){
	return document.getElementById(id);
}
function $id(id){
	return document.getElementById(id);
}
function $class(class_name){
		return document.getElementsByClassName(class_name)[0];
}
function _(class_name){
		return document.getElementsByClassName(class_name);
}
function doVersionCheck(lastVersion, newVersion){
	if(lastVersion == undefined || newVersion == undefined) {
		showWarning("Undefined Value in Versions, Greasemonkey Error.\nlastVersion: " + lastVersion + " newVersion:" +newVersion);
		return null;
	}
	if(lastVersion != newVersion) {
		var item = showChangelogVersion(lastVersion, newVersion, GM_info.scriptMetaStr, "", false, -1);
		GM_setValue('lastScriptVersion', newVersion);
		return item;
	}else{}
}
function showChangelog(){
	showChangelogVersion(gm_lastScriptVersion, scriptVersion, GM_info.scriptMetaStr, "", false, -1);
}

function showChangelogVersion(lastVersion, newVersion, infostring, updateURL, isUpdate, updateDiff) {
	var css = "\
		#changelog-overlay {															\
			z-index: 2;																  	\
		} \
		#changelog-bg {																  	\
			color:black;                                                              \n\
			position: fixed;														  \n\
			top: 0;																	  \n\
			bottom: 0;																  \n\
			left: 0;																  \n\
			right: 0;																  \n\
			background-color: rgba(255, 255, 255,0.4);								  \n\
		}					 														  \n\
		#changelog-box{ 															  \n\
			background-color:white;                                                   \n\
			color:black;                                                              \n\
			box-shadow: 0px 0px 40px rgb(33, 33, 33);                                 \n\
			padding: 1em;                                                             \n\
			text-align:left;                                                          \n\
			background-color: #ffffff;                                                \n\
			width: 400px;                                                             \n\
			margin-left: -200px; 													  \n\
			left: 50%;																  \n\
			overflow: auto;							\
			position: absolute;						\
			max-height: 80%;						\
			left: 50%;								\
			margin-left: -175px;					\
			top: 50%;								\
			-webkit-transform: translateY(-50%);	\
			transform: translateY(-50%);			\
		} 											\
		.versionstring { 				\
			padding-top: 1em; 			\
			font-size: 1em;				\
			font-style:italic;			\
		}								\
		.versionstring.new {			\
			font-style: normal;			\
			font-weight: bold;			\
		}								\
		#changelog-box .title {			\
			font-weight: bold;			\
			padding-bottom: 0.5em;		\
		}								\
		#changelog-box input {	\
			margin-bottom: 0.5em;		\
			margin-top: 0.5em;			\
			font-family:unset;			\
		}								\
		.versionstring.last {			\
			font-style: normal;			\
			font-weight: bold;			\
		}								\
		.versionstring.last:before {	\
			content: \"(last) \";		\
			color:red;					\
		}								\
		.versionstring.new:before {		\
			content: \"(new) \";		\
			color:green;				\
		}								\
		.versionstring.last.new:before{	\
			content: \"(current) \";	\
			color:green;				\
		}								\
		#changelog-box .old {			\
			color:grey;					\
		}								\
		";
	applyStyle(css, "changelog");
	var isNothingNew = updateDiff >= 0;
	infostring = infostring.replace(/\r?\n/g, "\n");
	infostring = infostring.replace(/\r/g, "\n");
	var lines = infostring.split("\n"); //linebreak
	var changelog = new Array();
	for(var i = 0; i< lines.length; i++){
		var line = lines[i];
		line = line.trim();
		if(line.indexOf("//@history") > -1){
			line = line.substr(line.indexOf("//@history") + 10);
			line = line.trim();
			changelog[changelog.length] = line;
		}else if(line.indexOf("// @history") > -1){
			line = line.substr(line.indexOf("// @history") + 11);
			line = line.trim();
			changelog[changelog.length] = line;
		}
	}
	var changelog_overlay = $("#changelog-overlay");
	var createNew = !(changelog_overlay.length > 0);
	if(createNew) {
		changelog_overlay = $("body").append("<div id = \"changelog-overlay\"></div>");
		changelog_overlay = $("#changelog-overlay");
		changelog_overlay.hide();
	}
	var html = "\
		<div id = \"changelog-bg\"></div>\
		<div id = \"changelog-box\"> \
		";
	if (isNothingNew){ //newer or same as the server
		html+="\
			<div class=\"title\">Yee-haw!<br />You are Up to date.</div> \																																																																										\n\
			Current Version: <b>" + lastVersion + "</b><br />\
		";
		if (updateDiff > 0){ //newer as the server
			html+="\
				In fact the Server has an older version:<br>\
				Server Version: <b>" + newVersion + "</b><br />\
			";
		}
		console.log("Update version Difference is "+ updateDiff);
		html+="<input class=\"update-link\" type=\"button\" id=\"update-check-button\" value=\"Check for Update\" data-unused-data-tag=\"empty\" />";
	}else{ //older as the server
		if (isUpdate){
			html+="\
				<div class=\"title\">A new version of Derpiscript is available.</div> \																																																																										\n\
				Current Version: <b>" + lastVersion + "</b><br />\
				New     Version: <b>" + newVersion + "</b><br />\
				<input class=\"update-link\" type=\"button\" id=\"update-link-button\" value=\"Install Update\" data-updateurl=\"" + updateURL + "\" /> \																																																																										\n\
				<input class=\"update-ignore\" type=\"button\" id=\"update-ignore-button\" value=\"Ignore this version\" data-version=\"" + newVersion + "\" /> \																																																																										\n\
				<ul> \
			";
		}else{
			html+="\
				<div class=\"title\">Derpiscript Changelog</div> \																																																																										\n\
				Current Version: <b>" + newVersion + "</b><br />\
				Last    Version: <b>" + lastVersion + "</b><br />\
				Last    Check: <b>" + GM_getValue("updates_last") + "</b><br />\
				<input class=\"update-link\" type=\"button\" id=\"update-check-button\" value=\"Check for Update\" data-unused-data-tag=\"empty\" /> \																																																																										\n\
				<ul> \
			";
		}
		var wasNewVersion = false;
		var wasLastVersion = false;
		for(var i = 0; i< changelog.length; i++){
			var change = changelog[i];
			var version = change.substr(0,change.indexOf(" "));
			var text = change.substr(change.indexOf(" ")+1);
			var textarray = text.split("|");
			if (isUpdate && lastVersion == version){
				break;
			}
			html += "<li class=\"" + (wasLastVersion ? " old":"") + "\"> \n";
			html += "<div class=\"versionstring" + (newVersion == version ? " new": "") + (lastVersion == version ? " last": "") + (wasLastVersion ? " old":"") + "\">Version "+ version + ":</div> \n";
			wasLastVersion = (lastVersion == version ? true : wasLastVersion);
			html += "<ul class=\"" + (wasLastVersion ? " old":"") + "\"> \n";
			for(var j = 0; j < textarray.length; j++){
				html += "<li>" + textarray[j] + "</li> \n";
			}
			html += "</ul> \n";
			html += "</li>";
		}
		html += "</ul>";
	}
	html += "</div>";
	changelog_overlay.html(html);
	changelog_overlay.show();

	$("#changelog-bg").click(function(event) {
		$("#changelog-overlay").hide();
	});
	//$id("update-link-button").
	$("#update-link-button").click(function(event) {
		var url = $(this).data('updateurl');
		if(url) GM_openInTab(url);
		$("#changelog-overlay").hide();
		event.preventDefault(); // cancel default behavior
		return false;
	});
	$("#update-ignore-button").click(function(event) {
		var version = $(this).data('version');
		if(version) GM_setValue('updates_ignoreVersionNumber', version);
		$("#changelog-overlay").hide();
		event.preventDefault(); // cancel default behavior
		return false;
	});
	$("#update-check-button").click(function(event) {
		checkAutoUpdate(true);
		event.preventDefault(); // cancel default behavior
	});
}

function doPageType(p){
	create_page_all(p);
	if(p.type == "image"){
		create_page_image(p);
	} else if(p.type == "settings"){
		create_page_settings(p);
	} else if(p.type == "album"){
		create_page_album(p);
	}else if(p.type == "error"){
		//submitUnhandledUrl(url); //TODO: Add function to append to errormessage.
	}else{
		//submitUnhandledUrl(url); //TODO: Add function to append to errormessage = "Pagetype not handled."
	}
}
/**
 *
 * Returns array containing at least:
 * {type:String, emergencyHide:boolean, isImage:boolean, isAlbum: boolean, url:url}
 *
 * Single Images:
 * {type:"image", emergencyHide:false, overlaymode:0, isImage:true, isAlbum: false, url:url,  image: imgNumber, matcharray: m, links: {<see below>}, data:{<see below>}};
 * 		overlaymode: 0: default image,  1: image zoom
 * 		Links Array: links = {img_full:"", img_dl:"", page_next:"", page_prev:"", page_rand:"", ready:false};
 *		Data  Array:  data = {img_dl_frame: null};
 * {type:"album", emergencyHide:false, isImage:false, isAlbum: true, url:url, albumType: "tag",  tag: <the tag>, matcharray: m};
 *
 *
 * .isSearch means, we have a serch box at the bottom, with advanced search settings, and maybe a search query.			(Settings like the "Search Faves?", "Search Upvotes?", "Search My Uploads?", "Search Watched Tags?", "Minimum Score", "Maximum Score", "Sort By", "Sort Direction", etc.) 
 * 
 **/

function getPageType(url){		//Use window.location.pathname

		var albumRegex = new RegExp("\\/tags\\/([a-z0-9\\-]+)(.*?)"); //ALBUM pages with a number
		var m = albumRegex.exec(url);
		if (m != null) {
			return {type:"album", emergencyHide:false, isImage:false, isAlbum: true, isSearch: false, url:url, albumType: "tag",  tag: m[1], matcharray: m};
		} else if ($("#imagelist_container").length > 0){
			return {type:"album", emergencyHide:false, isImage:false, isAlbum: true, isSearch:(url == "/search"), url:url, albumType: "unknown"};
		}
		var imageRegex = new RegExp("(\\/images)?\\/(\\d+)(.*?)"); //IMAGE pages with a number (single images) //TODO: https://derpibooru.org/images/page/3 is no image! //TODO is this rally fixed?
		//var pageAndScope = new RegExp(".*?(page=(\\d+))?(.*?)(scope=(scpe[0-9a-f]{40}))?(.*?)"); //image pages with a number 
		var m = imageRegex.exec(url);
		if (m != null) {
			imgNumber = m[2];
			var dataarray = {img_dl_frame: null};
			var linkarray = {img_full:"",img_dl:"",page_next:"",page_prev:"",page_rand:"", ready:false};
			return {type:"image", emergencyHide:false, isImage:true, isAlbum: false, isSearch: false, url:url,  image: imgNumber, matcharray: m, links: linkarray, data: dataarray};
		}
		if (url == "/settings"){
			return {type:"settings", emergencyHide:false, isImage:false, isAlbum: false, isSearch: false, url:url};
		}
		if (url == "/search"){
			return {type:"search", emergencyHide:false, isImage:false, isAlbum: false, isSearch: true, url:url};
		}
		submitUnhandledUrl(url);
		return {type:"error", emergencyHide:false, message:"No matching page found.", isImage:false, isAlbum: false, isSearch: false, url:url};
}
function pageTypeAssert(p) {
	if (
		assertIsDefined(p, "type") &&
		assertIsDefined(p, "emergencyHide") &&
		assertIsDefined(p, "isImage") &&
		assertIsDefined(p, "isAlbum") &&
		assertIsDefined(p, "isSearch") &&
		assertIsDefined(p, "url") &&
		//assertIsDefined(p, "") &&
		true //to be able to copy&paste the lines still ending with '&&'.
	) {
		//everything ok
	}else{
		throw new Error("Error in Page type, has undefined value.");
	}
		
}
function assertIsDefined(variable, name) {
	if (variable[name] == undefined){
		showWarning('Derpiscript Error: Variable has illegal undefined property "' + name + '"');
		console.error('Variable has illegal undefined property "' + name + '".\n', variable);
		console.error(variable);
		return false;
	}
	return true;
}
function submitUnhandledUrl(url){
	var err_message = "ERROR:\n" 
		+ "Unhandled page found: \"" + url + "\",\n"
		+ "Current URL: \"" + location.href  + "\"\n"
		+ "Please mail this text to derpiscript@flutterb.at (with the subject \"#UnhandledUrl\" in your email)";
	showWarning(err_message);
}
function showWarning(err_message){	
	//TODO: Gui instead of alert.
	var warning_elem = document.createElement('a');
	warning_elem.style.color = "#FFFFFF";
	warning_elem.style.backgroundColor = "#FF0000";
	warning_elem.style.cursor = "pointer";
	warning_elem.errormessage = err_message;
	
	warning_elem.innerHTML = "!";
	var userboxes = _("userbox");
	var userbox = userboxes[0];
	warning_elem.addEventListener("click", function(evt){
		console.log("laalalal");
		alert(evt.target.errormessage);
		
	}, false);
	userbox.appendChild(warning_elem);
	
}
function getPageEnding(url){
		url = url.replace(/^.*\/\/[^\/]+/, '');
		return url;
}
function createElementFromHTML(html){
	var div = document.createElement('div');
	div.innerHTML = html;
	return div.firstChild;
}
function checkIfDownloaded(pictureNumberAsString){
	downloadedPictures = GM_getValue('downloadedPictures',downloadedPictures);
	return ( downloadedPictures.indexOf("|" + pictureNumberAsString + "|") != 1 ) ;
}
/**
 * @returns false if already in list.
 * Else it adds the image and returns true.
 */
function appendDownloaded(pictureNumberAsString){
	downloadedPictures = GM_getValue('downloadedPictures',downloadedPictures);
	if (downloadedPictures.indexOf("|" + pictureNumberAsString + "|") != 1 ) { //already added...
		return false;
	} else { //if image is not downloaded.
		downloadedPictures = downloadedPictures + pictureNumberAsString + "|";
		GM_setValue('downloadedPictures',downloadedPictures);
		return true;
	}
}
function removeDownloaded(pictureNumberAsString){
	
}

// Library:
// Libraries:
// Libraries:
// Libraries:

// http://stackoverflow.com/a/21903119
// Get url parameter jquery
// Be careful, ; is a legal delimeter which this doesn't account for.
function getUrlParameter(sParam)
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) 
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) 
        {
            return sParameterName[1];
        }
    }
}

//TODO: support "beta" 
//  http://stackoverflow.com/a/6832721
/**
 * Compares two software version numbers (e.g. "1.7.1" or "1.2b").
 *
 * This function was born in http://stackoverflow.com/a/6832721.
 *
 * @param {string} v1 The first version to be compared.
 * @param {string} v2 The second version to be compared.
 * @param {object} [options] Optional flags that affect comparison behavior:
 * <ul>
 *     <li>
 *         <tt>lexicographical: true</tt> compares each part of the version strings lexicographically instead of
 *         naturally; this allows suffixes such as "b" or "dev" but will cause "1.10" to be considered smaller than
 *         "1.2".
 *     </li>
 *     <li>
 *         <tt>zeroExtend: true</tt> changes the result if one version string has less parts than the other. In
 *         this case the shorter string will be padded with "zero" parts instead of being considered smaller.
 *     </li>
 * </ul>
 * @returns {number|NaN}
 * <ul>
 *    <li>0 if the versions are equal</li>
 *    <li>a negative integer if v1 < v2</li>
 *    <li>a positive integer if v1 > v2</li>
 *    <li>NaN if either version string is in the wrong format</li>
 * </ul>
 *
 * @copyright by Jon Papaioannou (["john", "papaioannou"].join(".") + "@gmail.com")
 * @license This function is in the public domain. Do what you want with it, no strings attached.
 */
function versionCompare(v1, v2, options) {
    var lexicographical = options && options.lexicographical,
        zeroExtend = options && options.zeroExtend,
        v1parts = v1.split('.'),
        v2parts = v2.split('.');

    function isValidPart(x) {
        return (lexicographical ? /^\d+[A-Za-z]*$/ : /^\d+$/).test(x);
    }

    if (!v1parts.every(isValidPart) || !v2parts.every(isValidPart)) {
        return NaN;
    }

    if (zeroExtend) {
        while (v1parts.length < v2parts.length) v1parts.push("0");
        while (v2parts.length < v1parts.length) v2parts.push("0");
    }

    if (!lexicographical) {
        v1parts = v1parts.map(Number);
        v2parts = v2parts.map(Number);
    }

    for (var i = 0; i < v1parts.length; ++i) {
        if (v2parts.length == i) {
            return 1;
        }

        if (v1parts[i] == v2parts[i]) {
            continue;
        }
        else if (v1parts[i] > v2parts[i]) {
            return 1;
        }
        else {
            return -1;
        }
    }

    if (v1parts.length != v2parts.length) {
        return -1;
    }

    return 0;
}
/*
 * getStyleObject Plugin for jQuery JavaScript Library
 * http://stackoverflow.com/a/6416477
 */
function getStyleObject(element){
	var dom = element.get(0);
	var style;
	var returns = {};
	if(window.getComputedStyle){
		var camelize = function(a,b){
			return b.toUpperCase();
		}
		style = window.getComputedStyle(dom, null);
		for(var i=0;i<style.length;i++){
			var prop = style[i];
			var camel = prop.replace(/\-([a-z])/g, camelize);
			var val = style.getPropertyValue(prop);
			returns[camel] = val;
		}
		return returns;
	}
	if(dom.currentStyle){
		style = dom.currentStyle;
		for(
		var prop in style){
			returns[prop] = style[prop];
		}
		return returns;
	}
	return this.css();
};
// http://james.padolsey.com/javascript/debug-jquery-events-with-listhandlers/
/*
// List all onclick handlers of all anchor elements:
$('a').listHandlers('onclick', console.info);
 
// List all handlers for all events of all elements:
$('*').listHandlers('*', console.info);
 
// Write a custom output function:
$('#whatever').listHandlers('click',function(element,data){
    $('body').prepend('<br />' + element.nodeName + ': <br /><pre>' + data + '<\/pre>');
*/
$.fn.listHandlers = function(events, outputFunction) {
    return this.each(function(i){
        var elem = this,
            dEvents = $(this).data('events');
        if (!dEvents) {return;}
        $.each(dEvents, function(name, handler){
            if((new RegExp('^(' + (events === '*' ? '.+' : events.replace(',','|').replace(/^on/i,'')) + ')$' ,'i')).test(name)) {
               $.each(handler, function(i,handler){
                   outputFunction(elem, '\n' + i + ': [' + name + '] : ' + handler );
               });
           }
        });
    });
};
//http://javascript.about.com/library/bldom08.htm
document.getElementsByClassName = function(cl) {
	var retnode = [];
	var myclass = new RegExp('\\b'+cl+'\\b');
	var elem = this.getElementsByTagName('*');
	for (var i = 0; i < elem.length; i++) {
		var classes = elem[i].className;
		if (myclass.test(classes)) retnode.push(elem[i]);
	}
	return retnode;
}; 
document.getElementsByTitle = function(cl) {
	var retnode = [];
	var myclass = new RegExp('\\b'+cl+'\\b');
	var elem = this.getElementsByTagName('*');
	for (var i = 0; i < elem.length; i++) {
		var classes = elem[i].title;
		if (myclass.test(classes)) retnode.push(elem[i]);
	}
	return retnode;
};

document.getElementsByTag = function(tagname,tagvalue) {
	var retnode = [];
	var myclass = new RegExp('\\b'+ tagvalue +'\\b');
	var elem = this.getElementsByTagName('*');
	for (var i = 0; i < elem.length; i++) {
		var classes = elem[i].getAttribute(tagname);
		if (myclass.test(classes))
			retnode.push(elem[i]);
	}
	return retnode;
}; 
// http://24ways.org/2010/calculating-color-contrast/
function getContrastYIQ(hexcolor){
    if(hexcolor == null){
		console.trace();
	}
	hexcolor = prepareColor(hexcolor);
	if(hexcolor == null){
		console.trace();
	}
	var r = parseInt(hexcolor.substr(0,2),16);
	var g = parseInt(hexcolor.substr(2,2),16);
	var b = parseInt(hexcolor.substr(4,2),16);
	var yiq = ((r*299)+(g*587)+(b*114))/1000;
	return (yiq >= 128);
}
function getContrastYIQ_BW(color){
	return (getContrastYIQ(color) ? "#000000" : "#FFFFFF");
}

// http://flutterb.at
function prepareColor(colorstring){
	if(colorstring == null){
		console.trace();
		colorstring == "#FF0066";
	}
	colorstring = colorstring.substring(colorstring.indexOf("#")+1, colorstring.length);
	if(colorstring.length == 3){
		var temp  = colorstring.charAt(0) + colorstring.charAt(0);
		    temp += colorstring.charAt(1) + colorstring.charAt(1);
		    temp += colorstring.charAt(2) + colorstring.charAt(2);	
		colorstring = temp;
	}
	return colorstring;
}

//based on http://onetarek.com/javascript-and-jquery/how-to-add-or-remove-a-class-using-raw-javascript-and-jquery/
function addClass(obj,classname){
    if(oldClassName == undefined || oldClassName.trim() == ""){
        obj.className = classname;
    }else{
        var oldClassName = obj.className;
        oldClassName = oldClassName.replace(classname,"") // first  remove the class name if that already exists
        oldClassName = oldClassName.trim();               // second remove whitespaces at beginning/end
        oldClassName = oldClassName.replace(/\s+/g, ' '); // third  remove multiple Whitespaces
        oldClassName = oldClassName + " " + myClassName;  // fourth append the new class
        obj.className = oldClassName;                     // fiveth set the changed class
    }
}
// http://stackoverflow.com/questions/1507931/generate-lighter-darker-color-in-css-using-javascript/1507987#1507987
function removeClass(obj,classname){
    if(oldClassName != undefined && oldClassName.trim() == ""){
        var oldClassName = obj.className;
        oldClassName = oldClassName.replace(classname,"") // first  remove the class name if that already exists
        oldClassName = oldClassName.trim();               // second remove whitespaces at beginning/end
        oldClassName = oldClassName.replace(/\s+/g, ' '); // third  remove multiple Whitespaces
        obj.className = oldClassName;                     // fourth set the changed class
    }
}


function pad(num, totalChars) {
    var pad = '0';
    num = num + '';
    while (num.length < totalChars) {
        num = pad + num;
    }
    return num;
};

// Ratio is between 0 and 1
function changeColor(color, ratio, darker) {
    // Trim trailing/leading whitespace
    color = color.replace(/^\s*|\s*$/, '');

    // Expand three-digit hex
    color = color.replace(
        /^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i,
        '#$1$1$2$2$3$3'
    );

    // Calculate ratio
    var difference = Math.round(ratio * 256) * (darker ? -1 : 1),
        // Determine if input is RGB(A)
        rgb = color.match(new RegExp('^rgba?\\(\\s*' +
            '(\\d|[1-9]\\d|1\\d{2}|2[0-4][0-9]|25[0-5])' +
            '\\s*,\\s*' +
            '(\\d|[1-9]\\d|1\\d{2}|2[0-4][0-9]|25[0-5])' +
            '\\s*,\\s*' +
            '(\\d|[1-9]\\d|1\\d{2}|2[0-4][0-9]|25[0-5])' +
            '(?:\\s*,\\s*' +
            '(0|1|0?\\.\\d+))?' +
            '\\s*\\)$'
        , 'i')),
        alpha = !!rgb && rgb[4] != null ? rgb[4] : null,

        // Convert hex to decimal
        decimal = !!rgb? [rgb[1], rgb[2], rgb[3]] : color.replace(
            /^#?([a-f0-9][a-f0-9])([a-f0-9][a-f0-9])([a-f0-9][a-f0-9])/i,
            function() {
                return parseInt(arguments[1], 16) + ',' +
                    parseInt(arguments[2], 16) + ',' +
                    parseInt(arguments[3], 16);
            }
        ).split(/,/),
        returnValue;

    // Return RGB(A)
    return !!rgb ?
        'rgb' + (alpha !== null ? 'a' : '') + '(' +
            Math[darker ? 'max' : 'min'](
                parseInt(decimal[0], 10) + difference, darker ? 0 : 255
            ) + ', ' +
            Math[darker ? 'max' : 'min'](
                parseInt(decimal[1], 10) + difference, darker ? 0 : 255
            ) + ', ' +
            Math[darker ? 'max' : 'min'](
                parseInt(decimal[2], 10) + difference, darker ? 0 : 255
            ) +
            (alpha !== null ? ', ' + alpha : '') +
            ')' :
        // Return hex
        [
            '#',
            pad(Math[darker ? 'max' : 'min'](
                parseInt(decimal[0], 10) + difference, darker ? 0 : 255
            ).toString(16), 2),
            pad(Math[darker ? 'max' : 'min'](
                parseInt(decimal[1], 10) + difference, darker ? 0 : 255
            ).toString(16), 2),
            pad(Math[darker ? 'max' : 'min'](
                parseInt(decimal[2], 10) + difference, darker ? 0 : 255
            ).toString(16), 2)
        ].join('');
};
function lighterColor(color, ratio) {
    return changeColor(color, ratio, false);
};
function darkerColor(color, ratio) {
    return changeColor(color, ratio, true);
};
// http://stackoverflow.com/questions/10193294/how-can-i-tell-if-a-browser-supports-input-type-date#comment28536897_10199306
function supportsColorInput() {
    	var el = document.createElement('input'),
     			 notADateValue = 'not-a-date';
     	el.setAttribute('type','date'); el.setAttribute('value', notADateValue);
     	return !(el.value === notADateValue);
}

function checkColor1() {
	console.log(checkColor($_("element_style_bgcolor_colorpicker").value));
}

function checkColor(color){
	var d = document.createElement("div");
	d.style.color = color;
	d.style.display="none";
	document.body.appendChild(d)
	var colorInRGB = window.getComputedStyle(d).color;
	document.body.removeChild(d);
	var hexChars = '0123456789ABCDEF';
	var rgb = colorInRGB.match(/\d+/g);
	var r = parseInt(rgb[0]).toString(16);
	var g = parseInt(rgb[1]).toString(16);
	var b = parseInt(rgb[2]).toString(16);
	var hex = '#' + r + g + b;
	return hex;
}






function show_img(imgUrl){
	img_div = $id("derpiscript-img-div");
	img_status = $id("derpiscript-img-status");
	img_img = $id("derpiscript-img-img");
	all_ = $id("derpiscript-img-overlay-content");
 	img_status.innerHTML ='loading...';
 	img_status.style.display='block';
 	img_img.style.display='none';
 	img_div.style.display='block';
 	scrollTo(0,0);
 	img_img.src=imgUrl;
 	img_img.addEventListener("load" , final_img);
 	/*if(loaded){
 	 	all_.style.display='none';
	}else{*/
	all_.style.visibility='collapse';
 		/*loaded=true;
 	}*/


}
/*
function show_img(imgUrl){
	img_div = $id("derpiscript-img-div");
	img_status = $id("derpiscript-img-status");
	img_img = $id("derpiscript-img-img");
	all_ = $id("derpiscript-img-overlay-content");

 	img_status.innerHTML ='loading...';
 	img_status.style.display='block';
 	img_img.style.display='none';
 	img_div.style.display='block';
 	scrollTo(0,0);
 	//GM_setValue("current_luscious_mode", 2);
 	current_mode = 2;
 	img_img.src=imgUrl;
 	img_img.addEventListener("load" , final_img);
 	if(loaded){
 	 	all_.style.display='none';
	}else{
 		all_.style.visibility='collapse';
 		loaded=true;
 	}
}
*/
var pron=false;
/**
 * Function to hide everything, in case you get catched.
 **/
function prono(){
	if (!pron){
		img_cover = $id("derpiscript-img-cover");
		img_div = $id("derpiscript-img-div");

		img_cover = $id("derpiscript-img-cover");
		img_cover.innerHTML ='Loading...';
		img_cover.style.color ='black';
		img_cover.style.backgroundColor ='white';
		img_cover.style.display='block';
		img_cover.style.width='10000em';
		img_cover.style.heigth='10000em';
		img_cover.style.height='10000em';
		img_div.style.display='block';
		scrollTo(0,0);
		pron=true;
	} else {
		pronor();
    }
 	//GM_setValue("current_luscious_mode", 2);
 
 	
}
/**
 * Function to show everything, the opposite of hiding (and the prono(); function) .
 **/
function pronor(){
	img_cover = $id("derpiscript-img-cover");
	img_cover.style.display='none';
	window.scrollTo(0,0);
	pron=false;
}
function hide_img(){
	img_div = $id("derpiscript-img-div");
	img_img = $id("derpiscript-img-img");
	all_ = $id("derpiscript-img-overlay-content");
	
	img_img.src='';
	img_img.style.display='';
	img_div.style.display='none';
	all_.style.display='block';
	all_.style.visibility='visible';
	window.scrollTo(0,0);
	//GM_setValue("current_luscious_mode", 1);
	current_mode = 1;
}
function final_img(){
	img_status = $id("derpiscript-img-status");
	img_img = $id("derpiscript-img-img");


	img_img.style.display='block';
	img_status.innerHTML ='-';
	img_status.style.display='none';
	scrollTo(0,0);
}

function img_goto(symbl){
	if(symbl=='#'){ //zoom
		console.log("page.emergencyHide: " + page.emergencyHide + ", page.overlaymode: " + page.overlaymode);
		showWarning("tast");
		if (!page.emergencyHide && page.overlaymode == 0){
			if(page.isImage) {
				show_img(page.links.img_full); 
			}else{
				showWarning("Page is not image, no fullscreen.");
			}
			
		}else if (page.emergencyHide || page.overlaymode == 1){ //TODO: does this var exist?
			hide_img(); 
		}
		return;
	}
	if(symbl=="+"){
		location.href=page.links.page_next;
	}else if(symbl=='-'){
		location.href=page.links.page_prev;
	}else if(symbl=='r'){
		location.href=page.links.page_rand;
	}
}


pron=false;
var metasection_offset = findScrollPos(_("metasection")[0]);
















function bookmark(){
    //$("a:contains('Up')")[2].click();
    var clickEvent  = document.createEvent ("HTMLEvents");
    clickEvent.initEvent ("click", true, true);
    //alert($("span[id^='vote_up_']"));
    //$("input[id^='vote']").val('news here!');
    //$("span[id^='vote_up_']").dispatchEvent (clickEvent);
    //$("a[caption='Up']")[0].dispatchEvent (clickEvent);		
    var upvote_span = (gm_useVoteUp ? $(".vote_up_link")[0] : $(".fave_link")[0]); //depends on user settings for fave/vote
	if((gm_useVoteUp ? upvote_span.getAttribute("class").contains("voted_up") : upvote_span.getAttribute("class").contains("faved") )) { //if was not in db, but is voted
		//do nothing
		return;
	} //else (if is not in db, and is not voted)
	upvote_span.dispatchEvent (clickEvent);
	
	page.data.img_dl_frame.src=page.links.img_dl; //TODO: Check if null?
	
	return; //STOPS HERE!!
	
	//TODO: Implement usable.

	var is_already_voted = appendDownloaded();//implement with button, to force redownload.
    if(!is_already_voted){
		if((gm_useVoteUp ? upvote_span.getAttribute("class").contains("voted_up") : upvote_span.getAttribute("class").contains("faved") )) { //if was not in db, but is voted
			//do nothing
			return;
		} //else (if is not in db, and is not voted
        upvote_span.dispatchEvent (clickEvent);
        page.data.img_dl_frame.src=download_img_src;

    }
	
    
    return;
	
	//old function,
	//TODO: Remove
   $('div[id^="vote_"]').each(function(){
        if($(this).attr("caption")=="Up"){
            $(this).dispatchEvent (clickEvent)
	   }
	   alert($(this).attr("caption"));
    }
    );

    //$_("vote_frame").src=up_vote_page_href;
    return;
	//even older function,
	//TODO: Remove too.
    var marks=bookmark_getUrlList(false);
		var bookmark_text = GM_getValue("bookmarks");
		var can_add=true;
		for (var i = 0; i < marks.length; i++) {
		  var each = marks[i];
		  if(each == full_img_src){
		      can_add=false;
		      return;
		  }
		}
		bookmark_text+='[||]'+img_img.src;
		GM_setValue("bookmarks", bookmark_text);	
}
function bookmark_getUrlList(use_cached_list){
	if(use_cached_list && bookmark_list != null){
		return bookmark_list;
	}else{
		bookmark_list = GM_getValue("bookmarks").split("[||]");
		return bookmark_list;
	}
}
var bookmark_list = null;


//Everything for Button moving///////////////////////////////////////////////////////////////////////////////////////////////////////////////


// http://www.howtocreate.co.uk/tutorials/javascript/browserwindow
function getWindowSize() {
  var myWidth = 0, myHeight = 0;
  if( typeof( window.innerWidth ) == 'number' ) {
    //Non-IE
    myWidth = window.innerWidth;
    myHeight = window.innerHeight;
  } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
    //IE 6+ in 'standards compliant mode'
    myWidth = document.documentElement.clientWidth;
    myHeight = document.documentElement.clientHeight;
  } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
    //IE 4 compatible
    myWidth = document.body.clientWidth;
    myHeight = document.body.clientHeight;
  }
  return {w:myWidth,h:myHeight}
}
// http://www.howtocreate.co.uk/tutorials/javascript/browserwindow
function getScrollXY() {
  var scrOfX = 0, scrOfY = 0;
  if( typeof( window.pageYOffset ) == 'number' ) {
    //Netscape compliant
    scrOfY = window.pageYOffset;
    scrOfX = window.pageXOffset;
  } else if( document.body && ( document.body.scrollLeft || document.body.scrollTop ) ) {
    //DOM compliant
    scrOfY = document.body.scrollTop;
    scrOfX = document.body.scrollLeft;
  } else if( document.documentElement && ( document.documentElement.scrollLeft || document.documentElement.scrollTop ) ) {
    //IE6 standards compliant mode
    scrOfY = document.documentElement.scrollTop;
    scrOfX = document.documentElement.scrollLeft;
  }
  return {x: scrOfX, y:scrOfY };
}


//http://cgd.io/2008/using-javascript-to-scroll-to-a-specific-elementobject/
//Finds y value of given object
function findScrollPos(obj) {
	var curtop = 0;
	if (obj.offsetParent) {
		do {
			curtop += obj.offsetTop;
		} while (obj = obj.offsetParent);
	return [curtop];
	}
}


//own stuff
//own stuff
//own stuff
//own stuff
//own stuff.








function scrollToPic(){
	var isHidden = (document.getElementsByClassName("image-hidden image-warning")[0].style.display=="block");
	var isSpoilerd = (document.getElementsByClassName("image-spoilered image-warning")[0].style.display=="block");
	//if(isHidden||isSpoilerd){alert(isHidden+"|"+isSpoilerd);}
	//scrollToElem($_("image_display"));
	//scrollToElem(_("image-hidden image-warning")[0]);
	//scrollToElem(_("image-spoilered image-warning")[0]);
	//alert(findScrollPos($_("image_display")) + " | " + findScrollPos(_("image-hidden image-warning")[0]) + " | " + findScrollPos(_("image-spoilered image-warning")[0]) + " |=(-)=| " + (findScrollPos($_("image_display")) || findScrollPos(_("image-hidden image-warning")[0]) || findScrollPos(_("image-spoilered image-warning")[0])));
	window.scroll(0,(findScrollPos($_("image_display")) || findScrollPos(_("image-hidden image-warning")[0]) || findScrollPos(_("image-spoilered image-warning")[0])));
	checkButtonPos(0);


}

function setBigButtonPos(button,number,mode){
	if(mode) button.style.width = "25px";
	//button.style.height = "50px";
	//button.style.textAlign = "center";
	//button.style.verticalAlign="middle";
	//button.style.backgroundColor = "#dfd";
	//button.style.color = "black";
	//button.style.position = "fixed";
	//button.style.top = "10px";
	button.style.left = (10 + 60*number) + "px";
}
function setBigButtonPos(button,number){
	//button.style.width = "50px";
	//button.style.height = "50px";
	//button.style.textAlign = "center";
	//button.style.verticalAlign="middle";
	//button.style.backgroundColor = "#dfd";
	//button.style.color = "black";
	//button.style.position = "fixed";
	//button.style.top = "10px";
	button.style.left = (10 + 60*number) + "px";
}

function checkButtonPos(y){
    if( (gm_buttonMoveMode != 2 && gm_buttonMoveMode != 3) || gm_buttonPositionMode == 2) { //stay on top
        return;
    }
	var button = $_("hoverboxthingie");
	var h = getWindowSize().h;
	if(gm_buttonPositionMode == 3) {
		var transform = "translateY(" + (h-60) + "px)";
		button.style.position = "fixed";
		button.style.webkitTransform = transform;
		button.style.MozTransform = transform;
		button.style.transform = transform;
	}else{
		var scroll = getScrollXY().y;
		var buttons_stops = gm_buttonMoveMode == 3; //3 = Laptop Mode 2
		var transform = "translateY(" + (y < h/2 ? ((scroll-metasection_offset>0+30)||(!buttons_stops) ?0:metasection_offset-scroll+30) : h-60) + "px)";
		button.style.position = "fixed";
		button.style.webkitTransform = transform;
		button.style.MozTransform = transform;
		button.style.transform = transform;
	}
}
function applyStyle(css, id){
	var style = document.getElementById("derpiscript_style_" + id);
	if (style || document.getElementById("derpiscript_style_" + id)){
		style = document.getElementById("derpiscript_style_" + id);
	}else{
		style=document.createElement('style');
		style.id = "derpiscript_style_" + id;
		document.getElementsByTagName('head')[0].appendChild(style);
	}
	if (style.styleSheet){
		style.styleSheet.cssText=css;
	}else{ 
		style.appendChild(document.createTextNode(css));
	}
}

function create_page_album(){
	var css = "\
	div.image.voted_up.faved { \
		outline: 2px dashed #67AF2B; \
		box-shadow: 0 0 0 2px #C4B246; \
	} \
	div.image.voted_down.faved { \
		outline: 2px dashed #CF0001; \
		box-shadow: 0 0 0 2px #C4B246; \
	} \
	div.image.voted_up { \
		outline: 2px solid #67AF2B; \
	} \
	div.image.voted_down { \
		outline: 2px solid #CF0001; \
	} \
	div.image.faved { \
		outline: 2px solid #C4B246; \
	} \
	 \
	";
	applyStyle(css, "album");
	
	waitForKeyElements ("div.imageinfo span a.vote_down_link.voted_down", page_album_highlighter, false);
	waitForKeyElements ("div.imageinfo span a.vote_up_link.voted_up", page_album_highlighter, false);
	waitForKeyElements ("div.imageinfo span a.fave_link.faved", page_album_highlighter, false);
	/*$(".imageinfo a.vote_up_link.voted_up").parents('div.image').addClass("voted_up");
	$("div.imageinfo span a.vote_up_link.voted_up").parents('div.image').addClass("voted_up");
	console.log($("div.image div.imageinfo span a.voted_up"));
	$(".imageinfo a.fave_link.faved").parents('div.image').addClass("faved");*/	
}
function page_album_highlighter(jNode){
	console.log(jNode);
	var parents = jNode.parents('div.image');
	if(jNode.hasClass("faved")) {
		parents.addClass("faved");
	} else {
		parents.removeClass("faved");
	}
	if(jNode.hasClass("voted_up")) {
		parents.addClass("voted_up");
	} else {
		parents.removeClass("voted_up");
	}
	if(jNode.hasClass("voted_down")) {
		parents.addClass("voted_down");
	} else {
		parents.removeClass("voted_down");
	}
}

function create_search_addons(){
	//TODO settings, if enabled.
	var form = $("div.searchbox form");
	var buttons = {
		faves:   {obj: null, input: null, name: "faves",   on: "only", off:"not", undef:"", text:'<i class="fa fa-fw fa-star"></i>',     tooltip:"Faves"         },
		votes:   {obj: null, input: null, name: "upvotes", on: "only", off:"not", undef:"", text:'<i class="fa fa-fw fa-arrow-up"></i>', tooltip:"Upvotes"       },
		uploads: {obj: null, input: null, name: "uploads", on: "only", off:"not", undef:"", text:'<i class="fa fa-fw fa-upload"></i>',   tooltip:"Uploads"       },
		watched: {obj: null, input: null, name: "watched", on: "only", off:"not", undef:"", text:'<i class="fa fa-fw fa-eye"></i>',      tooltip: "Watched Tags" }
	}
	var submit = form.children("input:submit");
	var buttonStyle = getStyleObject(submit);
	var css = "\
		div.searchbox form .addon_button{ \
			color: " + buttonStyle.color + "; \
			background-color: " + buttonStyle.backgroundColor + "; \
			border-right: 1px solid #5673AB !important; \
			font-size: 10px;  \
			padding-left: 3px !important; \
			padding-right: 3px !important; \
		} \
		div.searchbox form .addon_button.only { \
			color:#264827 !important; \
			background-color:#57A559 !important; \
		} \
		div.searchbox form .addon_button.only:hover { \
			color:#57A559 !important; \
			background-color:#264827 !important; \
		} \
		div.searchbox form .addon_button.not { \
			color:#482627 !important; \
			background-color:#A55759 !important; \
		} \
		div.searchbox form .addon_button.not:hover { \
			color:#A55759 !important; \
			background-color:#482627 !important; \
		} \
		\
	";
	applyStyle(css, "search_addons");
	//TODO: expandable* with <i class="fa fa-bars"></i> button - *) enable in settings.
	$.each(buttons, function(unneeded, button) {
		button.obj = $('<a class="addon_button" name="' + button.name + '" title="' + button.tooltip + '">' + button.text + '</a>').insertBefore(form.children("input:submit"));
		button.input =  $('<input type="hidden" name="' + button.name + '" value="' + button.undef + '">').appendTo(form);
		form.append(button.input);
		button.obj.data("tooltip",button.tooltip);
		button.obj.data("name",button.name);
		button.obj.data("input",button.input);
		button.obj.data("storage","search_last_" + button.name);
		button.obj.attr("title", "Search " + button.tooltip + "?");
		
		
		//Toggle Functionality
		button.obj.toggleMode = function(mode,input) {
			btn = $( this );
			input = (typeof input === "undefined") ? 
				btn.parent().children("input:hidden[name='" + btn.data("name") + "']") /* if input not set, use this as default. */
			 : input;  // this still is a inline if
			btn.toggleClass("only", false);
			btn.toggleClass("not", false);
			btn.toggleClass(mode, true);
			input.attr("value", mode);
			GM_setValue(btn.data("storage"), mode);

			switch (mode) {
				case "not":
					btn.attr("title", "No " + btn.data("tooltip"));
					break;
				case "":
					btn.attr("title", "Search " + btn.data("tooltip") + "?");
					break;
				case "only":
					btn.attr("title", btn.data("tooltip") + " Only");
					break;
			}
		};
		button.obj.data("toggle", button.obj.toggleMode); // hack to make toggleMode available in onclick.
		
		//Default settings, on load
		//
		//Get settings from search query, this will override the defaults from the settings.
		if ((parameter_value = getUrlParameter(button.name))) {
			button.obj.toggleMode(parameter_value);
		} else {
			//If setting don't force something, use last value.
			if ((forced_value = GM_getValue("search_defaults_" + button.name, "last")) == "last") {
				//Use last one.
				button.obj.toggleMode(GM_getValue("search_last_" + button.name,""));
			} else {
				button.obj.toggleMode(forced_value);
			}
		}
					
		//Change on click, circle around the 3 modes("", "only", "not").
		button.obj.click( function(){
			var btn = $( this );
			var input = btn.parent().children("input:hidden[name='" + btn.data("name") + "']"); 
			btn.toggleMode = btn.data("toggle"); // hack to make toggleMode available here.
			if (btn.hasClass("only")){ //was on
				btn.toggleMode("not");
			} else if (btn.hasClass("not")){ //was off
				btn.toggleMode("");
			} else { //was default
				btn.toggleMode("only");
			}
		});
	});
	
}

function selectFromOptionList(id,value){
	var objs = $("#" + id + " option");
	objs.each(function() {
		$(this).prop("selected", $(this).val() == value);
	})
}
function setOptionToGM(name, defaultValue) {
	selectFromOptionList("script_" + name, GM_getValue(name, defaultValue));
}
function create_page_settings(){
	//TODO: is all this #settingsbody stuff still neaded?
	var css = "\
	#settingsbody {                                                               \n\
		margin: 0px auto;                                                         \n\
		padding: 1em;                                                             \n\
		text-align: center;                                                       \n\
	}                                                                             \n\
	#settingsbox{                                                                 \n\
		background-color:white;                                                   \n\
		color:black;                                                              \n\
		box-shadow: 0px 0px 40px rgb(33, 33, 33);                                 \n\
		padding: 1em;                                                             \n\
		///margin: auto !important;                                               \n\
		//width: auto;                                                            \n\
		//height: auto;                                                           \n\
		//width: 740px;                                                           \n\
		display:inline-block;                                                     \n\
		//float:left;                                                             \n\
		//overflow: auto;                                                         \n\
		text-align:left;                                                          \n\
		background-color: #ffffff;                                                \n\
		width: 400px;                                                             \n\
																				  \n\
	}                                                                             \n\
	#settingsbox * {                                                              \n\
		margin: 0;                                                                \n\
		padding: 0;                                                               \n\
		text-align: left;                                                         \n\
		line-height:1.5em;                                                        \n\
		display: inline-block;                                                    \n\
	}                                                                             \n\
	#settingsbox #settingsheader{															\n\
		width: 100%;             													\n\
	}                              													\n\
	#settingsbox .versionField{     														\n\
		text-decoration: underline;													\n\
	} \n\
	#settingsbox .version{     														\n\
		text-align: right;          												\n\
		width: 100%;             													\n\
		text-decoration: underline;													\n\
	}                              													\n\
																				  \n\
	#settingsbox label.description {                                              \n\
		border: medium none;                                                      \n\
		color: #222;                                                              \n\
		display: block;                                                           \n\
		font-size: 150%;                                                          \n\
		font-weight: 700;                                                         \n\
		///padding: 0px 0px 1px !important;                                       \n\
		font-family: \"Lucida Grande\",Tahoma,Arial,Verdana,sans-serif;           \n\
		font-size: small;                                                         \n\
	}                                                                             \n\
	#settingsbox input{                                                           \n\
		border: 1px solid #CDCDCD;                                                \n\
		background: #EEE;                                                         \n\
		background: none repeat scroll 0% 0% #EEE;                                \n\
	}                                                                             \n\
	#settingsbox input.checkbox,#settingsbox input.radio {                        \n\
		//display: block;                                                         \n\
		height: 13px;                                                             \n\
		line-height: 1.4em;                                                       \n\
		//margin: 7px 0px 1px 5px;                                                \n\
		width: 13px;                                                              \n\
	}                                                                             \n\
	#settingsbox label.choice {                                                   \n\
		color: #444;                                                              \n\
		//display: block;                                                         \n\
		display: inline-block;                                                    \n\
		font-size: small;                                                         \n\
		line-height: 1.4em;                                                       \n\
		//margin: -1.55em 0px 0px 25px;                                           \n\
		//padding: 4px 0px 5px !important;                                        \n\
		width: 90%;                                                               \n\
	}                                                                             \n\
	#settingsbox label {                                                          \n\
		font-family: \"Lucida Grande\",Tahoma,Arial,Verdana,sans-serif;           \n\
		text-align: left;                                                         \n\
		float: clear !important;                                                  \n\
		width:auto !important;                                                    \n\
		height:auto !important;                                                   \n\
	}                                                                             \n\
	#settingsbox .li,#settingsbox .ul{                                              \n\
		//padding: 0px;                                                           \n\
		///padding:4px 5px 2px 2px;                                               \n\
		list-style-type: none;                                                    \n\
		margin: 0px;                                                              \n\
		padding: 0px;                                                             \n\
	}                                                                             \n\
	#settingsbox .li{                                                              \n\
		margin-top: 1em;                                                          \n\
	}                                                                             \n\
	#settingsbox .li:first-child{                                                  \n\
		margin-top: 0;                                                            \n\
	}                                                                             \n\
	#settingsbox .li .grouper{                                                     \n\
		margin-left: 1em;                                                         \n\
	}                                                                             \n\
	#settingsbox .li .grouper label {                                              \n\
		margin-top: 0.5em;                                                        \n\
		display: block;                                                           \n\
	}                                                                             \n\
	#settingsbox .li .grouper .guidelines{                                         \n\
		margin-left: 2em;                                                       \n\
		display: block;                                                           \n\
	}                                                                             \n\
																				  \n\
	#settingsbox #li_dl p {                                                        \n\
		///padding:4px 0px 20px 30px;                                             \n\
	}                                                                             \n\
	#settingsbox #li_move p {                                                        \n\
		///padding:4px 0px 2px 30px;                                              \n\
	}                                                                             \n\
	#settingsbox .li .description, #settingsbox #li_style .grouper{                                         \n\
		display: block;                                                           \n\
	}                                                                             \n\
																				  \n\
	#settingsbox input.button {                                                   \n\
		font-size: 100%;                                                          \n\
		///margin:20px 0px 0px 0px;                                               \n\
		border: 1px solid darkgray;                                               \n\
		padding: 5px;                                                             \n\
																				  \n\
	}                                                                             \n\
	#settingsbox input.button:hover, #settingsbox input[type=\"button\"]:hover {  \n\
		font-size: 100%;                                                          \n\
		///margin:20px 0px 0px 0px;                                               \n\
		border: 1px solid dark-gray;                                              \n\
		color: black;                                                             \n\
		   -webkit-box-shadow: inset 0 0 10px #000000;                            \n\
		   -moz-box-shadow: inset 0 0 10px #000000;                               \n\
				box-shadow: inset 0 0  5px darkgrey;                              \n\
	}                                                                             \n\
	#settingsbox .block {                                                         \n\
		display: block;                                                           \n\
	}                                                                             \n\
	#settingsbox .element_style_bgcolor_colorresult {                               \n\
		border: 1px solid darkgrey;                                               	\n\
		padding: 5px 10px 5px 10px;                                               	\n\
	}                                                                             	\n\
	#settingsbox .guidelines {                         \n\
		display: block;                           \n\
	}                                            \n\
	.non-label { \n\
		float: none;\n\
	}\n\
	input[type=\"radio\"]{\
		margin-top: 8px;\
		margin-left: 5px;\
	}\
	.colorresult {                               \n\
		border: 1px solid darkgrey;                                               	\n\
		padding: 5px 10px 5px 10px;                                               	\n\
	}                                                                             	\n\
	#script_version_field{     														\n\
		text-decoration: underline;													\n\
		cursor:pointer;																\n\
		cursor:hand;																\n\
	} \
	#tab_derpiscript .element  { \
		margin-top: 8px; \
		margin-left: 5px; \
	} \
	";
	applyStyle(css, "settings");
	
	//Settings
	var tabname = document.createElement('a');
	tabname.setAttribute('data-tab', 'tab_derpiscript');
	tabname.href = "#";
	tabname.id = "tab_derpiscript_header";
	tabname.innerHTML = "Derpiscript";
	$class("tabs").appendChild(tabname);
	
	newSettingsHTML = '\
	\
			<p> <strong>Derpiscript Settings</strong></p> \n\
			\
			\
			<div class="fieldlabel"> \n\
				<div id=\"script_version\" class=\"version\">Script Version: <span id=\"script_version_field\" class=\"versionField\">Error Displaying Version...</span></div></p> \n\
			</div> \n\
	\
			<p> <strong>Download</strong></p> \n\
			\
			\
			<div class="field"> \n\
				<label for="script_download_tagged">Tagged File name</label>\n\
				<input name="script[download_tagged]" value="1" type="hidden"><input checked="checked" id="script_download_tagged" name="user[download_tagged]" value="1" type="checkbox"> \n\
			</div> \n\
			<div class="fieldlabel"> \n\
				Set to <code>true</code> to use the full filename, e.g. "197941__safe_rainbow+dash_artist-colon-luckydonald.png"<br>Set to <code>false</code> to use the number only filename, e.g. "197941.png"<br>Default is <code>true</code>.  \n\
			</div> \n\
			\
			<div class="field"> \n\
				<label for="script_download_vote_enabled">Enable Vote-up on download</label> \n\
				<input name="script[download_vote_enabled]" value="0" type="hidden"><input checked="checked" id="script_download_vote_enabled" name="script[download_vote_enabled]" value="1" type="checkbox"> \n\
			</div> \n\
			<div class="fieldlabel"> \n\
				Set to <code>true</code> to enable the automatic like/fave when downloading the image.<br>Set to <code>false</code> to disable the automatic like/fave function.<br>Default is <code>true</code>. \n\
			</div> \n\
			\
			<div class="field"> \n\
				<label for="script_download_vote_fave">Fave, too.</label> \n\
				<input name="user[download_vote_fave]" value="0" type="hidden"><input checked="checked" id="script_download_vote_fave" name="user[download_vote_fave]" value="1" type="checkbox"> \n\
			</div> \n\
			<div class="fieldlabel"> \n\
				Set to <code>true</code> to automaticly Fave the image when downloading the image.<br>Set to <code>false</code> to automaticly Vote Up when downloading the image.<br>Default is <code>false</code>.   \n\
			</div> \n\
		\
			<p> <strong>EasyButtons Mode</strong></p> \n\
			\
			\
			<div class="field"> \n\
				<label for="script_buttons_mode_1">Disable</label> \n\
				<input id="script_buttons_mode_1" name="script_buttons_mode" class="element radio" value="1" type="radio" /> \n\
			</div> \n\
			<div class="fieldlabel"> \n\
				Disable Button moving. \n\
			</div> \n\
			\
			<div class="field"> \n\
				<label for="script_buttons_mode_2">Laptop Mode 1</label> \n\
				<input id="script_buttons_mode_2" name="script_buttons_mode" class="element radio" value="2" type="radio" /> \n\
			</div> \n\
			<div class="fieldlabel"> \n\
				Use the Laptop Mode, coming with little bigger buttons, which will be positioned fix in the upper/lower left corner (see position settings), and almost transparent uppon hover. <br>(default) \n\
			</div> \n\
			\
			<div class="field"> \n\
				<label for="script_buttons_mode_3">Laptop Mode 2</label> \n\
				<input id="script_buttons_mode_3" name="script_buttons_mode" class="element radio" value="3" type="radio" /> \n\
			</div> \n\
			<div class="fieldlabel"> \n\
				Laptop Mode, like above, but the buttons will not move higher then the picture beginning. \n\
			</div> \n\
		\
			<p> <strong>EasyButtons Position</strong></p> \n\
			\
			\
			<div class="field"> \n\
				<label for="script_buttons_position_1"> Automatic</label> \n\
				<input id="script_buttons_position_1" name="script_buttons_position" class="element radio" value="1" type="radio" /> \n\
			</div> \n\
			<div class="fieldlabel"> \n\
				Button will positioned either top or bottom, depending on the mouse position. <br>(Default)\n\
			</div> \n\
			\
			<div class="field"> \n\
				<label for="script_buttons_position_2">Top</label> \n\
				<input id="script_buttons_position_2" name="script_buttons_position" class="element radio" value="2" type="radio" /> \n\
			</div> \n\
			<div class="fieldlabel"> \n\
				Buttons will be positioned fix in the upper left corner. \n\
			</div> \n\
			\
			<div class="field"> \n\
				<label for="script_buttons_position_3">Bottom</label> \n\
				<input id="script_buttons_position_3" name="script_buttons_position" class="element radio" value="3" type="radio" /> \n\
			</div> \n\
			<div class="fieldlabel"> \n\
				LaptopButtons will be positioned fix in the lower left corner. \n\
			</div> \n\
		\
			<p> <strong>Better Search</strong></p> \n\
			\
			\
			<div class="field"> \n\
				<label for="script_search_enabled">Enable</label> \n\
				<input id="script_search_enabled" name="script_search_enabled" class="element checkbox" value="#FFFFFF" type="checkbox" /> \n\
				</div> \n\
				<div class="fieldlabel"> \n\
					The search bar will have toogles to filter the results of your query with your faves, upvotes, uploads and watched images. You will toggle between only searching images with this attributes (green), without them (red) or ignoring it (no color).<br>\n\
					Default is <code>true</code>. \n\
				</div> \n\
			</div> \n\
			\
			<div class="field"> \n\
				<label for="script_search_defaults_faves">Default Faves</label> \n\
				<select id="script_search_defaults_faves" name="script_search_defaults_faves" class="element select">\
					<option selected="selected" value="last">Last value</option> \
					<option value="">All results</option> \
					<option value="only">Faves Only</option> \
					<option value="not">No Faves</option></select> \
				</div> \n\
			</div> \n\
			\
			<div class="field"> \n\
				<label for="script_search_defaults_upvotes">Default Upvotes</label> \n\
				<select id="script_search_defaults_upvotes" name="script_search_defaults_upvotes" class="element select">\				<option selected="selected" value="last">Last value</option> \
					<option value="">All results</option> \
					<option value="only">Upvotes Only</option> \
					<option value="not">No Upvotes</option></select> \
				</div> \n\
			</div> \n\
			\
			<div class="field"> \n\
				<label for="script_search_defaults_uploads">Default Uploads</label> \n\
				<select id="script_search_defaults_uploads" name="script_search_defaults_uploads" class="element select">\
					<option selected="selected" value="last">Last value</option> \
					<option value="">All results</option> \
					<option value="only">Uploads Only</option> \
					<option value="not">No Uploads</option></select> \
				</div> \n\
			</div> \n\
			\
			<div class="field"> \n\
				<label for="script_search_defaults_watched">Default Watched</label> \n\
				<select id="script_search_defaults_watched" name="script_search_defaults_watched" class="element select">\
					<option selected="selected" value="last">Last value</option> \
					<option value="">All results</option> \
					<option value="only">Watched Only</option> \
					<option value="not">No Watched</option></select> \
				</div> \n\
			</div> \n\
			\
			<div class="fieldlabel"> \n\
				<code>Last value</code> to use the value you used last time.<br />\n\
				<code>All results</code> to not filter anything per default.<br />\n\
				<code>x Only</code> to search for images with this attribute.<br />\n\
				<code>No x</code> to exclude images with have this attribute.<br />\n\
				Default is <code>Last value</code>. \n\
			</div> \n\
			\
			\
	\
			<p> <strong>Syles</strong></p> \n\
			\
			\
			<div class="field"> \n\
				<label for="script_styles_color_bg">Background Color</label> \n\
				<input id="script_styles_color_bg" name="script_styles_color_bg" class="element colorpicker" value="#FFFFFF" type="color" /> \n\
				<span class="colorresult" id="script_styles_color_bg_result">#4d4d4d</span>\
			</div> \n\
			<div class="fieldlabel"> \n\
				 Set the backgrund color. <br> Default is <code>#FFFFFF</code>, but my recommendation is <code>#777777</code>.\n\
			</div> \n\
			\
			<div class="field"> \n\
				<label for="script_styles_color_link">Background Color</label> \n\
				<input id="script_styles_color_link" name="script_styles_color_link" class="element colorpicker" value="#FFFFFF" type="color" /> \n\
				<span class="colorresult" id="script_styles_color_link_result">#4d4d4d</span>\
			</div> \n\
			<div class="fieldlabel"> \n\
				Set the link color. <br> Default is <code>#57A4DB</code>. \n\
			</div> \n\
			\
			<div class="field"> \
				<label for="script_styles_hide_ads">Hide Advertisements</label> \
				<input id="script_styles_hide_ads" value="0" type="checkbox"> \
			</div> \n\
			<div class="fieldlabel"> \n\
				Set to <code>true</code>  to hide ads.<br>Set to <code>false</code> show them. <br />Default is <code>true</code>. \
			</div> \
			\
			<div class="field"> \
				<label for="script_styles_tag_colors">Missing Tag Colors</label> \
				<input id="script_styles_tag_colors" value="1" type="checkbox"> \
			</div> \n\
			<div class="fieldlabel"> \n\
				Adds color to watched, spoilered, hidden tags, to be distinguishable. <br><code>On</code> by Default. \
			</div> \
			\
			<div class="field"> \
				<label for="script_save_reset"> </label> \
				<input type=\"button\" id=\"script_save_reset\" class=\"element reset button\" value=\"Reset\"/> \
			</div> \
			<div class="fieldlabel"> \
				<p id=\"script_save_success\" class=\"\"></p>  \
			</div> \
	\
	';
	var tabContent = document.createElement("div");
	tabContent.setAttribute('class','tab');
	tabContent.setAttribute('id','tab_derpiscript');
	tabContent.setAttribute('style','display: none;');
	tabContent.innerHTML = newSettingsHTML;
	$id("settingstable").appendChild(tabContent);
	//script to use tabs correctly modified from derpibooru
	$('#settingstable .tabs #tab_derpiscript_header').click(function(){
		$('#settingstable .tabs a').removeClass('selected');
		$(this).addClass('selected');
		$('#settingstable .tab').hide();
		$('#settingstable #tab_derpiscript').show();
		return false;
	});
	//end from derpibooru
	
	$id("script_version_field").innerHTML = scriptVersion; 
	var resetElem = $id("script_save_reset");
	var successfield =  $id("script_save_success");
	successfield.style.display = "hidden";
	versionbutton = $id("script_version");
	versionbutton.addEventListener('click', showChangelog, false);
	$(":submit").click(function(event) {
		if(!$('#settingstable .tabs #tab_derpiscript_header').hasClass('selected')){
			return true;
		}
		event.preventDefault(); // cancel default behavior
		saveoptions();
		return false;
	});
	resetElem.addEventListener('click', resetoptions, false);


	// Setting the init values for the Settings.

	$id("script_download_tagged").checked = !GM_getValue('useRawFile',d_useRawFile);
	$id("script_download_vote_enabled").checked = GM_getValue('rateOnDownload', d_rateOnDownload);
	$id("script_download_vote_fave").checked=!GM_getValue('useVoteUp', d_useVoteUp);

	theButtonMode = GM_getValue('buttonMoveMode',d_buttonPositionMode);
	var buttonMoveModes = document.getElementsByName("script_buttons_mode");
	for(var i = 0; i<buttonMoveModes.length; i++){
		buttonMoveModes[i].checked = (buttonMoveModes[i].value==theButtonMode); //buttonMoveMode
	}

	thePosMode = GM_getValue('buttonPositionMode',d_buttonPositionMode);
	var buttonPosModes = document.getElementsByName("script_buttons_position");
	for(var i = 0; i<buttonPosModes.length; i++){
		buttonPosModes[i].checked = (buttonPosModes[i].value==thePosMode); //buttonMoveMode
	}
	
	bgColor = GM_getValue('backgroundColor',d_backgroundColor);
	linkColor = GM_getValue('linkColor',d_linkColor);
	contrastBgColor = getContrastYIQ_BW(bgColor);
	setPickerColor("script_styles_color_bg", bgColor);
	setPickerColor("script_styles_color_link", linkColor);
	$id("script_styles_hide_ads").checked = GM_getValue('hideAds',d_hideAds);
	$id("script_styles_tag_colors").checked = GM_getValue('tagColors',d_tagColors);
	$id("script_search_enabled").checked = GM_getValue('search_enabled',d_search_enabled);
	
	setOptionToGM("search_defaults_faves",   d_search_defaults_faves);
	setOptionToGM("search_defaults_upvotes", d_search_defaults_uploads);
	setOptionToGM("search_defaults_uploads", d_search_defaults_upvotes);
	setOptionToGM("search_defaults_watched", d_search_defaults_watched);
	
	
	bgPicker = $id("script_styles_color_bg");
	bgPicker.addEventListener("input", function(){
		setColorOfResult("bg");
	}, false);

	linkPicker = $_("script_styles_color_link");
	linkPicker.addEventListener("input", function(){
		setColorOfResult("link");
	}, false);
	
	/*
	// Setting the init values to the database.
	//TODO:  Where does this happen?!?
	*/

}

function create_page_image(page){
	css = "";
	if(GM_getValue('buttonMoveMode') != 1) {
		css +='\
		#hoverboxthingie a {           \n\
			opacity:0.3;               \n\
			height: 20px;              \n\
			width: 50px;               \n\
			color: white;              \n\
			vertical-align: center;    \n\
			background-color: rgba(81, 158, 215, 0.3);\n\
			border: 1px solid #519ED7; \n\
		}                              \n\
		#hoverboxthingie:hover a{      \n\
			opacity:0.5;               \n\
			color: black;              \n\
			background-color: #519ED7; \n\
			border: 1px solid transparent;           \n\
		}                              \n\
		#hoverboxthingie a:hover{      \n\
			opacity:1;                 \n\
			background-color: #dfd;    \n\
		}                              \n\
		#hoverboxthingie {             \n\
			height: 20px;              \n\
			position: fixed;           \n\
			top: 10px;                 \n\
			left: 10px;                \n\
		}                                            \n\
		#hoverboxthingie span {                         \n\
			padding: 0;                            \n\
		}                                            \n\
		#hoverboxthingie, #hoverboxthingie a {       \n\
			-webkit-transition:all 0.3s ease-in-out; \n\
			   -moz-transition:all 0.3s ease-in-out; \n\
				 -o-transition:all 0.3s ease-in-out; \n\
					transition:all 0.3s ease-in-out; \n\
		}                                            \n\
		';
	}else{
		css+='\
		#hoverboxthingie span {                      \n\
			padding: 2px;                            \n\
		}                                            \n\
		';
	}
	css +='		                                         \n\
		                                         \n\
	#hoverboxthingie a {                         \n\
        width: 50px;                             \n\
		text-align: center;                      \n\
        padding: 2px;                            \n\
	}                                            \n\
	#imagespns{                        												\n\
		display: ' + (GM_getValue('hideAds')?'none':'block') + ';                   \n\
	}																				\n\
	';
	applyStyle(css,"hoverboxthingie");
	//get Links ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
	linkCollection = {img_full:"" ,img_dl:"",page_next:"", page_prev:"", page_rand:"", ready:false}; //Not needed:  ,vote_up:"",vote_down:"", vote_fave:""};

	linkCollection.page_next = document.getElementsByClassName("next")[0].getElementsByTagName('a')[0].href;
	// var next_img_page_href = document.getElementsByClassName("next")[0].getElementsByTagName('a')[0].href;
	linkCollection.page_prev = document.getElementsByClassName("prev")[0].getElementsByTagName('a')[0].href;
	// var last_img_page_href = document.getElementsByClassName("prev")[0].getElementsByTagName('a')[0].href;
	linkCollection.page_rand = document.getElementsByClassName("rand")[0].getElementsByTagName('a')[0].href;
	// var rand_img_page_href = document.getElementsByClassName("rand")[0].getElementsByTagName('a')[0].href;
	// var up_vote_page_href = location.href;
	// var down_vote_page_href = location.href;
	// var fave_vote_page_href = location.href;

	var metasection_divs = document.getElementsByClassName("metasection");

	for (var i2 = 0; i2 < metasection_divs.length; i2++) {
		var meta_each = metasection_divs[i2].getElementsByTagName('a');
		for (var i = 0; i < meta_each.length; i++) {
			var each = meta_each[i];
			//alert(each);
			if (each.length != 0){
				if( each.innerHTML == "View"){
					linkCollection.img_full = each.href;
					each.setAttribute('target', '_blank');
					each.setAttribute('onclick', 'this.focus()');
				}else if( each.innerHTML == "Download" && !gm_useRawFile){
					linkCollection.img_dl = each.href;
					linkCollection.img_dl = linkCollection.img_dl.replace('http://','https://');
				}else if( each.innerHTML == "DLS" && gm_useRawFile){
					linkCollection.img_dl = each.href;
					linkCollection.img_dl = linkCollection.img_dl.replace('http://','https://');
					/*
				}else if( each.innerHTML == "Up"){
					up_vote_page_href = each;
				}else if( each.innerHTML == "Down"){
					down_vote_page_href = each;
				}else if( each.innerHTML == "Fave"){
					fave_vote_page_href = each;
				}else{
					//alert(each.innerHTML + " = " + each.href);
					*/
				}
			}
		}
	}
	linkCollection.ready = true;
	page.links = linkCollection;
	// Vars ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	var loaded=false;

	//Gui
	var all_=document.createElement('div');
	var img_div = document.createElement('div');
	var img_status = document.createElement('h1');
	var img_cover = document.createElement('h1');
	all_.id='derpiscript-img-overlay-content';
	img_div.id="derpiscript-img-div";
	img_status.id="derpiscript-img-status";
	img_cover.id="derpiscript-img-cover";
	
	img_div.style.display='none';
	img_div.style.position = "absolute";
	img_div.style.backgroundColor = "red";
	img_div.style.left = "0";
	img_div.style.top = "0";

	img_status.style.float='center';
	img_status.innerHTML ='-';
	img_status.style.display='none';

	img_cover.style.float='center';
	img_cover.innerHTML ='-';
	img_cover.style.display='none';
	
	var img_img=document.createElement('img');
	img_img.src='';
	img_img.style.display='none';
	img_div.appendChild(img_status);
	img_div.appendChild(img_cover);
	img_div.appendChild(img_img);

	page.data.img_dl_frame=document.createElement('iframe');
	page.data.img_dl_frame.src='';
	page.data.img_dl_frame.href='';
	page.data.img_dl_frame.id = "derpiscript_img_frame";
	page.data.img_dl_frame.style.display='none';
	img_div.appendChild(page.data.img_dl_frame);

	var vote_frame=document.createElement('iframe');
	vote_frame.src='';
	vote_frame.href='';
	vote_frame.id='vote_frame';
	vote_frame.style.display='none';
	img_div.appendChild(vote_frame);

	var all_note = document.createElement('h1');
	all_note.style.float='center';
	all_note.innerHTML ='-';
	all_note.style.display='none';

	all_.appendChild(all_note);

	if(false){
		while (document.body.lastChild != null ) {
		document.body.removeChild(document.body.lastChild);
		document.title=document.body.lastChild;
		}
	}

	document.body.appendChild(img_div);
	document.body.appendChild(all_);


	// The Buttons again. ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//TODO: only if movable.
	document.body.onmousemove = function(evt){
		evt = (evt) ? evt : ((window.event) ? window.event : "");
		checkButtonPos(evt.clientY||1);
	}
	//TODO: only if movable.
	document.body.onscroll = function(evt){
		evt = (evt) ? evt : ((window.event) ? window.event : "");
		checkButtonPos(evt.clientY||1);
	}
	
	var last_img_button = document.getElementsByClassName("prev")[0];
	var next_img_button = document.getElementsByClassName("next")[0];
	var load_img_button = document.createElement('span');
	var button_parent = document.getElementsByClassName("metabar")[0];
	var sub_element = document.createElement('div');
	var load_img_button_link = document.createElement('a');
	load_img_button_link.addEventListener('click', bookmark, false);
	load_img_button_link.innerHTML='<span class="download-span" title="Download image and vote it up/fave it."><i class="fa fa-arrow-down"></i></span>';
	load_img_button.appendChild(load_img_button_link);
	sub_element.appendChild(last_img_button);
	//sub_element.appendChild(load_img_button);
	sub_element.appendChild(load_img_button); //TODO Download;
	sub_element.appendChild(next_img_button);
	if(GM_getValue('buttonMoveMode') == 1){
		sub_element.setAttribute("class","metasection");
	}
	sub_element.id="hoverboxthingie";


	//load_img_button.innerHTML='<i class="fa fa-arrow-down"></i>';
	if(button_parent.firstChild){
		button_parent.insertBefore(sub_element, button_parent.firstChild);
	}else {
		button_parent.appendChild(sub_element);
	}
	if(GM_getValue('buttonMoveMode') == 1){
			sub_element.style.position = "inline-block";
	}
	//sub_element.style.opacity = "0.4";
	
	//Init page
	checkButtonPos(0);
	setBigButtonPos(last_img_button,0);
	setBigButtonPos(load_img_button,1,true);
	setBigButtonPos(next_img_button,1.5);
	checkButtonPos(0);
	window.onload = scrollToPic;
	
	
	//Init Key Bindings
	window.addEventListener("keypress" , function(e){
		if (e.shiftKey === true){
			return false;
		}
		if (document.activeElement != document.body){
			console.log("Hotkey canceled, because "+ document.activeElement + " is focused.");
			return false;
		}
		if(e.keyCode == 35){ //kp_1
			img_goto('-'); //last page
		}else if(e.keyCode == "+"){ //Down
			//bookmark();
		}else if(e.keyCode == 34){//kp_3
			img_goto('+'); //next page
		}else if(e.keyCode == 12){ //kp_5
			console.log("hua!")
			img_goto('#'); //zoom
		} else if(e.keyCode == 13){ //Enter or Zero
			bookmark();
		} else if(e.keyCode == 0){ //Other Keys
			if(e.charCode == 45) { // "-" kp_minus
			   prono(); //toggle cover.
			}else if(e.charCode == 43){ // "+" kp_plus
					img_goto('r'); //random page
			}
		}else{
		   console.log('Pressed unegistered key "' + e.keyCode + '" with char code "' + e.charCode + '".');
		}
	}, false);
}
function create_page_all() {
	var css='\
	@-webkit-keyframes pusate { 							\n\
		from { box-shadow: 0 0 5px #c00; }					\n\
		to { box-shadow: 0 0 10px #c00; }					\n\
	}														\n\
	@-moz-keyframes pusate {								\n\
		from { box-shadow: 0 0 5px #c00; }					\n\
		to { box-shadow: 0 0 10px #c00; }					\n\
	}														\n\
	@keyframes pusate {										\n\
		from { box-shadow: 0 0 5px #c00; }					\n\
		to { box-shadow: 0 0 10px #c00; }					\n\
	}														\n\
	.warningAusruf {										\n\
		-webkit-animation: pusate 1s ease-in-out infinite	\n\
		   -moz-animation: pusate 1s ease-in-out infinite	\n\
			-ms-animation: pusate 1s ease-in-out infinite	\n\
			 -o-animation: pusate 1s ease-in-out infinite	\n\
				animation: pusate 1s ease-in-out infinite	\n\
	}          												\n';
	applyStyle(css, "allpage");
	css ='\
	.image_description, .image_description H3, #imagespns, comment_live_preview{\n\
		color: black;                                                             	\n\
	}                                                                             	\n\
	body{                        													\n\
		color: ' + getContrastYIQ_BW(GM_getValue('backgroundColor')) + ';                     \n\
		background-color: ' + GM_getValue('backgroundColor') + ';                             \n\
	}																				\n\
	a{                        														\n\
		color: '+GM_getValue('linkColor')+';                                        \n\
	}																				\n\
	 a:visited{                       											  \n\
		color: '+(getContrastYIQ(GM_getValue('linkColor')) ? darkerColor(GM_getValue('linkColor'), .1) : lighterColor(GM_getValue('linkColor'), .1))+';                                                             \n\
	}																				\n\
	 a:hover{                       											  \n\
		color: '+(getContrastYIQ(GM_getValue('linkColor')) ? darkerColor(GM_getValue('linkColor'), .3) : lighterColor(GM_getValue('linkColor'), .3))+';                                                             \n\
	}                                                                             \n\
	';
	applyStyle(css, "custom-color-allpage");
	css = '\
	span.tag.tag-user-watched{ \
		color:#333; \
		background:#6A9F93; \
		border-color:#3F7E70; \
	} \
	span.tag.tag-user-watched a { \
		color:#307163; \
	} \
	span.tag.tag-system{ \
		color:#333; \
		background:#B1CEE2; \
		border-color: #4C90BD; \
	} \
	span.tag.tag-system a { \
		color: #4C90BD; \
	} \
	span.tag.tag-ns-artist{ \
		color:#333; \
		background:#A2A6D4; \
		border-color: #363B74; \
	} \
	span.tag.tag-ns-artist a { \
		color: #363B74; \
	} \
	span.tag.tag-user-spoilered{ \n\
		color:#333; \n\
		background:#F6A7A5; \n\
		border-color:#C36562; \n\
	} \n\
	span.tag.tag-user-spoilered a { \n\
		color:#AF4E4B; \n\
	} \n\
	span.tag.tag-user-hidden{ \n\
		color:#333; \n\
		background:#C785A9; \n\
		border-color:#9E4F7A; \n\
	} \n\
	span.tag.tag-user-hidden a { \n\
		color:#8E3D69; \n\
	} \n\
	.tag-span-watched { \n\
		color:#307163; \n\
		background:#6A9F93; \n\
		border-color:#3F7E70!important; \n\
	} \n\
	.tag-span-spoilered { 		\
		color:#AF4E4B; 			\
		background:#F6A7A5; 	\
		border-color:#C36562!important; 	\
	} 							\
	.tag-span-hidden { \n\
		color:#8E3D69; \n\
		background:#C785A9; \n\
		border-color:#9E4F7A!important; \n\
	} \n\
	.dropdown_icon{ 		\
		padding-left:5px; \
		padding-right:0; \
	} 							\
	.dropdown_container.tag{ 		\
		padding-right:0px; \
	} 							\
	.dropdown_icon a span{ 		\
		border-left: 1px solid; 		\
		padding-top: 5px;			\
		padding-bottom: 5px;			\
		padding-left: 2px;			\
		padding-right: 2px;			\
	} 							\
	';
	var unused = '	.tag-span-unwatched { \n\
		color:#82AD2B; \n\
		background:#CDE69A; \n\
		border-color:#9ECF3C; \n\
	} \n\
	'; //TODO: REMOVE
	//TODO: tag-ns-spoiler ??
	applyStyle(css, "tags-allpage");
	/*$(".tag-list").find('.tag-span-unwatched').each(function(){
		$(this).html($.trim($(this).html()));
	});*/
	/*$(".tag-list .dropdown_icon a ").find('span').each(function(){
		$(this).html($.trim($(this).html()));
	});*/
	$(".tag.dropdown_container .dropdown_icon a ").find('span').each(function(){
		$(this).html($.trim($(this).html()));
	});
	if(gm_search_enabled) {
		create_search_addons(); //all pages has a search field. (except maybe error pages on server derp, like 503) 
	}
}













function setColorOfResult(name){
	backgroundColor = $_("script_styles_color_" + name).value;
	//setPickerColor(name, backgroundColor);
	var resultElement = $_("script_styles_color_" + name + "_result");
    resultElement.innerHTML = backgroundColor; //backgroundColor
    resultElement.style.backgroundColor = backgroundColor; //backgroundColor
    resultElement.style.color = getContrastYIQ_BW(backgroundColor); //backgroundColor
}
/**
 * saves the settings.
 */ 
function saveoptions(){
    var successfield =  $id("script_save_success");
    GM_setValue('useRawFile',!$id("script_download_tagged").checked);
    GM_setValue('rateOnDownload',$id("script_download_vote_enabled").checked);  //rateOnDownload
    GM_setValue('useVoteUp',!$id("script_download_vote_fave").checked); //useVoteUp
    
    
    theButtonMode = 0;
    var buttonMoveModes = document.getElementsByName("script_buttons_mode");
    for(var i = 0; i<buttonMoveModes.length; i++){
        if (buttonMoveModes[i].checked==true){
            theButtonMode =  buttonMoveModes[i].value; //buttonMoveMode
        }
    }
	thePosMode = 0;
    var buttonPosModes = document.getElementsByName("script_buttons_position");
    for(var i = 0; i<buttonPosModes.length; i++){
        if (buttonPosModes[i].checked==true){
            thePosMode =  buttonPosModes[i].value; //buttonPosMode
        }
    }
    GM_setValue('buttonMoveMode',theButtonMode);
	GM_setValue('buttonPositionMode',thePosMode);	
	
	GM_setValue('search_enabled', $id("script_search_enabled").checked);
	GM_setValue('search_defaults_faves',  $id("script_search_defaults_faves").value);
	GM_setValue('search_defaults_upvotes',$id("script_search_defaults_upvotes").value);
	GM_setValue('search_defaults_uploads',$id("script_search_defaults_uploads").value);
	GM_setValue('search_defaults_watched',$id("script_search_defaults_watched").value);

	GM_setValue('backgroundColor',$id("script_styles_color_bg").value);//TODO: validate color as real color.
	GM_setValue('linkColor', $id("script_styles_color_link").value);//TODO: validate color as real color.
	GM_setValue('hideAds',$id("script_styles_hide_ads").checked); // hideAds
	GM_setValue('tagColors',$id("script_styles_tag_colors").checked); // Advanced Tag Colors


    successfield.innerHTML = "Successfully saved. Please <a href='javascript:location.reload();' onclick='location.reload();'>refresh</a> the page.";
    successfield.style.display = "block";
    successfield.style.color = "green";
    successfield.style.backgroundColor = "lightgreen";
}
/**
 * resets the settings.
 */ 
function resetoptions(){
    var successfield =  $id("script_save_success");

    var useRawFile = false; 
   	var rateOnDownload = true;
	var useVoteUp = true;
    var buttonMoveMode = 2;    
    var buttonPosMode = 1;    
	var search_enable = true;
	var search_defaults_faves   = "last";
	var search_defaults_uploads = "last";
	var search_defaults_upvotes = "last";
	var search_defaults_watched = "last";
    var backgroundColor = "#FFFFFF";
	var linkColor = "#57A4DB";
	var hideAds = true;
	var tagColors = true;
	
	$id("script_download_tagged").checked = !useRawFile;
	$id("script_download_vote_enabled").checked = rateOnDownload;
	$id("script_download_vote_fave").checked = !useVoteUp;

	var buttonMoveModes = document.getElementsByName("script_buttons_mode");
	for(var i = 0; i<buttonMoveModes.length; i++){
		buttonMoveModes[i].checked = (buttonMoveModes[i].value==buttonMoveMode); //buttonMoveMode
	}
	var buttonPosModes = document.getElementsByName("script_buttons_position");
	for(var i = 0; i<buttonPosModes.length; i++){
		buttonPosModes[i].checked = (buttonPosModes[i].value==buttonPosMode); //buttonPosMode
	}
	setPickerColor("script_styles_color_bg", backgroundColor);
	setPickerColor("script_styles_color_link", linkColor);
	$id("script_styles_hide_ads").checked = hideAds;
	$id("script_styles_tag_colors").checked = tagColors;

	$id("script_search_enable").checked         = search_enable;
	$id("script_search_defaults_faves").value   = search_defaults_faves;
	$id("script_search_defaults_upvotes").value = search_defaults_upvotes;
	$id("script_search_defaults_uploads").value = search_defaults_uploads;
	$id("script_search_defaults_watched").value = search_defaults_watched;

    successfield.innerHTML = "Did reset the settings, but <b>not</b> saved yet!";
    successfield.style.display = "block";
    successfield.style.color = "gray";
    successfield.style.backgroundColor = "lightgray";
}
function setPickerColor(name,color){
	contrastColor = getContrastYIQ_BW(color);
	colorPickerElement = $id(name);
	colorPickerElement.value = color; //backgroundColor
	colorResultElement = $id(name + "_result");
	colorResultElement.innerHTML = color; //backgroundColor
	colorResultElement.style.backgroundColor = color; //backgroundColor
	colorResultElement.style.color = contrastColor; //backgroundColor
}


var unused = '\
<div class="flash darknotice"><strong>Are you an API user?</strong> We\'ve changed some of the previous API behaviour relating to comments and faves. <a href="/api">Find out more here</a>.</div>\
';