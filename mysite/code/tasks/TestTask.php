<?php
/**
 * Created by PhpStorm.
 * User: Heath
 * Date: 4/04/17
 * Time: 9:32 PM
 */
namespace MyOrg\Model;

use SilverStripe\Dev\BuildTask;
use SilverStripe\ORM\Queries\SQLSelect;
use SilverStripe\SiteConfig\SiteConfig;
use SilverStripe\View\ArrayData;
use SilverStripe\Dev\Debug;
use SilverStripe\Assets\Image;
use MyOrg;

use MyOrg\Model;




class TestTask extends BuildTask
{
    // Guide for array conversion ->http://array.include-once.org/
    // Guide for array conversion ->http://array.include-once.org/

    protected $title = 'Test QUERIES';

    public function MuppetIds()
    {
        $sqlQuery = new SQLSelect();
        $sqlQuery->setFrom('MyOrg_Model_Muppet');
        $sqlQuery->setSelect(['ID']);
        $sqlQuery->selectField('ID', 'ID');

        $result = $sqlQuery->execute();
        error_log(var_export('====MuppetIDS====', true));
        error_log(var_export($result, true));
        return $result;

    }



    public function run($request)
    {
        $data = $this->MuppetIds();
        var_dump($data);

        foreach($data as $row) {
            echo $row['ID'];
        }
    }

}