<?php

namespace AppBundle\Form\BackOffice;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\MoneyType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;


class ProductType extends AbstractType
{
    /**
     * {@inheritdoc}
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('name', TextType::class, ['label'=>'Produit'])
            ->add('description', TextType::class, ['label'=>'Description'])
            ->add('price', MoneyType::class, ['currency'=>'EUR','scale'=> 2, 'grouping'=>true, 'label'=>'Prix '])
            ->add('isSold', CheckboxType::class, ['value'=> true, 'label'=>'Vendu'])
            ->add('category',CategoryType::class, ['label'=>'Catégorie'])
            ->add('save', SubmitType::class, ['attr'=>['class'=>'btn btn-primary'],
                'label'=>'ENREGISTRER']);
    }
    
    /**
     * {@inheritdoc}
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'AppBundle\Entity\BackOffice\Product'
        ));
    }

    /**
     * {@inheritdoc}
     */
    public function getBlockPrefix()
    {
        return 'appbundle_backoffice_product';
    }


}
