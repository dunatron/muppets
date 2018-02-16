<?php

namespace MyOrg\Model;
use SilverStripe\CMS\Model\SiteTree;

class HomePage extends SiteTree
{
    private static $db = array(
        "Intro" => "Text"
    );

    private static $has_one = array(
    );
}