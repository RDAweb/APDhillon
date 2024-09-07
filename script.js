console.log("Welcome To LOP SONGS");

//Initialize the Variables
let likeCount = 0;
const likeIcon = document.getElementById('likeIcon');
const likeCountDisplay = document.getElementById('likeCount');
let songIndex = 0;
let audioElement = new Audio('1.mp3');
let masterPlay = document.getElementById('masterPlay');
let songItemPlay = document.getElementById('songItemPlay');
let  = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItem = Array.from(document.getElementsByClassName('songItem'));
let songs = [
    {songName: "Brown Munde(AP Dhillon)", filePath:"1.mp3", coverPath: "jfirst.jpg"},
    {songName: "Sada Pyar(AP Dhillon)", filePath:"2.mp3", coverPath: "2.jpg"},
    {songName: "Summer High(AP Dhillon)", filePath:"3.mp3", coverPath: "3.jpg"},
    {songName: "Wo Noor(AP Dhillon)", filePath:"4.mp3", coverPath: "45.jpg"},
    {songName: "Dil Nu(AP Dhillon)", filePath:"5.mp3", coverPath: "45.jpg"},
    {songName: "Tere te(AP Dhillon)", filePath:"6.mp3", coverPath: "45.jpg"},
    {songName: "Chad Gussa Hun Jaan De(AP Dhillon)", filePath:"7.mp3", coverPath: "7.jpg"},
    {songName: "Pata Lagu Ga(AP Dhillon)", filePath:"8.mp3", coverPath: "8.jpg"},
    {songName: "Me Belle(AP Dhillon)", filePath:"9.mp3", coverPath: "9.jpg"},
    {songName: "True Stories(AP Dhillon)", filePath:"10.mp3", coverPath: "10.jpg"},
    {songName: "Teri Adawa(AP Dhillon)", filePath:"11.mp3", coverPath: "1112.jpg"},
    {songName: "With You(AP Dhillon)", filePath:"12.mp3", coverPath: "1112.jpg"},
    {songName: "Sleepless(AP Dhillon)", filePath:"13.mp3", coverPath: "13.jpg"},
    {songName: "Lifestyle(AP Dhillon)", filePath:"14.mp3", coverPath: "1415.jpg"},
    {songName: "Scars(AP Dhillon)", filePath:"15.mp3", coverPath: "1415.jpg"},
    {songName: "Teriya Adavaan(AP Dhillon)", filePath:"16.mp3", coverPath: "1415.jpg"},
]

songItem.forEach((element,i)=>{
    console.log(element, i);
    element.getElementsByTagName("img")[0].src = songs[i].coverPath
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

//audioElement.play();

//Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    }


    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause'); 
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
})
//Listen to Events
audioElement.addEventListener('timeupdate',() =>{
    //update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100)
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})


const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        if(makeAllPlays()|| audioElement.currentTime<=0){
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = `${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        (audioElement.currentTime = 0);
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-circle-play'); 
        masterPlay.classList.add('fa-circle-pause');
        }

        else{
        makeAllPlays()
            songIndex = parseInt(e.target.id);
            e.target.classList.add('fa-circle-play');
            e.target.classList.remove('fa-circle-pause');
            audioElement.src = `${songIndex+1}.mp3`;
            masterSongName.innerText = songs[songIndex].songName;
            (audioElement.currentTime = 0);
            audioElement.pause();
            gif.style.opacity = 0;
            masterPlay.classList.add('fa-circle-play'); 
            masterPlay.classList.remove('fa-circle-pause')};
    })
document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=16){
        songIndex=0
    }
    else{
        songIndex += 1;

    }
        audioElement.src = `${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play'); 
        masterPlay.classList.add('fa-circle-pause');
})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex=0
    }
    else{
        songIndex -= 1;

    }
        audioElement.src = `${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play'); 
        masterPlay.classList.add('fa-circle-pause');
})

// Handle song end to play the next song and update the icons
audioElement.addEventListener('ended', () => {
    // Reset the icon of the current song
    document.getElementById(songIndex).classList.remove('fa-circle-pause');
    document.getElementById(songIndex).classList.add('fa-circle-play');

    // Move to the next song
    songIndex += 1;
    if (songIndex >= songs.length) {
        songIndex = 0; // Loop back to the first song if the list ends
    }

    // Update the audio source and song information
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();

    // Update play/pause icons
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    gif.style.opacity = 1;

    // Set the icon of the next song to 'fa-circle-pause'
    document.getElementById(songIndex).classList.remove('fa-circle-play');
    document.getElementById(songIndex).classList.add('fa-circle-pause');
});

// Handle keyboard events for spacebar, 'L', 'J', 'B', 'N', 'K', left arrow, and right arrow keys
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        e.preventDefault(); // Prevent space from scrolling the page
        togglePlayPause();
    }

    if (e.code === 'KeyL') {
        skipForward(5); // Skip forward 5 seconds when 'L' key is pressed
    }

    if (e.code === 'KeyJ') {
        skipBackward(5); // Skip backward 5 seconds when 'J' key is pressed
    }

    if (e.code === 'KeyB') {
        playPreviousSong(); // Play the previous song when 'B' key is pressed
    }

    if (e.code === 'KeyN') {
        playNextSong(); // Play the next song when 'N' key is pressed
    }

    if (e.code === 'KeyK') {
        togglePlayPause(); // Toggle play/pause when 'K' key is pressed
    }

    if (e.code === 'ArrowLeft') {
        skipBackward(10); // Skip backward 10 seconds when the left arrow key is pressed
    }

    if (e.code === 'ArrowRight') {
        skipForward(10); // Skip forward 10 seconds when the right arrow key is pressed
    }
});

// Function to toggle play/pause logic
const togglePlayPause = () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;

        // Set current playing song's icon
        document.getElementById(songIndex).classList.remove('fa-circle-play');
        document.getElementById(songIndex).classList.add('fa-circle-pause');
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;

        // Reset icon to play for the current song
        document.getElementById(songIndex).classList.remove('fa-circle-pause');
        document.getElementById(songIndex).classList.add('fa-circle-play');
    }
};

// Function to skip forward a certain number of seconds
const skipForward = (seconds) => {
    if (audioElement.currentTime + seconds <= audioElement.duration) {
        audioElement.currentTime += seconds; // Skip forward by the specified number of seconds
    } else {
        audioElement.currentTime = audioElement.duration; // Jump to the end if skipping would exceed song duration
    }
};

// Function to skip backward a certain number of seconds
const skipBackward = (seconds) => {
    if (audioElement.currentTime - seconds >= 0) {
        audioElement.currentTime -= seconds; // Rewind by the specified number of seconds
    } else {
        audioElement.currentTime = 0; // Jump to the start if rewinding would go below 0
    }
};

// Function to play the next song
const playNextSong = () => {
    // Reset the icon of the current song
    document.getElementById(songIndex).classList.remove('fa-circle-pause');
    document.getElementById(songIndex).classList.add('fa-circle-play');

    // Move to the next song
    if (songIndex >= songs.length - 1) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }

    // Update the audio source and song information
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();

    // Update play/pause icons
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    gif.style.opacity = 1;

    // Set the icon of the next song to 'fa-circle-pause'
    document.getElementById(songIndex).classList.remove('fa-circle-play');
    document.getElementById(songIndex).classList.add('fa-circle-pause');
};

// Function to play the previous song
const playPreviousSong = () => {
    // Reset the icon of the current song
    document.getElementById(songIndex).classList.remove('fa-circle-pause');
    document.getElementById(songIndex).classList.add('fa-circle-play');

    // Move to the previous song
    if (songIndex <= 0) {
        songIndex = songs.length - 1;
    } else {
        songIndex -= 1;
    }

    // Update the audio source and song information
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();

    // Update play/pause icons
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    gif.style.opacity = 1;

    // Set the icon of the previous song to 'fa-circle-pause'
    document.getElementById(songIndex).classList.remove('fa-circle-play');
    document.getElementById(songIndex).classList.add('fa-circle-pause');
};

document.addEventListener('DOMContentLoaded', function() {
    const likeIcon = document.getElementById('likeIcon');
    const likeCountDisplay = document.getElementById('likeCount');

    // Initialize the like count from local storage, default to 0 if not set
    let likeCount = parseInt(localStorage.getItem('likeCount')) || 0;
    const liked = localStorage.getItem('liked') === 'true';

    // Update the UI based on stored data
    likeCountDisplay.innerText = likeCount;
    if (liked) {
        likeIcon.classList.add('liked');
    }

    // Handle like button click
    likeIcon.addEventListener('click', () => {
        // Toggle the 'liked' class for the icon (changing its color)
        likeIcon.classList.toggle('liked');
        
        // Update the like count based on the icon's state
        if (likeIcon.classList.contains('liked')) {
            likeCount+;
            localStorage.setItem('liked', 'true');
        } else {
            likeCount-;
            localStorage.setItem('liked', 'true');
        }

        // Update local storage with the new like count
        localStorage.setItem('likeCount', likeCount);

        // Update the like count display
        likeCountDisplay.innerText = likeCount;
    });
});

<<<<<<< Updated upstream
=======
document.addEventListener('DOMContentLoaded', function() {
    const likeIcon = document.getElementById('likeIcon');
    const likeCountDisplay = document.getElementById('likeCount');

    // Fetch the like count and liked status from the server
    fetch('/api/likes')
        .then(response => response.json())
        .then(data => {
            const likeCount = data.likeCount;
            const liked = data.liked;

            // Update the UI based on the retrieved data
            likeCountDisplay.innerText = likeCount;
            if (liked) {
                likeIcon.classList.add('liked');
            }
        });

    // Handle like button click
    likeIcon.addEventListener('click', () => {
        const liked = likeIcon.classList.contains('liked');
        const newLikeCount = liked ? -1 : 1;

        // Update the like count on the server
        fetch('/api/likes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                increment: newLikeCount,
                liked: !liked
            })
        })
        .then(response => response.json())
        .then(data => {
            // Update the UI based on the server response
            likeCountDisplay.innerText = data.likeCount;
            likeIcon.classList.toggle('liked');
        });
    });
});

})
>>>>>>> Stashed changes
