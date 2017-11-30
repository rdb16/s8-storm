<?php

namespace AppBundle\Entity\BackOffice;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * Category
 *
 * @ORM\Table(name="back_office_category")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\BackOffice\CategoryRepository")
 */
class Category
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="name", type="string", length=255)
     * @Assert\NotBlank(message="La catégorie doit avoir un nom" )
     *
     */
    private $name;

    /**
     * @var string
     * @ORM\Column(name="description", type="text", nullable=false)
     * @Assert\Length(
     *     min=5, max=52,
     *     minMessage="longueur mini {{ min }}", maxMessage="longueur Maxi {{ max }}"
     *     )
     * @Assert\NotBlank(message="La description ne peut pas être vide")
     *
     */
    private $description;


    /**
     * Get id
     *
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set name
     *
     * @param string $name
     *
     * @return Category
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name
     *
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set description
     *
     * @param string $description
     *
     * @return Category
     */
    public function setDescription($description)
    {
        $this->description = $description;

        return $this;
    }

    /**
     * Get description
     *
     * @return string
     */
    public function getDescription()
    {
        return $this->description;
    }
}
