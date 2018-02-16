<?php
namespace MyOrg\Controller;
use MyOrg\Model\Muppet;
use SilverStripe\Admin\ModelAdmin;
class MuppetAdmin extends ModelAdmin
{
    private static $managed_models = [
        Muppet::class,
    ];
    private static $url_segment = 'muppetapp';
    private static $menu_title = 'Muppets';
}