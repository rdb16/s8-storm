<?php
/**
 * Created by PhpStorm.
 * User: rdb
 * Date: 14/11/17
 * Time: 16:24
 */

namespace AppBundle\Entity;
use FOS\UserBundle\Model\User as BaseUser;
use Doctrine\ORM\Mapping as ORM;



/**
 * class UserAdmin
 *
 * @ORM\Entity(repositoryClass="UserAdminRepository")
 * @ORM\Table(name="user_admin")
 *
 */
class UserAdmin extends BaseUser
{
    /**
     *
     * @ORM\Id
     * @ORM\Column( type="integer" )
     * @ORM\GeneratedValue(strategy="AUTO")
     */
      protected $id;

    public function __construct()
    {
        parent::__construct();
    }

}
