<?php
namespace Model;
include_once("./conf/db.php.inc");

class DbConnection
{
    private static $instance;

    public static function getInstance()
    {
        if (!self::$instance) {
            try {
                self::$instance = new \mysqli(DB_SERVER, DB_USER, DB_PASSWORD, DB_DATABASE);
                self::$instance->set_charset("utf8");
            } catch (Exception $e) {
                echo self::$instance->connect_error;
            }
        }
        return self::$instance;
    }
}

?>