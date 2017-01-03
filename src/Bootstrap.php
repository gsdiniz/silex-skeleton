<?php
/**
 * Created by PhpStorm.
 * User: guilherme
 * Date: 02/01/17
 * Time: 15:43
 */

namespace App;

use Silex\Application;

use Silex\Provider\TwigServiceProvider,
    Silex\Provider\MonologServiceProvider,
    Silex\Provider\AssetServiceProvider,
    Silex\Provider\HttpCacheServiceProvider,
    Silex\Provider\VarDumperServiceProvider;

use Symfony\Component\Config\FileLocator,
    Symfony\Component\Routing\Loader\YamlFileLoader,
    Symfony\Component\Routing\RouteCollection;
use Symfony\Component\Debug\ErrorHandler;
use Symfony\Component\Debug\ExceptionHandler;

class Bootstrap
{
    /**
     * @var \Silex\Application
     */
    private $app;

    /**
     * @var \App\Bootstrap|null
     */
    private static $instance = null;

    /**
     * Bootstrap constructor.
     */
    private function __construct()
    {
        $this->app = new Application();
    }

    /**
     * @return null
     */
    private function __clone()
    {
        return null;
    }

    /**
     * @return Bootstrap|null
     */
    public static function init(){

        if(self::$instance === null){
            self::$instance = new self();
        }

        return self::$instance;
    }

    /**
     * @return $this
     */
    public function registerTwigService(){
        $this->app->register(new TwigServiceProvider(), array(
            'twig.path' => __DIR__.'/Views',
        ));

        return $this;
    }

    /**
     * @return $this
     */
    public function registerAssetService(){
        $this->app->register(new AssetServiceProvider(), array(
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

        return $this;
    }

    /**
     * @return $this
     */
    public function registerLogService(){
        $this->app->register(new MonologServiceProvider(), array(
            'monolog.logfile' => __DIR__.'/../data/development.log',
        ));

        return $this;
    }

    /**
     * @return $this
     */
    public function registerHttpCacheService(){
        $this->app->register(new HttpCacheServiceProvider(), array(
            'http_cache.cache_dir' => __DIR__.'/../data/',
        ));

        return $this;
    }

    /**
     * @return $this
     */
    public function registerDumpService(){
        $this->app->register(new VarDumperServiceProvider());

        return $this;
    }

    /**
     * @param bool $debug
     * @return $this
     */
    public function setDebug($debug = false){
        ErrorHandler::register();
        ExceptionHandler::register(false);
        $this->app['debug'] = $debug;
        return $this;
    }

    /**
     * @param string $diretorio
     * @param string $arquivo
     * @return $this
     */
    public function configRoutes($diretorio = '/../config/route',$arquivo = 'main.yml'){
        $this->app['routes'] = $this->app->extend('routes',
            function (RouteCollection $routes, Application $app) use($diretorio,$arquivo) {
            $loader     = new YamlFileLoader(new FileLocator(__DIR__ . $diretorio));
            $collection = $loader->load($arquivo);
            $routes->addCollection($collection);

            return $routes;
        });

        return $this;
    }
    /**
     * @return null;
     */
    public function run(){
        $this->app->run();
    }
}