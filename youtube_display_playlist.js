// set api key, playlistid and max_results variables
var youtube_key = '';
var youtube_playlist_id = ''; 
var youtube_max_results = '50';

// create json rest feed
var youtube_rest_feed = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=' + youtube_max_results + '&playlistId=' + youtube_playlist_id + '&key=' + youtube_key;

// load and parse the feed
$.getJSON(youtube_rest_feed, function(playlistData) {
  var output="<ul>";
  for (var i in playlistData.items) {
    var videoTitle = "<h3><a href='https://www.youtube.com/watch?v=" + playlistData.items[i].snippet.resourceId.videoId + "'>" + playlistData.items[i].snippet.title + "</a></h3>";
    var videoThumbnail = "<a href='https://www.youtube.com/watch?v=" + playlistData.items[i].snippet.resourceId.videoId + "'><img src='" + playlistData.items[i].snippet.thumbnails.default.url + "' alt='" + playlistData.items[i].snippet.title + "' width='120' height='90' /></a>";
    var videoDescription = "<p>" + playlistData.items[i].snippet.description + "</p>"
    var publishedDate = new Date(Date.parse(playlistData.items[i].snippet.publishedAt));
    var publishedDateFormatted = "<p>" + publishedDate.toString() + "</p>";
    output += "<li>" + videoThumbnail + videoTitle + videoDescription + "</li>";
  }
  output+="</ul>";
  $("#video-container").append(output);
});
