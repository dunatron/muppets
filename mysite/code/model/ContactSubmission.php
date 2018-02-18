<?php

namespace MyOrg\Model;

use SilverStripe\GraphQL\Scaffolding\Interfaces\ScaffoldingProvider;
use SilverStripe\GraphQL\Scaffolding\Scaffolders\SchemaScaffolder;
use GraphQL\Type\Definition\ResolveInfo;
use SilverStripe\ORM\DataObject;
use SilverStripe\Core\Environment;

class ContactSubmission extends DataObject implements ScaffoldingProvider
{

    private static $db = [
        'Name' => 'Varchar(255)',
        'Email' => 'Text',
        'Description' => 'Text'
    ];

    public function canView($member = null)
    {
        return true;
    }

    public function handleNewFormSubmission($args)
    {
        $captcha = new Captcha();
        $captcha->goo = $args['recaptchaToken'];
        $response = $captcha->verify();

        if (!$response->success) {
            // not works
            error_log(var_export('not works', true));
            return 'Nope';
        }
        else {
            // works
            error_log(var_export('works', true));

            $token = $args['recaptchaToken'];
            $name = $args['Name'];
            $email = $args['Email'];
            $description = $args['Description'];

            $newSubmission = ContactSubmission::create();
            $newSubmission->Name = $name;
            $newSubmission->Email = $email;
            $newSubmission->Description = $description;
            $newSubmission->write();
            return $newSubmission;
        }

    }


    public function provideGraphQLScaffolding(SchemaScaffolder $scaffolder)
    {
        $scaffolder
            ->mutation('submitContactForm', __CLASS__)
            ->addArgs([
                'recaptchaToken' => 'String!',
                'Name' => 'String!',
                'Email' => 'String!',
                'Description' => 'String!'
            ])
            ->setResolver(function ($object, array $args, $context, ResolveInfo $info){
                error_log(var_export($args, true));

                $submission = $this->handleNewFormSubmission($args);

                return $submission;
            })
            ->end();

        return $scaffolder;
    }


}

class Captcha
{
    public $goo;

    public function verify()
    {
        $postData = http_build_query(
            array(
                'secret' => Environment::getEnv('GOOGLE_RECAPTCHA_SECRET_KEY'),
                'response' => $this->goo,
                'remoteip' => $_SERVER['REMOTE_ADDR']
            )
        );

        $options = array('http' =>
            array(
                'method'  => 'POST',
                'header'  => 'Content-type: application/x-www-form-urlencoded',
                'content' => $postData
            )
        );

        $context  = stream_context_create($options);
        $response = file_get_contents('https://www.google.com/recaptcha/api/siteverify', false, $context);

        return json_decode($response);
    }
}
