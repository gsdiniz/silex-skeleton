<?php
/**
 * Created by PhpStorm.
 * User: guilherme
 * Date: 03/01/17
 * Time: 16:40
 */

namespace App\Middlewares;


use Silex\Application;
use Symfony\Component\HttpFoundation\Request;

class Antes
{
    public function log(Request $request, Application $app){
        var_dump($request);
        $app['monolog']->info('Antes');
    }
}