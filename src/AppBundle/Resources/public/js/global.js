
$(window).load(function(){
    
    if( window.chrome ) {
        $('#menu ul li ul.submenu li.selected').css('padding-left', '35px');
    }
    
    var mainContainerHeight = $("#main-container").height();
    
    $('#menu').height( mainContainerHeight );
    
    adjustMenu();
    
    
    var menuAction = true;
    
    $('#menu ul li').click(function() {
        
        if( $(this).hasClass('disabled') ) {
            return;
        }
        
        if( !menuAction ) 
        {
            menuAction = true;
            return;
        }
        
        var targetUrl = $(this).data('url');
        
        if( targetUrl !== "" ) 
        {
            menuAction = false;
            window.location.href = targetUrl;
        }
        else if( $(this).hasClass( "dropdown" ) )
        {

            if( $(this).hasClass( "opened" ) )
            {
                $(this).children('.submenu').hide();
                $(this).children('.glyphicon.glyphicon-menu-down').addClass('glyphicon-menu-right');
                $(this).children('.glyphicon.glyphicon-menu-down').removeClass('glyphicon-menu-down');

                $(this).addClass('closed');
                $(this).removeClass('opened');
            }
            else if( $(this).hasClass( "closed" ) )
            {
                $('li.dropdown.opened').trigger('click');

                $(this).children('.submenu').show();
                $(this).children('.glyphicon.glyphicon-menu-right').addClass('glyphicon-menu-down');
                $(this).children('.glyphicon.glyphicon-menu-right').removeClass('glyphicon-menu-right');

                $(this).addClass('opened');
                $(this).removeClass('closed');
            }
            
            adjustMenu();
        }
    });
    
    function adjustMenu()
    {
        $('#menu .bottom').css(
            'top', 
            $('#menu').height() - $('#menu > ul').height() -  $('#menu .bottom').height() 
        );
        
        return;
    }
    
    $('#supervision-menu .supervision-item .banner').click(function(){
        
        if( $(this).children('span.glyphicon').hasClass('glyphicon-menu-right') )
        {
            $('#supervision-menu > .supervision-item > .banner > span.glyphicon-menu-down').removeClass('glyphicon-menu-down');
            $('#supervision-menu > .supervision-item > .banner > span.glyphicon').addClass('glyphicon-menu-right');
            $('#supervision-menu .supervision-content').hide();
            
            $(this).children('span.glyphicon').removeClass('glyphicon-menu-right');
            $(this).children('span.glyphicon').addClass('glyphicon-menu-down');
            
            $(this).parent().children('.supervision-content').show();
            
            if( $(this).hasClass('faq-question') ) {
                $.ajax( $(this).data('url') );
            }
        }
        else 
        {
            $('#supervision-menu > .supervision-item > .banner > span.glyphicon-menu-down').removeClass('glyphicon-menu-down');
            $('#supervision-menu > .supervision-item > .banner > span.glyphicon').addClass('glyphicon-menu-right');
            $('#supervision-menu .supervision-content').hide();
            
            $(this).children('span.glyphicon').removeClass('glyphicon-menu-down');
            $(this).children('span.glyphicon').addClass('glyphicon-menu-right');
            
            $(this).parent().children('.supervision-content').hide();
        }
    });
    
    $('.glyphicon-search').click(function(){
        $(this).parent('form').submit();
    });
});


