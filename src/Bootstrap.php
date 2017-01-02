<?php
/**
 * Created by PhpStorm.
 * User: guilherme
 * Date: 02/01/17
 * Time: 15:43
 */

namespace App;

use Silex\Application;

use Symfony\Component\Debug\ErrorHandler,
    Symfony\Component\Debug\ExceptionHandler;

use Silex\Provider\TwigServiceProvider,
    Silex\Provider\MonologServiceProvider,
    Silex\Provider\AssetServiceProvider,
    Silex\Provider\HttpCacheServiceProvider,
    Silex\Provider\VarDumperServiceProvider;

class Bootstrap
{
    /**
     * Bootstrap constructor.
     */
    private function __construct()
    {}

    /**
     *
     */
    private function __clone()
    {}


    public static function init(){

        if($app === null){
           $app = new Application();
        }

        $app->register(new TwigServiceProvider(), array(
            'twig.path' => __DIR__.'/Views',
        ));

        $app->register(new AssetServiceProvider(), array(
            'assets.named_packages' => array(
                'css' => array(
                    'base_path' => '/bundle/css',
                    'version' => 'v1',
                    'version_format' => '%s?version=%s'
                ),
                'js' => array(
                    'base_path' => '/bundle/js',
                    'version' => 'v1',
                    'version_format' => '%s?version=%s'
                ),
            ),
        ));


        $app->register(new MonologServiceProvider(), array(
            'monolog.logfile' => __DIR__.'/../data/development.log',
        ));

        $app->register(new HttpCacheServiceProvider(), array(
            'http_cache.cache_dir' => __DIR__.'/../data/',
        ));

        $app->register(new VarDumperServiceProvider());

        ErrorHandler::register();
        ExceptionHandler::register();

        $app->get('/messages',function() use ($app){
            return $app['twig']->render('main/messages.twig');
        });

        return $app;
    }
}