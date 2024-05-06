async function loadRecentVideos() {
    const apiKey = 'AIzaSyA9FEZwhp1GhmpgHUBndVkjE5ylWP2M06g';
    const channelId = 'UC0RpPyxA4xL57FbRoyjAatA';
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&order=date&maxResults=5&type=video&key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        const videoList = document.getElementById('video-list');

        // Check if the API call was successful and there are items in the response
        if (response.ok && data.items.length > 0) {
            data.items.forEach(item => {
                const videoId = item.id.videoId;
                const title = item.snippet.title;
                const description = item.snippet.description;
                const thumbnailUrl = item.snippet.thumbnails.medium.url;

                const videoHTML = `
                    <div class="update-post">
                        <img src="${thumbnailUrl}" alt="${title}" style="width: 100%; max-width: 300px; height: auto; border-radius: 5px;">
                        <div>
                            <h3><a href="https://www.youtube.com/watch?v=${videoId}" class="read-more">${title}</a></h3>
                            <p>${description}</p>
                        </div>
                    </div>
                `;
                videoList.insertAdjacentHTML('beforeend', videoHTML);
            });
        } else {
            // Handle no videos found or error in the API response
            videoList.innerHTML = '<p>There was an error, that is all we know..</p>';
        }
    } catch (error) {
        console.error('Failed to fetch videos:', error);
        document.getElementById('video-list').innerHTML = '<p>No videos were found.</p>';
    }
}

document.addEventListener('DOMContentLoaded', loadRecentVideos);