const imgContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let PhotosArr = [];
let isInitalLoad = true;


// Unsplash API
let count = 5;
const apiKey = 'wUYtHA2ndQVUcgfsn3EMfrbCmqQ1UcGuCJFXU_DrZ1Q';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Update image count
function updateImgCount(counter){
    apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${counter}`;
}


// Check if all images were loaded
function imgLoaded(){
    imagesLoaded++;
    if(imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;   
        count = 30; 
    }
}


// Helper function to set attributes on DOM elements
function setAttributes(elements, attributes){
    for (const key in attributes){
        elements.setAttribute(key, attributes[key]);
    }
}

// Create elements for links, & photos, add to DOM
function displayPhotos(){
    imagesLoaded = 0;
    totalImages = PhotosArr.length;
    // Run function for each object in photos array 
    PhotosArr.forEach((photo) => {
        // Create <a> to link to Unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });

        // Create <img> for photos
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });

        // Event listener, check when it is finished loading
        img.addEventListener('load', imgLoaded);

        // Put <img> inside <a>, then put both in imageContainer
        item.appendChild(img);
        imgContainer.appendChild(item); 

    });

}


//Get photos from Unsplash API
async function getPhotos(){
    try {
        const res = await fetch(apiUrl);
        PhotosArr = await res.json();
        displayPhotos();
        if(isInitalLoad){
            updateImgCount(30);
            isInitalLoad = false;
        }
    } catch (error) {
        // Catch errors here
    }
}

// Check to see if scrolled to bottom of page, load more photos.
window.addEventListener('scroll', ()=>{
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhotos();
    }
});




// On load 
getPhotos();