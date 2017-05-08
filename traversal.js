//Credit to: https://www.w3schools.com/js/js_cookies.asp

var bookmarkList = [];

function Bookmark(url, name) {
    this.url = url;
    this.name = name;
} 

function start()
{
    window.location.href="setup.html"
}

function addBookmark() {
  var new_bookmark = new Bookmark(document.getElementById("url").value, document.getElementById("insert_name").value);
  var checked = false;
  if (bookmarkList.length < 5) {
    for (var i = 0; i < bookmarkList.length; i++) {
      if (bookmarkList[i].name == new_bookmark.name) {
        checked = true;
      }
    }
    if (!checked) {
      bookmarkList.push(new_bookmark);
      updateBookmarkList();
    }
    else {
      console.log("no duplicate names");
    }
  }
  else {
    console.log("To many inputs must be less then 5");
  }
}

function updateBookmarkList() {
  var buffer = "";
  for(var i = 0; i < bookmarkList.length; i++)
  {
    buffer += (i+1) + ". " + bookmarkList[i].name + " : " + bookmarkList[i].url + "\n";
  }
  document.getElementById("setupBookmarksList").value = buffer;
}

function removeBookmark() {
  buffer = document.getElementById("remove_name").value;
  for (var i = 0; i < bookmarkList.length; i++) {
    if (buffer == bookmarkList[i].name) {
      bookmarkList.splice(i, 1);
      updateBookmarkList();
    }
  }
}

function bookmarkListAccept() {
  setCookie("size", bookmarkList.length, 14);
  for (var i = 0; i < bookmarkList.length; i++) {
    setCookie("name" + i.toString(), bookmarkList[i].name, 14);
    setCookie("url" + i.toString(), bookmarkList[i].url, 14);
  }
  window.location.href="traversal.html";
}

function retrieveBookmarkList() {
  var size = getCookie("size");
  for(var i = 0; i < size; i++)
  {
     var new_bookmark = new Bookmark(getCookie("url" + i), getCookie("name" + i));
     bookmarkList.push(new_bookmark);
  }
  main();
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function main() {
  var canvas = document.getElementById("main_canvas");
  var ctx = canvas.getContext("2d");
  var cell_size_x = 100;
  var cell_size_y = 100;
  var player_position_x = 3;
  var player_position_y = 3;
  var name1 = 0;
  var name2 = 1;
  if(bookmarkList.length == 1)
    name2 = 0;
  var index = 0;
  var quit = false;
  var collision = [[0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 1, 1, 0, 0, 1, 1, 0],
                  [0, 1, 0, 0, 0, 0, 1, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 1, 0, 0, 0, 0, 1, 0],
                  [0, 1, 1, 0, 0, 1, 1, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0]];
  function drawFrame() {
    ctx.fillStyle = 'grey';
    ctx.fillRect(0, 0, 800, 800);
    for (var i = 0; i < 8; i++) {
      for (var j = 0; j < 8; j++) {
        if (collision[i][j] == 1) {
          ctx.fillStyle = 'rgb(200, 0, 0)';
          ctx.fillRect(i * 100, j * 100, 100, 100);
        }
      }
    }
    ctx.font = "30px Comic Sans MS";
    ctx.fillStyle = "red";
    ctx.fillText("<-", 50, 400);
    ctx.fillText("->", 750, 400);
    ctx.fillText(bookmarkList[name1].name, 325, 50);
    ctx.fillText(bookmarkList[name2].name, 325, 750);
    ctx.fillStyle = 'blue';
    ctx.fillRect(player_position_x * cell_size_x, player_position_y * cell_size_y, cell_size_x, cell_size_y);
  }
  myFrame = setInterval(drawFrame, 16);

  if (canvas.getContext) {
    if (bookmarkList.length == 1) {
    }
    document.addEventListener("keydown", function (event) {
      if (event.keyCode == 37) {
        // left
        if (!collision[player_position_x - 1][player_position_y])
          player_position_x -= 1;
        if ((player_position_x == 0 && player_position_y == 3) || (player_position_x == 0 && player_position_y == 4)) {
          player_position_x = 3;
          player_position_y = 3;

          name1--;
          name2--;

          if (name1 == -1)
            name1 = bookmarkList.length - 1;
          if (name2 == -1)
            name2 = bookmarkList.length - 1;
          //change names 1 and 2 to new rotation
        }
      }
      if (event.keyCode == 38) {
        // up
        if (!collision[player_position_x][player_position_y - 1])
          player_position_y -= 1;
        if ((player_position_x == 3 && player_position_y == 0) || (player_position_x == 4 && player_position_y == 0)) {
          player_position_x = 3;
          player_position_y = 3;
          //go to link in name 1 position
          window.location.href = bookmarkList[name1].url;
        }
      }
      if (event.keyCode == 39) {
        // right
        if (!collision[player_position_x + 1][player_position_y])
          player_position_x += 1;
        if ((player_position_x == 7 && player_position_y == 3) || (player_position_x == 7 && player_position_y == 4)) {
          player_position_x = 3;
          player_position_y = 3;

          name1++;
          name2++;

          if (name1 == bookmarkList.length)
            name1 = 0;
          if (name2 == bookmarkList.length)
            name2 = 0;
          //change names 1 and 2 to new rotation
        }
      }
      if (event.keyCode == 40) {
        // down
        if (!collision[player_position_x][player_position_y + 1])
          player_position_y += 1;
        if ((player_position_x == 3 && player_position_y == 7) || (player_position_x == 4 && player_position_y == 7)) {
          player_position_x = 3;
          player_position_y = 3;
          //go to link in name 2 position
          window.location.href = bookmarkList[name2].url;
        }
      }
    });
    }
}
