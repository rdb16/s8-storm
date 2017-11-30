/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function(){
    var frenchWeekDay = [
        'Dimanche', 
        'Lundi', 
        'Mardi', 
        'Mercredi', 
        'Jeudi', 
        'Vendredi', 
        'Samedi'
    ];
    
    var frenchMonth = [
        'Janvier', 
        'Février', 
        'Mars', 
        'Avril', 
        'Mai', 
        'Juin', 
        'Juillet', 
        'Août', 
        'Septembre', 
        'Octobre', 
        'Novembre', 
        'Décembre'
    ];
    
    $('#calendar.apointments .availability.number').click(function(){
        var weekDay     = frenchWeekDay[ $(this).parent().data('weekday') ];
        var dayNumber   = $(this).html().trim();
        var month       = $("#calendar-container #calendar").data('month');
        var year        = $("#calendar-container #calendar").data('year');
        var url         = $(this).parent().data('url');
        
        $('#apointment-board ul').hide();
        $('#apointment-board input[type=submit]').hide();
        
        $('#apointment-board').children('h4').html( weekDay + ' ' + dayNumber + ' ' + frenchMonth[month -1] + ' ' + year );
        
        if( newEventId ) {
            url += '?neweventid=' + newEventId;
        }
        
        $.get( url, function( data ) {
            $('#apointmentHour').html(data);
            
            $('#apointment-board ul').show();
            $('#apointment-board input[type=submit]').show();
            
            if( action )
            {
                /*$('#return').css('margin-top', $('#apointment-board').outerHeight(true) );*/
                $('#apointment-board input[type=submit]').val('Mail envoyé');
                $('#apointment-board input').prop('disabled', true);
                $('#apointment-board input[type=submit]').addClass('disabled');
            }
            else 
            {
                $('#apointmentHour li').click(function(){
                $('#apointmentHour li').removeClass('selected');
                $(this).addClass('selected');
            });

            }
            
            $('#apointment-board').show();
        });
        
    });
    
    if( "action" in window )
    {
        $('.split-part #calendar .number').each(function(){
            if( !$(this).parent().hasClass('grey') && $(this).html().trim() === action ) 
            {
                $(this).trigger('click');
            }
        });
    }
        
});
