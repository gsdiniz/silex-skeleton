<?php
/**
 * Created by PhpStorm.
 * User: guilherme
 * Date: 03/01/17
 * Time: 16:40
 */

namespace App\Middlewares;


use Silex\Application;

class Antes
{
    public function log(Application $app){
        $app->log('Antes');
    }
}