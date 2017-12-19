// ==UserScript==
// @name           Derpiscript - Derpibooru Enhanced
// @namespace      luckydonald - derpibooru_enhanced.code.github@luckydonald.de
// @author         luckydonald
// @description    Derpibooru as it should be (laptop mode, download'n'fave, keyboard shortcuts, better search etc.) 
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
// @grant          GM.getValue
// @grant          GM.setValue
// @grant          GM.openInTab
// @grant          GM.xmlHttpRequest
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_openInTab
// @grant          GM_xmlhttpRequest
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.js
// @require        https://gist.github.com/raw/2625891/waitForKeyElements.js
// @updateURL      https://github.com/luckydonald/derpiscript/raw/master/186873.user.js
// @preferedURL    https://flutterb.at/derpiscript-update
// @downloadURL    https://github.com/luckydonald/derpiscript/raw/master/186873.user.js
// @version        0.1.5.0
// @history        1.5.1 fixed settings (including background color) | added setting to center the image (for large screens, got myself a 4K one) | worked through the changes of upvote related stuff, halfway there
// @history        1.5.0 exactly the same as 0.1.5.0. I just don't like the "0." any more.
// @history        0.1.5.0 fix for derpibooru's search update | Now everything in search is like a tag | finished implementing the multi-button
// @history        0.1.4.5 fix for derpibooru's UI update | Not sure what exactly I did. lol.
// @history        0.1.4.4 fix for derpibooru's UI update | (The search has no submit button anymore. Also the underscores in the fave buttons class are now dashes).
// @history        0.1.4.3 quick fix for derpibooru's UI update.
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
// @file 		   C:/Users/luckydonald/AppData/Roaming/Mozilla/Firefox/Profiles/ciin9k43.clop/gm_scripts/Derpibooru_-_Enhanced_Navigation/186873.user.js
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
console.log("[Derpiscript - Derpibooru Enhanced]");
pony();
/*
// @require  https://greasemonkey.github.io/gm4-polyfill/gm4-polyfill.js

function GM_setValue(name, value) {
	return await GM.setValue(name, value);
}
function GM_getValue(name, default_val) {
	return await GM.getValue(name, default_val);
}
function GM_openInTab(name) {
	return await GM.openInTab(name);
}
function GM_xmlhttpRequest(options) {
	return await GM.xmlHttpRequest(options);
}*/
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
	var d_center_image = true;

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
var gm_center_image            = GM_getValue('center_image',            d_center_image           ); GM_setValue('center_image',              gm_center_image            );


var SEARCH_FORM_DESCRIPTOR = "form.header__search";  //was div.header__search form"  //was "div.searchbox form" before.
var SEARCH_BUTTON_DESCRIPTOR = "button[title='Search']";  // was "a[title=Search]" before
var SEARCH_FIELD_DESCRIPTOR = "input[type='text'][name='q']";  // was "a[title=Search]" before

var SETTINGS_TABS_CLASS = "block__header--js-tabbed";
var SETTINGS_CONTENT_ID = "js-setting-table";

var IMAGE_LINK_BAR_DESCRIPTOR = "div.block__header";
var IMAGE_LINK_NEXT_DESCRIPTOR = ".js-next";
var IMAGE_LINK_PREV_DESCRIPTOR = ".js-prev";
var IMAGE_LINK_RAND_DESCRIPTOR = ".js-rand";

var VOTE_FAVE_DESCRIPTOR = "a.interaction--fave";
var VOTE_UPVOTE_DESCRIPTOR = "a.interaction--upvote";
var VOTE_DOWNVOTE_DESCRIPTOR = "a.interaction--upvote";
var VOTE_FAVE_CLICKED_CLASS = "active";
var VOTE_UPVOTE_CLICKED_CLASS = "active";
var VOTE_DOWNVOTE_CLICKED_CLASS = "active";

var changelog_bg;
doVersionCheck(gm_lastScriptVersion, scriptVersion);
var page = getPageType(window.location.pathname);
console.log(page);
pageTypeAssert(page);
doPageType(page);
checkAutoUpdate(false);

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
						updateURL = line + (line.indexOf("?")<0 ? "?" : "&") + "update=" + currentTime + "&version=" + scriptVersion; // omit cache by appending current timestamp, to still have the ending use // + "&suffix=.user.js"
						console.log("old@updateURL:" + updateURL);
					} else if( line.indexOf("@preferedURL") > -1){
						line = line.substr(line.indexOf("@updateURL") + 10);
						line = line.trim();
						updateURL = line;// + (line.indexOf("?")<0 ? "?" : "&") + "update=" + currentTime + "&version=" + scriptVersion + "&suffix=.user.js"; // omit cache by appending current timestamp, and &suffix to still have the required ending.
						console.log("@preferedURL: " + updateURL);
						break;
					}
				}
			}
			GM_xmlhttpRequest({
			method:"GET",
			headers:    {
				referer:  "https://flutterb.at/derpiscript/"+ scriptVersion + "/" + location.href
			},
			url:updateURL,
			onload:function(details) {
				if (details.status == 200) {
					console.log("old@version:" + GM_info.script.version);
					console.log("url", updateURL," ", "details",details);
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
if (!String.prototype.trim) {  // https://stackoverflow.com/a/498995
    (function() {
        // Make sure we trim BOM and NBSP
        var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
        String.prototype.trim = function() {
            return this.replace(rtrim, '');
        };
    })();
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
	if (sPageURL.indexOf(sParam) < 0) {  // Not found
		return;
	}
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
	console.log("attempting upvote+download");
    var upvote_span = (gm_useVoteUp ? $(VOTE_UPVOTE_DESCRIPTOR) : $(VOTE_FAVE_DESCRIPTOR)); //depends on user settings for fave/vote
	if(upvote_span.hasClass( gm_useVoteUp ? VOTE_UPVOTE_CLICKED_CLASS : VOTE_FAVE_CLICKED_CLASS) ) { //if was not in db, but is voted
		//do nothing
		return;
	} //else (if is not in db, and is not voted)
	page.data.img_dl_frame.src=page.links.img_dl; //TODO: Check if null?
	upvote_span[0].click();
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


/**
 * Cuts a part out of an array.
 *
 * @link https://stackoverflow.com/a/9815010
 *
 * @param from
 * @param to
 * @returns {Number}
 */
Array.prototype.cut = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

/**
 * Removes a specified element from an array
 *
 * @link https://stackoverflow.com/a/10517081
 *
 * @returns {boolean} If it deleted something
 */
Array.prototype.del = function (object){
	console.log("del'ing object", obj, "from", this);
	var index = this.indexOf(object);
	var deleted_something = false;
	while (index !== -1) {
  		this.splice(index, 1);
		deleted_something = true;
		index = this.indexOf(obj);
	}
	return deleted_something;
};





//own stuff
//own stuff
//own stuff
//own stuff
//own stuff.






/**
 * Removes a specified element from an array
 *
 * @link https://stackoverflow.com/a/10517081
 *
 * @returns {boolean} If it deleted something
 */
function array_del(array, obj) {
	//console.log("deleting object", obj, "from", array);
	var index = array.indexOf(obj);
	var deleted_something = false;
	while (index !== -1) {
  		array.splice(index, 1);
		deleted_something = true;
		index = array.indexOf(obj);
	}
	return {array:array, del:deleted_something};
}


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
	div.image.voted_up."+VOTE_UPVOTE_CLICKED_CLASS+" { \
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
	
	waitForKeyElements ("div.imageinfo span "+VOTE_DOWNVOTE_DESCRIPTOR+"."+VOTE_DOWNVOTE_CLICKED_CLASS, page_album_highlighter, false);
	waitForKeyElements ("div.imageinfo span "+VOTE_UPVOTE_DESCRIPTOR+"."+VOTE_UPVOTE_CLICKED_CLASS, page_album_highlighter, false);
	waitForKeyElements ("div.imageinfo span "+VOTE_FAVE_DESCRIPTOR+"."+VOTE_FAVE_CLICKED_CLASS, page_album_highlighter, false);
	/*$(".imageinfo a.vote-up-link.voted_up").parents('div.image').addClass("voted_up");
	$("div.imageinfo span a.vote-up-link.voted_up").parents('div.image').addClass("voted_up");
	console.log($("div.image div.imageinfo span a.voted_up"));
	$(".imageinfo a.fave-link.faved").parents('div.image').addClass("faved");*/	
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

/**
 * parse_tags("test, lel, (hui, boo), wow");
 * [ "test", "lel", "(hui, boo)", "wow" ]
 * @param string
 * @returns {Array}
 */
function parse_tags(string) {
	var tag_list = [];
	var backslash_escape = false;
	var current_str = "";
	var recursion = [];
	var keyword = "";
	for (i = 0; i < string.length; i++) {
		var last_recursion = recursion[recursion.length - 1];
		var char = string[i];
		// console.log({i: i, char:char, current_str:current_str, backslash_escape:backslash_escape, last_recursion:last_recursion, recursion_len:recursion.length, recursion:recursion.join(", ")});
		if (backslash_escape) {
			current_str += char;
			backslash_escape = false;
		} else {
			switch (char) {
				case "\\":
					backslash_escape = true;
					current_str += char;
					break;
				case "(":
					if (last_recursion != '"' && last_recursion != "'") {
						recursion[recursion.length] = "(";
					}
					current_str += char;
					break;
				case ")":
					if (last_recursion == "(") {
						recursion.pop();
					}
					current_str += char;
					break;
				case '"':
				case "'":
					if (last_recursion == char) {
						recursion.pop();
					}
					current_str += char;
					break;
				case ",":
					if (recursion.length == 0) {
						tag_list[tag_list.length] = current_str.trim();
						current_str = "";
					} else {
						current_str += char;
					}
					break;
				case 'A': // AND
					if (keyword) {
						current_str += keyword;
					}
					keyword = char;
					break;
				case 'N': // AND
					if (keyword == "A") {
						keyword += char;
					} else {
						current_str += keyword+char;
					}
					break;
				case 'D': // AND
					if (keyword != "AN") {
						current_str += keyword+char;
					} else { // is "AND"
						if (recursion.length == 0) { // is not in a sublevel
							tag_list[tag_list.length] = current_str.trim();
							current_str = "";
						} else {
							current_str += "AND";
						}
						keyword = "";
					}
					break;
				default:
					current_str += char;
					break;
			}
		}
	}
	if (current_str) {
		tag_list[tag_list.length] = current_str.trim();
	}
	return tag_list;
}
// parse_tags("lel AND foo, bar, (hey, boort AND gnampf), yo\\, wit");

document.onerror = function (e) {
	console.error(e);
};
function create_search_addons(){
	//TODO settings, if enabled.
	console.log("derpiscript: loading search addons.");
	var form = $($(SEARCH_FORM_DESCRIPTOR)[0]);

	var buttons = {
		faves:   {obj: null, name: "faves",   only: "my:faves",   not:"-my:faves",   blank:"", text:'<i class="fa fa-fw fa-star"></i>',     tooltip:"Faves"         },
		votes:   {obj: null, name: "upvotes", only: "my:upvotes", not:"-my:upvotes", blank:"", text:'<i class="fa fa-fw fa-arrow-up"></i>', tooltip:"Upvotes"       },
		uploads: {obj: null, name: "uploads", only: "my:uploads", not:"-my:uploads", blank:"", text:'<i class="fa fa-fw fa-upload"></i>',   tooltip:"Uploads"       },
		watched: {obj: null, name: "watched", only: "my:watched", not:"-my:watched", blank:"", text:'<i class="fa fa-fw fa-eye"></i>',      tooltip: "Watched Tags" }
	};
	var tag_buttons = {
			rating:  {obj: null, name: "rating",  states: ["explicit", "questionable", "safe"], text:'rating', tooltip:"rating"}
	};
	//console.log(tag_buttons);
	var submit = form.children(SEARCH_BUTTON_DESCRIPTOR);
	//console.log("submit", submit);
	var field = form.children(SEARCH_FIELD_DESCRIPTOR);
	//console.log("field", field);


	// PART -1: css
	var colors = {
		green_bright: "#57A559",
		green_dark: "#264827",
		red_bright: "#A55759",
		red_dark: "#482627",
		border: "#5673AB" //"#284371"
	};
	var css = "\
		" + SEARCH_FORM_DESCRIPTOR + " .addon_button{ \
		    color: white; \
			border-right: 1px solid" + colors.border + "; \
			font-size: 10px;  \
			padding-left: 3px !important; \
			padding-right: 3px !important; \
		} \
		" + SEARCH_FORM_DESCRIPTOR + " .addon_button.only { \
			background-color: " + colors.green_dark + "; \
		} \
		" + SEARCH_FORM_DESCRIPTOR + " .addon_button.only:hover { \
			background-color:" + colors.green_bright + " !important; \
		} \
		" + SEARCH_FORM_DESCRIPTOR + " .addon_button.not { \
			background-color:" + colors.red_dark + "; \
		} \
		" + SEARCH_FORM_DESCRIPTOR + " .addon_button.not:hover { \
			background-color:" + colors.red_bright + "; \
		} \
		\
	";
	applyStyle(css, "search_addons");

	// PART 0.a: swap out input field
	// replace the actual input element with a hidden one.
	// so we have control over the input field, to add our own tags.
	field.name = "";
	var fake_field = $('<input type="hidden" name="q" id="fake_q" />');
	fake_field.val(field.val());
	var existing_tags = parse_tags(field.val());
	console.log("parsed tags: ", existing_tags);
	var update_query = function() {
		var q_text = [];
		q_text[q_text.length] = field.val();
		$.each(buttons, function(unneeded, button) {
			var key = button.obj.data("current");
			var q_part = button[key];
			if (q_part) {
				q_text[q_text.length] = q_part;
			}
		});
		$.each(tag_buttons, function(unneeded, button) {
			var key = button.obj.data("current");
			var q_part = button.states[key];
			if (q_part) {
				q_text[q_text.length] = q_part;
			}
		});
		fake_field.val(q_text.join(", "));
	};
	field.on("input", update_query);
	form.append(fake_field);

	// PART 0.b: add current page field
	var current_page = getUrlParameter("page");
	if (current_page !== null) {
		//console.log(current_page);
		$('<input type="hidden" name="page" value="' + current_page + '">').appendTo(form);
	}

	///////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//TODO: expandable* with <i class="fa fa-bars"></i> button - *) enable in settings.
	//PART 1: param buttons
	$.each(buttons, function(unneeded, button) {
		// create button
		button.obj = $('<a class="header__search__button addon_button" name="' + button.name + '" title="' + button.tooltip + '">' + button.text + '</a>').insertBefore(submit);
		//form.append(button.obj);    // already done on creation
		//console.log("form",form);
		button.obj.data("tooltip",button.tooltip);
		button.obj.data("name",button.name);
		button.obj.data("input",button.input);
		button.obj.data("storage","search_last_" + button.name);
		button.obj.attr("title", "Search " + button.tooltip + "?");

		//Toggle Functionality
		button.obj.toggleMode = function(mode) {
			btn = $( this );
			if (mode === "") {
				mode = "blank";
			}
			// store mode
			btn.data("current", mode);  // ["only", "off", "blank"]

			// update classes
			btn.toggleClass("only", false);
			btn.toggleClass("not", false);
			btn.toggleClass("blank", false);
			btn.toggleClass(mode, true);

			// store in last_used_*
			GM_setValue(btn.data("storage"), mode);

			// set title
			switch (mode) {
				case "not":
					btn.attr("title", "No " + btn.data("tooltip"));
					break;
				case "blank":
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
		// remove from existing tags
		var del_result;
		if((del_result = array_del(existing_tags,button.only)).del) {
			existing_tags = del_result.array;
			button.obj.toggleMode('only');
		} else if((del_result = array_del(existing_tags,button.not)).del) {
			existing_tags = del_result.array;
			button.obj.toggleMode('not');
		} else if((del_result = array_del(existing_tags,button.blank)).del) {
			existing_tags = del_result.array;
			button.obj.toggleMode('blank');
		} else {  // nothing loadable from query.
			//If setting don't force something, use last value.
			var forced_value = GM_getValue("search_defaults_" + button.name, "last");
			if (forced_value == "last") {
				//Use last one.
				button.obj.toggleMode(GM_getValue("search_last_" + button.name,""));
			} else {
				button.obj.toggleMode(forced_value);
			}
		}

		//Change on click, circle around the 3 modes("blank", "only", "not").
		button.obj.click( function(){
			var btn = $( this );
			btn.toggleMode = btn.data("toggle"); // hack to make toggleMode available here.
			if (btn.hasClass("only")){ //was on ("only")
				btn.toggleMode("not");
			} else if (btn.hasClass("not")){ //was off ("not")
				btn.toggleMode("blank");
			} else { //was default ("blank")
				btn.toggleMode("only");
			}
			update_query();
		});
	});


	///////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//PART 2, tag buttons
	$.each(tag_buttons, function(unneeded, button) {
		button.obj = $('<a class="header__search__button addon_button tag_button" name="' + button.name + '" title="' + button.tooltip + '">' + button.text + '</a>');
		button.obj.insertBefore(submit);
		//console.log("form",form);
		button.obj.data("tooltip",button.tooltip);
		button.obj.data("name",button.name);
		button.obj.data("storage","search_last_" + button.name);
		button.obj.attr("title", "Search " + button.tooltip + "?");
		button.obj.data("states", button.states);
		button.obj.data("current", -1);

		//Toggle Functionality
		button.obj.toggleMode = function(new_mode) {
			var btn = $( this );
			btn.current = btn.data("current");
			btn.states = btn.data("states");
			btn.tooltip = btn.data("tooltip");
			//console.log("tag:toggle: ", btn.current,"->", new_mode, btn);
			btn.data("current", new_mode);
			GM_setValue(btn.data("storage"), new_mode);
			//var span = btn.children("span");
			//span.text(new_mode);
			if (new_mode != -1) {
				btn.attr("title", btn.tooltip + ": " + btn.states[new_mode]);
				btn.text(btn.states[new_mode]);
				btn.toggleClass("only", true);
				btn.toggleClass("blank", false);
			} else {
				btn.attr("title", "Toggle " + btn.tooltip);
				btn.text(btn.tooltip);
				btn.toggleClass("only", false);
				btn.toggleClass("blank", true);
			}
		};
		button.obj.data("toggle", button.obj.toggleMode); // hack to make toggleMode available in onclick.
		
		//Default settings, on load
		//
		var loaded_from_query = false;
		var del_result;
		for (var i = 0; i < button.states.length; i++) {
			if((del_result = array_del(existing_tags,button.states[i])).del) {
				existing_tags = del_result.array;
				button.obj.toggleMode(i);
				loaded_from_query = true;
			}
		}
		if(!loaded_from_query) {  // nothing loadable from query.
			//If setting don't force something, use last value.
			var forced_value = GM_getValue("search_defaults_" + button.name, "last");
			//console.log("search default for ", button.name, " : ", forced_value);
			if (forced_value == "last") {
				//Use last one.
				var last_value = GM_getValue("search_last_" + button.name, -1);
				if (last_value === "") {
					//console.log("search last for ", button.name, " was empty. Setting to", -1);
					last_value = -1;
					GM_setValue("search_last_" + button.name, -1);
				}
				//console.log("search last for ", button.name, " : ", last_value);
				button.obj.toggleMode(last_value);
			} else {
				button.obj.toggleMode(forced_value);
			}
		}

		//Change on click, circle around the 3 modes("", "only", "not").
		button.obj.click( function(){
			var btn = $( this );
			btn.states = btn.data("states");
			btn.current = btn.data("current");
			btn.toggleMode = btn.data("toggle"); // hack to make toggleMode available here.

			//console.log("clicked button. state:", btn.current, "states:", btn.states);
			btn.current++;
			if (btn.current>= btn.states.length){
				btn.current = -1;
			}
			//console.log("new state:", btn.current);
			btn.toggleMode(btn.current);
			//toggle_textpart(btn.states, btn.current);
			update_query();
		});
	});
	field.val(existing_tags.join(", "));
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
	#tab_derpiscript .versionField{     														\n\
		text-decoration: underline;													\n\
	} \n\
	#tab_derpiscript .version{     														\n\
		text-align: right;          												\n\
		width: 100%;             													\n\
		text-decoration: underline;													\n\
	}                              													\n\
																				  \n\
	#tab_derpiscript label.description {                                              \n\
		border: medium none;                                                      \n\
		color: #222;                                                              \n\
		display: block;                                                           \n\
		font-size: 150%;                                                          \n\
		font-weight: 700;                                                         \n\
		///padding: 0px 0px 1px !important;                                       \n\
		font-family: \"Lucida Grande\",Tahoma,Arial,Verdana,sans-serif;           \n\
		font-size: small;                                                         \n\
	}                                                                             \n\
	#tab_derpiscript input{                                                           \n\
		border: 1px solid #CDCDCD;                                                \n\
		background: #EEE;                                                         \n\
		background: none repeat scroll 0% 0% #EEE;                                \n\
	}                                                                             \n\
	#tab_derpiscript input.checkbox,#tab_derpiscript input.radio {                        \n\
		//display: block;                                                         \n\
		height: 13px;                                                             \n\
		line-height: 1.4em;                                                       \n\
		//margin: 7px 0px 1px 5px;                                                \n\
		width: 13px;                                                              \n\
	}                                                                             \n\
	#tab_derpiscript label.choice {                                                   \n\
		color: #444;                                                              \n\
		//display: block;                                                         \n\
		display: inline-block;                                                    \n\
		font-size: small;                                                         \n\
		line-height: 1.4em;                                                       \n\
		//margin: -1.55em 0px 0px 25px;                                           \n\
		//padding: 4px 0px 5px !important;                                        \n\
		width: 90%;                                                               \n\
	}                                                                             \n\
	#tab_derpiscript label {                                                          \n\
		font-family: \"Lucida Grande\",Tahoma,Arial,Verdana,sans-serif;           \n\
		text-align: left;                                                         \n\
		float: clear !important;                                                  \n\
		width:auto !important;                                                    \n\
		height:auto !important;                                                   \n\
	}                                                                             \n\
	#tab_derpiscript .li,#tab_derpiscript .ul{                                              \n\
		//padding: 0px;                                                           \n\
		///padding:4px 5px 2px 2px;                                               \n\
		list-style-type: none;                                                    \n\
		margin: 0px;                                                              \n\
		padding: 0px;                                                             \n\
	}                                                                             \n\
	#tab_derpiscript .li{                                                              \n\
		margin-top: 1em;                                                          \n\
	}                                                                             \n\
	#tab_derpiscript .li:first-child{                                                  \n\
		margin-top: 0;                                                            \n\
	}                                                                             \n\
	#tab_derpiscript .li .grouper{                                                     \n\
		margin-left: 1em;                                                         \n\
	}                                                                             \n\
	#tab_derpiscript .li .grouper label {                                              \n\
		margin-top: 0.5em;                                                        \n\
		display: block;                                                           \n\
	}                                                                             \n\
	#tab_derpiscript .li .grouper .guidelines{                                         \n\
		margin-left: 2em;                                                       \n\
		display: block;                                                           \n\
	}                                                                             \n\
																				  \n\
	#tab_derpiscript #li_dl p {                                                        \n\
		///padding:4px 0px 20px 30px;                                             \n\
	}                                                                             \n\
	#tab_derpiscript #li_move p {                                                        \n\
		///padding:4px 0px 2px 30px;                                              \n\
	}                                                                             \n\
	#tab_derpiscript .li .description, #tab_derpiscript #li_style .grouper{                                         \n\
		display: block;                                                           \n\
	}                                                                             \n\
																				  \n\
	#tab_derpiscript input.button {                                                   \n\
		font-size: 100%;                                                          \n\
		///margin:20px 0px 0px 0px;                                               \n\
		border: 1px solid darkgray;                                               \n\
		padding: 5px;                                                             \n\
																				  \n\
	}                                                                             \n\
	#tab_derpiscript input.button:hover, #tab_derpiscript input[type=\"button\"]:hover {  \n\
		font-size: 100%;                                                          \n\
		///margin:20px 0px 0px 0px;                                               \n\
		border: 1px solid dark-gray;                                              \n\
		color: black;                                                             \n\
		   -webkit-box-shadow: inset 0 0 10px #000000;                            \n\
		   -moz-box-shadow: inset 0 0 10px #000000;                               \n\
				box-shadow: inset 0 0  5px darkgrey;                              \n\
	}                                                                             \n\
	#tab_derpiscript .block {                                                         \n\
		display: block;                                                           \n\
	}                                                                             \n\
	#tab_derpiscript .element_style_bgcolor_colorresult {                               \n\
		border: 1px solid darkgrey;                                               	\n\
		padding: 5px 10px 5px 10px;                                               	\n\
	}                                                                             	\n\
	#tab_derpiscript .guidelines {                         \n\
		display: block;                           \n\
	}                                            \n\
	#tab_derpiscript .non-label { \n\
		float: none;\n\
	}\n\
	#tab_derpiscript input[type=\"radio\"]{\
		margin-top: 8px;\
		margin-left: 5px;\
	}\
	#tab_derpiscript .colorresult {                               \n\
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
	tabname.setAttribute('data-click-tab', 'tab_derpiscript');
	tabname.href = "#";
	tabname.id = "tab_derpiscript_header";
	tabname.innerHTML = "Derpiscript";
	var tabs = $class(SETTINGS_TABS_CLASS);
	tabs.appendChild(tabname);
	
	newSettingsHTML = '\
	\
			<p> <strong>Derpiscript Settings</strong> <div id=\"script_version\" class=\"version\">Script Version: <span id=\"script_version_field\" class=\"versionField\">Error Displaying Version...</span></div></p> \n\
			\
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
			<p> <strong>Big screen options</strong></p> \n\
			\
			<div class="field"> \
				<label for="script_center_image">Center image</label> \
				<input id="script_center_image" value="0" type="checkbox"> \
			</div> \n\
			<div class="fieldlabel"> \n\
				Set to <code>true</code>  center the image.<br>Set to <code>false</code> to keep default behaviour of the site. \
			</div> \
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
	tabContent.setAttribute('class','block__tab hidden');
	tabContent.setAttribute('data-tab','tab_derpiscript');
	tabContent.setAttribute('id','tab_derpiscript');
	tabContent.innerHTML = newSettingsHTML;
	$id(SETTINGS_CONTENT_ID).appendChild(tabContent);
	//script to use tabs correctly modified from derpibooru
	/*$('#'+SETTINGS_CONTENT_ID+' .block__header block__header--js-tabbed #tab_derpiscript_header').click(function(){
		$('#'+SETTINGS_CONTENT_ID+' .tabs a').removeClass('selected');
		$(this).addClass('selected');
		$('#'+SETTINGS_CONTENT_ID+' .tab').hide();
		$('#'+SETTINGS_CONTENT_ID+' #tab_derpiscript').show();
		return false;
	});*/
	//end from derpibooru
	
	$id("script_version_field").innerHTML = scriptVersion; 
	var resetElem = $id("script_save_reset");
	var successfield =  $id("script_save_success");
	successfield.style.display = "hidden";
	versionbutton = $id("script_version");
	versionbutton.addEventListener('click', showChangelog, false);
	$(":submit").click(function(event) {
		if(!$('#'+SETTINGS_CONTENT_ID+' #tab_derpiscript_header').hasClass('selected')){
			return true;
		}
		saveoptions();
		event.preventDefault(); // cancel default behavior
		return false;
	});
	resetElem.addEventListener('click', resetoptions, false);


	// Setting the init values for the Settings.

	$id("script_download_tagged").checked = !GM_getValue('useRawFile',d_useRawFile);
	$id("script_download_vote_enabled").checked = GM_getValue('rateOnDownload', d_rateOnDownload);
	$id("script_download_vote_fave").checked=!GM_getValue('useVoteUp', d_useVoteUp);
	
	$id("script_center_image").checked = GM_getValue('center_image',d_center_image);

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
	
	// 4K stuff ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Center the image
	if (gm_center_image) {
		applyStyle(".image-show-container, .image-show {width: 100%;}.image-show {text-align:center;}", "center_image");
	}
	
	//get Links ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
	linkCollection = {img_full:"" ,img_dl:"",page_next:"", page_prev:"", page_rand:"", ready:false}; //Not needed:  ,vote_up:"",vote_down:"", vote_fave:""};

	linkCollection.page_next = $(IMAGE_LINK_NEXT_DESCRIPTOR)[0].href;
	linkCollection.page_prev = $(IMAGE_LINK_PREV_DESCRIPTOR)[0].href;
	linkCollection.page_rand = $(IMAGE_LINK_RAND_DESCRIPTOR)[0].href;

	$(IMAGE_LINK_BAR_DESCRIPTOR).find('a').each(function() {
		var each = $(this)[0];
		var button_name = $(this).text().trim();
		console.log(button_name + " | " + (button_name == "View"? "y":"n")+ " | " + (gm_useRawFile? "y":"n"));
		if (!gm_useRawFile && button_name == "View") {
			console.log("View", each.href);
			linkCollection.img_full = each.href;
			$(each).attr('target', '_blank');
			$(each).attr('onclick', 'this.focus()');
		}else if (gm_useRawFile && button_name == "VS") {
			console.log("VS", each.href);
			linkCollection.img_full = each.href;
			$(each).attr('target', '_blank');
			$(each).attr('onclick', 'this.focus()');
		}else if(!gm_useRawFile && button_name == "Download"){
			console.log("Download", each.href);
			linkCollection.img_dl = each.href;
		}else if(gm_useRawFile && button_name == "DLS"){
			console.log("DL", each.href);
			linkCollection.img_dl = each.href;
		}
	});
	// links are often just starting with '//derpicdn.net'  instead of 'https://derpicdn.net'. Also rewriting to https, while at it.
	linkCollection.img_dl = linkCollection.img_dl.replace(/^(http:)?\/\//, "https://");
	linkCollection.ready = true;
	console.log("linkCollection", linkCollection);
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

	/*

	// The Buttons again. ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//TODO: only if movable.
	document.body.onmousemove = function(evt){
		evt = (evt) ? evt : ((window.event) ? window.event : "");
		checkButtonPos(evt.clientY||1);
	};
	//TODO: only if movable.
	document.body.onscroll = function(evt){
		evt = (evt) ? evt : ((window.event) ? window.event : "");
		checkButtonPos(evt.clientY||1);
	};
	
	var last_img_button = $(IMAGE_LINK_PREV_DESCRIPTOR)[0];
	var next_img_button = $(IMAGE_LINK_NEXT_DESCRIPTOR)[0];
	var load_img_button = document.createElement('span');
	var button_parent = $(IMAGE_LINK_BAR_DESCRIPTOR)[0];
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
	
	*/
	
	//Init Key Bindings
	var key_listener = function(e){
		console.log("Keypress!!");
		console.log(e);
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
	};
	window.addEventListener("keyup" , key_listener, false);
	document.addEventListener("keypress" , key_listener, false);
	jQuery(function()
	{
		$(window).keypress(key_listener);
		$("body").keypress(key_listener);
		$(document).keypress(key_listener);
	});
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
	body, #container{                        													\n\
		color: ' + getContrastYIQ_BW(GM_getValue('backgroundColor')) + ';           \n\
		background-color: ' + GM_getValue('backgroundColor') + ';                   \n\
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
		create_search_addons(); //all pages has a search field. (except maybe error pages on server derp, like 503) //TODO: Forum search?!
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

	GM_setValue('center_image', $id("script_center_image").checked);    
    
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
function pony() {
		var m = 'font-family:monospace;background-color:transparent!important;color:#';
	if (window.console) console.log(
	    '%c                                                                                                                                                                                                        \n                                                                                                                                                                                                        \n                                                                                                                                                                                                        \n                                                                                                                          %c %c#####%c@%c %c                                                                      \n                                                                                             %c#%c+%c*%c    %c %c %c@%c####%c#%c#%c#%c#%c*%c*%c*%c*%c#%c#%c#%c#%c###%c#%c@%c %c %c@%c#%c#%c**%c*%c#%c#%c@%c                                                                 \n                                                                                             %c+%c.%c.%c:%c+%c*%c*%c**%c*%c*******%c*%c*******%c*%c******%c*%c#%c#%c#%c#%c#%c#%c**%c*%c*%c#%c#%c        %c %c                                                     \n                                                                                           %c@%c#%c+%c....%c:%c+%c*%c*%c*%c****%c*%c**%c*%c****%c*%c**%c*%c****%c*%c**%c*%c***%c#%c##%c#%c*%c***%c*%c#%c %c   %c@%c+%c.%c:%c+%c*%c                                                  \n                                                                                        %c@%c#%c#%c*%c*%c+%c.%c....%c:%c+%c+%c*%c*%c**%c*%c*%c**%c*%c*%c**%c*%c*%c**%c*%c*%c**%c*%c*%c**%c*%c*%c**%c*%c*%c*%c*%c#%c*%c**%c*%c*%c*%c#%c %c+%c+%c.....%c.%c+%c+%c %c                                              \n                                                                                      %c#%c#%c*%c*%c***%c+%c+%c....%c+%c.%c.%c+%c*%c#%c#%c#%c#%c#%c#%c#%c##%c#%c#%c*%c*%c*%c*%c**%c*%c****%c*%c**%c*%c****%c*%c**%c*%c****%c+%c:%c.........%c.%c+%c*%c                                            \n                                                                                    %c#%c#%c*%c#%c######%c+%c..%c:%c+%c....%c:%c+%c*%c***********************************%c+%c+%c..%c.%c..........%c+%c+%c                                          \n                                                                                  %c %c#%c %c  %c@%c#%c#%c*%c***%c+%c+%c.........%c+%c+%c******%c*%c*******%c*%c*******%c*%c*******%c*%c**%c+%c+%c..%c+%c.............%c+%c+%c                                        \n                                                                                   %c %c#%c#%c*%c*%c*%c*%c**%c*%c*%c*%c+%c.........%c+%c:%c+%c*%c****%c*%c**%c*%c****%c*%c**%c*%c****%c*%c**%c*%c****%c*%c**%c+%c..%c:%c:%c...............%c+%c*%c                                      \n                                                                                %c %c#%c#%c*%c****%c*%c*%c**%c*%c**%c+%c+%c.......%c+%c...%c+%c+%c***%c*%c**%c*%c****%c*%c**%c*%c****%c*%c**%c*%c****%c*%c*%c+%c+%c..%c+%c..............%c:%c..%c.%c+%c                                     \n                                                                              %c@%c#%c*%c*******%c********%c+%c.%c...%c.%c+%c+%c.....%c+%c+%c****************************%c+%c.%c..%c+%c...............%c+%c...%c+%c@%c                                   \n                                                                            %c@%c#%c*%c*********%c********%c+%c+%c.%c.%c..........%c+%c+%c*%c**************************%c+%c..%c.%c+%c....%c...........%c:%c:%c...%c+%c#%c                                  \n                                                                          %c %c#%c*%c*****%c**%c****%c*********%c+%c.%c..........%c.%c+%c.%c+%c+%c*************************%c+%c..%c.%c+%c...............%c.%c+%c....%c+%c@%c                                 \n                                                                         %c#%c#%c*%c*****%c*%c*%c*%c****%c*******%c*%c*%c*%c+%c.........%c:%c+%c...%c:%c+%c****%c*%c*******%c*%c*******%c*%c***%c+%c...%c+%c.........%c..%c..%c...%c+%c.....%c+%c                                 \n                                                                        %c#%c*%c**************%c**********%c+%c+%c......%c:%c+%c.%c....%c.%c.%c+%c*%c**********************%c+%c...%c+%c:%c.%c.%c............%c:%c+%c.....%c.%c+%c                                \n                                                                       %c#%c*%c***************%c*******%c*%c***%c+%c+%c+%c+%c*%c#%c##%c#%c#%c*%c*%c*%c*******%c*%c*******%c*%c*******%c*%c***%c+%c:%c..%c:%c+%c.%c:%c....%c:%c...%c:%c...%c+%c:%c......%c+%c@%c                               \n                                                                      %c#%c*%c****************%c*********%c*%c#%c##%c#%c*%c************************************%c*%c+%c...%c+%c:%c::::::::::::%c:%c+%c.......%c:%c+%c                               \n                                                                     %c#%c#%c***************%c*%c*%c*%c**%c*%c*%c*%c*%c#%c#%c*%c*%c*%c*%c*%c**%c*%c**%c*%c*%c*%c**%c*%c**%c*%c*%c*%c**%c*%c**%c*%c*%c*%c**%c*%c**%c*%c*%c*%c**%c*%c**%c*%c+%c.%c...%c+%c:%c:::::::::::%c+%c.%c........%c+%c                               \n                                                                     %c#%c**************%c#%c#%c#%c*%c***%c*%c#%c#%c*%c*********************************************%c*%c+%c...%c.%c+%c::::::::::%c+%c:%c.........%c+%c                               \n                                                                    %c#%c#%c***********%c*%c#%c#%c#%c#%c**%c*%c*%c#%c#%c**%c**%c**%c**%c**%c**%c**%c**%c**%c**%c**%c**%c**%c**%c**%c**%c**%c**%c**%c**%c**%c**%c**%c**%c*%c+%c+%c...%c.%c+%c:%c:::::::%c+%c:%c.%c...%c.%c...%c.%c.%c+%c                               \n                                                                    %c#%c**********%c#%c#%c %c %c#%c*%c**%c*%c#%c#%c****************************************************%c+%c:%c...%c.%c+%c:%c:::::%c+%c+%c...........%c+%c                               \n                                                                    %c#%c*******%c*%c#%c@%c %c@%c#%c*%c***%c#%c#%c*******************************************************%c+%c:%c....%c+%c+%c::::%c+%c...........%c.%c+%c#%c                              \n                                                                   %c %c#%c*****%c#%c#%c %c %c@%c#######%c*%c*%c***************************************%c*%c***********%c*%c#%c##%c#%c+%c:%c.%c..%c.%c:%c+%c:%c:%c+%c+%c.%c..%c..%c..%c..%c..%c+%c+%c*%c#%c#%c %c                           \n                                                                   %c %c#%c***%c#%c#%c %c        %c#%c#%c***%c*************************************%c#%c#%c********%c*%c#%c#%c:%c.............%c+%c+%c+%c+%c...........%c+%c****%c#%c#%c                          \n                                                                   %c %c#%c**%c#%c@%c         %c#%c*%c****%c**********************************%c#%c#%c*%c#%c******%c*%c#%c#%c.%c...%c.%c*%c@%c     %c@%c*%c.%c.%c.%c.%c.%c+%c+%c.%c %c.%c.%c...%c..%c.%c+%c+%c*****%c#%c#%c                         \n                                                                    %c#%c*%c#%c          %c#%c*%c*****%c******************************%c#%c#%c#%c+%c.%c.%c#%c*%c****%c*%c#%c:%c...%c#%c %c %c:%c         %c+%c %c %c.%c.%c.%c.%c*%c %c....%c.%c..%c+%c+%c*******%c#%c@%c                        \n                                                                    %c##%c          %c#%c*%c******%c*************************%c*%c#%c#%c#%c+%c.%c...%c.%c+%c#%c***%c*%c#%c+%c..%c:%c %c %c       %c,%c*%c##%c#%c##%c#%c:%c %c %c.%c+%c %c.%c.%c..%c#%c.%c.%c+%c+%c********%c*%c#%c                        \n                                                                    %c#%c %c         %c#%c*%c*******%c********************%c*%c#%c#%c#%c+%c.%c.....%c.%c...%c#%c*%c**%c*%c#%c...%c %c@%c       %c*%c#%c#%c#%c#%c#%c###%c#%c#%c#%c#%c  %c...%c.%c*%c@%c.%c+%c*%c**********%c#%c %c                       \n                                                                              %c#%c*%c********%c***************%c*%c#%c##%c*%c.%c..%c...%c.%c..%c..%c...%c.%c#%c**%c#%c#%c..%c+%c %c,%c      %c:%c#%c#%c..%c.%c:%c:%c   %c %c %c#%c#%c#%c %c.%c.%c#%c %c#%c+%c+%c************%c#%c#%c                       \n                                                                             %c#%c*%c*********%c***********%c*%c#%c#%c#%c#%c###%c %c %c.%c.............%c#%c*%c*%c#%c..%c#%c %c       %c#%c#%c...%c:::::%c     %c %c#%c@%c  %c:%c+%c#%c*%c*************%c*%c#%c                       \n                                                                            %c#%c#%c**********%c**%c**%c**%c*%c*%c#%c#%c#%c#%c#%c@%c      %c %c %c %c...%c.%c..%c..%c...%c.%c#%c*%c#%c:%c.%c+%c %c       %c*%c#%c..%c.%c::::::%c       %c#%c %c:%c.%c.%c#%c*%c**%c**%c*%c***%c**%c**%c*%c*%c#%c                       \n                                                                           %c#%c#%c******%c*%c#%c***%c*****%c#%c#%c#%c###%c*%c.....%c     %c %c %c.%c..........%c#%c#%c#%c..%c %c,%c      %c,%c#%c.%c.%c.%c:::::::%c       %c@%c %c %c %c#%c*%c**************%c*%c#%c                       \n                                                                          %c#%c#%c*****%c*%c##%c****%c**%c#%c#%c+%c  %c###%c.%c.......%c     %c %c %c:%c.........%c+%c#%c+%c.%c %c %c       %c#%c#%c..%c:%c::::::%c:%c        %c*%c.%c#%c#%c***************%c*%c#%c                       \n                                                                         %c#%c#%c****%c#%c#%c %c#%c****%c*%c#%c#%c %c   %c*%c##%c:%c.%c.......%c      %c %c %c.%c..%c..%c.%c...%c.%c#%c.%c.%c %c.%c       %c#%c*%c..%c:::::::%c  %c %c   %c  %c %c*%c#%c#%c****************%c*%c#%c@%c                      \n                                                                        %c#%c#%c**%c*%c#%c#%c  %c#%c#%c**%c*%c#%c#%c %c     %c###%c.%c........%c       %c %c %c.......%c.%c....%c %c       %c %c#%c#%c..%c:::::%c:%c %c:::%c     %c %c#%c*%c*****************%c*%c#%c#%c                      \n                                                                      %c %c#%c*%c#%c#%c#%c %c   %c %c#%c**%c#%c#%c@%c@%c#%c     %c#%c#%c#%c.%c.......%c.%c        %c %c@%c...%c.%c...%c.%c...%c %c       %c %c#%c#%c*%c.%c::::%c@%c %c::::%c  %c  %c#%c#%c*****************%c*%c*%c**%c#%c                      \n                                                                    %c %c###%c@%c       %c#%c*%c#%c#%c  %c+%c.%c.%c     %c#%c#%c#%c.%c.%c......%c %c#%c:%c      %c %c %c...........%c %c,%c       %c.%c.%c.%c:%c   %c %c  %c#%c:%c+%c  %c %c %c#%c*%c**********%c*%c*%c******%c#%c#%c*%c*%c*%c#%c                     \n                                                                  %c@%c@%c %c           %c##%c %c   %c+%c+%c.%c     %c*%c#%c#%c.%c.%c....%c.%c %c:%c..%c.%c %c %c %c   %c %c...........%c@%c@%c       %c:%c.%c:%c:%c %c          %c@%c#%c**********%c*%c#%c*%c*******%c#%c %c#%c#%c#%c*%c#%c %c                   \n                                                                               %c@%c#%c      %c+%c.%c.%c     %c#%c##%c:%c..%c:%c %c %c %c.%c..%c      %c %c %c............%c %c       %c %c,,%c,,%c  %c %c   %c %c  %c#%c#%c********%c#%c##%c*%c********%c#%c#%c     %c %c %c@%c %c                 \n                                                                               %c@%c       %c+%c+%c.%c %c    %c*%c#%c#%c*%c+%c  %c %c       %c %c    %c %c............%c.%c@%c       %c,%c,%c,%c+%c*%c %c      %c@%c#%c*****%c*%c##%c+%c#%c#%c**********%c#%c                           \n                                                                                        %c+%c.%c.%c     %c::%c:%c:%c:%c             %c*%c#%c.............%c.%c.%c       %c,%c*%c*%c*%c*%c*%c %c    %c#%c***%c#%c#%c*%c.%c.%c#%c#%c*%c**********%c#%c#%c                           \n                                                              %c#%c                         %c@%c+%c..%c     %c:%c.%c,%c,%c,%c@%c          %c@%c@%c................%c,%c        %c:%c++%c+%c*%c**%c*%c#%c#%c*%c#%c#%c..%c+%c#%c#%c*%c*%c**********%c*%c#%c                            \n                                                              %c#%c#%c                         %c+%c...%c,%c    %c,%c,%c,,%c*%c*%c@%c    %c   %c*%c*%c.%c..................%c,%c         %c,%c.%c:%c.%c.%c#%c#%c#%c:%c...%c:%c#%c#%c************%c#%c@%c                            \n                                                              %c %c#%c#%c#%c %c                      %c+%c.%c...%c.%c    %c %c.%c*%c*%c*%c*%c*%c*%c**%c*%c**%c*%c.%c.%c.%c:%c:%c+%c+%c++%c+%c.............%c,%c,%c    %c %c,%c.%c...%c+%c#%c:%c...%c#%c#%c*************%c*%c#%c                             \n                                          %c %c#%c#####%c#%c#%c#%c#####%c@%c %c    %c#%c#%c*%c*%c#%c#%c                    %c %c+%c.....%c.%c     %c:%c*%c*%c*%c*%c*%c*%c+%c+%c %c.%c+%c+%c.%c.................................%c#%c...%c#%c*%c**************%c#%c %c                             \n                                                %c@%c#%c#%c#%c*%c******%c*%c#%c#%c#%c@%c#%c#%c***%c*%c#%c#%c@%c                 %c*%c+%c.......%c,%c         %c,%c..%c+%c+%c............%c:%c......................%c:%c.%c:%c*%c#%c***************%c#%c                              \n                                                    %c %c#%c#%c#%c**%c*%c*%c***%c*%c*%c#%c#%c*%c***%c*%c*%c#%c#%c#%c %c              %c*%c+%c...................%c:%c+%c.%c+%c.........%c:%c.%c......................%c:%c+%c@%c#%c*%c**************%c#%c#%c                              \n                                           %c %c#%c###%c#%c#%c#%c#%c#%c#%c#%c#%c##%c*%c**%c*%c***%c**%c**%c*%c***%c**%c*%c*%c#%c#%c %c             %c+%c:%c..................%c+%c:%c................................%c:%c+%c:%c+%c %c#%c*%c*******%c#%c******%c#%c@%c                              \n                                      %c %c##%c#%c*%c**%c***%c*%c***%c*%c***%c*%c***%c*%c***%c*%c***%c*%c***%c*%c***%c*%c**%c*%c#%c#%c            %c@%c+%c:%c.................%c:%c+%c:%c.......%c:%c+%c+%c:%c.%c...............%c:%c+%c+%c.%c..%c+%c %c#%c#%c*******%c#%c*%c*****%c#%c#%c                              \n                                  %c %c##%c#%c******%c*%c**%c*%c*%c*%c*%c**%c**%c*%c*%c*%c*%c**%c**%c*%c*%c*%c*%c**%c**%c*%c*%c*%c*%c**%c**%c*%c*%c*%c#%c#%c            %c@%c+%c+%c.%c................%c.%c:%c+%c+++%c+%c:%c.................%c:%c+%c+%c.%c.....%c+%c+%c %c#%c********%c#%c*%c****%c*%c#%c                              \n                              %c %c#%c#%c#%c*%c****************%c*%c*******%c*%c*******%c*%c*******%c*%c*******%c*%c#%c@%c         %c#%c#%c**%c*%c++%c:%c..................................%c.%c+%c+%c:%c.%c........%c.%c+%c %c %c#%c********%c#%c*%c****%c#%c %c                             \n                      %c#%c#####%c#%c*%c***%c*%c*%c**%c****%c*%c*%c*%c*%c*%c***%c*%c***%c*%c***%c*%c***%c*%c***%c*%c***%c*%c***%c*%c***%c*%c***%c*%c***%c#%c#%c   %c %c#%c++%c#%c#%c******%c*%c+%c++%c:%c.%c........................%c.%c:%c++%c:%c.%c.............%c+%c@%c %c@%c#%c********%c#%c#%c*%c**%c*%c#%c                             \n                        %c#%c#%c*%c********************%c*%c#%c*******%c*%c*******%c*%c*******%c*%c*******%c*%c*****%c#%c*%c+%c:%c.%c..%c#%c#%c************%c*%c*%c+%c+++%c+%c:%c:%c:%c.%c.%c.%c.%c.%c.%c.%c:%c:%c:%c+%c++%c+%c:%c.%c..........%c.%c+%c*%c#%c@%c@%c@%c@%c@%c#%c %c %c %c#%c*%c*******%c*%c##%c#%c**%c#%c %c                           \n                           %c@%c#%c#%c*%c*%c**********%c*%c#%c#%c#%c#%c**%c**%c*%c***%c**%c**%c*%c***%c**%c**%c*%c***%c**%c**%c*%c***%c**%c**%c*%c*%c+%c:%c......%c#%c******************%c#%c#%c........................%c.%c@%c@%c#%c#%c***%c*%c*%c*%c*%c*%c*%c*%c*%c@%c %c %c#%c#%c*******%c#%c#%c %c %c@%c#%c##%c %c                         \n                                %c %c@%c@%c#%c#%c#%c#%c#%c#%c*%c*%c********%c*%c*******%c*%c*******%c*%c*******%c*%c******%c*%c+%c:%c.......%c*%c#%c******************%c*%c#%c:%c+%c+%c+%c:%c.................%c*%c@%c#%c**%c#%c+%c#%c+%c*%c*%c*%c*%c*****%c*%c@%c   %c#%c#%c*%c*****%c*%c#%c                               \n                                 %c %c#%c#%c*%c*%c*%c**%c*%c*%c*%c*%c*%c**%c*%c*%c*%c**%c*%c**%c*%c*%c*%c**%c*%c**%c*%c*%c*%c**%c*%c**%c*%c*%c*%c**%c*%c**%c*%c+%c+%c.........%c#%c#%c*******************%c#%c**%c*%c*%c*%c*%c#%c@%c#%c.%c...........%c@%c#%c**%c@%c#%c*%c+%c*%c+%c*%c+%c+%c*%c******%c@%c     %c %c#%c#%c*%c****%c#%c@%c                             \n                               %c@%c#%c*%c**********************************************%c+%c:%c..........%c#%c#%c*******************%c#%c#%c+%c*%c*%c+%c#%c@%c*%c*%c@%c@%c.........%c@%c#%c**%c@%c***%c*%c#%c#%c@%c@%c@@%c@%c@@%c@%c@%c@%c@%c        %c %c#%c#%c#%c*%c*%c*%c#%c@%c                           \n                             %c@%c#%c*%c*%c*%c*%c**%c****%c*%c*%c*%c**%c*%c**%c**%c***%c*%c**%c**%c***%c*%c**%c**%c***%c*%c#%c#######%c+%c:%c.......%c....%c:%c#%c***%c*%c****************%c#%c*%c*%c*%c*%c*%c*%c#%c@%c*%c#%c@%c........%c@%c**%c@@@%c#%c*%c+%c+++++++%c+%c++%c@%c@%c               %c %c@%c@%c#%c#%c                         \n                            %c#%c#%c**************%c*%c*%c*%c*%c*%c*%c***%c*%c*%c*%c*%c*%c***%c*%c*%c*%c*%c*%c*%c#%c#%c@%c        %c*%c+%c.%c:%c.%c.%c@%c@%c#%c@%c@%c#%c#%c@%c %c#%c*%c**%c#%c*%c************%c*%c***%c#%c#%c#%c@%c@@%c@@%c@%c@%c@%c#%c......%c:%c@@%c*%c++++++++%c+%c+%c*%c*%c*%c*%c**%c*%c@%c                                             \n                          %c@%c#%c*****************%c*%c*******%c*%c*******%c*%c***%c#%c#%c           %c+%c.%c@%c*%c@%c@%c#%c#%c#%c#%c#%c#%c#%c@%c@%c.%c#%c**%c#%c#%c*%c************%c#%c#%c#%c*%c#%c#%c++++++++%c*%c@%c+%c...%c*%c@%c+%c+++++%c+%c*%c************%c@%c                                             \n                         %c#%c#%c********************%c**%c**%c*%c***%c**%c**%c*%c***%c*%c#%c %c           %c+%c+%c.%c %c@%c#%c@%c#%c@%c@@%c@%c#%c#%c@%c#%c:%c#%c#%c*%c*%c##%c#%c************%c#%c#%c*%c*%c#%c#%c#%c++++++++%c*%c@%c+%c@%c*%c++++%c+%c*%c***************%c@%c %c                                            \n                        %c#%c*%c*********************%c*%c*%c**%c*%c***%c*%c*%c**%c*%c**%c*%c#%c             %c+%c.%c+%c#%c*%c@%c#%c#%c@%c@%c@%c@%c#%c#%c@%c#%c#%c*%c+%c#%c*%c#%c+%c*%c#%c*%c***********%c#%c*******%c*%c+%c+++++%c+%c@%c+%c++++%c*%c*****************%c@%c@%c                                            \n                       %c#%c*%c********************%c*%c***%c*%c***%c*%c***%c*%c***%c*%c#%c              %c+%c.%c@%c@%c@%c@%c#%c#%c@%c@%c@%c@%c#%c@%c@%c@%c#%c+%c++%c#%c##%c++%c#%c#%c**********%c#%c#%c*********%c+++++%c@%c++++%c+%c******************%c@%c@%c                                            \n                      %c#%c#%c*%c*%c**%c*%c****%c*%c**%c*%c****%c*%c*******************%c#%c@%c              %c+%c+%c@%c@%c@%c@%c@%c@%c@%c@%c@%c@%c@@%c@%c@%c#%c**%c*%c*%c*%c#%c#%c*%c#%c*%c#%c#%c*%c*******%c*%c#%c**********%c+++%c*%c*%c+%c+%c++%c*%c******************%c#%c@%c                                            \n                     %c@%c#%c*********************%c**%c*%c***%c*%c***%c*%c***%c*%c**%c#%c               %c+%c@%c@%c#%c@%c@%c@%c@%c@%c@@%c@%c@%c@%c@%c@%c###%c#%c*%c*%c*%c*%c*%c#%c*%c**%c#%c#%c******%c*%c#%c**********%c*%c++%c*%c*%c*%c+++%c*******************%c@%c@%c                                            \n                     %c#%c*%c***********************%c*%c**%c*%c*%c*%c**%c*%c**%c*%c*%c*%c*%c#%c               %c+%c..%c.%c:%c+%c@%c@%c#%c@%c@%c@%c %c*%c*%c:%c..%c+%c@%c***%c@%c******%c*%c#%c*%c****%c#%c#%c***********%c++%c+%c#%c+%c+++%c*******************%c@%c@%c                                            \n                    %c@%c#%c***********************%c*%c***%c*%c***%c*%c***%c*%c***%c#%c               %c+%c:%c....%c.%c.%c.%c#%c.%c.%c.%c.....%c:%c@%c***%c@%c********%c#%c***%c*%c#%c************%c*%c++%c@%c#%c+++%c*******************%c@%c %c                                            \n                    %c#%c*%c**********************%c*%c**%c*%c*%c**%c**%c**%c*%c*%c**%c**%c#%c@%c              %c@%c+%c..........%c+%c.....%c:%c@%c***%c@%c********%c#%c**%c#%c#%c*************%c*%c++%c#%c@%c+++%c*%c***************%c#%c*%c*%c@%c                                             \n                    %c#%c**************************%c*%c***%c*%c***%c*%c***%c*%c**%c#%c               %c+%c..........%c+%c......%c@%c***%c@%c********%c#%c*%c#%c#%c***************%c+++%c@%c++++%c****************%c@%c@%c@%c                                             \n                    %c#%c****%c*%c**%c*%c****%c*%c**%c*%c****%c*%c***%c*%c***%c**%c**%c*%c***%c**%c**%c*%c*%c#%c              %c+%c:%c.........%c+%c......%c@%c***%c@%c*%c******%c##%c#%c*%c@%c#%c**************%c+++%c@%c+%c+++%c**%c@%c********%c*%c@%c@%c@%c#%c#%c@%c                                              \n                    %c#%c*%c*%c*%c**%c*%c**%c*%c*%c*%c**%c*%c**%c*%c*%c*%c**%c*%c*%c*%c*%c*******%c*%c*******%c*%c*%c#%c#%c             %c %c+%c...%c.%c.....%c:%c+%c.....%c@%c#%c**%c#%c#%c*****%c#%c*****%c#%c@%c@%c@@%c@@%c@%c@%c@%c@%c@%c@%c#%c#%c+++%c#%c@%c+++%c+%c#%c#%c*******%c@%c#%c#####%c#%c@%c                                             \n                    %c#%c*%c*************************%c**%c**%c*%c***%c**%c**%c*%c***%c*%c#%c#%c             %c+%c:%c.%c.%c.%c.%c.%c.%c.%c..%c+%c.....%c*%c@%c**%c*%c@%c*********%c*%c@%c@%c*%c*************%c#%c@%c@%c@%c@%c++++%c@%c*******%c#%c@%c#######%c@%c %c                                            \n                    %c#%c*%c***********************%c*%c*%c*%c***%c*%c*%c*%c*%c*%c***%c*%c*%c*%c*%c*%c*%c*%c#%c            %c %c+%c.........%c:%c+%c.....%c@%c***%c@%c*%c*******%c@%c@%c********************%c*%c#%c@%c#%c+%c@%c*******%c@%c#%c#######%c#%c@%c                                            \n                    %c#%c#%c**********************%c*%c*******%c*%c*%c#%c*****%c*%c*****%c*%c#%c            %c+%c:%c....%c.%c.%c...%c+%c+%c....%c@%c#%c**%c@%c#%c******%c@%c#%c*************************%c#%c@%c@%c*%c*****%c@%c#########%c@%c %c                                           \n                    %c %c#%c*********%c*%c*************%c*%c*%c*%c*%c*%c*%c*%c*%c*%c##%c*%c*%c*%c*%c*%c*%c*%c*%c*%c*%c*%c*%c#%c           %c %c+%c.%c.%c........%c+%c+%c...%c:%c@%c***%c@%c*****%c@%c#%c****************%c@%c************%c#%c@%c#%c***%c@%c#########%c#%c@%c                                           \n                     %c#%c*%c*****%c*%c*%c#%c*****%c*%c********%c*%c*%c*%c***%c*%c*%c*%c*%c#%c#%c**%c*%c*%c*%c*%c*%c***%c*%c*%c#%c           %c+%c.%c..........%c.%c+%c.%c..%c@%c#%c**%c@%c#%c***%c@%c@%c*****************%c@%c***************%c#%c#%c*%c@%c#%c#########%c@%c                                           \n                     %c@%c#%c******%c#%c#%c*************************%c#%c#%c***********%c#%c#%c          %c@%c+%c.%c.%c.%c.%c.%c.......%c:%c+%c.%c.%c@%c**%c*%c@%c***%c@%c******************%c@%c#%c****************%c#%c#%c#%c#########%c@%c                                           \n                      %c#%c*%c****%c#%c#%c#%c**************%c*%c***%c*%c***%c*%c***%c*%c##%c*%c*%c***%c*%c***%c*%c#%c           %c+%c..............%c:%c+%c@%c#%c**%c#%c@%c*%c@%c@%c******************%c*%c@%c*****************%c#%c@%c#########%c@%c                                           \n                       %c#%c***%c#%c##%c*%c*************%c*%c*%c*%c*%c*%c**%c*%c*%c*%c*%c*%c*%c**%c#%c@%c#%c#%c*%c*%c**%c*%c*%c*%c#%c           %c+%c:%c..............%c:%c+%c+%c#%c@%c#%c@%c*%c@%c#%c*******************%c@%c#%c*****************%c@%c#########%c@%c                                           \n                       %c@%c#%c**%c#%c %c#%c*****************%c*%c***%c*%c***%c*%c***%c*%c#%c  %c@%c#%c*%c*%c*%c**%c#%c     %c*%c+%c:%c:%c.%c.%c+%c:%c.%c.%c.%c.%c..........%c+%c:%c:::::%c:%c@%c*********************%c@%c*%c****************%c#%c@%c########%c@%c                                           \n                        %c@%c#%c#%c#%c %c#%c***************%c*******%c*%c*******%c*%c#%c   %c %c#%c*%c*%c#%c#%c    %c+%c.%c.%c.%c.%c.%c.%c+%c.%c.%c.%c.%c.%c.........%c+%c:%c:::::::%c@%c*********************%c*%c@%c*%c**%c*%c@%c@%c@%c@@%c@%c@@@%c#%c#%c***%c#%c@%c#%c#%c###%c@%c@%c                                           \n                         %c@%c#%c  %c#%c*%c*****%c*%c********%c*%c*****%c*%c*%c*%c*****%c*%c*%c*%c#%c    %c#%c#%c#%c    %c+%c.%c......%c+%c.............%c+%c+%c:::::::%c:%c@%c**********************%c#%c#%c*%c@%c#%c############%c#%c@%c#%c*****%c*%c@%c                                            \n                          %c %c  %c#%c#%c*%c**%c*%c**%c*%c*%c*%c**%c*%c*%c***%c**%c**%c*%c***%c**%c**%c*%c**%c*%c#%c   %c#%c %c    %c+%c:%c....................%c:%c+%c+%c:::::::%c:%c@%c*********************%c#%c#%c*%c#%c@%c@%c#%c#############%c#%c@%c***%c*%c@%c                                             \n                              %c#%c********************%c*%c*******%c*%c***%c#%c#%c       %c*%c+%c.%c.%c.%c.%c.....%c.%c.%c.%c........%c:%c++%c+%c::::::::%c@%c********************%c#%c#%c***%c#%c#%c %c@%c@%c@%c#%c##########%c#%c@%c*%c@%c@%c                                              \n                              %c#%c#%c*************%c*%c***%c*%c*%c*%c*%c*%c***%c*%c*%c*%c*%c*%c**%c#%c#%c      %c+%c.%c.%c.%c.%c.%c.%c.%c.%c.%c.%c.%c.%c.%c.%c.%c.....%c:%c+%c %c+%c+%c::::::::%c@%c*******************%c#%c#%c*****%c*%c#%c %c   %c %c@%c@%c@%c@%c#%c#%c#%c#%c#%c@@%c@%c                                                \n                               %c#%c*%c***********%c*********************%c#%c %c    %c+%c:%c.....%c.%c.......%c.%c.%c....%c:%c+%c  %c+%c+%c::::::::%c@%c*%c*****************%c#%c#%c********%c#%c#%c                                                               \n                                %c#%c*%c**********%c*********************%c*%c#%c   %c %c+%c................%c...%c+%c+%c   %c#%c+%c:%c:::%c:%c:::%c@%c#%c*******%c*%c*******%c#%c#%c*%c***********%c#%c#%c                                                             \n                                 %c#%c#%c*********%c**********************%c#%c %c  %c+%c:%c.%c.%c..%c.%c....%c.%c..%c.%c...%c...%c+%c    %c@%c+%c:%c:::%c:%c:::%c+%c@%c*************%c*%c#%c#%c************%c*%c#%c.%c+%c*%c                                                           \n                                  %c#%c#%c********%c**********************%c#%c#%c  %c+%c..%c.%c..%c.%c....%c.%c..%c.%c......%c+%c    %c %c+%c:%c::%c::%c::%c::%c@%c***%c*%c***%c*%c***%c*%c#%c#%c**************%c#%c:%c..%c:%c+%c                                                          \n                                   %c %c#%c*%c******%c**********************%c#%c#%c %c+%c+%c.................%c.%c.%c.%c+%c     %c+%c:%c::%c::%c:%c:::%c@%c@%c********%c*%c#%c#%c***************%c#%c#%c.%c...%c:%c+%c                                                         \n                                     %c#%c#%c*****%c**********************%c#%c#%c %c+%c..................%c..%c.%c+%c     %c+%c:::::%c:%c:::%c:%c@%c******%c#%c#%c#%c****************%c*%c#%c......%c+%c                                                         \n                                       %c#%c#%c***%c**********************%c#%c %c %c+%c..................%c...%c+%c     %c+%c::::::::::%c@%c@%c**%c#%c#%c#%c*%c******************%c#%c:%c...%c.%c..%c+%c                                                         \n                                        %c@%c#%c*%c*%c**************%c#%c******%c*%c#%c %c#%c+%c..................%c...%c+%c     %c+%c:%c:::::::%c:%c:%c@%c#%c#%c#%c*%c********************%c#%c*%c.......%c+%c                                                         \n                                          %c#%c#%c**************%c#%c******%c#%c %c %c+%c:%c.%c.......%c.%c.......%c.%c.%c...%c+%c %c    %c+%c+%c:::::::::%c*%c#%c#%c*********************%c#%c*%c.......%c.%c+%c                                                         \n                                           %c %c#%c*%c***********%c#%c#%c*****%c#%c@%c  %c+%c.%c..................%c...%c+%c+%c    %c@%c+%c::%c::%c:::%c:%c:%c:%c@%c#%c*%c*******************%c#%c+%c......%c.%c.%c+%c*%c                                                         \n                                             %c#%c#%c**********%c##%c****%c#%c@%c   %c+%c....%c.%c..%c.%c....%c.%c..%c.%c...%c.%c.%c.%c.%c+%c     %c+%c::%c::%c::%c::%c::%c@%c*%c#%c*%c****************%c*%c#%c.%c.%c.%c..%c.%c.%c..%c.%c+%c                                                          \n                                              %c#%c#%c********%c#%c@%c#%c**%c*%c#%c %c    %c+%c...................%c....%c+%c %c    %c+%c:%c:::%c:%c:%c::%c:%c:%c %c %c@%c#%c*%c**************%c#%c#%c..........%c+%c %c                                                          \n                                               %c#%c*******%c#%c#%c@%c#%c*%c#%c#%c      %c+%c.%c.%c.......%c.%c.......%c.%c.%c....%c:%c+%c    %c+%c:%c:::%c:%c::::%c %c@%c@%c %c@%c#%c*%c***********%c*%c#%c+%c..........%c+%c*%c                                                           \n                                               %c#%c#%c*****%c#%c@%c %c#%c#%c#%c       %c %c+%c.%c.%c.......%c.%c.......%c.%c.%c.%c.%c..%c.%c+%c    %c#%c+%c::::::::%c %c@%c@%c@%c@%c+%c#%c#%c********%c*%c#%c#%c..%c.%c..%c.%c.%c.%c..%c.%c+%c*%c                                                            \n                                               %c@%c#%c***%c*%c#%c %c %c#%c %c         %c %c+%c...................%c.....%c+%c+%c    %c+%c:::::::::%c %c@%c@%c@%c %c@%c#%c#%c******%c#%c#%c.%c.%c.......%c.%c..%c+%c#%c                                                             \n                                               %c#%c#%c**%c#%c#%c              %c %c+%c...................%c......%c+%c    %c+%c:%c:%c:%c:::%c:%c:::%c %c %c %c@%c@%c@%c@%c#%c#%c*%c*%c#%c*%c............%c.%c+%c %c                                                              \n                                               %c#%c*%c#%c#%c                %c %c+%c...................%c.%c..%c.%c..%c:%c+%c   %c+%c+%c::%c:::%c:%c::%c:%c %c %c %c %c@%c@@%c@%c@%c#%c*%c..%c.%c....%c.%c..%c.%c.%c.%c+%c*%c %c %c %c                                                             \n                                              %c##%c@%c                   %c+%c...................%c.......%c+%c %c  %c %c+%c::%c:%c:::%c::%c:%c*%c %c@%c@%c@%c#%c#%c#%c#%c#%c*%c*%c++%c:%c.%c...%c.%c:%c++%c@%c@%c@%c#%c#%c#%c@%c %c                                                           \n                                             %c@%c                      %c+%c....%c.%c.......%c.%c......%c.......%c.%c+%c   %c+%c:%c:%c:%c:::%c:%c:::%c %c@%c@%c#%c#%c#%c*%c*%c#%c#%c#%c#%c#%c#%c#%c#%c#%c#%c#%c*%c*%c@%c %c@%c@%c@%c#%c@%c@%c#%c                                                           \n                                                                    %c+%c..%c.%c.%c..%c.%c.%c..%c.%c.%c..%c.%c.%c..%c.%c........%c+%c+%c  %c+%c+%c:%c:::::::%c:%c %c@%c %c##%c#%c*%c#%c#%c@%c@%c@@@@@@%c@%c@%c#%c*%c*%c@%c %c@%c@%c@%c#%c@%c@%c#%c@%c %c                                                        \n                                                                    %c+%c...................%c.........%c+%c %c  %c+%c:::::::::%c@%c %c@%c@%c %c#%c*%c*%c#%c@%c@%c@@@%c@@@%c@%c@%c@%c#%c*%c@%c@%c %c@%c@%c#%c@%c#%c#%c#%c@%c                                                        \n                                                                    %c+%c.%c..................%c.........%c.%c+%c  %c+%c:%c::%c:%c:%c:%c:%c:%c:%c:%c %c %c@%c@%c#%c#%c*%c#%c@%c@%c@%c@@@@@@%c@%c@%c#%c*%c*%c@%c@%c@%c@%c@%c#%c#%c@%c %c                                                         \n                                                                    %c+%c:%c.%c.......%c.%c.......%c.%c.%c..........%c:%c+%c %c#%c+%c:::%c:%c:::%c:%c:%c %c %c@%c+%c@%c#%c*%c#%c#%c@%c@%c@@@@@@%c@%c@%c#%c#%c*%c@%c %c@%c@%c#%c#%c@%c@%c@%c %c                                                        \n                                                                    %c#%c+%c..................%c.%c.%c....%c.%c..%c.%c.%c+%c*%c %c+%c::%c::%c::%c::%c:%c@%c %c %c#%c %c#%c*%c*%c#%c@%c@%c@@@@@@%c@%c@%c@%c#%c*%c#%c %c@%c@%c#%c#%c#%c@%c %c %c                                                        \n                                                                     %c+%c..................%c............%c+%c@%c@%c+%c:%c:%c:%c:%c:%c:%c:%c:%c:%c %c %c@%c@%c#%c#%c*%c#%c#%c@%c@%c@%c@%c@%c@%c@%c@%c@%c#%c#%c*%c#%c@%c@%c %c %c %c@%c %c %c %c %c                                                       \n                                                                     %c+%c..................%c...%c.%c.......%c.%c.%c+%c %c %c+%c:%c:::::%c:%c:%c %c %c@%c %c#%c#%c*%c*%c#%c#%c@%c@%c#%c#%c#%c#%c#%c*%c*%c*%c#%c@%c@@%c %c#%c %c#%c %c %c@%c.%c+%c                                                      \n                                                                     %c+%c:%c.................%c..............%c+%c %c %c %c*%c+%c+%c:%c:%c:%c:%c+%c@%c@%c@%c#%c#%c#%c#%c*%c*%c*%c*%c*%c*%c#%c#%c@%c@%c@%c@%c@%c %c@%c#%c#%c@%c@%c#%c@%c@%c..%c:%c+%c                                                     \n                                                                     %c@%c+%c.................%c...............%c+%c          %c %c@@%c %c#%c#%c#%c#%c#%c#%c#%c@%c@%c %c@%c@%c@%c##%c@%c %c %c@%c@%c@%c@%c@%c %c %c...%c+%c+%c                                                    \n                                                                      %c#%c+%c.%c..%c.%c.%c..%c.%c.%c..%c.%c.%c..%c.%c...............%c+%c %c         %c %c %c %c@@@@@%c@%c@%c@%c@%c  %c@%c@%c*%c#%c %c@%c@%c %c %c %c*%c.%c.......%c+%c+%c                                                   \n                                                                        %c@%c+%c+%c:%c.%c...........%c............%c.%c:%c+%c@%c           %c %c %c@%c %c@%c@%c@%c@%c@%c %c@%c@%c#%c*%c:%c..%c.%c...............%c+%c+%c                                                  \n                                                                             %c@%c@%c*%c+%c+++++%c+%c+%c+++%c+%c++%c+%c+%c*%c#%c@%c %c               %c+%c+%c................................%c+%c+%c                                                 \n                                                                                                                    %c+%c.................................%c+%c+%c                                                \n                                                                                                                    %c*%c+%c.................................%c+%c@%c                                               \n                                                                                                                     %c %c+%c+%c.%c.%c....%c.%c..%c.%c....%c.%c..%c.%c....%c.%c..%c.%c....%c:%c+%c                                                \n                                                                                                                        %c %c#%c++%c+%c+%c:%c:%c.%c.%c.........%c.%c.%c.%c:%c:%c:%c+%c+%c++%c#%c %c                                                 \n                                                                                                                                   %c %c %c %c %c %c %c %c                                                              \n                                                                                                                                                                                                        \n                                                                                                                                                                                                        \n                                                                                                                                                                                                        \n                                                                                                                                                                                                        \n                                                                                                                                                                                                        \n',
	    m+'000000',m+'170F05',m+'5E4019',m+'4A3213',m+'1A1106',m+'000000',m+'434756',m+'747C96',
	    m+'62697F',m+'000000',m+'010000',m+'181006',m+'462F12',m+'5E4019',m+'6B471B',m+'764D1D',
	    m+'7E521E',m+'85551F',m+'895820',m+'8B5921',m+'8B5920',m+'895820',m+'84551F',m+'7D511E',
	    m+'734B1C',m+'67451A',m+'5E4019',m+'5B3E17',m+'1F1507',m+'020100',m+'000000',m+'291C0A',
	    m+'5E4019',m+'714B1C',m+'A26524',m+'875720',m+'614119',m+'5E4019',m+'2E1F0C',m+'000000',
	    m+'747C96',m+'BFC6D7',m+'BFC5D7',m+'9AA2B7',m+'747C96',m+'675441',m+'8A5820',m+'A26524',
	    m+'A26624',m+'A26524',m+'A26624',m+'A26524',m+'A26624',m+'A26524',m+'8E5B21',m+'69461B',
	    m+'5E4019',m+'5B3E17',m+'5A3D18',m+'5E4019',m+'84551F',m+'A26524',m+'A26624',m+'955E22',
	    m+'5E4019',m+'593C17',m+'000000',m+'040405',m+'000000',m+'211708',m+'5D4018',m+'747C96',
	    m+'BEC6D6',m+'9CA4B9',m+'747C96',m+'9C6832',m+'A16624',m+'A26624',m+'A16624',m+'A26624',
	    m+'A16624',m+'A26624',m+'A16624',m+'A26624',m+'A16624',m+'A26624',m+'A16624',m+'A26624',
	    m+'A16624',m+'A26624',m+'A16624',m+'7F521E',m+'5D4018',m+'81541F',m+'A26624',m+'A16624',
	    m+'875620',m+'5D4018',m+'0E0903',m+'000000',m+'24272F',m+'747C96',m+'BEC5D6',m+'8C93AB',
	    m+'747C96',m+'61687E',m+'000000',m+'31200C',m+'5E4018',m+'7D511E',m+'A26624',m+'A16624',
	    m+'747C96',m+'BDC4D5',m+'BEC6D6',m+'8B93AA',m+'7D859E',m+'757C96',m+'A26624',m+'A16624',
	    m+'A26624',m+'A16624',m+'A26624',m+'A16624',m+'A26624',m+'A16624',m+'A26624',m+'A16624',
	    m+'A26624',m+'A16624',m+'A26624',m+'A16624',m+'A26624',m+'A16624',m+'A26624',m+'A16624',
	    m+'A26624',m+'A16624',m+'A26624',m+'A16624',m+'A26624',m+'A16624',m+'9C6324',m+'5F4119',
	    m+'A16624',m+'A26624',m+'A16624',m+'A26624',m+'8A5820',m+'5E4018',m+'010000',m+'717991',
	    m+'7B839C',m+'BEC6D6',m+'B0B7CA',m+'757D97',m+'747C96',m+'030304',m+'000000',m+'5D4018',
	    m+'66441A',m+'A16624',m+'A26624',m+'A16624',m+'7A7A88',m+'777F99',m+'BEC6D6',m+'747C96',
	    m+'BEC6D6',m+'BEC5D6',m+'747C96',m+'6C6567',m+'5E4018',m+'5F4019',m+'67451A',m+'6E491B',
	    m+'744C1C',m+'784F1D',m+'7B501E',m+'7D511E',m+'7C501E',m+'7B501E',m+'8D5A21',m+'A16524',
	    m+'A16624',m+'A26624',m+'A16624',m+'A26624',m+'A16624',m+'A26624',m+'A16624',m+'A26624',
	    m+'A16624',m+'A26624',m+'A16624',m+'A26624',m+'A16624',m+'747C96',m+'8C94AB',m+'BEC6D6',
	    m+'AEB6C9',m+'747C96',m+'61687D',m+'000000',m+'5D4018',m+'6B471B',m+'8D5A21',m+'714A1C',
	    m+'5E4018',m+'747C96',m+'BEC6D6',m+'969EB4',m+'777F99',m+'BEC6D6',m+'99A1B6',m+'747C96',
	    m+'A16625',m+'A16624',m+'757C96',m+'868EA6',m+'BEC6D6',m+'B4BBCE',m+'BEC6D6',m+'7E869F',
	    m+'747C96',m+'000000',m+'050301',m+'5C3F17',m+'191106',m+'000000',m+'2E1F0B',m+'5E4018',
	    m+'5E4019',m+'885720',m+'A16624',m+'757C96',m+'868EA5',m+'BEC6D6',m+'747C96',m+'807678',
	    m+'A16624',m+'A26624',m+'A16624',m+'A26624',m+'A16624',m+'A26624',m+'A16624',m+'A26624',
	    m+'A16624',m+'827574',m+'757D97',m+'BEC6D6',m+'838BA3',m+'BEC6D6',m+'838BA3',m+'747C96',
	    m+'000000',m+'0A0702',m+'5D4019',m+'5E4019',m+'905C21',m+'A16525',m+'A16624',m+'A16625',
	    m+'A16624',m+'A16625',m+'A16624',m+'A16625',m+'757C96',m+'BEC6D6',m+'757C97',m+'9AA1B7',
	    m+'757C97',m+'A16625',m+'A16624',m+'A16625',m+'A16624',m+'A16625',m+'A16624',m+'A16625',
	    m+'A16624',m+'A16625',m+'A16624',m+'A16625',m+'A16624',m+'A16625',m+'A16624',m+'A16625',
	    m+'A16624',m+'757C97',m+'BEC6D6',m+'ABB2C6',m+'969EB4',m+'BEC6D6',m+'757D97',m+'636980',
	    m+'000000',m+'020100',m+'5D4019',m+'604119',m+'9F6424',m+'A16525',m+'A16624',m+'A16625',
	    m+'A16624',m+'A16625',m+'A16624',m+'777B91',m+'7C849D',m+'BEC6D6',m+'757C97',m+'BEC6D6',
	    m+'757C97',m+'887265',m+'A16624',m+'A16625',m+'A16624',m+'A16625',m+'A16624',m+'A16625',
	    m+'A16624',m+'A16625',m+'A16624',m+'A16625',m+'A16624',m+'A16625',m+'A16624',m+'A16625',
	    m+'A16624',m+'777B8F',m+'7B839C',m+'BEC6D6',m+'757C97',m+'BDC4D6',m+'8A92A9',m+'BEC6D6',
	    m+'AEB6C9',m+'757C97',m+'000000',m+'251909',m+'5D4018',m+'8B5920',m+'A16525',m+'A16625',
	    m+'757C97',m+'BEC5D6',m+'BEC6D6',m+'BCC4D5',m+'8088A1',m+'878FA6',m+'BEC6D6',m+'878FA7',
	    m+'757C96',m+'A16625',m+'757C97',m+'BEC5D6',m+'BEC6D6',m+'757C97',m+'BAC1D3',m+'767E98',
	    m+'BEC6D6',m+'757C97',m+'1A1C22',m+'000000',m+'2C1E0B',m+'5D4019',m+'9C6324',m+'A16525',
	    m+'A16624',m+'867369',m+'757D97',m+'BEC5D6',m+'BDC4D5',m+'BEC6D6',m+'828AA2',m+'757C96',
	    m+'996A3A',m+'A16624',m+'757C97',m+'BEC6D6',m+'B6BED0',m+'757C96',m+'B6BED1',m+'B6BED2',
	    m+'8C93AB',m+'A6AEC2',m+'BEC6D6',m+'757C97',m+'3A3E4B',m+'000000',m+'030200',m+'5D4019',
	    m+'925D22',m+'A16525',m+'A26525',m+'A16525',m+'A16624',m+'757C97',m+'ACB4C7',m+'BEC6D6',
	    m+'B6BDCF',m+'7A829B',m+'BEC6D6',m+'767E97',m+'797A8C',m+'A16624',m+'757C97',m+'BEC6D6',
	    m+'BAC1D3',m+'757C96',m+'B3BBD0',m+'B2BACF',m+'757C97',m+'BEC6D6',m+'757C96',m+'21232A',
	    m+'000000',m+'583B17',m+'614119',m+'A26525',m+'A16525',m+'A16625',m+'A16525',m+'A26525',
	    m+'A16525',m+'A16625',m+'A16624',m+'A16625',m+'9F672A',m+'757C97',m+'BEC6D6',m+'9BA2B7',
	    m+'838BA3',m+'BEC6D6',m+'A0A7BC',m+'757C97',m+'A16625',m+'A16624',m+'A16625',m+'A16624',
	    m+'A16625',m+'A16624',m+'A16625',m+'757C97',m+'BEC6D6',m+'757C97',m+'B0B8CE',m+'B0B9CE',
	    m+'B0B8CE',m+'B0B9CE',m+'757C97',m+'BEC6D6',m+'757C97',m+'000000',m+'5D4019',m+'875720',
	    m+'A16525',m+'A16624',m+'787B8E',m+'7A829B',m+'BEC6D6',m+'98A0B5',m+'757D97',m+'BEC5D6',
	    m+'BEC6D6',m+'BABFCD',m+'B5B9C5',m+'73788D',m+'916C4B',m+'A16624',m+'757C97',m+'BEC6D6',
	    m+'757C97',m+'A0A9C0',m+'ACB6CC',m+'ACB5CC',m+'ACB6CC',m+'9CA5BD',m+'757C97',m+'BEC6D6',
	    m+'ADB4C7',m+'757C97',m+'000000',m+'5D4018',m+'986023',m+'A16525',m+'A16625',m+'A16624',
	    m+'A16625',m+'757C97',m+'788099',m+'757D97',m+'73798F',m+'685C53',m+'5E411D',m+'5D4018',
	    m+'6A471B',m+'82541F',m+'975F23',m+'A16625',m+'A16624',m+'A16625',m+'A16624',m+'A16625',
	    m+'A16624',m+'A16625',m+'A16624',m+'A16625',m+'757C97',m+'A6AEC2',m+'BEC6D6',m+'A3AABF',
	    m+'757C97',m+'A9B3CA',m+'A9B2CA',m+'A9B3CA',m+'A9B2CA',m+'A9B3CA',m+'A9B2CA',m+'A9B3CA',
	    m+'757C97',m+'9299B0',m+'BEC6D6',m+'757C97',m+'101215',m+'000000',m+'5D4019',m+'905C21',
	    m+'A16525',m+'A16624',m+'A16524',m+'794F1D',m+'5E4018',m+'764D1D',m+'9D6324',m+'A16624',
	    m+'8D7058',m+'757C97',m+'BEC6D6',m+'757C97',m+'9099B3',m+'A6B0C8',m+'A0A9C2',m+'757C97',
	    m+'BEC6D6',m+'A2AABE',m+'757C97',m+'000000',m+'5A3D17',m+'66441A',m+'A16525',m+'8D5A21',
	    m+'A16525',m+'A16625',m+'A16624',m+'A16625',m+'A16624',m+'A16625',m+'986023',m+'5E4019',
	    m+'5D4018',m+'865620',m+'A16624',m+'A16625',m+'A16624',m+'A16625',m+'A16624',m+'A16625',
	    m+'A16624',m+'A16625',m+'A16624',m+'A16625',m+'A16624',m+'A16625',m+'A16624',m+'A16625',
	    m+'A16624',m+'A16625',m+'A16624',m+'A16625',m+'A16624',m+'A16625',m+'A16624',m+'A16625',
	    m+'A16624',m+'A16625',m+'A16624',m+'A16625',m+'A16624',m+'A16625',m+'A16624',m+'A16625',
	    m+'A16624',m+'A16625',m+'757C97',m+'BBC2D4',m+'BEC6D6',m+'757C97',m+'A2ACC6',m+'A2ADC6',
	    m+'757C97',m+'BCC3D4',m+'BEC6D6',m+'757C97',m+'000000',m+'5D4018',m+'A16525',m+'7D511E',
	    m+'5D4018',m+'724B1C',m+'A16525',m+'A16624',m+'A16524',m+'604119',m+'5E4019',m+'986023',
	    m+'A16624',m+'986A3D',m+'757C97',m+'BEC6D6',m+'BAC1D2',m+'757C97',m+'9FAAC4',m+'757C97',
	    m+'A7AEC2',m+'BEC6D6',m+'757C97',m+'000000',m+'5D4019',m+'784E1D',m+'A16525',m+'9A6223',
	    m+'5E4019',m+'573B17',m+'5D4019',m+'734B1C',m+'A16525',m+'A16625',m+'915C21',m+'5E4019',
	    m+'774E1D',m+'A16625',m+'A16624',m+'A16625',m+'A16624',m+'A16625',m+'A16624',m+'A16625',
	    m+'A16624',m+'A16625',m+'A16624',m+'A16625',m+'A16624',m+'A16625',m+'A16624',m+'A16625',
	    m+'A16624',m+'A16625',m+'A16624',m+'A16625',m+'A16624',m+'A16625',m+'A16624',m+'A16625',
	    m+'A16624',m+'A16625',m+'777B91',m+'7C849D',m+'BEC6D7',m+'B8C0D1',m+'747C97',m+'9CA7C2',
	    m+'9CA7C3',m+'757D97',m+'8A91A9',m+'BEC6D6',m+'BEC6D7',m+'BEC6D6',m+'BEC6D7',m+'BEC6D6',
	    m+'BEC6D7',m+'747C97',m+'000000',m+'5D4019',m+'A16525',m+'66441A',m+'5D4019',m+'080502',
	    m+'0F0A04',m+'5D4019',m+'9F6424',m+'A16525',m+'955E22',m+'5D4019',m+'83551F',m+'A16625',
	    m+'747C97',m+'99A1B6',m+'BEC6D7',m+'BEC5D6',m+'747C97',m+'919CB8',m+'99A4C1',m+'8089A3',
	    m+'757D97',m+'BEC6D7',m+'747C97',m+'000000',m+'5D4019',m+'A16525',m+'8D5A21',m+'5D4019',
	    m+'34230D',m+'000000',m+'2F200C',m+'5D4019',m+'935E22',m+'A16525',m+'5D4019',m+'6F491B',
	    m+'A16625',m+'757C96',m+'AAB1C5',m+'BEC6D7',m+'757D97',m+'78819B',m+'95A1BF',m+'747C97',
	    m+'BEC6D7',m+'BEC5D6',m+'747C97',m+'5C3E17',m+'000000',m+'0A0602',m+'5D4019',m+'A16525',
	    m+'794F1D',m+'5D4019',m+'070501',m+'010000',m+'483113',m+'5D4019',m+'A16524',m+'A16525',
	    m+'A16625',m+'9D6324',m+'A16625',m+'8C5921',m+'66441A',m+'5E4019',m+'6A5131',m+'898B97',
	    m+'AAB2C5',m+'BEC6D6',m+'BEC6D7',m+'BEC6D6',m+'A7AEC2',m+'747C97',m+'909CBA',m+'929EBD',
	    m+'8590AC',m+'747C97',m+'BEC6D7',m+'BEC6D6',m+'BEC6D7',m+'BEC6D6',m+'BEC6D7',m+'BEC6D6',
	    m+'7C849D',m+'777B91',m+'A16625',m+'7E521E',m+'5E4019',m+'020200',m+'000000',m+'0F0A04',
	    m+'5D4019',m+'A16525',m+'84551F',m+'5D4019',m+'020100',m+'000000',m+'5D4019',m+'69461A',
	    m+'A16525',m+'A16625',m+'81541F',m+'5E4019',m+'A16625',m+'885720',m+'5E4019',m+'5F421B',
	    m+'A09C9C',m+'BEC6D7',m+'7A829B',m+'757D97',m+'7C85A1',m+'757D97',m+'BEC6D7',m+'757C97',
	    m+'A16625',m+'614219',m+'573B17',m+'000000',m+'030201',m+'5D4019',m+'A16525',m+'5D4019',
	    m+'2B1D0B',m+'000000',m+'5D4019',m+'8C5A21',m+'A16525',m+'A16625',m+'7D511E',m+'5E4019',
	    m+'79654E',m+'5E4019',m+'A16625',m+'955F22',m+'5E4019',m+'6B5334',m+'BEC5D6',m+'BEC6D6',
	    m+'BAC0D1',m+'5D6069',m+'101113',m+'000000',m+'151618',m+'6A6E77',m+'BEC5D6',m+'BEC6D6',
	    m+'BEC6D7',m+'BEC6D6',m+'BEC5D6',m+'757D97',m+'7B839C',m+'BEC6D7',m+'0F0F11',m+'BEC6D6',
	    m+'BEC6D7',m+'BEC6D6',m+'BEC6D7',m+'BEC6D6',m+'747C97',m+'837571',m+'A16625',m+'6C471B',
	    m+'5D3F18',m+'000000',m+'5D4019',m+'A16524',m+'5D4019',m+'000000',m+'5D4019',m+'9C6223',
	    m+'A16525',m+'A16625',m+'84551F',m+'5D4019',m+'5E4019',m+'938A82',m+'BEC6D6',m+'BEC6D7',
	    m+'5E4019',m+'9A6123',m+'A16625',m+'8A5820',m+'5E4019',m+'9D9794',m+'BEC6D7',m+'33353A',
	    m+'000000',m+'0A0A0A',m+'B7B7B7','',m+'7B7B7B',m+'000000',m+'020202',m+'BCC3D3', m +
	    'BEC6D7',m+'BEC6D6',m+'BEC6D7',m+'6D717A',m+'000000',m+'BEC6D7',m+'BEC6D6',m+'BEC6D7', m +
	    '7E869F',m+'757C94',m+'A16625',m+'5E4019',m+'201608',m+'000000',m+'5D4019',m+'000000', m +
	    '5D4019',m+'9F6424',m+'A16525',m+'A16625',m+'976023',m+'6C481B',m+'5E4019',m+'5F411B', m +
	    '9A938F',m+'BEC6D6',m+'BEC6D7',m+'BEC6D6',m+'867768',m+'5E4019',m+'A16625',m+'A16524', m +
	    '5E4019',m+'897C6F',m+'BEC6D7',m+'A6ACBA',m+'000000',m+'0D0D0D', '',m+'F2F9F2',m+'43AD48',
	    m+'0A9411',m+'099411',m+'0A9411',m+'099411',m+'89CB8C',m+'060606',m+'000000',m+'BEC6D6',
	    m+'6F737D',m+'000000',m+'BEC5D6',m+'BEC6D6',m+'BEC6D7',m+'4A4D54',m+'BEC6D6',m+'BEC6D7',
	    m+'79819B',m+'777B91',m+'A16625',m+'A16524',m+'5D4019',m+'000000',m+'573B16',m+'030200',
	    m+'000000',m+'5D4019',m+'9E6424',m+'A16525',m+'A16625',m+'9B6223',m+'724B1C',m+'5E4019',
	    m+'5D4019',m+'8A7D70',m+'BEC5D6',m+'BEC6D6',m+'BEC6D7',m+'BEC6D6',m+'5E4019',m+'8F5B21',
	    m+'A16625',m+'8A5820',m+'5E4019',m+'BEC6D6',m+'000000',m+'121212', '',m+'2EA334', m +
	    '0A9410',m+'0A9411',m+'0A9410',m+'0A9411',m+'099411',m+'0A9411',m+'0A9410',m+'0A9411', m +
	    '0A9410',m+'08840F',m+'000000',m+'BEC6D6',m+'BEC6D7',m+'676B74',m+'1A1B1D',m+'BEC5D6', m +
	    '747C97',m+'8C705A',m+'A16625',m+'5D4019',m+'050301',m+'000000',m+'5D4019',m+'986023', m +
	    'A16525',m+'A16625',m+'A16524',m+'7D511E',m+'5D4019',m+'7E6E5C',m+'BCC2D2',m+'BEC6D6', m +
	    'BEC6D7',m+'BEC6D6',m+'BEC6D7',m+'BEC6D6',m+'BEC6D7',m+'BEC6D6',m+'5D4019',m+'A16625', m +
	    '81531F',m+'5D4019',m+'BEC6D7',m+'727680',m+'000000',m+'F1F1F1', '',m+'91CF94',m+'0A9411',
	    m+'219E27',m+'B7E0B9',m+'B7DFB9',m+'B6B9B6',m+'ACADAC',m+'000500',m+'000400',m+'000A00',
	    m+'099310',m+'0A9411',m+'099310',m+'000000',m+'B9C0D0',m+'BEC6D6',m+'383A3F',m+'000000',
	    m+'404248',m+'788099',m+'787B8F',m+'A16625',m+'65441A',m+'593C17',m+'000000',m+'5D4019',
	    m+'885720',m+'A16525',m+'A16625',m+'A06524',m+'714A1C',m+'5E4019',m+'584518',m+'1E7F12',
	    m+'0A9411',m+'011101',m+'000000',m+'B9C0D0',m+'BEC6D7',m+'5E4019',m+'A16625',m+'9D6324',
	    m+'5E4019',m+'BEC6D7',m+'383A3F',m+'000000', '',m+'249F2B',m+'0A9411',m+'B7E0B9', m +
	    'B6B7B6',m+'000500',m+'000E01',m+'0A9411',m+'07630C',m+'000000',m+'9196A3',m+'767E98', m +
	    '64513D',m+'9E6424',m+'A16625',m+'8C5A21',m+'5D4019',m+'000000',m+'5D4019',m+'734B1C', m +
	    'A16525',m+'A16625',m+'A16624',m+'A16625',m+'A16624',m+'A16625',m+'7F521E',m+'5E4019', m +
	    '5A4318',m+'198412',m+'0A9411',m+'044908',m+'000400',m+'000F01',m+'000000',m+'070808', m +
	    'BEC6D7',m+'BEC6D6',m+'BEC6D7',m+'BEC6D6',m+'BEC6D7',m+'BEC6D6',m+'5E4019',m+'A16625', m +
	    '5D4019',m+'B0B1B9',m+'BEC6D7',m+'737781',m+'000000', '',m+'3DAA43',m+'0A9311',m+'B7E0B9',
	    m+'B7DFB9',m+'B6B7B6',m+'000500',m+'0A9311',m+'000000',m+'9197A4',m+'BEC6D6',m+'B9BECC',
	    m+'5D4019',m+'A16625',m+'A16624',m+'A16625',m+'A16624',m+'A16625',m+'A16624',m+'A16625',
	    m+'A16624',m+'A16524',m+'5D4019',m+'000000',m+'593D17',m+'65441A',m+'A16525',m+'A16524',
	    m+'6C481B',m+'A16525',m+'A16625',m+'6F491C',m+'5E4019',m+'586C2F',m+'0A9411',m+'33A639',
	    m+'C3C3C3',m+'000400',m+'000200',m+'000000',m+'B9BFD0',m+'BEC6D7',m+'5E4019',m+'83541F',
	    m+'5E4019',m+'BEC6D7',m+'000000',m+'F2F2F2', '',m+'F5FAF5',m+'0A9411',m+'B7E0BA', m +
	    'B7E0B9',m+'B7E0BA',m+'B6B7B6',m+'000500',m+'076A0C',m+'052407',m+'000000',m+'0E0E10', m +
	    '5E4019',m+'915C22',m+'A16625',m+'A16525',m+'5D4019',m+'000000',m+'533816',m+'614119', m +
	    'A16525',m+'9E6424',m+'5D4019',m+'A16525',m+'A16625',m+'7D511E',m+'5E4019',m+'9A876F', '',
	    m+'0A9411',m+'BAE0BC',m+'C3C3C3',m+'000400',m+'000300',m+'000000',m+'9DA3B1',m+'BEC6D7',
	    m+'9A9490',m+'5E4019',m+'867869',m+'BEC6D7',m+'0E0E10',m+'000000', '',m+'0D9714', m +
	    '0F9716',m+'B9E0BB',m+'B6B8B6',m+'B6B7B6',m+'A7A8A7',m+'000500',m+'41A44D',m+'BEC6D7', m +
	    '5E4019',m+'724B1C',m+'A16625',m+'A16525',m+'5D4019',m+'000000',m+'573B17',m+'634219', m +
	    'A16525',m+'7F521E',m+'5D4019',m+'0A0602',m+'5D4019',m+'A16525',m+'A16524',m+'5E4019', m +
	    '5F411A', '', '',m+'48AF4D',m+'099411',m+'95D098',m+'C4D7C5',m+'C3C3C3',m+'000400', m +
	    '000300',m+'000000',m+'B6BDCD',m+'BEC6D7',m+'BEC6D6',m+'BEC6D7',m+'BEC6D6',m+'BEC6D7', m +
	    '5D4019',m+'BEC5D6',m+'BEC6D6',m+'000000',m+'C7C7C7', '',m+'139C1A',m+'43B049',m+'BBE2BD',
	    m+'B6B7B6',m+'000400',m+'000500',m+'000400',m+'000500',m+'000400',m+'4BA958',m+'5D4019',
	    m+'7E521E',m+'A16625',m+'A16525',m+'5D4019',m+'1D1307',m+'000000',m+'5D4019',m+'744C1C',
	    m+'A16525',m+'905C21',m+'5D4019',m+'563B16',m+'000000',m+'5D4019',m+'7E521E',m+'A16525',
	    m+'A06524',m+'5D4019',m+'4E3514',m+'000000', '',m+'0A9411',m+'C4E4C7',m+'C3C3C3', m +
	    '000400',m+'000300',m+'000000',m+'BEC6D7',m+'BEC6D6',m+'BEC6D7',m+'000000', '', '', m +
	    '19A220',m+'1FA426',m+'BCE3BE',m+'B6B7B6',m+'B5B6B5',m+'090E0A',m+'B6B7B6',m+'000501', m +
	    '0F0E04',m+'5E4019',m+'9E6324',m+'A16625',m+'A16525',m+'83551F',m+'5D4019',m+'000000', m +
	    '080502',m+'5D4019',m+'9D6324',m+'84551F',m+'5D4019',m+'5C3E17',m+'010100',m+'000000', m +
	    '0A0702',m+'5D4019',m+'A16525',m+'5E4019',m+'553B19',m+'2A2D36',m+'2C2E32',m+'303236', '',
	    m+'0A9411',m+'0B9512',m+'239F29',m+'C5E6C7',m+'C3C3C3',m+'BABABA',m+'000400',m+'000000',
	    m+'27282C',m+'BEC6D6',m+'BEC6D7',m+'BEC6D6',m+'BEC6D7',m+'BEC6D6',m+'000000', '', '', m +
	    '1FA727',m+'1FA827',m+'32AF3A',m+'BEE5C0',m+'B6B7B6',m+'141814',m+'010501',m+'B6B7B6', m +
	    '000401',m+'000501',m+'573B17',m+'5F4019',m+'A16625',m+'A16524',m+'A16625',m+'A16525', m +
	    '5D4019',m+'000000',m+'020100',m+'5D4019',m+'231708',m+'000000',m+'5D4019',m+'976023', m +
	    '6D481B',m+'5D4019',m+'000000',m+'757D97',m+'BEC5D6',m+'BEC6D6', '',m+'109917',m+'109A18',
	    m+'119B19',m+'C7E6C8',m+'C3C8C3',m+'C3C3C3',m+'000400',m+'3D403D',m+'9EA09E',m+'000501',
	    m+'000400',m+'000000',m+'BEC6D6',m+'000000',m+'ECECEC', '',m+'9CEFA4',m+'9EEFA6', m +
	    '9DEFA5',m+'91EE9A',m+'010601',m+'010501',m+'010601',m+'4A4D4A',m+'B6B7B6',m+'787A78', m +
	    '010601',m+'010501',m+'040801',m+'5E4019',m+'915C22',m+'A16625',m+'9F6424',m+'895820', m +
	    'A16625',m+'5E4019',m+'704A1C',m+'A16525',m+'A26525',m+'9B6223',m+'5D4019',m+'000000', m +
	    '241909',m+'412D11',m+'090602',m+'000000',m+'5D4019',m+'130D05',m+'000000',m+'697188', m +
	    '7A829B',m+'BEC6D7', '',m+'4FB655',m+'169F1D',m+'16A01E',m+'C8E8C9',m+'C7E7C9',m+'C3C3C3',
	    m+'C2C3C2',m+'000501',m+'ABACAB',m+'C3C3C3',m+'C2C3C2',m+'000501',m+'000401',m+'000501',
	    m+'010501',m+'000000',m+'BEC6D7',m+'121314',m+'111111', '',m+'91EE9A',m+'98EFA1', m +
	    '97EE9F',m+'94EE9C',m+'09140A',m+'010601',m+'3C2B10',m+'5E4019',m+'A16625',m+'905C21', m +
	    '5E4019',m+'9D6324',m+'A16625',m+'5E4019',m+'000000',m+'5C3E17',m+'5D4019',m+'81541F', m +
	    '9D6324',m+'5D4019',m+'060401',m+'000000',m+'452F12',m+'5D4019',m+'000000',m+'757D97', m +
	    'BEC6D7',m+'C6CCDB', '',m+'1CA424',m+'1CA524',m+'7ECC82',m+'C3C4C3',m+'9E9F9E',m+'010602',
	    m+'000501',m+'010501',m+'C2C3C2',m+'C3C4C3',m+'010501',m+'010401',m+'000000',m+'BEC6D7',
	    m+'000000', '', '',m+'D3FAD6',m+'D4FAD7',m+'010501',m+'010601',m+'010501',m+'010601', m +
	    '010501',m+'583C17',m+'614219',m+'A16625',m+'84551F',m+'5D4019',m+'A06524',m+'A16625', m +
	    '744C1C',m+'5D4019',m+'000000',m+'090602',m+'160E05',m+'1B1206',m+'020100',m+'000000', m +
	    '422D11',m+'000000',m+'6D758E',m+'7D859E',m+'BEC6D7', '', '',m+'3FB546',m+'21AA2A', m +
	    '23AB2B',m+'35B53D',m+'61D069',m+'010501',m+'010401',m+'010501',m+'010401',m+'010501', m +
	    '000000',m+'BEC6D7',m+'B6BDCD',m+'161616', '',m+'EBFCEC',m+'D6FAD8',m+'D3FAD6',m+'5BCB63',
	    m+'35BD3F',m+'010702',m+'010602',m+'4A3414',m+'5F4019',m+'A16625',m+'8C5A21',m+'5E4019',
	    m+'897B6D',m+'5E4019',m+'66441A',m+'A16625',m+'5E4019',m+'000000',m+'747C97',m+'BEC5D6',
	    m+'BEC6D6', '',m+'92EE9B',m+'93EE9C',m+'94EE9C',m+'91EE99',m+'010501',m+'2BA033', m +
	    '44474D',m+'BEC6D6',m+'BAC1D2',m+'CECECE', '',m+'ECF9ED',m+'3EC348',m+'3CC346',m+'3BC245',
	    m+'3EC347',m+'3BC245',m+'091E0A',m+'020602',m+'5D4019',m+'A16625',m+'764D1D',m+'5D4019',
	    m+'79664F',m+'BEC5D6',m+'BEC6D6',m+'634723',m+'5E4019',m+'A16524',m+'A16625',m+'634219',
	    m+'543916',m+'000000',m+'5E4019',m+'000000',m+'1F2128',m+'747C96',m+'BEC6D6', '', m +
	    '97EEA0',m+'99EFA1',m+'D1F9D4',m+'D3FAD6',m+'D5FAD8',m+'1C251C',m+'010501',m+'19571E', m +
	    '17501B',m+'BEC6D6',m+'F5F6F9', '',m+'96E09C',m+'54CD5D',m+'4ACA54',m+'41C84B',m+'41C74B',
	    m+'40C74B',m+'52752C',m+'64431A',m+'A16624',m+'624219',m+'5E401A',m+'BEC5D6',m+'857666',
	    m+'5E4019',m+'794F1D',m+'A16624',m+'9E6324',m+'A16624',m+'A16524',m+'5E4019',m+'000000',
	    m+'5E4019',m+'5D4019',m+'000000',m+'747C96',m+'BEC6D6',m+'F6F7F9', '',m+'D6FAD9', m +
	    'D4FAD7',m+'D3FAD6',m+'37BD40',m+'36BD40',m+'113114',m+'010502',m+'010602',m+'3BC245', m +
	    '3CC346',m+'B8BFCF',m+'BEC6D6',m+'F3F4F7', '',m+'E9F9EB',m+'A9E7AE',m+'9AE39F',m+'A7E7AC',
	    m+'CAE3D4',m+'664C2A',m+'774E1D',m+'5E4019',m+'ABAAB0',m+'BEC6D6',m+'A9A8AD',m+'5E4019',
	    m+'81531F',m+'A16624',m+'5E4019',m+'1B1207',m+'000000',m+'020200',m+'5E4019',m+'6E491B',
	    m+'5D4019',m+'020100',m+'000000',m+'747C96',m+'AEB5C8',m+'BEC6D6',m+'C0C7D8', '', '', m +
	    'BBF0BF',m+'42C44B',m+'40C349',m+'3BC245',m+'40C449',m+'3DC446',m+'3DC447',m+'3EC548', m +
	    '3FC649',m+'40C74A',m+'41C84B',m+'B5BCCB',m+'BEC6D6',m+'B9C0D1',m+'9BA3B8',m+'8A91A9', m +
	    '7E869F',m+'777F98',m+'747C96',m+'878FA7',m+'BEC6D6',m+'D6DAE5',m+'F3F5F8', '', '', m +
	    'E5E8EF',m+'C5CBDA',m+'BEC6D6',m+'8C8074',m+'5E4018',m+'B1B3BC',m+'BEC6D6',m+'5E4019', m +
	    '6B471B',m+'A16624',m+'986023',m+'5E4018',m+'000000',m+'170F06',m+'593C17',m+'5E4019', m +
	    '614119',m+'624219',m+'604119',m+'5E4019',m+'3D290F',m+'110C04',m+'000000',m+'593C17', m +
	    '734B1C',m+'A16625',m+'8E5A21',m+'5E4019',m+'563B16',m+'000000',m+'0E0F12',m+'747C96', m +
	    'BEC6D6',m+'C4CBDA', '',m+'86DB8D',m+'41C84B',m+'41C84C',m+'42C94C',m+'43C94D',m+'43CA4E',
	    m+'44CB4E',m+'45CB4F',m+'4CCE56', '',m+'BEC6D6',m+'767E98',m+'788099',m+'BEC5D6', m +
	    'BEC6D6',m+'5E4019',m+'BEC6D6',m+'5E4019',m+'875720',m+'A16624',m+'5E4019',m+'110B04', m +
	    '000000',m+'211608',m+'5D4019',m+'5E4019',m+'7A501E',m+'A16524',m+'A16624',m+'9F6424', m +
	    '7E521E',m+'5E4019',m+'5D4019',m+'30200C',m+'5B3E18',m+'6D481B',m+'A16624',m+'955F22', m +
	    '5F4019',m+'5E4019',m+'1B1207',m+'000000',m+'656B82',m+'788099',m+'BEC6D6',m+'D4D8E4', '',
	    m+'E2E6ED',m+'BEC6D6',m+'858DA5',m+'757D97',m+'BEC6D6',m+'A4ABBF',m+'BEC6D6',m+'ACADB3',
	    m+'BEC6D6',m+'ABB2C5',m+'665648',m+'5E4019',m+'A16624',m+'5E4018',m+'000000',m+'040301',
	    m+'563B16',m+'5E4019',m+'84551F',m+'A16624',m+'A16524',m+'A16625',m+'A16624',m+'A16625',
	    m+'9F6424',m+'724B1C',m+'5F4119',m+'A16625',m+'A16624',m+'A16625',m+'A16624',m+'80531F',
	    m+'5E4019',m+'5C3E17',m+'040301',m+'000000',m+'4A5061',m+'757D97',m+'BEC6D6',m+'8991A9',
	    m+'757D97',m+'BEC6D6',m+'7A829B',m+'BEC6D6',m+'A3ABBF',m+'BCC3D4',m+'BEC6D6',m+'ABB2C5',
	    m+'747C96',m+'22242C',m+'5E4019',m+'8D5A21',m+'A16624',m+'7B501E',m+'5E4019',m+'000000',
	    m+'181006',m+'563B16',m+'5E4019',m+'69461A',m+'714A1C',m+'744C1C',m+'734B1C',m+'6D481B',
	    m+'66441A',m+'5E4019',m+'5D4019',m+'5E4019',m+'895820',m+'A16624',m+'A16625',m+'A16624',
	    m+'A16625',m+'A16624',m+'A16625',m+'A16624',m+'A16625',m+'A16624',m+'9E6324',m+'634219',
	    m+'5E4019',m+'100B04',m+'000000',m+'747C96',m+'9FA6BB',m+'BEC6D6',m+'747C96',m+'8E96AD',
	    m+'BEC6D6',m+'8F97AD',m+'747C96',m+'9FA7BC',m+'747C96',m+'000000',m+'5E4019',m+'915C22',
	    m+'A16624',m+'604119',m+'A16624',m+'5E4019',m+'493112',m+'000000',m+'100B04',m+'5E4018',
	    m+'744C1D',m+'9D6324',m+'A16624',m+'A16625',m+'A16624',m+'A16625',m+'A16624',m+'A16625',
	    m+'A16624',m+'A16625',m+'A16624',m+'A16625',m+'A16624',m+'A16625',m+'A16624',m+'A16625',
	    m+'A16624',m+'A16625',m+'A16624',m+'A16625',m+'A06524',m+'5F4019',m+'5E4019',m+'000000',
	    m+'131519',m+'747C96',m+'9DA5BA',m+'BEC6D6',m+'98A0B6',m+'747C96',m+'9FA6BB',m+'BEC6D6',
	    m+'A3ABBF',m+'757D97',m+'747C96',m+'9199AF',m+'BDC4D5',m+'BEC6D6',m+'ABB3C6',m+'747C96',
	    m+'79819B',m+'BEC5D6',m+'BEC6D6',m+'747C96',m+'000000',m+'4E3514',m+'614119',m+'A16624',
	    m+'64431A',m+'9B6223',m+'A16624',m+'634319',m+'563A16',m+'000000',m+'090602',m+'5E4018',
	    m+'7F521E',m+'A16624',m+'A16625',m+'A16624',m+'A16625',m+'A16525',m+'A16624',m+'A16524',
	    m+'A16625',m+'A16624',m+'A16625',m+'A16525',m+'A16624',m+'A16524',m+'A16625',m+'A16624',
	    m+'A16625',m+'A16525',m+'A16624',m+'A16524',m+'A16625',m+'A16624',m+'A16625',m+'A16525',
	    m+'A16624',m+'A16524',m+'A16625',m+'A16624',m+'A16625',m+'A16525',m+'A16624',m+'6D481B',
	    m+'5E4019',m+'000000',m+'3C2C19',m+'747C96',m+'767E98',m+'BBC2D3',m+'BEC6D6',m+'BEC5D6',
	    m+'949CB2',m+'757D97',m+'747C96',m+'7F869F',m+'A4ABBF',m+'BEC6D6',m+'A2A9BD',m+'747C96',
	    m+'767E98',m+'B8BFD1',m+'BEC6D6',m+'7C849D',m+'6C748D',m+'000000',m+'5E4019',m+'A16624',
	    m+'5E4019',m+'A06524',m+'A16624',m+'925D22',m+'5E4019',m+'000000',m+'090602',m+'593C17',
	    m+'5E4018',m+'744C1C',m+'A16524',m+'A16624',m+'A16625',m+'A16624',m+'A16625',m+'A16624',
	    m+'A16625',m+'A16624',m+'A16625',m+'A16624',m+'A16625',m+'5E4019',m+'3A270F',m+'000000',
	    m+'5E4018',m+'704A1C',m+'A16624',m+'916E4F',m+'747C96',m+'A3AABF',m+'BEC6D6',m+'AEB5C8',
	    m+'79819A',m+'747C96',m+'8E96AC',m+'BEC5D6',m+'BEC6D6',m+'BEC5D6',m+'747C96',m+'000000',
	    m+'0E0A03',m+'5E4018',m+'A16624',m+'5E4018',m+'8A5920',m+'A16624',m+'5E4018',m+'070501',
	    m+'000000',m+'4E3414',m+'5E4018',m+'66441A',m+'885720',m+'A16624',m+'A26624',m+'A16624',
	    m+'A26624',m+'A16624',m+'A26624',m+'A16624',m+'A26624',m+'A16624',m+'A16625',m+'A16624',
	    m+'8A5920',m+'A16624',m+'A16625',m+'A16624',m+'A16625',m+'A16624',m+'A16625',m+'A16624',
	    m+'A16625',m+'A16624',m+'A16625',m+'A16624',m+'A16625',m+'A16624',m+'A16625',m+'A16624',
	    m+'A16625',m+'A16624',m+'64431A',m+'593C17',m+'000000',m+'020303',m+'404452',m+'747C96',
	    m+'5E4018',m+'7C501E',m+'A16624',m+'A16625',m+'867369',m+'747C96',m+'8991A8',m+'B0B7CA',
	    m+'BEC6D6',m+'B5BCCE',m+'8C94AB',m+'747C96',m+'949CB2',m+'BEC5D6',m+'BEC6D6',m+'747C96',
	    m+'141519',m+'000000',m+'1A1207',m+'5E4018',m+'A16624',m+'6D481B',m+'5E4018',m+'A16524',
	    m+'A16624',m+'A16524',m+'5E4018',m+'000000',m+'513715',m+'5E4019',m+'945E22',m+'A16624',
	    m+'8C5A21',m+'614119',m+'A16624',m+'A16524',m+'A16624',m+'A16524',m+'A16624',m+'A16524',
	    m+'A16624',m+'A16524',m+'A16624',m+'5E4019',m+'5C5E6B',m+'747C96',m+'8B92AA',m+'BEC5D6',
	    m+'BEC6D6',m+'6A5131',m+'634219',m+'A16624',m+'A16625',m+'916E4D',m+'7F777D',m+'747C96',
	    m+'7C839D',m+'8E95AC',m+'9DA4B9',m+'A9B0C4',m+'B3BACC',m+'B9C1D2',m+'BDC4D5',m+'BEC5D6',
	    m+'BDC4D5',m+'B9C1D2',m+'B2BACC',m+'A8B0C3',m+'9CA3B8',m+'8C94AB',m+'79819A',m+'747C96',
	    m+'7E869E',m+'A0A8BC',m+'BEC5D6',m+'BEC6D6',m+'AFB6C7',m+'7B8495',m+'525D6C',m+'333E4E',
	    m+'192534',m+'182433',m+'182333',m+'182433',m+'1B2737',m+'374254',m+'000001',m+'000000',
	    m+'010000',m+'5E4019',m+'996023',m+'A16624',m+'8E5B21',m+'5E4019',m+'7A501E',m+'A16624',
	    m+'5E4019',m+'140E05',m+'000000',m+'432E11',m+'5E4018',m+'63431A',m+'885720',m+'A16524',
	    m+'A16624',m+'9F6424',m+'83551F',m+'614219',m+'5E4019',m+'7C511E',m+'A16625',m+'A16624',
	    m+'A16625',m+'A16624',m+'A16625',m+'A16624',m+'A16625',m+'A16624',m+'A16625',m+'A16624',
	    m+'A16625',m+'A16624',m+'A16625',m+'A16624',m+'A16625',m+'A16624',m+'A16625',m+'A16624',
	    m+'A16625',m+'986A3D',m+'757C96',m+'8B92AA',m+'BEC6D6',m+'5E4019',m+'A16624',m+'7B501E',
	    m+'5E4018',m+'BEC6D6',m+'B1B9C9',m+'232F3E',m+'182433',m+'223044',m+'364966',m+'405476',
	    m+'405575',m+'4A5C72',m+'3F5475',m+'3E5374',m+'3F5374',m+'3F5475',m+'405476',m+'3E5373',
	    m+'182433',m+'070B10',m+'000000',m+'4E3514',m+'5E4019',m+'A16624',m+'7D511E',m+'5E4019',
	    m+'000000',m+'0A0702',m+'493213',m+'5E4018',m+'5E4019',m+'030200',m+'000000',m+'0A0602',
	    m+'1F1508',m+'37250E',m+'513815',m+'5E4018',m+'5E4019',m+'67451A',m+'714A1C',m+'7F521E',
	    m+'915C22',m+'A16524',m+'A16624',m+'A16625',m+'A16624',m+'A16625',m+'A16624',m+'A16625',
	    m+'A16624',m+'A16625',m+'A16624',m+'9F672B',m+'757D97',m+'98A0B5',m+'BEC6D6',m+'756047',
	    m+'604119',m+'A16624',m+'925D22',m+'5E4019',m+'949CAC',m+'757E8F',m+'707989',m+'7E8797',
	    m+'9FA7B8',m+'BEC6D6',m+'646E7E',m+'182333',m+'374A67',m+'405476',m+'30415B',m+'8E8C5E',
	    m+'2E3941',m+'8E8C5E',m+'3D5272',m+'405476',m+'687169',m+'5D696C',m+'405476',m+'3F5475',
	    m+'182433',m+'000000',m+'543915',m+'5E4019',m+'9E6424',m+'A16624',m+'915D22',m+'5E4019',
	    m+'000000',m+'181006',m+'5E4018',m+'82541F',m+'A26624',m+'A16624',m+'A26624',m+'A16624',
	    m+'A26624',m+'A16624',m+'A26624',m+'A16624',m+'A16625',m+'A16624',m+'A16524',m+'A16625',
	    m+'A16524',m+'A16624',m+'A16625',m+'A16624',m+'A16524',m+'A16625',m+'A16524',m+'A16624',
	    m+'A16625',m+'A16624',m+'A16524',m+'A16625',m+'A16524',m+'A16624',m+'A16625',m+'A16624',
	    m+'A16524',m+'A16625',m+'A16524',m+'A16624',m+'A16625',m+'A16624',m+'A16524',m+'7B7987',
	    m+'757D97',m+'BEC6D6',m+'5E4019',m+'7F521E',m+'A16624',m+'5E4019',m+'405476',m+'405575',
	    m+'54646F',m+'415575',m+'3D5171',m+'27374D',m+'182333',m+'293443',m+'BEC5D6',m+'BEC6D6',
	    m+'182433',m+'2C3D55',m+'405476',m+'182534',m+'2C3D55',m+'405476',m+'8E8C5E',m+'405575',
	    m+'8E8C5E',m+'405476',m+'8D8C5E',m+'87885F',m+'717866',m+'405476',m+'182433',m+'000000',
	    m+'110C04',m+'5E4019',m+'66441A',m+'9F6424',m+'A16624',m+'5E4019',m+'402B11',m+'000000',
	    m+'2F1F0C',m+'5E4018',m+'996123',m+'A16624',m+'757D96',m+'8C94AB',m+'BEC6D6',m+'5F411B',
	    m+'734C1C',m+'A16624',m+'614119',m+'5C4526',m+'818361',m+'405476',m+'475A73',m+'818361',
	    m+'243347',m+'182433',m+'3E5374',m+'405476',m+'1E2B3D',m+'192434',m+'BEC6D6',m+'182433',
	    m+'2A3A51',m+'405476',m+'182333',m+'405476',m+'3F5475',m+'324460',m+'26364B',m+'1C2939',
	    m+'182333',m+'182433',m+'182333',m+'182433',m+'1E2935',m+'182333',m+'162130',m+'111A25',
	    m+'000000',m+'030200',m+'503614',m+'5E4019',m+'64431A',m+'885720',m+'A16524',m+'9B6223',
	    m+'5E4018',m+'281B0A',m+'000000',m+'1A1107',m+'5E4018',m+'9A6123',m+'A16624',m+'A26624',
	    m+'A16624',m+'A26624',m+'A16624',m+'A26624',m+'A16624',m+'A26624',m+'A16625',m+'A16624',
	    m+'A16625',m+'A16624',m+'A16625',m+'A16624',m+'A16625',m+'A16624',m+'A16625',m+'A16624',
	    m+'A16625',m+'A16624',m+'A16625',m+'976023',m+'734C1C',m+'5E4019',m+'757D96',m+'939BB1',
	    m+'BEC6D7',m+'BEC6D6',m+'A5A2A4',m+'5E4019',m+'A16624',m+'9B6223',m+'A16624',m+'5E4019',
	    m+'455166',m+'526270',m+'53636F',m+'4A5C72',m+'405475',m+'405476',m+'2F415A',m+'1B2839',
	    m+'405476',m+'384B68',m+'182333',m+'BEC6D6',m+'182333',m+'405476',m+'182433',m+'2B353A',
	    m+'656951',m+'969564',m+'989664',m+'979664',m+'989664',m+'263138',m+'162130',m+'000000',
	    m+'090602',m+'211608',m+'3E2A10',m+'583C17',m+'5C3E17',m+'000000',m+'5E4018',m+'82541F',
	    m+'A16624',m+'A16524',m+'A16624',m+'A16524',m+'A16624',m+'A16524',m+'A16624',m+'A16524',
	    m+'A16624',m+'A16524',m+'A16624',m+'A16524',m+'A16624',m+'A16524',m+'A16624',m+'A16524',
	    m+'A16624',m+'A16524',m+'A16624',m+'A16524',m+'764D1D',m+'5E4019',m+'30200C',m+'000000',
	    m+'60687D',m+'788099',m+'BEC5D6',m+'9AA0AE',m+'AFB6C6',m+'BEC5D6',m+'1C1C1D',m+'242323',
	    m+'44464C',m+'1B1B1B',m+'1F1E1E',m+'353636',m+'343535',m+'252424',m+'030303',m+'5E4019',
	    m+'9A6123',m+'A16624',m+'6A471B',m+'9C6324',m+'A16624',m+'925D22',m+'A16624',m+'5E4018',
	    m+'353530',m+'303A3C',m+'242E37',m+'182433',m+'182333',m+'182433',m+'202E41',m+'182433',
	    m+'384352',m+'BEC6D6',m+'8B93A4',m+'182433',m+'5C614D',m+'989664',m+'959565',m+'7C826A',
	    m+'67726E',m+'566571',m+'4A5C74',m+'415675',m+'405575',m+'3D5272',m+'182333',m+'000000',
	    m+'3B280F',m+'5E4018',m+'A16624',m+'A16625',m+'A16624',m+'A16625',m+'A16624',m+'A16625',
	    m+'A16624',m+'64431A',m+'5E4019',m+'000000',m+'757D96',m+'BEC6D6',m+'101316',m+'6D6765',
	    m+'272B2F',m+'1F1F1F',m+'424444',m+'125B58',m+'08615D',m+'08605C',m+'085D5A',m+'096460',
	    m+'2E4B49',m+'1F1F1F',m+'181A1C',m+'BDC3D3',m+'5E4018',m+'A16624',m+'784E1D',m+'5E4018',
	    m+'965F22',m+'A16624',m+'704A1C',m+'5E4018',m+'634319',m+'8F5B21',m+'614119',m+'60431C',
	    m+'979664',m+'555B4A',m+'172433',m+'8A93A3',m+'BEC6D6',m+'4D5867',m+'172333',m+'949463',
	    m+'979664',m+'818569',m+'415675',m+'405476',m+'172433',m+'000000',m+'5E4018',m+'724B1C',
	    m+'A16624',m+'A16625',m+'A16624',m+'A16625',m+'A16624',m+'A16625',m+'A16624',m+'A16625',
	    m+'A16624',m+'9C6223',m+'5E4019',m+'010000',m+'000000',m+'717992',m+'7F87A0',m+'B3BACA',
	    m+'0F1011',m+'242223',m+'3C3D3E',m+'1A1A1A',m+'08625E',m+'023933',m+'012E28',m+'012F29',
	    m+'054B47',m+'155754',m+'1B1A1A',m+'413F42',m+'AAAFBD',m+'504B45',m+'5E4019',m+'A16624',
	    m+'9F6424',m+'5E4019',m+'6D481B',m+'A16624',m+'5E4019',m+'494E58',m+'405476',m+'42526C',
	    m+'4B4C51',m+'514941',m+'5E523C',m+'989664',m+'696D52',m+'182333',m+'7E8798',m+'182433',
	    m+'6E7154',m+'989664',m+'979665',m+'405575',m+'405476',m+'182333',m+'010202',m+'000000',
	    m+'5E4018',m+'8E5A21',m+'A16624',m+'A16625',m+'A16524',m+'A16624',m+'A16625',m+'A16624',
	    m+'A16625',m+'A16524',m+'A16624',m+'A16625',m+'A16624',m+'955E22',m+'5E4019',m+'000000',
	    m+'757D97',m+'BEC5D6',m+'757882',m+'54534E',m+'5C575B',m+'191A1A',m+'393938',m+'085A56',
	    m+'01322C',m+'022F29',m+'022F28',m+'01302A',m+'06514C',m+'234846',m+'201F1F',m+'403F41',
	    m+'4F4F4F',m+'5E5E5E',m+'81807F',m+'5E4018',m+'955E22',m+'5E4018',m+'818180',m+'746859',
	    m+'5E4019',m+'9F6424',m+'A16624',m+'5E4018',m+'405476',m+'405575',m+'929266',m+'989664',
	    m+'979664',m+'182433',m+'82835C',m+'989664',m+'6C766D',m+'405476',m+'182433',m+'0C121A',
	    m+'000000',m+'5E4018',m+'905C21',m+'A16624',m+'A16625',m+'A16624',m+'A16625',m+'A16624',
	    m+'A16625',m+'A16624',m+'A16625',m+'A16624',m+'A16625',m+'5E4019',m+'000000',m+'757C96',
	    m+'BEC6D6',m+'131312',m+'232321',m+'1C1C1E',m+'171616',m+'1C4442',m+'07534F',m+'01332E',
	    m+'01322C',m+'01322D',m+'023731',m+'085B57',m+'2D3131',m+'282728',m+'191D22',m+'4E4E4E',
	    m+'7F7F7F',m+'818181',m+'634928',m+'5E4018',m+'818181',m+'5C4321',m+'5E4019',m+'A16624',
	    m+'604119',m+'564531',m+'405476',m+'989664',m+'182333',m+'989664',m+'949465',m+'405476',
	    m+'1D2B3C',m+'172332',m+'000000',m+'5E4018',m+'764D1D',m+'A16624',m+'A26624',m+'A16624',
	    m+'A26624',m+'A16624',m+'A26624',m+'A16624',m+'A26624',m+'A16624',m+'A26624',m+'A16624',
	    m+'5E4019',m+'412C11',m+'000000',m+'757D96',m+'878B98',m+'171819',m+'1F1F1F',m+'121416',
	    m+'2D2D2E',m+'252526',m+'1B3232',m+'15302F',m+'1C3535',m+'1E3131',m+'142423',m+'252526',
	    m+'2E2E2F',m+'121518',m+'4E4E4E',m+'707070',m+'6D6D6D',m+'696969',m+'646464',m+'604523',
	    m+'595045',m+'575757',m+'4F4F4F',m+'485468',m+'5A4326',m+'5E4019',m+'A16524',m+'A16624',
	    m+'8E5A21',m+'5E4019',m+'405476',m+'989664',m+'6F6F5C',m+'585858',m+'949364',m+'979664',
	    m+'989664',m+'405575',m+'405476',m+'233146',m+'182433',m+'000000',m+'1F1508',m+'5E4018',
	    m+'A16624',m+'A16625',m+'A16624',m+'A16625',m+'A16624',m+'A16625',m+'A16624',m+'A16625',
	    m+'A16624',m+'A16625',m+'5E4019',m+'000000',m+'757D96',m+'2B2D30',m+'14181C',m+'3B3B3B',
	    m+'1F2428',m+'131516',m+'2C201B',m+'711A00',m+'24201E',m+'232323',m+'6B1900',m+'330E02',
	    m+'2C2C2B',m+'1F2327',m+'121213',m+'4E4E4E',m+'515151',m+'545454',m+'575757',m+'5A5A5A',
	    m+'5D5D5D',m+'606060',m+'4E4E4E',m+'435A7D',m+'435B80',m+'5A4324',m+'5E4019',m+'A16624',
	    m+'865620',m+'5E4019',m+'405476',m+'405575',m+'989664',m+'64645A',m+'555556',m+'63625A',
	    m+'989664',m+'405476',m+'202E41',m+'182433',m+'000000',m+'5E4018',m+'A16524',m+'A16624',
	    m+'A16625',m+'A16624',m+'A16625',m+'A16624',m+'A16625',m+'A16624',m+'A16625',m+'A16624',
	    m+'A16625',m+'A16624',m+'A16625',m+'A16624',m+'5E4019',m+'000000',m+'757D97',m+'BEC6D6',
	    m+'BDC4D5',m+'999FAC',m+'7A7F8A',m+'2D2F33',m+'431C10',m+'333232',m+'6D1900',m+'32201B',
	    m+'431B0F',m+'160E0C',m+'5D6068',m+'6D717B',m+'949AA7',m+'BEC6D6',m+'8C919C',m+'2F2F2F',
	    m+'666666',m+'2F2F2F',m+'435B80',m+'435A7F',m+'5E4019',m+'996123',m+'A16624',m+'5E4019',
	    m+'4C4C4E',m+'405476',m+'989664',m+'828260',m+'4E5052',m+'85865D',m+'989664',m+'405476',
	    m+'182433',m+'0E151F',m+'000000',m+'231709',m+'5E4018',m+'A16624',m+'A16625',m+'A16624',
	    m+'A16625',m+'A16624',m+'A16625',m+'A16624',m+'A16625',m+'A16624',m+'5E4019',m+'000000',
	    m+'757D96',m+'9BA2B8',m+'BEC6D6',m+'BEC6D7',m+'BEC6D6',m+'BEC6D7',m+'673C32',m+'B4B8C7',
	    m+'BEC6D6',m+'BEC5D6',m+'BEC6D6',m+'8F949F',m+'2F2F2F',m+'666666',m+'2F2F2F',m+'435B80',
	    m+'5E4019',m+'A16624',m+'85561F',m+'5E4018',m+'405476',m+'6C766D',m+'989664',m+'182333',
	    m+'474E45',m+'989664',m+'405476',m+'182333',m+'010202',m+'000000',m+'5E4018',m+'8C5A21',
	    m+'A16624',m+'A16625',m+'A16624',m+'A16625',m+'A16525',m+'A16624',m+'A16625',m+'A16624',
	    m+'A16625',m+'A16525',m+'A16624',m+'A16625',m+'5E4019',m+'412C11',m+'000000',m+'262931',
	    m+'757D96',m+'BEC6D6',m+'7D859E',m+'BEC6D6',m+'ACB2C1',m+'2F2F2F',m+'666666',m+'2F2F2F',
	    m+'435B80',m+'5E4018',m+'A16624',m+'7B501E',m+'5E4018',m+'405476',m+'425675',m+'979664',
	    m+'4C5247',m+'172433',m+'979664',m+'636F6F',m+'405476',m+'27374D',m+'3F5475',m+'405476',
	    m+'172433',m+'000000',m+'5E4018',m+'A16624',m+'A16625',m+'A16624',m+'A16625',m+'A16624',
	    m+'A16625',m+'A16624',m+'A16625',m+'A16624',m+'5E4019',m+'000000',m+'757D96',m+'BEC6D6',
	    m+'747C96',m+'BEC6D6',m+'2F2F2F',m+'666666',m+'2F2F2F',m+'435B80',m+'5E4019',m+'A16524',
	    m+'5E4019',m+'52473B',m+'405476',m+'989664',m+'182433',m+'989664',m+'405476',m+'1D2A3C',
	    m+'1E2B3D',m+'182333',m+'000000',m+'5E4018',m+'A16624',m+'A26624',m+'A16624',m+'A26624',
	    m+'A16624',m+'A26624',m+'A16624',m+'A26624',m+'A16624',m+'A26624',m+'A16624',m+'A16625',
	    m+'A16624',m+'A16625',m+'A16624',m+'A16625',m+'A16624',m+'A16625',m+'A16624',m+'A16625',
	    m+'915C21',m+'5E4019',m+'000000',m+'757C96',m+'9199AF',m+'BEC6D6',m+'7B839C',m+'BEC6D6',
	    m+'2F2F2F',m+'666666',m+'2F2F2F',m+'3E506C',m+'435B80',m+'5E4019',m+'55483A',m+'435B80',
	    m+'1B2839',m+'354764',m+'405476',m+'989664',m+'182433',m+'8C8C60',m+'989664',m+'405476',
	    m+'182433',m+'405476',m+'3F5373',m+'272638',m+'242130',m+'2D283B',m+'373148',m+'3E3851',
	    m+'182333',m+'000000',m+'5E4018',m+'A16624',m+'A26624',m+'A16624',m+'A26624',m+'A16624',
	    m+'A26624',m+'A16624',m+'A26624',m+'A16624',m+'A26624',m+'A16624',m+'A26624',m+'A16624',
	    m+'A26624',m+'A16624',m+'A26624',m+'A16624',m+'A26624',m+'A16624',m+'A16625',m+'A16624',
	    m+'A16625',m+'A16624',m+'A16625',m+'A16624',m+'7F521E',m+'5E4019',m+'000000',m+'000001',
	    m+'747D96',m+'BEC6D6',m+'BEC6D7',m+'BEC6D6',m+'ABB2C5',m+'7C849D',m+'BEC6D6',m+'2F2F2F',
	    m+'515151',m+'666666',m+'323232',m+'303236',m+'435B80',m+'534A3F',m+'435B80',m+'374C6C',
	    m+'1A2636',m+'212F42',m+'182333',m+'182433',m+'192535',m+'182433',m+'182333',m+'182433',
	    m+'182333',m+'182433',m+'26354A',m+'3F5066',m+'989664',m+'37403F',m+'182433',m+'989664',
	    m+'898C67',m+'223044',m+'364966',m+'405476',m+'252233',m+'38334A',m+'494360',m+'47415E',
	    m+'182333',m+'000000',m+'5E4019',m+'A26624',m+'A16624',m+'A16625',m+'A16624',m+'A16625',
	    m+'A16624',m+'A16625',m+'A16624',m+'A16625',m+'A16624',m+'A16625',m+'83541F',m+'5D4019',
	    m+'000000',m+'747D96',m+'A5ADC1',m+'BEC6D7',m+'BEC6D6',m+'BEC6D7',m+'BEC6D6',m+'BEC6D7',
	    m+'BEC6D6',m+'BEC6D7',m+'BEC6D6',m+'747C96',m+'BEC6D6',m+'606268',m+'2F2F2F',m+'666666',
	    m+'5E5E5E',m+'2F2F2F',m+'435B80',m+'40587C',m+'182333',m+'1A2737',m+'3E5373',m+'405476',
	    m+'334560',m+'1C293A',m+'182433',m+'222D37',m+'182333',m+'989664',m+'182333',m+'405476',
	    m+'37445F',m+'272334',m+'494360',m+'182433',m+'090F15',m+'000000',m+'5E4019',m+'A16524',
	    m+'A16624',m+'A16524',m+'A16624',m+'A16524',m+'A16624',m+'A16525',m+'A16624',m+'A16524',
	    m+'85561F',m+'A16524',m+'A16624',m+'A16525',m+'A16624',m+'A16524',m+'A16624',m+'A16524',
	    m+'A16624',m+'8F5B21',m+'5E4019',m+'000000',m+'040506',m+'757D96',m+'BEC6D6',m+'A1A9BD',
	    m+'747C96',m+'BEC6D6',m+'2F2F2F',m+'666666',m+'2F2F2F',m+'425A7F',m+'435B80',m+'182434',
	    m+'1B2838',m+'405476',m+'3F5475',m+'233246',m+'182433',m+'30393C',m+'979664',m+'182333',
	    m+'405476',m+'242130',m+'48415E',m+'494360',m+'494260',m+'182433',m+'000000',m+'5E4019',
	    m+'7C501E',m+'A16624',m+'A26624',m+'A16625',m+'A26624',m+'A16625',m+'5E4019',m+'A16625',
	    m+'A26624',m+'A16625',m+'996123',m+'5E4019',m+'000000',m+'757D96',m+'AAB1C5',m+'BEC6D7',
	    m+'BEC6D6',m+'BEC6D7',m+'BEC6D6',m+'7B839C',m+'777F98',m+'BEC6D6',m+'2F2F2F',m+'4B4B4B',
	    m+'666666',m+'313131',m+'303236',m+'435B80',m+'182333',m+'344662',m+'405476',m+'32445F',
	    m+'182333',m+'182434',m+'3D5272',m+'405476',m+'242130',m+'494360',m+'182433',m+'05070B',
	    m+'000000',m+'0E0903',m+'5E4018',m+'A16624',m+'9F6424',m+'A16624',m+'A16524',m+'A16624',
	    m+'A16524',m+'A16624',m+'A16524',m+'A16624',m+'A16524',m+'A16624',m+'A16524',m+'794F1D',
	    m+'A16624',m+'A16524',m+'A16624',m+'A16524',m+'A16624',m+'A16524',m+'A16624',m+'A16524',
	    m+'A16624',m+'A16524',m+'A16624',m+'9B6223',m+'5E4019',m+'000000',m+'08080A',m+'747C96',
	    m+'BEC6D6',m+'BEC5D6',m+'BEC6D6',m+'8189A1',m+'757D97',m+'BEC6D6',m+'A9AFBE',m+'2F2F2F',
	    m+'666666',m+'2F2F2F',m+'435B80',m+'182333',m+'334561',m+'405476',m+'192535',m+'405476',
	    m+'32445E',m+'182333',m+'25344A',m+'405476',m+'242130',m+'494360',m+'35364E',m+'182333',
	    m+'000000',m+'5E4019',m+'A16524',m+'A16624',m+'A26624',m+'A16624',m+'5E4019',m+'A16624',
	    m+'A26624',m+'A16624',m+'A16524',m+'A16624',m+'A16625',m+'A16624',m+'A16525',m+'A16624',
	    m+'A16524',m+'A16624',m+'5E4019',m+'744C1C',m+'A16624',m+'A16525',m+'A16624',m+'A16524',
	    m+'A16624',m+'A16625',m+'A16624',m+'A16525',m+'925D22',m+'5E4019',m+'000000',m+'757D96',
	    m+'B4BBCD',m+'BEC6D6',m+'B1B8CB',m+'747C96',m+'B4BBCD',m+'BEC6D6',m+'2F2F2F',m+'535353',
	    m+'666666',m+'2F2F2F',m+'343A44',m+'435B80',m+'1C293A',m+'192636',m+'405476',m+'172333',
	    m+'405476',m+'223144',m+'243347',m+'405476',m+'242130',m+'48425F',m+'494360',m+'172333',
	    m+'000000',m+'291C0A',m+'5E4019',m+'A16624',m+'5E4018',m+'5E4019',m+'A16624',m+'714A1C',
	    m+'5D4019',m+'A16624',m+'624219',m+'543916',m+'000000',m+'242730',m+'757D96',m+'BEC6D7',
	    m+'BEC6D6',m+'BEC6D7',m+'BEC6D6',m+'BEC6D7',m+'BEC6D6',m+'8C94AB',m+'747C96',m+'B5BCCE',
	    m+'B3BAC9',m+'2F2F2F',m+'666666',m+'656565',m+'2F2F2F',m+'435B80',m+'182433',m+'405476',
	    m+'182534',m+'384B68',m+'405476',m+'374A67',m+'2D3146',m+'39344B',m+'494360',m+'182333',
	    m+'000000',m+'5E4018',m+'965F22',m+'A16624',m+'5E4019',m+'5E4018',m+'81531F',m+'A16624',
	    m+'A16625',m+'A16624',m+'A16625',m+'A16624',m+'A16625',m+'A16624',m+'A16625',m+'5E4019',
	    m+'A06524',m+'A16625',m+'A16624',m+'A16625',m+'A16624',m+'A16625',m+'5D4019',m+'000000',
	    m+'757D96',m+'BEC6D6',m+'A5ADC1',m+'747C96',m+'2F2F30',m+'393939',m+'666666',m+'383838',
	    m+'2F2F30',m+'435B80',m+'1F2D40',m+'182433',m+'405476',m+'3E5272',m+'182433',m+'405476',
	    m+'3B4D6B',m+'252131',m+'494360',m+'182333',m+'000000',m+'5E4018',m+'A16624',m+'7C501E',
	    m+'5E4018',m+'A06524',m+'A16624',m+'A16625',m+'A16524',m+'A16624',m+'A16525',m+'A16625',
	    m+'A16624',m+'A16525',m+'A16625',m+'A16524',m+'A16624',m+'A16525',m+'A16625',m+'A16624',
	    m+'5E4019',m+'31210C',m+'5E4019',m+'754C1D',m+'A16525',m+'A16625',m+'A16624',m+'A16525',
	    m+'A16625',m+'A16524',m+'5E4019',m+'000000',m+'757C96',m+'A4ACC0',m+'BEC6D6',m+'ABB3C6',
	    m+'747C96',m+'8C919F',m+'323334',m+'2F2F2F',m+'363636',m+'2F2F2F',m+'3F5270',m+'182333',
	    m+'3A4E6C',m+'405476',m+'182433',m+'28384F',m+'405476',m+'242130',m+'494360',m+'182333',
	    m+'000000',m+'241809',m+'5E4018',m+'A16624',m+'5E4018',m+'000000',m+'5E4018',m+'A16624',
	    m+'A16625',m+'A16624',m+'A16625',m+'A16624',m+'A16625',m+'A16624',m+'A16625',m+'5E4019',
	    m+'000000',m+'422D11',m+'5E4019',m+'925D22',m+'A16624',m+'A16625',m+'A16624',m+'5E4019',
	    m+'000000',m+'555A6E',m+'757D96',m+'8C94AB',m+'A9B0C4',m+'B7BED0',m+'B8C0D1',m+'767E98',
	    m+'8C93AA',m+'BEC6D6',m+'BEC6D7',m+'BEC6D6',m+'BEC6D7',m+'BEC6D6',m+'747C96',m+'AAB0C2',
	    m+'ABB1C3',m+'8F95A3',m+'182433',m+'405476',m+'182333',m+'3F5374',m+'405476',m+'3A4A67',
	    m+'252131',m+'494360',m+'182333',m+'000000',m+'422D11',m+'634219',m+'6C471B',m+'5C3E17',
	    m+'000000',m+'5E4018',m+'A16624',m+'A16625',m+'A16624',m+'A16625',m+'A06424',m+'5E4019',
	    m+'000000',m+'171006',m+'5E4019',m+'A16524',m+'A16624',m+'634219',m+'513815',m+'000000',
	    m+'757D96',m+'BCC3D4',m+'BEC6D7',m+'BEC6D6',m+'BEC6D7',m+'BEC6D6',m+'BEC6D7',m+'767E98',
	    m+'AEB5C8',m+'BEC6D6',m+'BEC6D7',m+'BEC6D6',m+'BEC6D7',m+'BEC6D6',m+'747C96',m+'8D94AA',
	    m+'ABB1C3',m+'182333',m+'405476',m+'3D5171',m+'182333',m+'3F5475',m+'405476',m+'3D5070',
	    m+'262435',m+'242130',m+'282435',m+'2D283C',m+'2A2537',m+'242130',m+'2B2D41',m+'36425C',
	    m+'405476',m+'2B2E42',m+'242130',m+'332E43',m+'423B57',m+'494360',m+'1C2637',m+'15212E',
	    m+'000000',m+'3E2A10',m+'5E4018',m+'000000',m+'5E4018',m+'986023',m+'A16624',m+'A26624',
	    m+'A16624',m+'A16625',m+'A16624',m+'A16524',m+'A16624',m+'A16625',m+'A16624',m+'A16524',
	    m+'A16624',m+'9C6223',m+'5E4019',m+'000000',m+'5E4019',m+'68451A',m+'5B3E17',m+'000000',
	    m+'757D96',m+'BDC4D6',m+'BEC6D6',m+'777F99',m+'BEC6D6',m+'7B839C',m+'767E98',m+'ABB1C3',
	    m+'A7ADBF',m+'182433',m+'405476',m+'3E4651',m+'3F3F3F',m+'3F5372',m+'252232',m+'3B354E',
	    m+'494360',m+'363147',m+'242130',m+'343E57',m+'405476',m+'3E5373',m+'182433',m+'000000',
	    m+'181006',m+'000000',m+'533815',m+'624219',m+'A16624',m+'A26624',m+'A16624',m+'A26624',
	    m+'A16624',m+'A26624',m+'A16624',m+'A26624',m+'A16624',m+'A26624',m+'A16624',m+'A16625',
	    m+'A16624',m+'A16625',m+'A16624',m+'A16625',m+'A16624',m+'A16625',m+'A16624',m+'955E22',
	    m+'5E4019',m+'000000',m+'5D4019',m+'0F0A03',m+'000000',m+'757D96',m+'A7AEC2',m+'BEC6D6',
	    m+'8D95AC',m+'747C96',m+'7F869F',m+'ABB1C3',m+'A7ADBF',m+'182333',m+'405476',m+'3F506A',
	    m+'3F3F3F',m+'666666',m+'3F3F3F',m+'262E37',m+'1D2738',m+'45405C',m+'494360',m+'494260',
	    m+'242130',m+'405476',m+'3D5272',m+'182333',m+'000000',m+'5E4018',m+'A16624',m+'A16625',
	    m+'A16624',m+'A16625',m+'A16624',m+'81541F',m+'5E4019',m+'000000',m+'5F657A',m+'777F99',
	    m+'BEC6D6',m+'BEC6D7',m+'BEC6D6',m+'BEC6D7',m+'BEC6D6',m+'BEC6D7',m+'BEC6D6',m+'BEC6D7',
	    m+'BEC6D6',m+'9AA2B7',m+'747C96',m+'8088A0',m+'ABB1C3',m+'172433',m+'405476',m+'3F4E66',
	    m+'3F3F3F',m+'666666',m+'404040',m+'3A3A3A',m+'000000',m+'101823',m+'172433',m+'1C2637',
	    m+'3C3A54',m+'494360',m+'413B55',m+'252233',m+'405476',m+'1A2737',m+'172332',m+'000000',
	    m+'513815',m+'624219',m+'A16624',m+'A16525',m+'A16624',m+'A16625',m+'A16624',m+'A16524',
	    m+'A16624',m+'A16525',m+'A16624',m+'A16625',m+'A16624',m+'A16524',m+'A16624',m+'A16525',
	    m+'A16624',m+'634319',m+'553A16',m+'000000',m+'757D96',m+'BEC6D7',m+'BEC6D6',m+'BEC6D7',
	    m+'BEC6D6',m+'BEC6D7',m+'BEC6D6',m+'BEC6D7',m+'BEC6D6',m+'BEC6D7',m+'BEC6D6',m+'BEC6D7',
	    m+'BEC6D6',m+'BEC6D7',m+'BEC6D6',m+'BEC6D7',m+'BEC6D6',m+'9AA2B7',m+'747C96',m+'000000',
	    m+'747C96',m+'7E869E',m+'ABB1C3',m+'182333',m+'405476',m+'3F444D',m+'3F3F3F',m+'666666',
	    m+'5D5D5D',m+'3F3F3F',m+'010101',m+'000000',m+'030507',m+'131D29',m+'182333',m+'182433',
	    m+'1D2738',m+'2A2F44',m+'33344B',m+'36364E',m+'33344B',m+'282E42',m+'182433',m+'0B1018',
	    m+'000000',m+'5D4018',m+'895820',m+'A26624',m+'A26525',m+'5D4019',m+'040201',m+'000000',
	    m+'757D97',m+'A2A9BD',m+'BEC5D7',m+'BEC5D6',m+'BEC5D7',m+'BEC5D6',m+'BEC5D7',m+'BEC6D6',
	    m+'8F96AD',m+'757D96',m+'000000',m+'6B738A',m+'788099',m+'ABB1C3',m+'182433',m+'3F5475',
	    m+'405576',m+'3F3F3F',m+'494949',m+'666666',m+'444444',m+'3F3F3F',m+'000000',m+'5D4018',
	    m+'915C21',m+'A26624',m+'A26525',m+'986023',m+'5D4019',m+'000000',m+'050607',m+'757D97',
	    m+'BEC5D7',m+'BEC6D6',m+'7D859E',m+'727A93',m+'000000',m+'484D5D',m+'757D97',m+'ABB1C3',
	    m+'AAB1C3',m+'ABB1C3',m+'AAB1C3',m+'182433',m+'25344A',m+'405576',m+'405476',m+'405576',
	    m+'3F4A5C',m+'3F3F3F',m+'656565',m+'666666',m+'3F3F3F',m+'494E5E',m+'000000',m+'5D4018',
	    m+'7B501E',m+'A26624',m+'A26525',m+'5D4019',m+'020200',m+'000000',m+'757D96',m+'A5ACC0',
	    m+'BEC5D6',m+'BEC5D7',m+'BEC5D6',m+'BEC5D7',m+'BEC5D6',m+'BEC5D7',m+'BEC5D6',m+'BEC5D7',
	    m+'BEC5D6',m+'BEC6D6',m+'757D96',m+'000000',m+'24272F',m+'757D97',m+'ABB1C3',m+'AAB1C3',
	    m+'ABB1C3',m+'AAB1C3',m+'767E8F',m+'182433',m+'405576',m+'3F5473',m+'3F3F3F',m+'4F4F4F',
	    m+'666666',m+'575757',m+'3F3F3F',m+'BCC4D5',m+'757D96',m+'5E657A',m+'000000',m+'503615',
	    m+'5F4019',m+'A26624',m+'A26525',m+'64431A',m+'573C16',m+'000000',m+'757D96',m+'BEC5D6',
	    m+'BEC5D7',m+'BEC5D6',m+'BEC5D7',m+'BEC5D6',m+'BEC5D7',m+'BEC5D6',m+'BEC5D7',m+'BEC5D6',
	    m+'747D96',m+'000000',m+'08090A',m+'757D97',m+'ABB1C2',m+'AAB1C2',m+'ABB1C2',m+'AAB1C2',
	    m+'ABB1C2',m+'172333',m+'405576',m+'405476',m+'405576',m+'405476',m+'405576',m+'3F5475',
	    m+'3F3F3F',m+'434343',m+'666666',m+'3F3F3F',m+'A7ADBB',m+'BEC5D6',m+'ABB2C6',m+'757D96',
	    m+'000000',m+'040200',m+'5D4018',m+'9B6223',m+'A26624',m+'A26525',m+'784F1D',m+'5D4019',
	    m+'000000',m+'6E768E',m+'7C849D',m+'BEC5D7',m+'BEC6D6',m+'BEC5D6',m+'BAC1D3',m+'757D96',
	    m+'000000',m+'757D97',m+'ABB1C3',m+'AAB1C3',m+'ABB1C3',m+'AAB1C3',m+'ABB1C3',m+'192534',
	    m+'1F2D3F',m+'405576',m+'3F5372',m+'3F3F3F',m+'444444',m+'666666',m+'515151',m+'3F3F3F',
	    m+'BEC5D6',m+'BEC6D6',m+'8991A8',m+'757D96',m+'000000',m+'583B17',m+'604119',m+'A26624',
	    m+'A26525',m+'65441A',m+'5A3D18',m+'000000',m+'757D97',m+'BEC5D6',m+'BEC6D6',m+'BDC4D5',
	    m+'757D96',m+'000000',m+'757D96',m+'ABB1C3',m+'AAB1C3',m+'ABB1C3',m+'AAB0C2',m+'182333',
	    m+'405576',m+'3F4959',m+'3F3F3F',m+'515151',m+'666666',m+'656565',m+'3F3F3F',m+'BEC6D6',
	    m+'757D96',m+'000000',m+'5D4018',m+'82541F',m+'A26624',m+'A26525',m+'5D4019',m+'040301',
	    m+'000000',m+'757D97',m+'BEC5D7',m+'BEC5D6',m+'757D96',m+'000000',m+'747D97',m+'ABB1C2',
	    m+'172433',m+'202E41',m+'405476',m+'3F4D63',m+'3F3F3F',m+'414141',m+'656565',m+'666666',
	    m+'3F3F3F',m+'999EAA',m+'BEC5D6',m+'BEC6D6',m+'BEC5D6',m+'757D96',m+'000000',m+'1F1508',
	    m+'5D4018',m+'A06524',m+'A26624',m+'A26525',m+'624219',m+'A26525',m+'986023',m+'5D4019',
	    m+'000000',m+'383C48',m+'757D97',m+'BEC5D7',m+'BEC5D6',m+'757D96',m+'000000',m+'747D96',
	    m+'9AA1B5',m+'AAB1C2',m+'ABB1C2',m+'AAB1C2',m+'212C3B',m+'34373B',m+'3F3F3F',m+'464646',
	    m+'656565',m+'666666',m+'3F3F3F',m+'67696E',m+'BEC5D6',m+'757D96',m+'000000',m+'5D3F18',
	    m+'64431A',m+'A26525',m+'5D4019',m+'A26525',m+'5D4019',m+'010000',m+'000000',m+'757D97',
	    m+'969DB3',m+'BEC5D6',m+'BEC5D7',m+'BEC5D6',m+'BEC5D7',m+'BEC5D6',m+'BEC5D7',m+'BEC6D6',
	    m+'757D97',m+'090A0C',m+'000000',m+'727A93',m+'7C849D',m+'ABB1C3',m+'636C7D',m+'3A3B3D',
	    m+'424242',m+'666666',m+'3F3F3F',m+'5F6166',m+'BEC6D6',m+'BBC2D3',m+'757D96',m+'000000',
	    m+'050401',m+'5D4019',m+'9F6424',m+'A26525',m+'764D1D',m+'5D4019',m+'A26525',m+'5D4019',
	    m+'281B0A',m+'000000',m+'757D97',m+'BDC4D5',m+'BEC5D7',m+'BEC6D6',m+'8189A2',m+'727A93',
	    m+'000000',m+'17191E',m+'757D96',m+'AAB1C3',m+'ABB1C3',m+'AAB1C3',m+'ABB1C3',m+'AAB1C3',
	    m+'A7ADBF',m+'182433',m+'3F3F3F',m+'5A5A5A',m+'666666',m+'3F3F3F',m+'7C7F87',m+'BEC6D6',
	    m+'BFC6D6',m+'BEC6D6',m+'757D97',m+'4B5061',m+'000000',m+'5D4019',m+'82541F',m+'A26525',
	    m+'5D4019',m+'A26525',m+'5D4019',m+'241809',m+'000000',m+'757D96',m+'BEC5D6',m+'BEC5D7',
	    m+'BEC5D6',m+'BEC5D7',m+'BEC5D6',m+'BEC5D7',m+'BEC5D6',m+'BEC5D7',m+'BEC5D6',m+'BEC6D6',
	    m+'BEC5D6',m+'BEC6D6',m+'BEC5D6',m+'757D96',m+'000000',m+'757D96',m+'AAB1C3',m+'ABB1C3',
	    m+'AAB1C3',m+'ABB1C3',m+'AAB1C3',m+'182433',m+'405576',m+'3F3F3F',m+'636363',m+'666666',
	    m+'636363',m+'3F3F3F',m+'B1B7C6',m+'BEC5D6',m+'BEC6D6',m+'BEC5D6',m+'BEC6D6',m+'BEC5D6',
	    m+'BEC6D6',m+'BEC5D6',m+'757D96',m+'000000',m+'5D4019',m+'80531E',m+'A26525',m+'5D4019',
	    m+'1A1207',m+'5D4019',m+'A26525',m+'9B6223',m+'5D4019',m+'010100',m+'000000',m+'757D97',
	    m+'BEC5D7',m+'BEC6D6',m+'757D96',m+'030303',m+'000000',m+'757D96',m+'AAB1C3',m+'ABB1C2',
	    m+'AAB1C2',m+'ABB1C3',m+'ABB1C2',m+'AAB1C3',m+'ABB1C2',m+'000001',m+'040506',m+'14171B',
	    m+'3F3F3F',m+'646464',m+'666666',m+'474747',m+'3F3F3F',m+'BEC6D6',m+'757D96',m+'0C0D10',
	    m+'000000',m+'5D4019',m+'A26525',m+'614119',m+'4F3614',m+'4C3314',m+'64431A',m+'A26525',
	    m+'5F4019',m+'533915',m+'000000',m+'757D96',m+'BEC5D7',m+'BEC5D6',m+'BEC5D7',m+'BEC5D6',
	    m+'BEC5D7',m+'BEC5D6',m+'BEC5D7',m+'BEC6D6',m+'939BB1',m+'757D96',m+'000000',m+'757D96',
	    m+'8F96AC',m+'ABB1C3',m+'AAB1C3',m+'ABB1C3',m+'000000',m+'111316',m+'15191C',m+'020303',
	    m+'131619',m+'3F3F3F',m+'5F5F5F',m+'666666',m+'636363',m+'3F3F3F',m+'8F939E',m+'BEC6D6',
	    m+'767E97',m+'585E71',m+'000000',m+'563A16',m+'64431A',m+'A26525',m+'5F4019',m+'4A3213',
	    m+'000000',m+'5D4019',m+'604119',m+'5B3E17',m+'000000',m+'030405',m+'757D97',m+'BEC5D7',
	    m+'BEC5D6',m+'BEC5D7',m+'BEC5D6',m+'BEC5D7',m+'BEC5D6',m+'BEC5D7',m+'BEC6D6',m+'BEC5D6',
	    m+'BEC6D6',m+'BEC5D6',m+'757D96',m+'000000',m+'2C303A',m+'757D96',m+'AAB1C3',m+'000000',
	    m+'1B1E21',m+'1B1E22',m+'342B29',m+'2A2625',m+'85837C',m+'3F3F3F',m+'4B4B4B',m+'666666',
	    m+'656565',m+'3F3F3F',m+'4C4D4F',m+'BEC6D6',m+'BEC5D6',m+'BEC6D6',m+'BEC5D6',m+'BEC6D6',
	    m+'BEC5D6',m+'BEC6D6',m+'BEC5D6',m+'777F99',m+'666D83',m+'000000',m+'281B0A',m+'5D4019',
	    m+'A26525',m+'A16524',m+'5D4019',m+'100A04',m+'000000',m+'5D4019',m+'171006',m+'000000',
	    m+'060709',m+'757D97',m+'BEC5D7',m+'BEC6D6',m+'848CA4',m+'747C96',m+'000000',m+'747D96',
	    m+'ABB1C2',m+'000000',m+'1A1D20',m+'222528',m+'121315',m+'0B0C0E',m+'1E2023',m+'38393A',
	    m+'3F3F3F',m+'666666',m+'3F3F3F',m+'434343',m+'BEC6D6',m+'BEC5D6',m+'BEC6D6',m+'BEC5D6',
	    m+'BEC6D6',m+'757D97',m+'414655',m+'000000',m+'5D4019',m+'764D1D',m+'A26525',m+'68451A',
	    m+'5D4019',m+'000000',m+'0A0B0D',m+'757D97',m+'BEC5D7',m+'BEC5D6',m+'757D96',m+'000000',
	    m+'747D96',m+'A8AFC1',m+'AAB1C2',m+'ABB1C2',m+'AAB1C2',m+'ABB1C2',m+'AAB1C2',m+'040404',
	    m+'010101',m+'010102',m+'282B2F',m+'292C2F',m+'292C30',m+'282C2F',m+'3F3F3F',m+'4F4F4F',
	    m+'666666',m+'606060',m+'3F3F3F',m+'525356',m+'BEC5D6',m+'AEB5C8',m+'757D96',m+'0D0E11',
	    m+'000000',m+'5D4019',m+'A26525',m+'6F491C',m+'5D4019',m+'000000',m+'050506',m+'757D97',
	    m+'BEC5D7',m+'BEC6D6',m+'BEC5D6',m+'BEC6D6',m+'BEC5D6',m+'969EB4',m+'757D96',m+'000000',
	    m+'6E768F',m+'7B829B',m+'ABB1C3',m+'AAB1C3',m+'ABB1C3',m+'AAB1C3',m+'ABB1C3',m+'050505',
	    m+'060606',m+'020202',m+'080808',m+'1E1E1E',m+'282727',m+'222121',m+'1D1D1D',m+'3F3F3F',
	    m+'676C7F',m+'BEC5D6',m+'BEC6D6',m+'BEC5D6',m+'BEC6D6',m+'BEC5D6',m+'BEC6D6',m+'BEC5D6',
	    m+'B2B9CC',m+'757D96',m+'4E5364',m+'0D0908',m+'120400',m+'020000',m+'000000',m+'5D4019',
	    m+'3F2B10',m+'000000',m+'757D97',m+'BEC5D7',m+'BEC6D6',m+'757D97',m+'0A0B0E',m+'000000',
	    m+'010101',m+'757D97',m+'ABB1C3',m+'AAB1C3',m+'ABB1C3',m+'AAB1C3',m+'ABB1C3',m+'5B5E67',
	    m+'070707',m+'272626',m+'1F1F1F',m+'232323',m+'4B4B4B',m+'484848',m+'464646',m+'424444',
	    m+'1B6764',m+'09807C',m+'44818E',m+'757D97',m+'979FB4',m+'B7BED0',m+'BEC6D6',m+'BAC1D3',
	    m+'99A1B6',m+'757D97',m+'1E2027',m+'232323',m+'310B00',m+'7D1D00',m+'841F00',m+'7D1D00',
	    m+'2E0B00',m+'0D0D0D',m+'000000',m+'231709',m+'000000',m+'757D96',m+'BEC5D6',m+'BEC5D7',
	    m+'BEC5D6',m+'BEC5D7',m+'BEC5D6',m+'BEC6D6',m+'BCC3D4',m+'757D96',m+'000000',m+'757D96',
	    m+'AAB0C2',m+'ABB1C3',m+'AAB1C3',m+'ABB1C3',m+'AAB1C3',m+'ABB1C3',m+'080808',m+'282727',
	    m+'252525',m+'4D4D4D',m+'4C4C4C',m+'494A49',m+'09817D',m+'0A8A87',m+'087874',m+'06635E',
	    m+'055954',m+'055550',m+'05544F',m+'05534E',m+'04524D',m+'0F5452',m+'195757',m+'135655',
	    m+'06605B',m+'097D79',m+'0A8C89',m+'193735',m+'0D0D0D',m+'202020',m+'2D0B00',m+'781C00',
	    m+'7C1D00',m+'781B00',m+'31140B',m+'464646',m+'000000',m+'757D96',m+'BEC5D6',m+'BEC5D7',
	    m+'BEC5D6',m+'BEC5D7',m+'BEC5D6',m+'BEC5D7',m+'BEC5D6',m+'BEC5D7',m+'BEC5D6',m+'BEC5D7',
	    m+'BEC5D6',m+'BEC5D7',m+'BEC5D6',m+'BEC5D7',m+'BEC5D6',m+'7F869F',m+'707891',m+'000000',
	    m+'6E758E',m+'7B839C',m+'AAB1C2',m+'ABB1C2',m+'AAB1C2',m+'080808',m+'282727',m+'0C0C0C',
	    m+'4D4D4D',m+'415050',m+'0A8A86',m+'087773',m+'044E48',m+'013630',m+'01302A',m+'012F29',
	    m+'01312B',m+'023B36',m+'065C57',m+'09837F',m+'09827E',m+'161616',m+'030303',m+'1F1F1F',
	    m+'292929',m+'303030',m+'363636',m+'2E0C01',m+'781C00',m+'7D1D00',m+'791C00',m+'220700',
	    m+'000000',m+'757D97',m+'BEC5D7',m+'BEC6D6',m+'757D96',m+'0A0B0D',m+'000000',m+'757D96',
	    m+'ABB1C3',m+'1F2022',m+'080808',m+'1F1E1E',m+'282727',m+'080808',m+'4C4C4C',m+'0A8682',
	    m+'097E7A',m+'055550',m+'023832',m+'012F29',m+'022F29',m+'022F28',m+'012E28',m+'01342E',
	    m+'044A45',m+'08736F',m+'0A8985',m+'1E2525',m+'202020',m+'000000',m+'262626',m+'2C2C2C',
	    m+'333333',m+'2F0B00',m+'7C1D00',m+'831E00',m+'7D1D00',m+'2E0B00',m+'000000',m+'757D96',
	    m+'B4BBCD',m+'BEC5D6',m+'BEC6D6',m+'BEC5D6',m+'757D97',m+'000000',m+'757D97',m+'A3A9BC',
	    m+'AAB1C3',m+'AAB1C2',m+'ABB1C3',m+'AAB1C3',m+'AAB1C2',m+'AAB1C3',m+'AAB1C2',m+'AAB0C2',
	    m+'050505',m+'080808',m+'141414',m+'1E1E1D',m+'4C4C4C',m+'14726F',m+'0A8884',m+'076763',
	    m+'03413C',m+'01312B',m+'012E28',m+'022F29',m+'01302A',m+'023D37',m+'06605B',m+'098581',
	    m+'09807C',m+'202020',m+'121212',m+'232323',m+'292929',m+'303030',m+'363636',m+'3A3432',
	    m+'392A25',m+'030000',m+'000000',m+'757D97',m+'8D95AC',m+'BEC5D6',m+'BEC5D7',m+'BEC5D6',
	    m+'BEC5D7',m+'BEC5D6',m+'BEC5D7',m+'BEC5D6',m+'A0A7BC',m+'757D96',m+'000000',m+'2F323C',
	    m+'757D96',m+'AAB1C3',m+'ABB1C3',m+'AAB1C3',m+'ABB1C3',m+'AAB1C3',m+'050505',m+'090909',
	    m+'181817',m+'898984',m+'1B1B1B',m+'4B4B4B',m+'0A8884',m+'087975',m+'04504A',m+'023630',
	    m+'012F29',m+'022F28',m+'012E28',m+'01352F',m+'044D48',m+'087773',m+'0A8985',m+'1F1F1F',
	    m+'0A0A0A',m+'202020',m+'2D0B00',m+'7B1C00',m+'7F1D00',m+'791C00',m+'2F0F05',m+'202020',
	    m+'010101',m+'000000',m+'313540',m+'757D97',m+'BEC5D7',m+'BEC6D6',m+'BEC5D6',m+'BEC6D6',
	    m+'BEC5D6',m+'BEC6D6',m+'BEC5D6',m+'BEC6D6',m+'7A819B',m+'676F87',m+'000000',m+'757D96',
	    m+'AAB1C2',m+'ABB1C2',m+'AAB1C2',m+'ABB1C2',m+'AAB1C2',m+'2C2E32',m+'040404',m+'080808',
	    m+'373734',m+'090909',m+'4C4C4C',m+'097E7A',m+'0A8682',m+'06615D',m+'023E38',m+'01312B',
	    m+'022F28',m+'012E28',m+'01312B',m+'03413C',m+'076863',m+'0A8885',m+'0A736F',m+'000000',
	    m+'202020',m+'2E0B00',m+'7C1D00',m+'811E00',m+'7B1C00',m+'2E0B00',m+'0B0B0B',m+'040404',
	    m+'000000',m+'757D97',m+'BEC5D7',m+'BEC6D6',m+'757D96',m+'292C35',m+'20222A',m+'757D96',
	    m+'ABB1C3',m+'ABB1C2',m+'ABB1C3',m+'AAB1C3',m+'AAB1C2',m+'ABB1C3',m+'ABB1C2',m+'AAB1C3',
	    m+'ABB1C3',m+'050505',m+'090909',m+'1E1D1D',m+'272626',m+'3B3B3B',m+'494C4C',m+'0A8985',
	    m+'087570',m+'044C46',m+'01342F',m+'012F29',m+'012E28',m+'012F29',m+'01302A',m+'01312B',
	    m+'01332D',m+'013630',m+'023D38',m+'04504B',m+'08736F',m+'0A8B87',m+'097470',m+'202020',
	    m+'131313',m+'000000',m+'070605',m+'0C0300',m+'151617',m+'000000',m+'0B0B0B',m+'0A0A0A',
	    m+'050505',m+'000000',m+'757D97',m+'BEC5D7',m+'BEC5D6',m+'BEC6D6',m+'BEC5D6',m+'BEC6D6',
	    m+'BEC5D6',m+'757D96',m+'060708',m+'060709',m+'757D96',m+'969CB2',m+'ABB1C3',m+'AAB1C3',
	    m+'ABB1C3',m+'050505',m+'0F0F0F',m+'282727',m+'080808',m+'4D4D4D',m+'4C4C4C',m+'097E7A',
	    m+'0A8885',m+'076D69',m+'04504B',m+'034641',m+'044944',m+'04514C',m+'055B56',m+'076560',
	    m+'086F6B',m+'087975',m+'09827E',m+'0A8985',m+'0A8884',m+'115E5B',m+'222222',m+'202020',
	    m+'090909',m+'4D4D4D',m+'080808',m+'3E4145',m+'000000',m+'040404',m+'1A1B1D',m+'AEB5C8',
	    m+'757D96',m+'000000',m+'757D96',m+'959DB3',m+'BEC5D6',m+'BEC6D6',m+'757D96',m+'000101',
	    m+'000000',m+'010102',m+'61687E',m+'757D96',m+'767E98',m+'8A91A8',m+'989FB3',m+'A1A8BB',
	    m+'A7ADC0',m+'737783',m+'161515',m+'282727',m+'202020',m+'4D4D4D',m+'4D4D4C',m+'4A4A4A',
	    m+'166D6A',m+'0A8884',m+'0A8B87',m+'0A8986',m+'0A8985',m+'098783',m+'09827E',m+'146D6A',
	    m+'224F4D',m+'2E3333',m+'2D2D2D',m+'2B2B2B',m+'282828',m+'1D1D1D',m+'0E0E0E',m+'161616',
	    m+'444343',m+'494949',m+'1D1D1D',m+'232528',m+'323539',m+'191B1D',m+'141416',m+'BEC6D6',
	    m+'99A1B6',m+'757D97',m+'000000',m+'131419',m+'757D96',m+'BEC5D7',m+'BEC5D6',m+'747D96',
	    m+'000000',m+'070707',m+'282727',m+'090909',m+'4A4A4A',m+'4B4B4C',m+'494949',m+'464646',
	    m+'444444',m+'414141',m+'353535',m+'252525',m+'161616',m+'090909',m+'131212',m+'202020',
	    m+'2F2E2E',m+'333232',m+'222121',m+'0C0C0C',m+'090A0A',m+'1A1C1E',m+'2A2D31',m+'292C30',
	    m+'272A2E',m+'17191B',m+'000000',m+'080909',m+'BEC5D6',m+'8890A8',m+'747D96',m+'000000',
	    m+'4A4F60',m+'757D97',m+'BEC5D6',m+'BEC5D7',m+'BEC5D6',m+'BEC5D7',m+'BEC5D6',m+'BEC5D7',
	    m+'BEC5D6',m+'BEC5D7',m+'BEC5D6',m+'BEC5D7',m+'BEC5D6',m+'BEC5D7',m+'BEC5D6',m+'757D96',
	    m+'040405',m+'000000',m+'020202',m+'060606',m+'0F0F0F',m+'282727',m+'272626',m+'222121',
	    m+'1A1919',m+'111111',m+'080808',m+'252524',m+'1F1F1E',m+'6A6A65',m+'434341',m+'000000',
	    m+'222529',m+'141618',m+'060707',m+'000000',m+'010102',m+'575B62',m+'BAC1D1',m+'BEC5D6',
	    m+'8088A0',m+'737B94',m+'000000',m+'2C2F39',m+'757D97',m+'767E98',m+'9DA4BA',m+'BDC4D5',
	    m+'BEC5D7',m+'BEC6D6',m+'B7BED0',m+'8C94AB',m+'757D96',m+'22252C',m+'000000',m+'050505',
	    m+'0F1011',m+'1A1B1D',m+'030303',m+'2C2F33',m+'2A2D31',m+'282B2F',m+'23262A',m+'1E2023',
	    m+'000000',m+'1B1B1B',m+'191919',m+'393B3E',m+'686B73',m+'9CA2AF',m+'BEC6D6',m+'BCC2D3',
	    m+'BEC6D6',m+'7D859E',m+'6F7790',m+'000000',m+'0F1013',m+'2B2E38',m+'4E5364',m+'6E768E',
	    m+'757D97',m+'757D96',m+'757D97',m+'757D96',m+'747D96',m+'757D96',m+'747C96',m+'6B738B',
	    m+'545A6D',m+'3C404E',m+'22242B',m+'0A0A0D',m+'000000',m+'6A728A',m+'7B839C',m+'BEC5D6',
	    m+'7D859E',m+'717991',m+'000000',m+'757D96',m+'BEC6D6',m+'838BA3',m+'747C96',m+'000000',
	    m+'505668',m+'757D97',m+'BEC6D6',m+'757D96',m+'111316',m+'000000',m+'030303',m+'757D96',
	    m+'7C849D',m+'BBC2D4',m+'BEC5D6',m+'BEC6D6',m+'BEC5D6',m+'BEC6D6',m+'BEC5D6',m+'BEC6D6',
	    m+'BEC5D6',m+'BEC6D6',m+'BEC5D6',m+'BEC6D6',m+'BEC5D6',m+'BEC6D6',m+'BEC5D6',m+'BEC6D6',
	    m+'A2A9BE',m+'757D96',m+'000000',m+'030303',m+'3D414F',m+'757D96',m+'757D97',m+'878EA6',
	    m+'98A0B5',m+'A7AEC2',m+'B2BACC',m+'BBC3D4',m+'BEC6D6',m+'BEC5D6',m+'B9C0D2',m+'B2BACC',
	    m+'ABB2C5',m+'A1A9BD',m+'959DB3',m+'878EA6',m+'757D97',m+'757D96',m+'434857',m+'000001',
	    m+'000000',m+'010101',m+'020203',m+'030304',m+'030404',m+'030304',m+'020203',m+'010101',
	    m+'000000', '');
}
