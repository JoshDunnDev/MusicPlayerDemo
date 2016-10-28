/* ----- Audio Controls Variable ----- */
var audio;

/* ----- Variables For Song List ----- */
var songListHtml = '';
var songList;

/* ----- Creates HTML For Song List ----- */
for (var i = 0; i < songs.length; i++) {
    songList = songs[i];
    songListHtml += '<li class="song" song="' + songList.songMedia + '" cover="' + songList.albumArt + '" artist="' + songList.artist + '">';
    songListHtml += '<div class="album-thumbnail">';
    songListHtml += '<img class="album-art" src="' + songList.albumArt + '">';
    songListHtml += '</div>';
    songListHtml += '<div class="song-info">';
    songListHtml += '<h1>' + songList.title + '</h1>';
    songListHtml += '<h2>' + songList.artist + '</h2>';
    songListHtml += '</div>';
    songListHtml += '<span class="duration">' + secondsConvert(songList.duration) + '</span> ';
    songListHtml += '</li>';
}

/* ----- Prints Song List Data To Page ----- */
$('.song-list').append(songListHtml)


/* ----- Variables For Initial Song & Current Song----- */
var initialSongHtml = '';
var initialSong;

/* ----- Generates Initial Song HTML ----- */
initialSong = songs[0];
audio = new Audio(initialSong.songMedia);
initialSongHtml += '<img class="album-art" src="' + initialSong.albumArt + '">';
initialSongHtml += '</div>';
initialSongHtml += '<div class="song-info">';
initialSongHtml += '<h1>' + initialSong.title + '</h1>';
initialSongHtml += '<h2>' + initialSong.artist + '</h2>';
initialSongHtml += '</div>';

/* ----- Generates Initial Duration ----- */
$('.progress-bar .duration').text(secondsConvert(initialSong.duration));


/* ----- Selects Initial Song ----- */
$('.song-list li:first-child').addClass('selected');

/* ----- Prints Initial Song Data To Page ----- */
$('.song-data').append(initialSongHtml);


/* ----- Generates Last Song HTML ----- */
var lastSongHtml = '';
var lastSong;

lastSong = songs[songs.length - 1];
lastSongHtml += '<img class="album-art" src="' + lastSong.albumArt + '">';
lastSongHtml += '</div>';
lastSongHtml += '<div class="song-info">';
lastSongHtml += '<h1>' + lastSong.title + '</h1>';
lastSongHtml += '<h2>' + lastSong.artist + '</h2>';
lastSongHtml += '</div>';


/* ----- Changes Current Song HTML On Click ----- */
$('.song-list li').click(function() {
    var album = $(this).find('img').attr('src');
    var title = $(this).find('h1').html();
    var artist = $(this).find('h2').html();
    var duration = $(this).find('span').html();
    var currentSongHtml = '';

    /* ----- Adds HTML ----- */
    currentSongHtml += '<img class="album-art" src="' + album + '">';
    currentSongHtml += '</div>';
    currentSongHtml += '<div class="song-info">';
    currentSongHtml += '<h1>' + title + '</h1>';
    currentSongHtml += '<h2>' + artist + '</h2>';
    currentSongHtml += '</div>';

    /* ----- Removes Old Data & Adds Current Data ----- */
    $('.song-data').children().remove();
    $('.song-data').append(currentSongHtml);

    /* ----- Removes Selected Class & Selects Current ----- */
    $('.song-list li').removeClass('selected');
    $(this).addClass('selected');

    /* ----- Stops Current Song From Playing ----- */
    audio.pause();
    audio.currentTime = 0;
    $('#pause').hide();
    $('#play').show();

    /* ----- Gets Song From Current ----- */
    audio = new Audio($(this).attr('song'));

    /* ----- Gets Duration From Current ----- */
    $('.progress-bar .duration').text(duration);

    /* ----- Plays New Song & Updates Slider ----- */
    audio.play();
    $('#play').hide();
    $('#pause').show();
    audio.addEventListener('timeupdate', progress, false);
    audio.volume = parseFloat($( "#slider-volume" ).slider('option', 'value') / 100);

});

/* ----- Play Button Functionality ----- */
$('#play').click(function(){
    audio.play();
    $('#play').hide();
    $('#pause').show();
    audio.addEventListener('timeupdate', progress, false);
    audio.volume = parseFloat($( "#slider-volume" ).slider('option', 'value') / 100);
});


/* ----- Pause Button Functionality ----- */
$('#pause').click(function(){
    audio.pause();
    $('#pause').hide();
    $('#play').show();
});


/* ----- Next Button Functionality ----- */
$('#next').click(function(){

    var next = $('.song-list li.selected').next();
    var album = $(next).find('img').attr('src');
    var title = $(next).find('h1').html();
    var artist = $(next).find('h2').html();
    var duration = $(next).find('span').html();
    var nextSongHtml = '';

    audio.pause();

    /* ----- Adds HTML ----- */
    nextSongHtml += '<img class="album-art" src="' + album + '">';
    nextSongHtml += '</div>';
    nextSongHtml += '<div class="song-info">';
    nextSongHtml += '<h1>' + title + '</h1>';
    nextSongHtml += '<h2>' + artist + '</h2>';
    nextSongHtml += '</div>';


    /* ----- Loops Song Back To Start ----- */
    if(next.length == 0) {
        next = $('.song-list li:first-child');
        $('.song-data').children().remove();
        $('.song-data').append(initialSongHtml);

        duration = $(next).find('span').html();
        $('.progress-bar .duration').text(duration);

    } else {
        $('.song-data').children().remove();
        $('.song-data').append(nextSongHtml);
    }


    /* ----- Removes Selected Class & Selects Current ----- */
    $('.song-list li').removeClass('selected');
    $(next).addClass('selected');

    /* ----- Stops Current Song From Playing ----- */
    $('#play').hide();
    $('#pause').show();

    /* ----- Gets Song From Current ----- */
    audio = new Audio($(next).attr('song'));

    /* ----- Gets Duration From Current ----- */
    $('.progress-bar .duration').text(duration);
    
    audio.play();
    audio.addEventListener('timeupdate', progress, false);
    audio.volume = parseFloat($( "#slider-volume" ).slider('option', 'value') / 100);
});

/* ----- Previous Button Functionality ----- */
$('#previous').click(function(){

    var previous = $('.song-list li.selected').prev();
    var album = $(previous).find('img').attr('src');
    var title = $(previous).find('h1').html();
    var artist = $(previous).find('h2').html();
    var duration = $(previous).find('span').html();
    var previousSongHtml = '';

    audio.pause();

    /* ----- Adds HTML ----- */
    previousSongHtml += '<img class="album-art" src="' + album + '">';
    previousSongHtml += '</div>';
    previousSongHtml += '<div class="song-info">';
    previousSongHtml += '<h1>' + title + '</h1>';
    previousSongHtml += '<h2>' + artist + '</h2>';
    previousSongHtml += '</div>';


    /* ----- Loops Song Back To End ----- */
    if(previous.length == 0) {
        previous = $('.song-list li:last-child');
        $('.song-data').children().remove();
        $('.song-data').append(lastSongHtml);

        duration = $(previous).find('span').html();
        $('.progress-bar .duration').text(duration);

    } else {
        $('.song-data').children().remove();
        $('.song-data').append(previousSongHtml);
    }


    /* ----- Removes Selected Class & Selects Current ----- */
    $('.song-list li').removeClass('selected');
    $(previous).addClass('selected');

    /* ----- Stops Current Song From Playing ----- */
    $('#play').hide();
    $('#pause').show();

    /* ----- Gets Song From Current ----- */
    audio = new Audio($(previous).attr('song'));

    /* ----- Gets Duration From Current ----- */
    $('.progress-bar .duration').text(duration);
    
    audio.play();
    audio.addEventListener('timeupdate', progress, false);
    audio.volume = parseFloat($( "#slider-volume" ).slider('option', 'value') / 100);

});

/* ----- Progress Bar Slider ----- */
$( "#slider" ).slider({
    range: "min",
    value: audio.currentTime,
    min: 0,
    max: 100,
    step: .05,
    slide: function( event, ui ) { 
    audio.currentTime = audio.duration/100*ui.value;
    }
});


/* ----- Converts Seconds To Minutes ----- */
function secondsConvert(s) {
    var m = Math.floor(s/60);
    s -= m*60;
    return m+":"+(s < 10 ? '0'+s : s);
}

/* ----- Duration ----- */
function progress() {
    $('#slider').slider('value', ((100 / audio.duration) * audio.currentTime));
    $('.progress-bar #current-time').text(secondsConvert(parseInt(audio.currentTime)));

    /* ----- Autoplay Next Song When Song Is Over ----- */
    if(audio.currentTime >= audio.duration) {
        $('#next').trigger('click');
    }
}

/* ----- Volume Bar Slider ----- */
$( "#slider-volume" ).slider({
    orientation: "vertical",
    range: "min",
    value: 60,
    min: 0,
    max: 100,
    slide: function() {
        audio.volume = parseFloat($( "#slider-volume" ).slider('option', 'value') / 100);
    }
});

/* ----- Shows & Hides Volume Controls ----- */
$('html').click(function(){
    $('.volume-popup').hide();
});

$('.max-volume').click(function(event){
    event.stopPropagation();
    $('.volume-popup').show();
});

$('.volume-popup').click(function(event) {
    event.stopPropagation();
});

