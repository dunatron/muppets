<?php
namespace MyOrg\Controller;
use MyOrg\Model\ContactSubmission;
use SilverStripe\Admin\ModelAdmin;
class ContactFormAdmin extends ModelAdmin
{
    private static $managed_models = [
        ContactSubmission::class,
    ];
    private static $url_segment = 'contactSubmissionapp';
    private static $menu_title = 'Contact Submissions';
}