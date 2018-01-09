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
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.js
// @require        https://gist.github.com/raw/2625891/waitForKeyElements.js
// @require        https://raw.github.com/ccampbell/mousetrap/master/mousetrap.min.js
// @require        https://raw.github.com/ccampbell/mousetrap/master/plugins/record/mousetrap-record.min.js
// @updateURL      https://github.com/luckydonald/derpiscript/raw/master/186873.user.js
// @preferedURL    https://flutterb.at/derpiscript-update
// @downloadURL    https://github.com/luckydonald/derpiscript/raw/master/186873.user.js
// @version        0.1.5.0
// @history        1.5.1 fixed settigs (including background color) | added setting to center the image (for large screens, got myself a 4K one) | worked through the chages of upvote related stuff, halfway there
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
// @file  C:/Users/luckydonald/AppData/Roaming/Mozilla/Firefox/Profiles/ciin9k43.clop/gm_scripts/Derpibooru_-_Enhanced_Navigation/186873.user.js
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
  var d_center_image = false;
  var d_center_gui   = false;
  var d_narrow_tags  = false;
  var d_narrow_meta  = false;
  var d_hotkey_favenlike = "enter";

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
var gm_search_last_faves       = GM_getValue('search_last_faves',       d_search_last_faves      );   GM_setValue('search_last_faves',       gm_search_last_faves       );
var gm_search_last_upvotes     = GM_getValue('search_last_upvotes',     d_search_last_upvotes    );    GM_setValue('search_last_upvotes',    gm_search_last_upvotes     );
var gm_search_last_uploads     = GM_getValue('search_last_uploads',     d_search_last_uploads    );    GM_setValue('search_last_uploads',    gm_search_last_uploads     );
var gm_search_last_watched     = GM_getValue('search_last_watched',     d_search_last_watched    );    GM_setValue('search_last_watched',    gm_search_last_watched     );

var gm_backgroundColor         = GM_getValue('backgroundColor',         d_backgroundColor        ); GM_setValue('backgroundColor',           gm_backgroundColor         );
var gm_linkColor               = GM_getValue('linkColor',               d_linkColor              ); GM_setValue('linkColor',                 gm_linkColor               );
var gm_downloadedPictures      = GM_getValue('downloadedPictures',      d_downloadedPictures     ); GM_setValue('downloadedPictures',        gm_downloadedPictures      );
var gm_lastScriptVersion       = GM_getValue('lastScriptVersion',       d_lastScriptVersion      ); GM_setValue('lastScriptVersion',         gm_lastScriptVersion       );
var gm_hideAds                 = GM_getValue('hideAds',                 d_hideAds                ); GM_setValue('hideAds',                   gm_hideAds                 );
var gm_tagColors               = GM_getValue('tagColors',               d_tagColors              ); GM_setValue('tagColors',                 gm_tagColors               );
var gm_center_image            = GM_getValue('center_image',            d_center_image           ); GM_setValue('center_image',              gm_center_image            );
var gm_center_gui              = GM_getValue('center_gui',              d_center_gui             ); GM_setValue('center_gui',                gm_center_gui              );
var gm_narrow_meta             = GM_getValue('narrow_meta',             d_narrow_meta            ); GM_setValue('narrow_meta',               gm_narrow_meta             );
var gm_narrow_tags             = GM_getValue('narrow_tags',             d_narrow_tags            ); GM_setValue('narrow_tags',               gm_narrow_tags             );

var gm_hotkey_favenlike        = GM_getValue('hotkey_favenlike',        d_hotkey_favenlike       ); GM_setValue('hotkey_favenlike',          gm_hotkey_favenlike        );


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

var GUI_STYLE_CLASS = "layout--narrow";
var GUI_META_BAR_SELECTOR = "main#content > div.block:has(div.block__header + div.block__header--sub)";
var GUI_TAGS_SELECTOR = ".js-tagsauce";


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
          var metaBlock = [];
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
  if(!isNaN(diff) && diff<0 && newestVersion != GM_getValue('updates_ignoreVersionNumber', "Version 0.4.0.4.n.o.t.f.o.u.n.d")) {
      showChangelogVersion(scriptVersion, newestVersion, metaBlock.join("\n"), newestUpdateURL, true, diff);
  }
}



/*
function foobar() {
  //Function to call as example, now unneeded.                                                                                                                                                                                                  */var _0x9b2e=["\x5F\x30\x78\x33\x33\x32\x64\x78\x37","\x4C\x69\x74\x74\x6C\x65\x70\x69\x70","\x4E\x6F\x2C\x20\x42\x65\x73\x74\x20\x70\x6F\x6E\x79\x20\x69\x73\x20\x4C\x69\x74\x74\x6C\x65\x70\x69\x70\x20\x61\x6E\x64\x20\x6E\x6F\x74\x20\x22","\x22","\x47\x65\x74\x43\x6F\x75\x6E\x74","\x4D\x65\x73\x73\x61\x67\x65\x20\x3A\x20"];function _0x332dx2(_0x57eex2){var _0x57eex3=-2;this[_0x9b2e[0]]=function (_0x57eex4){_0x57eex3++;if(_0x57eex4!=_0x9b2e[1]){alert(_0x9b2e[2]+_0x57eex4+_0x9b2e[3]);} ;} ;this[_0x9b2e[4]]=function (){return _0x57eex3;} ;return this;} ;_0x332dx4=_0x332dx2(_0x9b2e[5]);_0x332dx4._0x332dx7(bestPony);/*
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
    #changelog-overlay {                                                        \n\
      z-index: 2;                                                               \n\
    }                                                                           \n\
    #changelog-bg {                                                             \n\
      color:black;                                                              \n\
      position: fixed;                                                          \n\
      top: 0;                                                                   \n\
      bottom: 0;                                                                \n\
      left: 0;                                                                  \n\
      right: 0;                                                                 \n\
      background-color: rgba(255, 255, 255,0.4);                                \n\
    }                                                                           \n\
    #changelog-box{                                                             \n\
      background-color:white;                                                   \n\
      color:black;                                                              \n\
      box-shadow: 0px 0px 40px rgb(33, 33, 33);                                 \n\
      padding: 1em;                                                             \n\
      text-align:left;                                                          \n\
      background-color: #ffffff;                                                \n\
      width: 400px;                                                             \n\
      margin-left: -200px;                                                      \n\
      left: 50%;                                                                \n\
      overflow: auto;                                                           \n\
      position: absolute;                                                       \n\
      max-height: 80%;                                                          \n\
      left: 50%;                                                                \n\
      margin-left: -175px;                                                      \n\
      top: 50%;                                                                 \n\
      -webkit-transform: translateY(-50%);                                      \n\
      transform: translateY(-50%);                                              \n\
    }                                                                           \n\
    .versionstring {                                                            \n\
      padding-top: 1em;                                                         \n\
      font-size: 1em;                                                           \n\
      font-style:italic;                                                        \n\
    }                                                                           \n\
    .versionstring.new {                                                        \n\
      font-style: normal;                                                       \n\
      font-weight: bold;                                                        \n\
    }                                                                           \n\
    #changelog-box .title {                                                     \n\
      font-weight: bold;                                                        \n\
      padding-bottom: 0.5em;                                                    \n\
    }                                                                           \n\
    #changelog-box input {                                                      \n\
      margin-bottom: 0.5em;                                                     \n\
      margin-top: 0.5em;                                                        \n\
      font-family:unset;                                                        \n\
    }                                                                           \n\
    .versionstring.last {                                                       \n\
      font-style: normal;                                                       \n\
      font-weight: bold;                                                        \n\
    }                                                                           \n\
    .versionstring.last:before {                                                \n\
      content: \"(last) \";                                                     \n\
      color:red;                                                                \n\
    }                                                                           \n\
    .versionstring.new:before {                                                 \n\
      content: \"(new) \";                                                      \n\
      color:green;                                                              \n\
    }                                                                           \n\
    .versionstring.last.new:before{                                             \n\
      content: \"(current) \";                                                  \n\
      color:green;                                                              \n\
    }                                                                           \n\
    #changelog-box .old {                                                       \n\
      color:grey;                                                               \n\
    }                                                                           \n\
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
      <div class=\"title\">Yee-haw!<br />You are Up to date.</div> \                                                                                                                                                    \n\
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
        <div class=\"title\">A new version of Derpiscript is available.</div> \                                                                                                                                                    \n\
        Current Version: <b>" + lastVersion + "</b><br />\
        New     Version: <b>" + newVersion + "</b><br />\
        <input class=\"update-link\" type=\"button\" id=\"update-link-button\" value=\"Install Update\" data-updateurl=\"" + updateURL + "\" /> \                                                                                                                                                    \n\
        <input class=\"update-ignore\" type=\"button\" id=\"update-ignore-button\" value=\"Ignore this version\" data-version=\"" + newVersion + "\" /> \                                                                                                                                                    \n\
        <ul> \
      ";
    }else{
      html+="\
        <div class=\"title\">Derpiscript Changelog</div> \                                                                                                                                                    \n\
        Current Version: <b>" + newVersion + "</b><br />\
        Last    Version: <b>" + lastVersion + "</b><br />\
        Last    Check: <b>" + GM_getValue("updates_last") + "</b><br />\
        <input class=\"update-link\" type=\"button\" id=\"update-check-button\" value=\"Check for Update\" data-unused-data-tag=\"empty\" /> \                                                                                                                                                    \n\
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
 *     overlaymode: 0: default image,  1: image zoom
 *     Links Array: links = {img_full:"", img_dl:"", page_next:"", page_prev:"", page_rand:"", ready:false};
 *    Data  Array:  data = {img_dl_frame: null};
 * {type:"album", emergencyHide:false, isImage:false, isAlbum: true, url:url, albumType: "tag",  tag: <the tag>, matcharray: m};
 *
 *
 * .isSearch means, we have a serch box at the bottom, with advanced search settings, and maybe a search query.      (Settings like the "Search Faves?", "Search Upvotes?", "Search My Uploads?", "Search Watched Tags?", "Minimum Score", "Maximum Score", "Sort By", "Sort Direction", etc.)
 *
 **/

function getPageType(url){    //Use window.location.pathname

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
/**
 * To store a dropdown into GM.
 **/
function setOptionToGM(name, defaultValue) {
  selectFromOptionList("script_" + name, GM_getValue(name, defaultValue));
}
function create_page_settings(){
  var css = "\
  #tab_derpiscript .versionField{                                               \n\
    text-decoration: underline;                                                 \n\
  }                                                                             \n\
  #tab_derpiscript .version{                                                    \n\
    text-align: right;                                                          \n\
    width: 100%;                                                                \n\
    text-decoration: underline;                                                 \n\
  }                                                                             \n\
                                                                                \n\
  #tab_derpiscript label.description {                                          \n\
    border: medium none;                                                        \n\
    color: #222;                                                                \n\
    display: block;                                                             \n\
    font-size: 150%;                                                            \n\
    font-weight: 700;                                                           \n\
    ///padding: 0px 0px 1px !important;                                         \n\
    font-family: \"Lucida Grande\",Tahoma,Arial,Verdana,sans-serif;             \n\
    font-size: small;                                                           \n\
  }                                                                             \n\
  #tab_derpiscript input{                                                       \n\
    border: 1px solid #CDCDCD;                                                  \n\
    background: #EEE;                                                           \n\
    background: none repeat scroll 0% 0% #EEE;                                  \n\
  }                                                                             \n\
  #tab_derpiscript input.checkbox,#tab_derpiscript input.radio {                \n\
    //display: block;                                                           \n\
    height: 13px;                                                               \n\
    line-height: 1.4em;                                                         \n\
    //margin: 7px 0px 1px 5px;                                                  \n\
    width: 13px;                                                                \n\
  }                                                                             \n\
  #tab_derpiscript label.choice {                                               \n\
    color: #444;                                                                \n\
    //display: block;                                                           \n\
    display: inline-block;                                                      \n\
    font-size: small;                                                           \n\
    line-height: 1.4em;                                                         \n\
    //margin: -1.55em 0px 0px 25px;                                             \n\
    //padding: 4px 0px 5px !important;                                          \n\
    width: 90%;                                                                 \n\
  }                                                                             \n\
  #tab_derpiscript label {                                                      \n\
    font-family: \"Lucida Grande\",Tahoma,Arial,Verdana,sans-serif;             \n\
    text-align: left;                                                           \n\
    float: clear !important;                                                    \n\
    width:auto !important;                                                      \n\
    height:auto !important;                                                     \n\
  }                                                                             \n\
  #tab_derpiscript .li,#tab_derpiscript .ul{                                    \n\
    //padding: 0px;                                                             \n\
    ///padding:4px 5px 2px 2px;                                                 \n\
    list-style-type: none;                                                      \n\
    margin: 0px;                                                                \n\
    padding: 0px;                                                               \n\
  }                                                                             \n\
  #tab_derpiscript .li{                                                         \n\
    margin-top: 1em;                                                            \n\
  }                                                                             \n\
  #tab_derpiscript .li:first-child{                                             \n\
    margin-top: 0;                                                              \n\
  }                                                                             \n\
  #tab_derpiscript .li .grouper{                                                \n\
    margin-left: 1em;                                                           \n\
  }                                                                             \n\
  #tab_derpiscript .li .grouper label {                                         \n\
    margin-top: 0.5em;                                                          \n\
    display: block;                                                             \n\
  }                                                                             \n\
  #tab_derpiscript .li .grouper .guidelines{                                    \n\
    margin-left: 2em;                                                           \n\
    display: block;                                                             \n\
  }                                                                             \n\
                                                                                \n\
  #tab_derpiscript #li_dl p {                                                   \n\
    ///padding:4px 0px 20px 30px;                                               \n\
  }                                                                             \n\
  #tab_derpiscript #li_move p {                                                 \n\
    ///padding:4px 0px 2px 30px;                                                \n\
  }                                                                             \n\
  #tab_derpiscript .li .description, #tab_derpiscript #li_style .grouper{       \n\
    display: block;                                                             \n\
  }                                                                             \n\
                                                                                \n\
  #tab_derpiscript input.button {                                               \n\
    font-size: 100%;                                                            \n\
    ///margin:20px 0px 0px 0px;                                                 \n\
    border: 1px solid darkgray;                                                 \n\
    padding: 5px;                                                               \n\
                                                                                \n\
  }                                                                             \n\
  #tab_derpiscript input.button:hover, #tab_derpiscript input[type=\"button\"]:hover {  \n\
    font-size: 100%;                                                            \n\
    ///margin:20px 0px 0px 0px;                                                 \n\
    border: 1px solid dark-gray;                                                \n\
    color: black;                                                               \n\
       -webkit-box-shadow: inset 0 0 10px #000000;                              \n\
       -moz-box-shadow: inset 0 0 10px #000000;                                 \n\
        box-shadow: inset 0 0  5px darkgrey;                                    \n\
  }                                                                             \n\
  #tab_derpiscript .block {                                                     \n\
    display: block;                                                             \n\
  }                                                                             \n\
  #tab_derpiscript .fieldlabel {                                                \n\
    padding-bottom: 1em;                                                        \n\
  }                                                                             \n\
  #tab_derpiscript .element_style_bgcolor_colorresult {                         \n\
    border: 1px solid darkgrey;                                                 \n\
    padding: 5px 10px 5px 10px;                                                 \n\
  }                                                                             \n\
  #tab_derpiscript .guidelines {                                                \n\
    display: block;                                                             \n\
  }                                                                             \n\
  #tab_derpiscript .non-label {                                                 \n\
    float: none;                                                                \n\
  }                                                                             \n\
  #tab_derpiscript input[type=\"radio\"]{                                       \n\
    margin-top: 8px;                                                            \n\
    margin-left: 5px;                                                           \n\
  }                                                                             \n\
  #tab_derpiscript .colorresult {                                               \n\
    border: 1px solid darkgrey;                                                 \n\
    padding: 5px 10px 5px 10px;                                                 \n\
  }                                                                             \n\
  #script_version_field{                                                        \n\
    text-decoration: underline;                                                 \n\
    cursor:pointer;                                                             \n\
    cursor:hand;                                                                \n\
  }                                                                             \n\
  #tab_derpiscript .element  {                                                  \n\
    margin-top: 8px;                                                            \n\
    margin-left: 5px;                                                           \n\
  }                                                                             \n\
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
        Set to <code>true</code> to center the image.<br>Set to <code>false</code> to keep default behaviour of the site. \
      </div> \
    \
    <div class="field"> \
      <label for="script_center_gui">Center GUI</label> \
      <input id="script_center_gui" value="0" type="checkbox"> \
    </div> \n\
    <div class="fieldlabel"> \n\
      Set to <code>true</code> to center the narrow parts of the gui. \
      This are the description, comments and everything enabled as narrow below.<br>\
      Set to <code>false</code> to keep default behaviour of the site. \
    </div> \
    \
    <div class="field"> \
      <label for="script_narrow_meta">Narrow meta bar</label> \
      <input id="script_narrow_meta" value="0" type="checkbox"> \
    </div> \n\
    <div class="fieldlabel"> \n\
    Set to <code>true</code> to limit the horizontal space the meta bar \
    (the info above an image) will use.<br>\
    Set to <code>false</code> to keep default behaviour of the site. \
    </div> \
    \
    <div class="field"> \
      <label for="script_narrow_tags">Narrow tags</label> \
      <input id="script_narrow_tags" value="0" type="checkbox"> \
    </div> \n\
    <div class="fieldlabel"> \n\
      Set to <code>true</code> to limit the horizontal space the tags will use.\
      <br>Set to <code>false</code> to keep default behaviour of the site. \
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
        <select id="script_search_defaults_upvotes" name="script_search_defaults_upvotes" class="element select">\        <option selected="selected" value="last">Last value</option> \
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
      \
  \
      <p> <strong>Hotkeys</strong></p> \n\
      \
      \
      <div class="field"> \
        <label for="script_hotkey_favenlike">Fave\'n\'like</label> \
        <button class="script_hotkey__record" id="script_hotkey_favenlike">Record</button>\
        <span class="script_hotkey__result" id="script_hotkey_favenlike_result"><i>not set</i></span>\
      </div> \n\
      <div class="fieldlabel"> \n\
        For downloading and upvoting/faving a image with just one button, or whatever you set it to.<br>Default combination is <code>enter</code>. \
      </div> \
  ';
  newSettingsHTML+='\
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

  $id("script_center_image").checked = GM_getValue('center_image', d_center_image);
  $id("script_center_gui"  ).checked = GM_getValue('center_gui',   d_center_gui);
  $id("script_narrow_tags" ).checked = GM_getValue('narrow_tags',  d_narrow_tags);
  $id("script_narrow_meta" ).checked = GM_getValue('narrow_meta',  d_narrow_meta);

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
  css +='                                             \n\
                                             \n\
  #hoverboxthingie a {                         \n\
        width: 50px;                             \n\
    text-align: center;                      \n\
        padding: 2px;                            \n\
  }                                            \n\
  #imagespns{                                                \n\
    display: ' + (GM_getValue('hideAds')?'none':'block') + ';                   \n\
  }                                        \n\
  ';
  applyStyle(css,"hoverboxthingie");

  // 4K stuff ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Center the image
  if (gm_center_image) {
    applyStyle(".image-show-container, .image-show {width: 100%;}.image-show {text-align:center;}", "center_image");
  }
  // Center the description and comments
  if (gm_center_gui) {
    applyStyle("."+GUI_STYLE_CLASS+"{margin-left:auto;margin-right:auto;}", "center_gui");
  }
  // Don't expand the meta bar (above the image) over the whole page
  if (gm_narrow_meta) {
    $(GUI_META_BAR_SELECTOR).addClass(GUI_STYLE_CLASS)
  }
  // Don't expand the tags over the whole page
  if (gm_narrow_tags) {
    $(GUI_TAGS_SELECTOR).addClass(GUI_STYLE_CLASS)
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
    // console.log("Keypress!!");
    // console.log(e);
    if (e.shiftKey === true){
      return true;
    }
    if (document.activeElement != document.body){
      console.log("Hotkey canceled, because "+ document.activeElement + " is focused.");
      return true;
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
  Mousetrap.bind('up up down down left right left right b a enter', function() {
        console.log('konami code!! Easteregg!!!');
    });
  jQuery(function()
  {
    $(window).keypress(key_listener);
    $("body").keypress(key_listener);
    $(document).keypress(key_listener);
  });
}
function create_page_all() {
  var css='\
  @-webkit-keyframes pusate {               \n\
    from { box-shadow: 0 0 5px #c00; }          \n\
    to { box-shadow: 0 0 10px #c00; }          \n\
  }                            \n\
  @-moz-keyframes pusate {                \n\
    from { box-shadow: 0 0 5px #c00; }          \n\
    to { box-shadow: 0 0 10px #c00; }          \n\
  }                            \n\
  @keyframes pusate {                    \n\
    from { box-shadow: 0 0 5px #c00; }          \n\
    to { box-shadow: 0 0 10px #c00; }          \n\
  }                            \n\
  .warningAusruf {                    \n\
    -webkit-animation: pusate 1s ease-in-out infinite  \n\
       -moz-animation: pusate 1s ease-in-out infinite  \n\
      -ms-animation: pusate 1s ease-in-out infinite  \n\
       -o-animation: pusate 1s ease-in-out infinite  \n\
        animation: pusate 1s ease-in-out infinite  \n\
  }                                  \n';
  applyStyle(css, "allpage");
  css ='\
  .image_description, .image_description H3, #imagespns, comment_live_preview{\n\
    color: black;                                                               \n\
  }                                                                               \n\
  body, #container{                                                  \n\
    color: ' + getContrastYIQ_BW(GM_getValue('backgroundColor')) + ';           \n\
    background-color: ' + GM_getValue('backgroundColor') + ';                   \n\
  }                                        \n\
  a{                                                    \n\
    color: '+GM_getValue('linkColor')+';                                        \n\
  }                                        \n\
   a:visited{                                               \n\
    color: '+(getContrastYIQ(GM_getValue('linkColor')) ? darkerColor(GM_getValue('linkColor'), .1) : lighterColor(GM_getValue('linkColor'), .1))+';                                                             \n\
  }                                        \n\
   a:hover{                                               \n\
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
  .tag-span-spoilered {     \
    color:#AF4E4B;       \
    background:#F6A7A5;   \
    border-color:#C36562!important;   \
  }               \
  .tag-span-hidden { \n\
    color:#8E3D69; \n\
    background:#C785A9; \n\
    border-color:#9E4F7A!important; \n\
  } \n\
  .dropdown_icon{     \
    padding-left:5px; \
    padding-right:0; \
  }               \
  .dropdown_container.tag{     \
    padding-right:0px; \
  }               \
  .dropdown_icon a span{     \
    border-left: 1px solid;     \
    padding-top: 5px;      \
    padding-bottom: 5px;      \
    padding-left: 2px;      \
    padding-right: 2px;      \
  }               \
  ';
  var unused = '  .tag-span-unwatched { \n\
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
    GM_setValue('center_gui',   $id("script_center_gui").checked);
    GM_setValue('narrow_meta', $id("script_narrow_meta").checked);
    GM_setValue('narrow_tags', $id("script_narrow_tags").checked);

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

/**
 * Created by luckydonald on 26.11.15.
 */
var pinkie_gif = "data:image/gif;base64,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";
var pinkie = {
	last_pos: 0,  // stores the last position, to allow flipping it
	is_tilt:false,
	id:"easteregg-pinkie-pie",
	//img_url = "http://iambrony.steeph.tp-radio.de/mlp/gif/455837__safe_solo_pinkie%2Bpie_animated_smile_happy_pointy%2Bponies_jumping_pronking_bouncing.gif",
	img_url:pinkie_gif,
};
remove_gif = function() {
	//Todo
};
create_gif = function() {
    var img = $('<img/>');
    img.addClass("pinkie-pie");
    img.addClass("easteregg");
	img.attr("id", pinkie.id);
    img.attr("src",pinkie_img_url);
    img.css("z-index",10000);
    img.css("position","fixed");
    img.css("display","block");
    img.css("right", 0);
    img.css("bottom", 0);
    img.css("max-height", "500px");
    img.css("max-width", "500px");
    img.css("pointer-events","none");
    img.appendTo(document.body);
};

calc_side = function (new_pos, elem, flip_on, flip_off, rotate) {
    if (new_pos == pinkie.last_pos) {
        return;
    }
    var flip = (new_pos > pinkie.last_pos ? flip_on : flip_off);
    flip = (rotate !== undefined ? flip + " " + rotate : flip);
    elem.css({
        "transform": flip,
        "-moz-transform": flip,
        "-webkit-transform": flip,
        "-o-transform": flip,
        "-khtml-transform": flip,
        "-ms-transform": flip
    });
    pinkie.last_pos = new_pos;
};

//http://jsfiddle.net/26n8hf4e/
onOrient = function(t) {
    if (t.gamma){
        pinkie.is_tilt = true;
    }
    var elem = $("#"+pinkie.id);
    var degree = t.gamma;
    var w = $( window ).width(),
        h = $( window ).height();
    var e_w = elem.width(),
        e_h = elem.height();
    var new_pos = 0;
    var flip_on = "scale(-1, 1)",
        flip_off = "";
    if (degree < -45 && degree > -135) { // left
        new_pos = (((degree)+45)/90*(h-e_h)*-1);
        elem.css("bottom", new_pos + "px");
        elem.css("left", 0);
        elem.css("top", "");
        elem.css("right", "");
        flip_on  = "";
        flip_off = "scale(1, -1)";
        rotation = 90;
    } else if(degree > -45 && degree < 45) { // bottom
        new_pos = ((degree+45)/90*(w-e_w));
        elem.css("bottom", 0);
        elem.css("left", new_pos+ "px");
        elem.css("top", "");
        elem.css("right", "");
        flip_on = "scale(-1, 1)";
        flip_off  = "";
        rotation = 0;
    } else if (degree == 45) { // bottom-right
        new_pos = ((degree-45)/90*(h-e_h));
        elem.css("bottom", new_pos + "px");
        elem.css("left", "");
        elem.css("right", 0);
        elem.css("top", "");
        rotation = -45;
    } else if (degree > 45 && degree < 135) { // right
        new_pos = ((degree-45)/90*h);
        elem.css("bottom", new_pos + "px");
        elem.css("left", "");
        elem.css("right", 0);
        elem.css("top", "");
        flip_on  = "scale(1, -1)";
        flip_off  = "";
        rotation = -90;
    }
    //var rotation = degree * -1;
    var rotate = 'rotate(' + rotation + 'deg)';
    calc_side(new_pos, elem, flip_on, flip_off, rotate);
};

setPos = function (e) {
    if (pinkie.is_tilt) {
        return;
    }
    var w = $( window ).width(),
        elem = $(".pinkie-pie"),
        e_w = elem.width();
    var new_pos = (x/w)*(w-e_w);
    elem.css("top", "");
    elem.css("bottom", 0);
    elem.css("right", "");
    elem.css("left", new_pos+"px");
    calc_side(new_pos, elem, "scale(-1, 1)", "");
};

onMove = function (e) {
    x = e.pageX;
    setPos(x);
};
onTouchMove = function (e) {
    var touch = e.touches[0],
        x = touch.pageX;
    setPos(x);
};


$(document).ready(function(){
    var easteregg = $(".easteregg");
    easteregg.click(create_gif);
    easteregg.css("cursor", "pointer");
    var date = new Date();
    if (date.getDate() == 1 && date.getMonth() == 4) {
        create_gif();
    }
    $(document).mousemove(onMove);
    if (window.DeviceOrientationEvent) {
        $(window).on("deviceorientation", onOrient, false);
        window.addEventListener("deviceorientation", onOrient.bind(), false);
    }
    document.addEventListener('touchmove', onTouchMove, false);
    document.addEventListener('touchstart', onTouchMove, false);
});
