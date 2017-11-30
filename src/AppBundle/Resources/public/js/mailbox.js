
$(document).ready(function(){
    
    var mainContainerHeight = $("#main-container").height();
    var newDiscussionHeight = $("#new-discussion").height();
    
    $('#mailbox-menu').height( mainContainerHeight );
    $('#mailbox-menu .overflow').height( mainContainerHeight - newDiscussionHeight );

    
    $('.mailbox-menu-item.new').click(function(){
        
        $('.mailbox-menu-item.selected').removeClass('selected');
        $('#mailbox-discussion').hide();
        
        $('#mailbox-default').hide();
        $('#mailbox-header').html( '<strong class="new">' + $(this).html() + '</strong>' );
        $('#mailbox-header').show();
        $('#mailbox-form').hide();
        
        var url = $(this).data('url');
        
        $.get( url, function(data){
            $('#newDiscussionSubject').val('');
            $('#newDiscussionAnswerer').html(data);
            $('#mailbox-discussion-id').val( 0 );
            
            $('#newDiscussionAnswerer option[value="' + newDiscussionAnswerer + '"]').prop('selected', true);
            
            $('#mailbox-new').show();
            $('#mailbox-form').show();
        });
    });
    
    $('.mailbox-menu-item').click(function(){
        if( action ) {
            action = false;
        }
        else {
            $('.alert').hide();
        }
        
        if( !$(this).hasClass('new') )
        {
            $('.mailbox-menu-item.selected').removeClass('selected');
            $(this).addClass('selected');
            
            $('#mailbox-default').hide();
            $('#mailbox-form').hide();
            $('#mailbox-new').hide();
            $('#mailbox-discussion').hide();
            
            $('#mailbox-header').html( $(this).children('.discussion-info').html() );
            $('#mailbox-header').show();
            
            var url                 = $(this).data('url');
            var discussionId        = $(this).data('id');
            
            if( $(this).children('.last-post').hasClass('unread') )
            {
                $(this).children('.last-post').removeClass('unread');
                
                var unreadCount = $('#menu ul li.selected span.badge').html();
                
                if( unreadCount == 1 ) {
                    $('#menu ul li.selected span.badge').hide();
                }
                else {
                    $('#menu ul li.selected span.badge').html( unreadCount - 1 );
                }
                
            }
            
            $.get( url, function(data){
                
                $('#mailbox-discussion').html( data );
                $('#mailbox-discussion').show();
                
                //$('#mailbox-discussion').scrollTop( $('#mailbox-discussion').height() );
                $('#mailbox-discussion').scrollTop( $(document).height() );
                
                $('#mailbox-discussion-id').val( discussionId );
                
                $('#mailbox-form').show();
            });
        }
    });
    
    if( action === 'new' ) {
        $('.mailbox-menu-item.new').trigger('click');
    }
    else if( action > 0) {
        $('.mailbox-menu-item[data-id=' + action + ']').trigger('click');
    }
    
});