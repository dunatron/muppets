<?php

namespace MyOrg\Model;

use SilverStripe\CMS\Model\SiteTree;
use SilverStripe\GraphQL\Scaffolding\Interfaces\ScaffoldingProvider;
use SilverStripe\GraphQL\Scaffolding\Scaffolders\SchemaScaffolder;
use GraphQL\Type\Definition\ResolveInfo;
use SilverStripe\Assets\Image;
use SilverStripe\Forms\TextareaField;
use SilverStripe\AssetAdmin\Forms\UploadField;

class HomePage extends SiteTree implements ScaffoldingProvider
{
    private static $db = array(
        'Intro' => 'Text'
    );

    private static $has_one = array(
        'Image' => Image::class,
    );

    public function getBannerImage()
    {
        return $this->Image()->exists() ? $this->Image()->Fill(800, 300)->AbsoluteURL : null;
    }

    public function getRandomMuppet()
    {
        // This is running 4 times on a graphQL call...
        $muppetID = $this->RandomMuppetID();
        error_log(var_export($muppetID, true));
        //return Muppet::get()->byID($muppetID);
        return Muppet::get()->byID(1);
    }

    public function RandomMuppetID()
    {
        $ran = array(1,2,3,4,5,6,7,8,9,10,11);
        $randomID = $ran[array_rand($ran, 1)];
        return $randomID;
    }


    public function onAfterWrite()
    {
        parent::onAfterWrite();

        if ($this->Image()->exists()) {
            $this->Image()->copyVersionToStage('Stage', 'Live');
        }
    }

    public function getCMSFields()
    {
        // create parent fields
        $fields = parent::getCMSFields();

        /**
         * Create Extra fields
         */
        // Intro field
        $intro = TextareaField::create('Intro', 'Intro');
        // Banner Image upload field
        $bannerImage = UploadField::create('Image');
        // set allowed upload extensions for banner image upload field
        $bannerImage->getValidator()->setAllowedExtensions(array('png', 'jpg', 'jpeg'));

        // Add extra fields into cms
        $fields->addFieldToTab('Root.Main', $intro, 'Content');
        $fields->addFieldToTab('Root.Main', $bannerImage, 'Content');

        return $fields;
    }

    public function provideGraphQLScaffolding(SchemaScaffolder $scaffolder)
    {
        // Get a single muppet object by ID
        $scaffolder
            ->query('getHomePageFirst', __CLASS__)
            ->setResolver(function ($object, array $args, $context, ResolveInfo $info) {
                $homePage = self::get()->first();
                if (!$homePage) {
                    throw new \InvalidArgumentException(sprintf(
                        'Home Page #%s does not exist'
                    ));
                }
                return $homePage;
            })
            ->setUsePagination(false)
            ->end();

        return $scaffolder;
    }
}