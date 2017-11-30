<?php

namespace AppBundle\Controller\BackOffice;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use AppBundle\Entity\BackOffice\Product;
use AppBundle\Form\BackOffice\ProductType;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;


class ProductController extends Controller
{

    /**
     *
     * @Route("/ajout-produit", name="add_product")
     *
     */
     public function addProductAction(Request $request)
     {
         $product = new Product();
         $form = $this->createForm(ProductType::class, $product);
         if ($request->isMethod('POST')) {
             $form->handleRequest($request);

             if ($form->isSubmitted() && $form->isValid()) {
                 $em = $this->getDoctrine()->getManager();
                 $em->persist($product);
                 $em->flush();

                 $info = "Produit bien crée et enregistrer";
                 return $this->render('success.html.twig', ['info'=>$info]);
             }
         }
         $formView = $form->createView();
         return $this->render('BackOffice/showProductForm.html.twig', ['form' => $formView, 'pageTitle'=>"Créer un produit"]);
     }
     

    /**
     * @return \Symfony\Component\HttpFoundation\Response
     *
     * @Route("liste-produits", name="products-list")
     *
     */
    public function productsListAction()
    {
        $repositiry = $this->getDoctrine()->getRepository('AppBundle:BackOffice\Product');

        $prodList = $repositiry->findAll();
        return $this->render(':BackOffice:productsList.html.twig', ['productsList' => $prodList]);
    }

    /**
     * @return \Symfony\Component\HttpFoundation\RedirectResponse|\Symfony\Component\HttpFoundation\Response
     *
     * @Route("/editer-produit/{id}", name="product_edit")
     */
    public function editProduct(Request $request, Product $product)
    {
        $form = $this->createForm(ProductType::class, $product);
        if ($request->isMethod('POST')) {
            $form->handleRequest($request);

            if ($form->isSubmitted() && $form->isValid()) {
                $em = $this->getDoctrine()->getManager();
                //$em->persist($product); Inutile car l'objet estrécupéré de la base et il a déjà un identifiant
                $em->flush();

                //$request->getSession()->getFlashBag()->add('notice', 'Modification Produit bien enregistrée');
                $info = "Produit modifié et sauvegardé";
                return $this->render('success.html.twig', ['info' => $info]);
            }
        }
        $formView = $form->createView();
        return $this->render(':BackOffice:showProductForm.html.twig', ['form' => $formView, 'pageTitle'=>"Modifier un produit"]);
    }


    /**
     * @param Product $product
     * @return \Symfony\Component\HttpFoundation\Response
     * @Route("/detruire-produit/{id}", name="product_delete")
     *
     */
    public function deleteProduct( Product $product)
    {
        $em = $this->getDoctrine()->getManager();
        $em->remove($product);
        $em->flush();

        $info = "Le produit a été supprimé de la base";
        return $this->render('success.html.twig', ['info'=>$info]);

    }
}
