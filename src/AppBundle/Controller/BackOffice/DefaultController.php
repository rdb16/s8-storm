<?php

namespace AppBundle\Controller\BackOffice;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;



class DefaultController extends Controller
{
    /**
     * @Route("/back-office", name="back_office")
     * il n'y a aucune condition d'accès à cette page
     */
    public function indexAction(Request $request)
    {
        // replace this example code with whatever you need
        return new Response("<h1>Page du BackOffice111</h1>");
    }
}