<?php
/**
 * Created by PhpStorm.
 * User: guilherme
 * Date: 30/12/16
 * Time: 14:26
 */
require_once '../vendor/autoload.php';

use App\Bootstrap;

Bootstrap::init()
    ->setDebug(true)
    ->registerLogService()
    ->registerTwigService()
    ->registerAssetService()
    ->configRoutes()
    ->run();