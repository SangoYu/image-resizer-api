const Koa = require('koa');
const request = require('request');
const Router = require('koa-router');
const JPEGDecoder = require('jpg-stream/decoder');
const JPEGEncoder = require('jpg-stream/encoder');
const resize = require('resizer-stream');
const router = new Router();
const app = new Koa();


router.get('*', ctx => {

    let {url, width, height} = ctx.query;

    let option = { allowUpscale: true };

    if(width) {
        option.width = parseInt(width);
    }

    if(height) {
        option.height = parseInt(height);
    }

    if (!width && !height) {
        try{
            return ctx.body = request(url);
        }catch(e){
            return ctx.body = 'Image error';
        }
    }

    
    try{
        ctx.response.type = 'image/jpeg';
        ctx.body = request(url)
            .pipe(new JPEGDecoder)
            .pipe(resize(option))
            .pipe(new JPEGEncoder);
    }catch(e) {
        return ctx.body = 'Image error';
    }

    

});

app.use(router.routes());

app.listen(3000)