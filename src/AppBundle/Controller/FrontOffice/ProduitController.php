<?php

namespace AppBundle\Controller\FrontOffice;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;

class ProduitController extends Controller
{
    /**
     * @param $name
     * @return \Symfony\Component\HttpFoundation\Response
     * @Route("/catalogue", name="catalogue")
     */
    public function indexAction()
    {
        $username = "Michel";

        return $this->render('catalogues/catalogue.html.twig', ['username' => $username,
            'produits'=>$this->getProduits()]);
    }
    private function getProduits(){
        $produits = ["clavier", "écran", "souris"];
        return $produits;
    }
}
