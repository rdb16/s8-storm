<?php

namespace AppBundle\Entity\BackOffice;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * Product
 *
 * @ORM\Table(name="backoffice_product")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\BackOffice\ProductRepository")
 */
class Product
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
     * @ORM\Column(name="name", type="string", length=255, unique=true)
     * @Assert\NotBlank(message="Le nom du produit est obligatoire")
     *
     */
    private $name;

    /**
     * @var string
     *
     * @ORM\Column(name="price", type="decimal", precision=10, scale=2)
     * @Assert\NotBlank(message="Le prix du produit est obligatoire")
     * @Assert\GreaterThan(value=0,message="le pris doit être positif")
     */
    private $price;
    /**
     * @var string
     * @ORM\Column(name="description", type="string", length=255)
     * @Assert\NotBlank()
     */
    private $description;

    /**
     * @var Category
     * --contrainte de validation
     * @Assert\Valid()
     * @Assert\Type(type="AppBundle\Entity\BackOffice\Category")
     * @ORM\OneToOne(targetEntity="AppBundle\Entity\BackOffice\Category", cascade={"persist"})
     *
     */
    private $category;

    /**
     * @return string
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * @param string $description
     */
    public function setDescription($description)
    {
        $this->description = $description;
    }

    /**
     * @var Assert\DateTime
     *
     * @ORM\Column(name="createdAt", type="datetime")
     */
    private $createdAt;

    /**
     * @var bool
     *
     * @ORM\Column(name="isSold", type="boolean")
     */
    private $isSold = true;

    public function __construct()
    {
        $this->createdAt = new \DateTime('NOW');
    }


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
     * @return Product
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
     * Set price
     *
     * @param string $price
     *
     * @return Product
     */
    public function setPrice($price)
    {
        $this->price = $price;

        return $this;
    }

    /**
     * Get price
     *
     * @return string
     */
    public function getPrice()
    {
        return $this->price;
    }

    /**
     * @return Assert\DateTime
     */
    public function getCreatedAt()
    {
        return $this->createdAt;
    }

    /**
     * @param Assert\DateTime $createdAt
     */
    public function setCreatedAt($createdAt)
    {
        $this->createdAt = $createdAt;
    }

    /**
     * Set isSold
     *
     * @param boolean $isSold
     *
     * @return Product
     */
    public function setIsSold($isSold)
    {
        $this->isSold = $isSold;

        return $this;
    }

    /**
     * Get isSold
     *
     * @return bool
     */
    public function getIsSold()
    {
        return $this->isSold;
    }

    /**
     * Set category
     *
     * @param \AppBundle\Entity\BackOffice\Category $category
     *
     * @return Product
     */
    public function setCategory(\AppBundle\Entity\BackOffice\Category $category = null)
    {
        $this->category = $category;

        return $this;
    }

    /**
     * Get category
     * @return \AppBundle\Entity\BackOffice\Category
     *
     *
     */
    public function getCategory()
    {
        return $this->category;
    }
}
