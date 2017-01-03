<?php
/**
 * Created by PhpStorm.
 * User: guilherme
 * Date: 03/01/17
 * Time: 15:29
 */

namespace App\Controllers;


use Silex\Application;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class Main
{
    public function homeAction(){
        return new Response('App\Controllers\Main::homeAction');
    }

    public function helloAction(Request $request, Application $app){
        return new Response('App\Controllers\Main::helloAction => name : '.$request->get('name'));
    }
}