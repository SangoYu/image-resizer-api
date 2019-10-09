# image-resizer-api
Image resizer api service width nodejs.


### host
http://resizer.sangolab.top/

### Usage
http://resizer.sangolab.top/{imageUrl}@{width}_{height}_{quality}q.jpg


### params
`imageUrl` The url of the image to be resized.

[ `width` ]  Resize the image to the specific width.

[ `height` ]  (optional) Resize the image to the specific height.

[ `quality` ] (optional) Resize the image to the specific quality percent, default to 80%.

### returns
The resized image.

If the image url is invalid, returns error `Image error`;

### demo
http://resizer.sangolab.top/http://p3.music.126.net/Sv4H_U63vjguKBrRj_tUaA==/109951162839290909.jpg@50_50_80q.jpg
http://resizer.sangolab.top/http://p3.music.126.net/Sv4H_U63vjguKBrRj_tUaA==/109951162839290909.jpg@50_80q.jpg
http://resizer.sangolab.top/http://p3.music.126.net/Sv4H_U63vjguKBrRj_tUaA==/109951162839290909.jpg@50_50.jpg
http://resizer.sangolab.top/http://p3.music.126.net/Sv4H_U63vjguKBrRj_tUaA==/109951162839290909.jpg@50_100_80q.jpg
http://resizer.sangolab.top/http://p3.music.126.net/Sv4H_U63vjguKBrRj_tUaA==/109951162839290909.jpg@100_50_80q.jpg

