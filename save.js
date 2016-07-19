function onInitFs(fs) {
  console.log('Opened file system: ' + fs.name);
}

window.requestFileSystem(window.TEMPORARY, 5*1024*1024 /*5MB*/, onInitFs, errorHandler);

function errorHandler(e) {
  var msg = '';

  switch (e.code) {
    case FileError.QUOTA_EXCEEDED_ERR:
      msg = 'QUOTA_EXCEEDED_ERR';
      break;
    case FileError.NOT_FOUND_ERR:
      msg = 'NOT_FOUND_ERR';
      break;
    case FileError.SECURITY_ERR:
      msg = 'SECURITY_ERR';
      break;
    case FileError.INVALID_MODIFICATION_ERR:
      msg = 'INVALID_MODIFICATION_ERR';
      break;
    case FileError.INVALID_STATE_ERR:
      msg = 'INVALID_STATE_ERR';
      break;
    default:
      msg = 'Unknown Error';
      break;
  };

  console.log('Error: ' + msg);
}

window.webkitStorageInfo.requestQuota(PERSISTENT, 1024*1024, function(grantedBytes) {
  window.requestFileSystem(PERSISTENT, grantedBytes, onInitFs, errorHandler);
}, function(e) {
  console.log('Error', e);
});

function onInitFs(fs) {

  fs.root.getFile('log.txt', {create: true, exclusive: true}, function(fileEntry) {

    // fileEntry.isFile === true
    // fileEntry.name == 'log.txt'
    // fileEntry.fullPath == '/log.txt'

  }, errorHandler);

}

window.requestFileSystem(window.TEMPORARY, 1024*1024, onInitFs, errorHandler);


function onInitFs(fs) {

  fs.root.getFile('log.txt', {}, function(fileEntry) {

    // Get a File object representing the file,
    // then use FileReader to read its contents.
    fileEntry.file(function(file) {
       var reader = new FileReader();

       reader.onloadend = function(e) {
         var txtArea = document.createElement('textarea');
         txtArea.value = this.result;
         document.body.appendChild(txtArea);
       };

       reader.readAsText(file);
    }, errorHandler);

  }, errorHandler);

}

window.requestFileSystem(window.TEMPORARY, 1024*1024, onInitFs, errorHandler);


function onInitFs(fs) {

  fs.root.getFile('log.txt', {create: true}, function(fileEntry) {

    // Create a FileWriter object for our FileEntry (log.txt).
    fileEntry.createWriter(function(fileWriter) {

      fileWriter.onwriteend = function(e) {
        console.log('Write completed.');
      };

      fileWriter.onerror = function(e) {
        console.log('Write failed: ' + e.toString());
      };

      // Create a new Blob and write it to log.txt.
      var blob = new Blob(['Lorem Ipsum'], {type: 'text/plain'});

      fileWriter.write(blob);

    }, errorHandler);

  }, errorHandler);

}

window.requestFileSystem(window.TEMPORARY, 1024*1024, onInitFs, errorHandler);


function onInitFs(fs) {

  fs.root.getFile('log.txt', {create: false}, function(fileEntry) {

    // Create a FileWriter object for our FileEntry (log.txt).
    fileEntry.createWriter(function(fileWriter) {

      fileWriter.seek(fileWriter.length); // Start write position at EOF.

      // Create a new Blob and write it to log.txt.
      var blob = new Blob(['Hello World'], {type: 'text/plain'});

      fileWriter.write(blob);

    }, errorHandler);

  }, errorHandler);

}

window.requestFileSystem(window.TEMPORARY, 1024*1024, onInitFs, errorHandler);


<input type="file" id="myfile" multiple />


document.querySelector('#myfile').onchange = function(e) {
  var files = this.files;

  window.requestFileSystem(window.TEMPORARY, 1024*1024, function(fs) {
    // Duplicate each file the user selected to the app's fs.
    for (var i = 0, file; file = files[i]; ++i) {

      // Capture current iteration's file in local scope for the getFile() callback.
      (function(f) {
        fs.root.getFile(f.name, {create: true, exclusive: true}, function(fileEntry) {
          fileEntry.createWriter(function(fileWriter) {
            fileWriter.write(f); // Note: write() can take a File or Blob object.
          }, errorHandler);
        }, errorHandler);
      })(file);

    }
  }, errorHandler);

};


window.requestFileSystem(window.TEMPORARY, 1024*1024, function(fs) {
  fs.root.getFile('log.txt', {create: false}, function(fileEntry) {

    fileEntry.remove(function() {
      console.log('File removed.');
    }, errorHandler);

  }, errorHandler);
}, errorHandler);


dirEntry.isDirectory === true
// See the section on FileEntry for other inherited properties/methods.
...

var dirReader = dirEntry.createReader();
dirEntry.getFile(path, opt_flags, opt_successCallback, opt_errorCallback);
dirEntry.getDirectory(path, opt_flags, opt_successCallback, opt_errorCallback);
dirEntry.removeRecursively(successCallback, opt_errorCallback);
...

window.requestFileSystem(window.TEMPORARY, 1024*1024, function(fs) {
  fs.root.getDirectory('MyPictures', {create: true}, function(dirEntry) {
    ...
  }, errorHandler);
}, errorHandler);
  
  
var path = 'music/genres/jazz/';

function createDir(rootDirEntry, folders) {
  // Throw out './' or '/' and move on to prevent something like '/foo/.//bar'.
  if (folders[0] == '.' || folders[0] == '') {
    folders = folders.slice(1);
  }
  rootDirEntry.getDirectory(folders[0], {create: true}, function(dirEntry) {
    // Recursively add the new subfolder (if we still have another to create).
    if (folders.length) {
      createDir(dirEntry, folders.slice(1));
    }
  }, errorHandler);
};

function onInitFs(fs) {
  createDir(fs.root, path.split('/')); // fs.root is a DirectoryEntry.
}

window.requestFileSystem(window.TEMPORARY, 1024*1024, onInitFs, errorHandler);


window.requestFileSystem(window.TEMPORARY, 1024*1024, function(fs) {
  fs.root.getFile('/music/genres/jazz/song.mp3', {create: true}, function(fileEntry) {
    ...
  }, errorHandler);
}, errorHandler);

<ul id="filelist"></ul>


function toArray(list) {
  return Array.prototype.slice.call(list || [], 0);
}

function listResults(entries) {
  // Document fragments can improve performance since they're only appended
  // to the DOM once. Only one browser reflow occurs.
  var fragment = document.createDocumentFragment();

  entries.forEach(function(entry, i) {
    var img = entry.isDirectory ? '<img src="folder-icon.gif">' :
                                  '<img src="file-icon.gif">';
    var li = document.createElement('li');
    li.innerHTML = [img, '<span>', entry.name, '</span>'].join('');
    fragment.appendChild(li);
  });

  document.querySelector('#filelist').appendChild(fragment);
}

function onInitFs(fs) {

  var dirReader = fs.root.createReader();
  var entries = [];

  // Call the reader.readEntries() until no more results are returned.
  var readEntries = function() {
     dirReader.readEntries (function(results) {
      if (!results.length) {
        listResults(entries.sort());
      } else {
        entries = entries.concat(toArray(results));
        readEntries();
      }
    }, errorHandler);
  };

  readEntries(); // Start reading dirs.

}

window.requestFileSystem(window.TEMPORARY, 1024*1024, onInitFs, errorHandler);


window.requestFileSystem(window.TEMPORARY, 1024*1024, function(fs) {
  fs.root.getDirectory('music/genres/jazz', {}, function(dirEntry) {

    dirEntry.remove(function() {
      console.log('Directory removed.');
    }, errorHandler);

  }, errorHandler);
}, errorHandler);


window.requestFileSystem(window.TEMPORARY, 1024*1024, function(fs) {
  fs.root.getDirectory('/misc/../music', {}, function(dirEntry) {

    dirEntry.removeRecursively(function() {
      console.log('Directory removed.');
    }, errorHandler);

  }, errorHandler);
}, errorHandler);



function copy(cwd, src, dest) {
  cwd.getFile(src, {}, function(fileEntry) {

    cwd.getDirectory(dest, {}, function(dirEntry) {
      fileEntry.copyTo(dirEntry);
    }, errorHandler);

  }, errorHandler);
}

window.requestFileSystem(window.TEMPORARY, 1024*1024, function(fs) {
  copy(fs.root, '/folder1/me.png', 'folder2/mypics/');
}, errorHandler);


function rename(cwd, src, newName) {
  cwd.getFile(src, {}, function(fileEntry) {
    fileEntry.moveTo(cwd, newName);
  }, errorHandler);
}

window.requestFileSystem(window.TEMPORARY, 1024*1024, function(fs) {
  rename(fs.root, 'me.png', 'you.png');
}, errorHandler);



function move(src, dirName) {
  fs.root.getFile(src, {}, function(fileEntry) {

    fs.root.getDirectory(dirName, {}, function(dirEntry) {
      fileEntry.moveTo(dirEntry);
    }, errorHandler);

  }, errorHandler);
}

window.requestFileSystem(window.TEMPORARY, 1024*1024, function(fs) {
  move('/me.png', 'newfolder/');
}, errorHandler);

var img = document.createElement('img');
img.src = fileEntry.toURL(); // filesystem:http://example.com/temporary/myfile.png
document.body.appendChild(img);


window.resolveLocalFileSystemURL = window.resolveLocalFileSystemURL ||
                                   window.webkitResolveLocalFileSystemURL;

var url = 'filesystem:http://example.com/temporary/myfile.png';
window.resolveLocalFileSystemURL(url, function(fileEntry) {
  ...
});

