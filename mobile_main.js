/**
 * A brief explanation for "project.json":
 * Here is the content of project.json file, this is the global configuration for your game, you can modify it to customize some behavior.
 * The detail of each field is under it.
 {
    "project_type": "javascript",
    // "project_type" indicate the program language of your project, you can ignore this field

    "debugMode"     : 1,
    // "debugMode" possible values :
    //      0 - No message will be printed.
    //      1 - cc.error, cc.assert, cc.warn, cc.log will print in console.
    //      2 - cc.error, cc.assert, cc.warn will print in console.
    //      3 - cc.error, cc.assert will print in console.
    //      4 - cc.error, cc.assert, cc.warn, cc.log will print on canvas, available only on web.
    //      5 - cc.error, cc.assert, cc.warn will print on canvas, available only on web.
    //      6 - cc.error, cc.assert will print on canvas, available only on web.

    "showFPS"       : true,
    // Left bottom corner fps information will show when "showFPS" equals true, otherwise it will be hide.

    "frameRate"     : 60,
    // "frameRate" set the wanted frame rate for your game, but the real fps depends on your game implementation and the running environment.

    "id"            : "gameCanvas",
    // "gameCanvas" sets the id of your canvas element on the web page, it's useful only on web.

    "renderMode"    : 0,
    // "renderMode" sets the renderer type, only useful on web :
    //      0 - Automatically chosen by engine
    //      1 - Forced to use canvas renderer
    //      2 - Forced to use WebGL renderer, but this will be ignored on mobile browsers

    "engineDir"     : "frameworks/cocos2d-html5/",
    // In debug mode, if you use the whole engine to develop your game, you should specify its relative path with "engineDir",
    // but if you are using a single engine file, you can ignore it.

    "modules"       : ["cocos2d"],
    // "modules" defines which modules you will need in your game, it's useful only on web,
    // using this can greatly reduce your game's resource size, and the cocos console tool can package your game with only the modules you set.
    // For details about modules definitions, you can refer to "../../frameworks/cocos2d-html5/modulesConfig.json".

    "jsList"        : [
    ]
    // "jsList" sets the list of js files in your game.
 }
 *
 */
cc.game.onStart = function(){
    cc.view.enableRetina(false);
    if (cc.sys.isNative) {
        cc.view.setDesignResolutionSize(640, 960, cc.ResolutionPolicy.SHOW_ALL);
        // Pass true to enable retina display, disabled by default to improve performance
        cc.view.enableRetina(false);
        // Adjust viewport meta
        cc.view.adjustViewPort(true);
        cc.view.resizeWithBrowserSize(true);
        var searchPaths = jsb.fileUtils.getSearchPaths();
        searchPaths.push('script');
        searchPaths.push('src');
        var paths = [
            'res/resjs',
            'res',
            'res/scenetest',
            'res/scenetest/ArmatureComponentTest',
            'res/scenetest/AttributeComponentTest',
            'res/scenetest/BackgroundComponentTest',
            'res/scenetest/EffectComponentTest',
            'res/scenetest/LoadSceneEdtiorFileTest',
            'res/scenetest/ParticleComponentTest',
            'res/scenetest/SpriteComponentTest',
            'res/scenetest/TmxMapComponentTest',
            'res/scenetest/UIComponentTest',
            'res/scenetest/TriggerTest'
        ];
        for (var i = 0; i < paths.length; i++) {
            searchPaths.push(paths[i]);
        }
        jsb.fileUtils.setSearchPaths(searchPaths);
    }
    else
    {
        // js-test use cpptest resource in debug mode , and in the release mode, console will copy the resource into the res dir
        // so the respath will modify to res,
        if (cc.game.config[cc.game.CONFIG_KEY.engineDir] !== "frameworks/cocos2d-html5") {
            cc.loader.resPath = '../cpp-tests/Resources';
        }
        else {
            cc.loader.resPath = 'res';
        }
    }

    cc.LoaderScene.preload(g_resources, function () {
        if(window.sideIndexBar && typeof sideIndexBar.start === 'function'){
            sideIndexBar.start();
        }else{
            var scene = new cc.Scene();
            scene.addChild(new TestController());
            cc.director.runScene(scene);
        }
    }, this);
};
cc.game.run();