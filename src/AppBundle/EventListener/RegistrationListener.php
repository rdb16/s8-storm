<?php
/**
 * Created by PhpStorm.
 * User: rdb
 * Date: 14/11/17
 * Time: 19:33
 */

namespace AppBundle\EventListener;
use FOS\UserBundle\FOSUserEvents;
use FOS\UserBundle\Event\FormEvent;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;


class RegistrationListener implements EventSubscriberInterface
{

    /**
     * Returns an array of event names this subscriber wants to listen to.
     *
     * The array keys are event names and the value can be:
     *
     *  * The method name to call (priority defaults to 0)
     *  * An array composed of the method name to call and the priority
     *  * An array of arrays composed of the method names to call and respective
     *    priorities, or 0 if unset
     *
     * For instance:
     *
     *  * array('eventName' => 'methodName')
     *  * array('eventName' => array('methodName', $priority))
     *  * array('eventName' => array(array('methodName1', $priority), array('methodName2')))
     *
     * @return array The event names to listen to
     */
    public static function getSubscribedEvents()
    {
        return
            [
            FOSUserEvents::REGISTRATION_SUCCESS => 'onRegistrationSuccess'
            ];
    }

    public function onRegistrationSuccess (FormEvent $event)
    {
        $roles = ['ROLE_BIDON'];
        $user = $event->getForm()->getData();
        $user->setRoles($roles);
    }

}