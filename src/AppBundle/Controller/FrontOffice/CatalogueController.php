<?php

namespace AppBundle\Controller\FrontOffice;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;


class CatalogueController extends Controller
{
    /**
     * @Route("/catalogue", name="catalogue")
     * il n'y a aucune condition d'accès à cette page
     */
    public function indexAction()
    {
        // replace this example code with whatever you need
        return new Response('<h1>Mon Catalogue</h1>');
    }

    /**
     * @Route("/connexion", name="authentification")
     * il n'y a aucune condition d'accès à cette page
     */
    public function connexionAction()
    {
        return new Response('<h1>Merci de vous Connectez </h1>');
    }
}