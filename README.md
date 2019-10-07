# image-resizer-api
Image resizer api service width nodejs.


### host
http://resizer.sangolab.top/


### params
`url` The url of the image to be resized.

[ `width` ]  (optional) Resize the image to the specific width.

[ `height` ]  (optional) Resize the image to the specific height.

### returns
The resized image.

If the image url is invalid, returns error `Image error`;

### demo
http://resizer.sangolab.top/?url=https://pic4.zhimg.com/d1b270239fb85f1dd851e8ba1945b399.jpg&width=100


