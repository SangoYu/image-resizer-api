const Koa = require('koa');
const request = require('request');
const Router = require('koa-router');
const probe = require('probe-image-size');
const sharp = require('sharp');
const router = new Router();
const app = new Koa();
const S3 = require('./s3');
const config = require('./config.json');

router.get('/*', ctx => {

    let matchedArr = ctx.url.match(/(http|https|s3):\/\/.+/);

    if (!matchedArr || !matchedArr[0]){
        return ctx.body = 'Image error';
    }
    let url = matchedArr[0];
    
    let dimensionStr = url.split('@');
    url = dimensionStr[0];
    let width, height, quality;

    if (dimensionStr[1]){
        [width, height, quality] = dimensionStr[1].split('_');
    }

    let option = { allowUpscale: true };

    if(width) {
        option.width = parseInt(width);

        if(option.width>3000){
            return ctx.body = 'Image too large';
        }
    }

    if (height && height.indexOf('q')==-1){
        option.height = parseInt(height);
    }

    if (quality && quality.indexOf('q') > -1) {
        option.quality = parseInt(quality);
    } else if (height && height.indexOf('q') > -1){
        option.quality = parseInt(height);
    }

    try{

        let resizeStream = (stream) => {
            return stream
                .pipe(sharp.resize(option)).jpeg(option);
        };

        let getStream = () => {
            let stream;
            if (/s3:\/\//.test(url)) {
                let arr = url.split('s3://' + config.bucket + '/');
                let Key = arr[1];
                stream = S3.getObject({
                    Bucket: config.bucket,
                    Key
                }).createReadStream();
            } else {
                stream = request(url);
            }

            if (width || height) {
                stream = resizeStream(stream);
            }

            return stream;
        }

        let newStream = getStream();        
            
        return probe(newStream).then(res => {
            ctx.type = 'image/jpeg';
            ctx.set({
                width: res.width,
                height: res.height
            });
            ctx.body = getStream();
        });
    }catch(e) {
        console.log(e);
        return ctx.body = 'Image error';
    }

    

});

app.use(router.routes());

app.listen(config.port)