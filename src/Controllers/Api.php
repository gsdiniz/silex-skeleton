<?php
/**
 * Created by PhpStorm.
 * User: guilherme
 * Date: 04/01/17
 * Time: 10:13
 */

namespace App\Controllers;


use Symfony\Component\HttpFoundation\Response;

class Api
{
    public function listAction(){
        return new Response('App\Controllers\Api::listAction');
    }
}