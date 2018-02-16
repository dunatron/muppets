<?php

namespace MyOrg\Model;

use SilverStripe\GraphQL\Scaffolding\Interfaces\ScaffoldingProvider;
use SilverStripe\GraphQL\Scaffolding\Scaffolders\SchemaScaffolder;
use GraphQL\Type\Definition\ResolveInfo;
use SilverStripe\ORM\DataObject;
use SilverStripe\Assets\Image;
use SilverStripe\Forms\TextareaField;
use SilverStripe\AssetAdmin\Forms\UploadField;
use SilverStripe\Forms\FieldList;
use SilverStripe\Forms\TabSet;
use SilverStripe\Forms\Tab;

class Muppet extends DataObject implements ScaffoldingProvider
{

    private static $db = [
        'Title' => 'Varchar(255)',
        'Description' => 'Text'
    ];

    private static $has_one = [
        'Image' => Image::class,
    ];

    public function getThumbnail()
    {
        return $this->Image()->exists() ? $this->Image()->Fill(300, 300)->AbsoluteURL : null;
    }

    public function canView($member = null)
    {
        return true;
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
        // create text field for muppet description
        $muppetDetails = TextareaField::create('Description', 'Muppet Description');
        // create upload field for muppet image
        $muppetImage = UploadField::create('Image');
        // set allowed upload extensions for muppet image upload field
        $muppetImage->getValidator()->setAllowedExtensions(array('png', 'gif', 'jpg', 'jpeg'));
        /**
         * Field list and Tabs
         */
        $fields = FieldList::create(
            $root = TabSet::create(
                'Root',
                new Tab('Main', 'Muppet Details',
                    $muppetDetails
                ),
                new Tab('EventImages', 'Image',
                    $muppetImage
                )
            )
        );
        return $fields;
    }

    public function provideGraphQLScaffolding(SchemaScaffolder $scaffolder)
    {
        // Get a single muppet object by ID
        $scaffolder
            ->query('getSingleMuppet', __CLASS__)
            ->addArgs([
                'ID' => 'ID!'
            ])
            ->setResolver(function ($object, array $args, $context, ResolveInfo $info){
                $event = self::get()->byID($args['ID']);
                if (!$event) {
                    throw new \InvalidArgumentException(sprintf(
                        'Muppet #%s does not exist',
                        $args['ID']
                    ));
                }
                $params = [
                    'ID' => $event->ID
                ];
                return $event;
            })
            ->setUsePagination(false)
            ->end();

        // Get all Muppet Objects (No Pagination)
        $scaffolder
            ->query('getAllMuppets', __CLASS__)
            ->setResolver(function ($object, array $args, $context, ResolveInfo $info){
                $muppets = self::get();
                return $muppets;
            })
            ->setUsePagination(false)
            ->end();

        return $scaffolder;
    }


}