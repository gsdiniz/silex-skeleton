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
use Symfony\Component\HttpFoundation\Response;

class Depois
{
    public function log(Request $request, Response $response, Application $app){
        var_dump($response);
        $app['monolog']->info('Depois');
    }
}