# PhotoGallery

## Photos converter (/converter)
Put all of your photos in a folder **images**!
```bash
converter/images/<your images>
```
Now you can install dependencies : 
```bash
pip install -r requirements.txt
```
And run the script with :
```bash
python3 main.py
```

## Website (/website)
Import **images.json** from python Script and put it on the root site with the **index.html**.
```bash
website/images.json
website/index.html
```

In a second time, you need to import images, take **original**, **preview** and **small** folder from **export** folder and put it on the **assets** folder of the site
```bash
converter/export/original/<photos>
converter/export/preview/<photos>
converter/export/small/<photos>
```
to
```bash
website/assets/original/<photos>
website/assets/preview/<photos>
website/assets/small/<photos>
```