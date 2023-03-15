const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
let ready = false;
let imagesLoaded = 0;
totalImages = 0;
let photosArray = [];

// unsplash API
const count = 30;
const apiKey = 'w2G8c4WbDgnigPWyEK4KMMpXrtGPQ0ikkLJ4bHUB-FE';
const imageOrientation = 'landscape';

const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}
&orientation=${imageOrientation}`


// check if all images were loaded 
function imageLoaded() {
    imageLoaded++;
    if (imagesLoaded == totalImages) {
        ready = true;
        loader.hidden = true;
    }
}

// Create elements for links and photos and to DOM
function displayPhotos() {
    imageLoaded = 0;
    totalImages = photosArray.length;

    // run function for each object in photosarray
    photosArray.forEach((photo) => {
        // creat <a> to link to unsplash
        const item = document.createElement('a');
        item.setAttribute('href', photo.links.html);
        item.setAttribute('target', '_blank');

        // create img for photo
        const img = document.createElement('img');
        img.setAttribute('src', photo.urls.regular);
        img.setAttribute('alt', photo.alt_description);
        img.setAttribute('title', photo.alt_description);

        // event listener, check when each is finished loading
        img.addEventListener('load', imageLoaded)

        // put img inside the anchor tag
        item.appendChild(img);
        imageContainer.appendChild(item);


    })
}

// get photos from unsplash
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        // catch errors

    }
}

// check to see if scrolling near bottom of page, load more photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        getPhotos();
    }
})

getPhotos();