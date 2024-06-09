const urlParams = new URLSearchParams(window.location.search);
const imageID = urlParams.get('image');
const view = urlParams.get('view') == 'true' ? true : false;
let imagesLoaded = false;
let currentImage = imageID ? parseInt(imageID) - 1 : 0
const preloadedImages = []

$.ajax('/images.json').done((data, status) => {
    window.images = data

    print('Images: ' + data.length)
    $('#compteur').html(`/ ${data.length}`)

    $('#stackedImages').html('')
    $('#stackedImages').removeClass('loader')

    if (view)
        loadImage()
    else
        loadImages()
})


function loadImages() {
    if (imagesLoaded) return

    imagesLoaded = true

    window.images.forEach((element, i) => {
        $('#stackedImages').append(
            `<img src="${element.previewSmallPath}" class="image_stacked" onclick="openImage(${i})"/>`
        )

    })
}

function loadImage() {
    $('#image_single_view').attr('src', window.images[currentImage].previewPath)
    $('#photoselect').val(`${currentImage + 1}`)
    $('#download_a').attr('href', window.images[currentImage].originalPath)


    preload()
}

function goToListView() {
    listView()
    newUrl(null, false)

    loadImages()

    const scrollTop = localStorage.getItem('scroll')
    if (scrollTop)
        window.scrollTo(0, scrollTop)
}

function listView() {
    $('#view_one').css('display', 'none')
    $('#view_list').css('display', 'block')
}
function oneView() {
    $('#view_one').css('display', 'block')
    $('#view_list').css('display', 'none')
}

function newUrl(id, view) {
    const url = new URL(location)
    url.searchParams.set('view', view)
    if (id != null)
        url.searchParams.set('image', id)
    else
        url.searchParams.delete('image')

    history.pushState({}, '', url)
}
