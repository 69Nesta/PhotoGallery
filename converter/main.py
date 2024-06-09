from pathlib import Path
from PIL import Image # type: ignore
import time
import glob
import json

# ---------- variables ----------
imagesPath = "images"
exportPathPreview = 'export/preview'
exportPathSmallPreview = 'export/small'
exportPathOriginal = 'export/original'
images = []
finalJson = []


# -------- initialization --------
Path(exportPathPreview).mkdir(parents=True, exist_ok=True)
Path(exportPathSmallPreview).mkdir(parents=True, exist_ok=True)
Path(exportPathOriginal).mkdir(parents=True, exist_ok=True)


# ---------- functions -----------
def getExportOriginalPath(name):
    return exportPathOriginal + '/' + name + '.jpg'
def getExportPreviewPath(name):
    return exportPathPreview + '/' + name + '.jpg'
def getExportSmallPreviewPath(name):
    return exportPathSmallPreview + '/' + name + '.jpg'


# ------------ main -------------
def main():
    filesQueu = []

    for file in glob.glob(imagesPath+"/*.jpg"):
        filesQueu.append(file)



    for image in filesQueu:
        imageId = str(int(round(time.time() * 1000)))
        currentImage = Image.open(image)
        
        new_height = 800
        new_width = int(currentImage.size[0] / currentImage.size[1] * new_height)
        new_width_small = 300
        new_height_small = int(currentImage.size[1] / currentImage.size[0] * new_width_small)

        # original
        currentImage.save(getExportOriginalPath(imageId))
        
        # medium
        currentImage = currentImage.resize((new_width, new_height), Image.LANCZOS)
        currentImage.save(getExportPreviewPath(imageId), optimize=True, quality=95)
        
        # small
        currentImage = currentImage.resize((new_width_small, new_height_small), Image.LANCZOS)
        currentImage.save(getExportSmallPreviewPath(imageId), optimize=True, quality=95)

        images.append(imageId)
        print('File `' + imageId + '.jpg` done ! (' + str(len(images)) + '/' + str(len(filesQueu)) + ')' )

    for image in images:
        finalJson.append({
            'name': image + '.jpg',
            'originalPath': getExportOriginalPath(image),
            'previewPath': getExportPreviewPath(image),
            'previewSmallPath': getExportSmallPreviewPath(image),
        })
    
    json_object = json.dumps(finalJson, indent=4)
    
    with open("finals.json", "w") as outfile:
        outfile.write(json_object)

    print(json_object)
    

main()

