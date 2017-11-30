
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
    
    $("#calendar-container #calendar tbody tr td").click(function(){
        
        if( $("#calendar-container #calendar tbody tr td.selected").length > 0 )
        {
            $("#calendar-container #calendar tbody tr td.active").removeClass("grey");
            $("#calendar-container #calendar tbody tr td.selected").removeClass("selected");
            
            $('#edit-timeline').hide();
            $("#day-schedule").hide();
        }
        else if( $(this).hasClass('active') )
        {
            $("#calendar-container #calendar tbody tr td.active").addClass("grey");
            $(this).removeClass("grey");
            $(this).addClass("selected");
            
            var nextDayColumnWeekDay        =   $(this).data('weekday') + 1;
            var nextDayColumnSelector       =   "#calendar-container #calendar tbody tr td[data-weekday='"+ nextDayColumnWeekDay +"']";
            
            if( $("#calendar-container #calendar tbody tr td[data-weekday='"+ (nextDayColumnWeekDay+1) +"']").length === 0 )
            {
                $("#calendar-container #calendar tbody tr td[data-weekday='"+ (nextDayColumnWeekDay-3) +"']").addClass("selected");
                $("#calendar-container #calendar tbody tr td[data-weekday='"+ (nextDayColumnWeekDay-2) +"']").addClass("selected");
                var nextDayColumnPositionTL     =   $("#calendar-container #calendar tbody tr td[data-weekday='"+ (nextDayColumnWeekDay-3) +"']" + ':first').position();
            }
            else
            {
                $("#calendar-container #calendar tbody tr td[data-weekday='"+ (nextDayColumnWeekDay) +"']").addClass("selected");
                $("#calendar-container #calendar tbody tr td[data-weekday='"+ (nextDayColumnWeekDay+1) +"']").addClass("selected");
                var nextDayColumnPositionTL     =   $(nextDayColumnSelector + ':first').position();
            }

            
            var nextDayColumnPositionHeight =   $(nextDayColumnSelector + ':last' ).position().top - nextDayColumnPositionTL.top;
            nextDayColumnPositionHeight     +=  $(nextDayColumnSelector).outerHeight(true);
            
            var dayScheduleWidth = $(nextDayColumnSelector + ':first').outerWidth(true);
            dayScheduleWidth     = (dayScheduleWidth * 2);
            
            $("#day-schedule").css({
                top: nextDayColumnPositionTL.top + 'px', 
                left: nextDayColumnPositionTL.left +'px', 
                height: nextDayColumnPositionHeight,
                width: dayScheduleWidth
            });
            
            var url  = $(this).data('url');
            var day  = $(this).children(".number").html().trim();
            var month= $("#calendar-container #calendar").data('month');
            var year = $("#calendar-container #calendar").data('year');
            
            var date = new Date(year, month - 1, day );

            $.get( url, function( data ) {
                $("#day-schedule").html( data );
                $("#day-schedule").show();
                
                // Add event by clicking on the time range
                $("#day-schedule .timeline tr td.time ").click(function(){
                    
                    $( "#edit-timeline input" ).prop('disabled', false);
                    $( "#edit-timeline select" ).prop('disabled', false);
                    $( "#edit-timeline textarea" ).prop('disabled', false);
                    $('#edit-timeline .popin-header').removeClass('danger');
                    $('#deleteForm').hide();
                    $( "#okButton" ).show();
                    
                    $('#popin-title').html('Ajouter évènement');
                    
                    $( "#eventType option:selected" ).prop('selected', false);
                    $( "#eventName" ).val("");
                    $( "#eventCustomParticipant" ).val("");
                    $( "#eventParticipant" ).val(0);
                    $( "#eventNotes" ).val("");
                    
                    $('#edit-timeline #date-timeslot').html( 
                        frenchWeekDay[date.getDay()] 
                        + ' '
                        + day 
                        + ' '
                        + frenchMonth[month - 1]
                        + ' ' 
                        + year
                    );
                    
                    $('#edit-timeline #hour-timeslot').html( 
                        $(this).html().trim().split('h')[0] + 'h'
                    );
                    
                    $('#edit-timeline #minute-timeslot').val( 
                        $(this).html().trim().split('h')[1]
                    );
                    
                    $('#edit-timeline form input[name=eventHour]').val( $(this).html().trim().split('h')[0] );
                    
                    $('#edit-timeline form input[name=eventDay]').val(day);
                    $('#edit-timeline form input[name=eventMonth]').val(month);
                    $('#edit-timeline form input[name=eventYear]').val(year);
                    
                    $('#edit-timeline form input[name=eventId]').val(0);
                    
                    $('#edit-timeline').draggable({
                        cursor: 'move'
                    });
                    
                    adaptPopin();
                    if( $('#calendar').hasClass('patient') )
                    {
                        $( '#edit-timeline #meeting-data #get-more' ).show();
                        $('#edit-timeline #meeting-data #more-meeting-data').hide();
                    }

                    $( '#edit-timeline' ).show();
                    
                    
                    $( '#edit-timeline .popin-header i' ).click(function(){
                        $(this).parent().parent().hide();
                    });
                });
                
                // Edit an event by clicking on the event
                $("#day-schedule .timeline tr td div.event ").click(function(){
                    
                    $('#popin-title').html('Modifier évènement');   
                    
                    $( "#eventType option:selected" ).prop('selected', false);
                    $('#eventType option[value="' + $(this).data('event-type') + '"]').prop('selected', true);
                    
                    $('#eventType option[value="' + $(this).data('event-type') + '"]').attr('data-duration', $(this).data('event-duration') );
                    $( "#eventName" ).val( $(this).data('event-name') );
                    $( "#eventNotes" ).val( $(this).data('event-notes') );
                    $( "#eventParticipant" ).val( $(this).data('event-participant-id') );
                    $( "#eventCustomParticipant" ).val( $(this).data('event-custom-participant') );
                    
                    if( $('#calendar').hasClass('patient') && $(this).data('event-participant-id') > 0 ) 
                    {
                        $('#popin-title').html('Annuler évènement');
                        
                        $( "#edit-timeline input" ).prop('disabled', true);
                        $( "#edit-timeline select" ).prop('disabled', true);
                        $( "#edit-timeline textarea" ).prop('disabled', true);
                        
                        $('#edit-timeline .popin-header').addClass('danger');
                        $( "#okButton" ).hide();
                        
                        $('#deleteForm input').prop('disabled', false);
                        $('#deleteForm').show();
                    }
                    else 
                    {
                        $('#edit-timeline .popin-header').removeClass('danger');
                        
                        $( "#edit-timeline input" ).prop('disabled', false);
                        $( "#edit-timeline select" ).prop('disabled', false);
                        $( "#edit-timeline textarea" ).prop('disabled', false);
                        $('#deleteForm').hide();
                        $( "#okButton" ).show();
                    }
                    
                    $('#edit-timeline #date-timeslot').html( 
                        frenchWeekDay[date.getDay()] 
                        + ' '
                        + day 
                        + ' '
                        + frenchMonth[month - 1]
                        + ' ' 
                        + year
                    );
                    
                    $('#edit-timeline #hour-timeslot').html( 
                        $(this).data('time').split('h')[0] + 'h'
                    );
                    
                    $('#edit-timeline #minute-timeslot').val( 
                        $(this).data('time').split('h')[1]
                    );
                    
                    $('#edit-timeline form input[name=eventHour]').val( $(this).data('time').split('h')[0] );
                    
                    $('#edit-timeline form input[name=eventDay]').val(day);
                    $('#edit-timeline form input[name=eventMonth]').val(month);
                    $('#edit-timeline form input[name=eventYear]').val(year);
                    
                    $('#edit-timeline form input[name=eventId]').val( $(this).data('event-id') );
                    
                    $('#edit-timeline').draggable({
                        cursor: 'move'
                    });
                    
                    adaptPopin();
                    if( $('#calendar').hasClass('patient') ) {
                        $( '#edit-timeline #meeting-data #get-more' ).show();
                        $('#edit-timeline #meeting-data #more-meeting-data').hide();
                    }
                    else if( $(this).data('event-duration') > 0 ) {
                         $( '#edit-timeline #meeting-data #get-more' ).trigger('click');
                    }

                    $( '#edit-timeline' ).show();
                    
                    
                    $( '#edit-timeline .popin-header i' ).click(function(){
                        $(this).parent().parent().hide();
                    });
                });
                
            });
        }
    });
    
    
    $( '#edit-timeline select#eventType' ).change( function(){ adaptPopin(); } );
    
    function adaptPopin()
    {
        var duration = $('#edit-timeline select#eventType option:selected').data('duration');
        
        $('#eventDuration').val( duration );
        
        if( duration === 0 )
        {
            $('#edit-timeline').css('height', '195px');
            $('#edit-timeline #meeting-data').hide();
            $('#edit-timeline #meeting-data #more-meeting-data').hide();
        }
        else if( $('#calendar').hasClass('patient') )
        {
            $('#edit-timeline').css('height', '285px');
            $('#edit-timeline #meeting-data').show();
        }
        else
        {
            if( window.chrome ) {
                if( $('#calendar').hasClass('patient') ) {
                    $('#edit-timeline').css('height', '395px');
                }
                else {
                    $('#edit-timeline').css('height', '410px');
                }
            }
            else {
                if( $('#calendar').hasClass('patient') ) {
                    $('#edit-timeline').css('height', '410px');
                }
                else {
                    $('#edit-timeline').css('height', '425px');
                }
            }
            
            $('#edit-timeline #meeting-data').show();
            $('#edit-timeline #meeting-data #more-meeting-data').show();
        }
    }
    
    $( '#edit-timeline #meeting-data #get-more' ).click(function(){
        if( window.chrome ) {
            if( $('#calendar').hasClass('patient') ) {
                $('#edit-timeline').css('height', '395px');
            }
            else {
                $('#edit-timeline').css('height', '410px');
            }
        }
        else {
            if( $('#calendar').hasClass('patient') ) {
                $('#edit-timeline').css('height', '410px');
            }
            else {
                $('#edit-timeline').css('height', '425px');
            }
        }
        
        $(this).hide();
        $('#edit-timeline #meeting-data #more-meeting-data').show();
    });

    $( '#edit-timeline #meeting-data #more-meeting-data #get-less' ).click(function(){
        $('#edit-timeline').css('height', '285px');
        $(this).parent().hide();
        
        if( $('#calendar').hasClass('patient') ) {
            $( '#edit-timeline #meeting-data #get-more' ).show();
        }
        $('#edit-timeline #meeting-data #more-meeting-data').hide();
    });

    if( ( "action" in window ) && (action !== 0) ) {
        $("#calendar-container #calendar tbody tr td[data-weekday=" + action.week + "]").each(function(){
            if( $(this).children('.number').html().trim().localeCompare(action.day) === 0 ) {
                $(this).trigger( "click" );
            }
        });
    }
    
    $( "#edit-timeline #meeting-data #eventCustomParticipant" ).on('input', function() {
        $('#edit-timeline #meeting-data #eventParticipant').val(0);
    });
    
    
    $('#edit-timeline #meeting-data #eventCustomParticipant').autocomplete({
        source : function(request, response)
        {
            $.ajax({
                url :       ajaxUserPickerUrl.replace( "SEARCH_TEXT", request.term ), 
                dataType :  'json', 
                success :   function( data ) {

                                response( data );
                            }
            });
        },
        appendTo: "#edit-timeline #meeting-data",
        position: {  collision: "flip"  },
        select : function(event, ui)
        {
            $('#edit-timeline #meeting-data #eventParticipant').val( ui.item.data );
        }
    
    });
});
