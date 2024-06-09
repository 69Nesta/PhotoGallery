if (view)
    oneView()
else
    listView()


function openImage(id) {
    console.log(window.images[id].name)
    currentImage = id

    newUrl(id + 1, true)

    oneView()

    loadImage()
}

function changeImage(e) {
    e.preventDefault()
    const value = $('#photoselect').val()

    if (value.length === 0) return

    currentImage = value - 1
    newUrl($('#photoselect').val(), true)

    loadImage()
}

function print(text) {
    console.log(text)
}

$('.controls > .left').click((e) => {
    if (currentImage === 0) return

    currentImage -= 1
    loadImage()
    newUrl(currentImage + 1, true)
})

$('.controls > .right').click((e) => {
    if (currentImage + 1 === window.images.length) return

    currentImage += 1
    loadImage()
    newUrl(currentImage + 1, true)
})

function preload() {
    if (!preloadedImages.includes(currentImage))
        preloadedImages.push(currentImage)

    if (!preloadedImages.includes(currentImage + 1) && currentImage + 1 < window.images.length)
        preloadImage(currentImage + 1)
    if (!preloadedImages.includes(currentImage - 1) && currentImage - 1 >= 0)
        preloadImage(currentImage - 1)
}

function preloadImage(id) {
    print('Preloading : ' + id)
    let img = new Image();
    img.src = window.images[id].previewPath
    preloadedImages.push(id)
}


$(window).on('scroll', (e) => {
    if ($('#view_list').css('display') != 'none')
        localStorage.setItem('scroll', $(window).scrollTop())
})