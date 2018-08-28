console.log("Sanity Check: JS is working!");

$(document).ready(function(){

    $cardsList = $('#cardsDisplay');
    $.ajax({
        method: 'GET',
        url: '/api/cards',
        success: handleSuccess,
        error: handleError
    });

    $('#newCardForm').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/api/cards',
            data: $(this).serialize(),
            success: newCardSuccess,
            error: newBookError,
        });
    })

    $('#cardsDisplay').on("click", ".deleteBtn", function(e){
        e.preventDefault();
        console.log("deleted");
        $.ajax({
            method: 'DELETE',
            url: '/api/cards/'+$(this).attr('data-id'),
            success: deleteCardSuccess,
            error: newBookError,
        });
    
    });

    function newCardSuccess(json) {
        window.location.reload();
    }

    function newBookError() {
        console.log('newbook error!');
    }

    function handleSuccess(json){
        var cards = json.data;
        cards.forEach(card => {
            $("#cardsDisplay").append(`<p>
                                        ${card.name} | ${card.type} | ${card.Attribute} 
                                        <button class="updateForm">Update</button>
                                        <button class="deleteBtn" type="delete" data-id=${card._id}>Delete</button>
                                    </p>
                                    <form action="" id="updatedCardForm">
                                        <input type="text" placeholder="cardType" name="cardType">
                                        <input type="text" placeholder="name" name="name">
                                        <input type="text" placeholder="type" name="type">
                                        <input type="text" placeholder="attribute" name="Attribute">
                                        <button type="submit" class="btn btn-default">Update</button>
                                    </form>`);
        });
    }

    $("#cardsDisplay").on("click",".updateForm",function(){
        $(this).parent().next().toggle("display");

        // $.ajax({
        //     method: "PUT",
        //     url:"",
        //     success: SuccessFunction,
        //     error: ErrorFunction
        // });
    })


    function handleError(e) {
        console.log('uh oh');
        $('#bookTarget').text('Failed to load books, is the server working?');
    }

    function deleteCardSuccess(json) {
        window.location.reload();
    }
});
