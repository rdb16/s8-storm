

$(document).ready(function(){
    $(document).on('dragenter', '#dropfile', function(){

        $(this).css('border', '3px dashed red');

        return false;
    });

    $(document).on('dragover', '#dropfile', function(e){

        e.preventDefault();
        e.stopPropagation();
        $(this).css('border', '3px dashed red');

        return false;
    });

    $(document).on('dragleave', '#dropfile', function(e) {

        e.preventDefault();
        e.stopPropagation();
        $(this).css('border', '2px dashed #BBBBBB');

        return false;
    });

    $(document).on('drop', '#dropfile', function(e) {

        if(e.originalEvent.dataTransfer){
            if(e.originalEvent.dataTransfer.files.length)
            {
                // Stop the propagation of the event
                e.preventDefault();
                e.stopPropagation();
                $(this).css('border', '2px dashed green');
                // Main function to upload

                upload(e.originalEvent.dataTransfer.files[0]);
            }
        }
        else {
            $(this).css('border', '2px dashed #BBBBBB');
        }

        return false;
    });

    function upload(f)
    {
        // Only process image files.
        if( !f.type.match('image/jpeg') && !f.type.match('image/png') )
        {
            alert('Le fichier doit être une image de format jpeg ou png, '+ f.type + ' n\'est pas autorisé');

            return false ;
        }

        // max weight.
        if( f.size > 3000000  )
        {
            alert('Le fichier image est trop gros, la taille maximum autorisée est de 3Mo');

            return false ;
        }

        var reader = new FileReader();

        reader.onload = function()
        {
            var dataURL = reader.result;

            var html = '<img src="' + dataURL + '" title="Drop image here" />';
            html += '<input type="hidden" name="imageName" value="' + f.name + '" /> ';
            html += '<input type="hidden" name="imageType" value="' + f.type + '" /> ';
            html += '<input type="hidden" name="imageBase64Src" value="' + dataURL + '" /> ';

            $('#dropfile').html( html );
        };

        // Read in the image file as a data URL.
        reader.readAsDataURL(f);
    }

    $('#dropfile').click( function (e) {
        e.preventDefault();
        e.stopPropagation();
        $('#fileMechanisme').click();
    });

    $('#fileMechanisme').change(function(event){
        var input = event.target;
        upload(input.files[0]);
    });
    
    
    $("#dateOfBirth").datepicker({
        closeText: 'Fermer',
        prevText: 'Précédent',
        nextText: 'Suivant',
        currentText: 'Aujourd\'hui',
        monthNames: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
        monthNamesShort: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
        dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
        dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
        dayNamesMin: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
        weekHeader: 'Sem.',
        
        dateFormat: 'dd/mm/yy',
        firstDay: 1,
        autoSize: true,
        showWeek: false,
        
        changeYear: true,
        yearRange: "-100:+0"
    });

    $('#deleteNewAddress').click(function(){
        $('.newAddressRequired').removeAttr('required');
        
        return true;
    });

    
    $('#addDocument').click(function(event){
        event.preventDefault();
        event.stopPropagation();
        $('#documentMechanisme').click();
    });
    
    $('#documentMechanisme').change(function(){
        $(this).parent().submit();
    });
    
    $('table.documents span.rename').click(function(){
        $('#rename-action input[name="newName"]').val( $(this).data('name') );
        $('#rename-action input[name="documentId"]').val( $(this).data('id') );

        $('#delete-action').hide();
        $('#rename-action').show();
        $('#popin-action').show();
    });
    
    $('table.documents span.delete').click(function(){
        $('#delete-action #document-name').html( $(this).data('name') );
        $('#delete-action input[name="documentId"]').val( $(this).data('id') );

        $('#delete-action').show();
        $('#rename-action').hide();
        $('#popin-action').show();
    });
    
    $('table.documents span.blood-test').click(function(){
        
        if( $(this).hasClass('enabled') )
        {
            $(this).removeClass('enabled');
            $(this).attr('title', "Marquer comme bilan sanguin");
        }
        else
        {
            $(this).addClass('enabled');
            $(this).attr('title', "Supprimer le marquage comme bilan sanguin");
        }
        
        $.ajax( $(this).data('url') );
    });
    
    $('#popin-action .popin-header i').click(function(){
        $('#popin-action').hide();
    });
    
});


