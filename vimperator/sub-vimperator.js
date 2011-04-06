// keymapじゃないのがミソ
[
    ['w',':tabclose'],
    ['<C-1>',':set gui=nobookmarks,nomenu,nonavigation'],
    ['<C-2>',':set gui=nobookmarks'],
    ['<C-3>',':set gui=all'],
    ['<C-h>',':tabmove! -1'],
    ['<C-l>',':tabmove! +1'],
    ['.v',':viewSBMComments'],
    ['<Leader>v',':viewSBMComments -t t'],
    ['.g',':geoSearch'],
    ['I',':pageinfo gmc'],
].forEach(function([key,command]){
 liberator.modules.mappings.addUserMap([liberator.modules.modes.NORMAL], [key],"User defined mapping",
  function () { liberator.execute(command); },{rhs: key,noremap: true});
});


// Add Mapping `C-c' copy or stop loading
mappings.addUserMap([modes.NORMAL,modes.VISUAL],['<C-c>'], 'Copy selected text or stop loading',
  function(){
    var sel = document.commandDispatcher.focusedWindow.getSelection().toString();
    if (sel){
      util.copyToClipboard(sel,true);
    } else {
      window.BrowserStop();
      liberator.echomsg('Stopped loading !', 5);
    }   
  },{ rhs: 'Copy selected text or stop loading' }
);



// sで検索
mappings.addUserMap([modes.NORMAL,modes.VISUAL],['s'], 'Search Selected Text',
  function(){
    var sel = window.content.window.getSelection().toString();
    if (sel) {
    	liberator.open(liberator.modules.util.escapeHTML(sel) , liberator.NEW_TAB);
    } else {
      commandline.open(":", "tabopen google ", modes.EX);
    }
  },{
    rhs: 'Search Selected Text'
  }
);


// auto pagerize on/off
let evaluateXPath = util.evaluateXPath || buffer.evaluateXPath;
mappings.addUserMap(
  [modes.NORMAL],
  ['A'],
  'Toggle AutoPagerize',
  function (motion, count, arg) {
    buffer.followLink(
      evaluateXPath('id("autopagerize_help")/div/a[@class="autopagerize_link"]').snapshotItem(0)
    );
  },
  {}
);


// Add Mapping `A-c' Start|Stop ChirpUserStream 
mappings.addUserMap([modes.NORMAL,modes.VISUAL],['<A-c>'], 'Toggle twittperator ChirpUserStream',
	function(){
		if(liberator.globalVariables.twittperator_use_chirp==0){
			liberator.plugins.twittperator.ChirpUserStream.start();
			liberator.globalVariables.twittperator_use_chirp = 1;
			liberator.echo("Start ChirpUserStream");
			
		}else{
			liberator.plugins.twittperator.ChirpUserStream.stop();
			liberator.globalVariables.twittperator_use_chirp = 0;
			liberator.echo("Stop ChirpUserStream");
		}
	},{}
);






// http://vimperator.g.hatena.ne.jp/teramako/20110111/1294733346
// http://code.google.com/intl/ja/apis/urlshortener/v1/getting_started.html
userContext.ggl = function getGoogleShortenURL(url, callback) {
  let uri = "https://www.googleapis.com/urlshortener/v1/url";
  let xhr = new XMLHttpRequest();
  xhr.open("POST", uri, !!callback);
  if (callback) {
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        callback(JSON.parse(xhr.responseText));
      }
    }
  }
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify({ longUrl: url || buffer.URL }));
  if (!callback) {
    return JSON.parse(xhr.responseText).id;
  }
}



