const Koa = require('koa');
const request = require('request');
const Router = require('koa-router');
const pics = require('pics');
const resize = require('resizer-stream');
const probe = require('probe-image-size');
const router = new Router();
const app = new Koa();
const config = require('./config.json');

pics.use(require('gif-stream'));
pics.use(require('jpg-stream'));
pics.use(require('png-stream'));

router.get('/*', ctx => {

    let matchedArr = ctx.url.match(/http.+/);

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
        
        let resizeStream = () => {
            return request(url)
                .pipe(pics.decode())
                .pipe(resize(option))
                .pipe(pics.encode('image/jpeg' ,{ quality: quality || config.quality }))
        };

        let urlOrStream = url;
        let noSize = true;


        if (width || height) {
            urlOrStream = resizeStream();
            noSize = false;
        }
        
            
        return probe(urlOrStream).then(res => {
            ctx.type = 'image/jpeg';
            ctx.set({
                width: res.width,
                height: res.height
            });
            if(noSize){
                ctx.body = request(url);
            }else{
                ctx.body = resizeStream();
            }
        });
    }catch(e) {
        return ctx.body = 'Image error';
    }

    

});

app.use(router.routes());

app.listen(config.port)