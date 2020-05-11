const Library = {
    myShelf: [],

    wrapper: document.getElementById('library'),
    shelf: document.getElementById('shelf'),
    form: document.getElementById('add-new-book'),
    errors: document.getElementById('errors'),
    submitButton: document.getElementsByClassName('submit')[0],

    init: function(){
        this.submitButton.addEventListener( 'click', this.addBook )
    },

    addBook: function( ){
        let form = this.form
        clearErrors( form )

        let data = Object.fromEntries(new FormData(form).entries());
        let book = new Book( data )

        if( book.isValid() ){
            // add book
            console.log( 'valid' )
        } else {
            // show errors
            console.log( 'not valid' )
            showErrors( book.errors )
        }

        // if book.isValid
        // add book to shelf
        // else
        // show errors
        // end
    },

}

function Book( data ){
    this.title = data.title
    this.author = data.author
    this.pages = data.pages
    this.year = data.year
    this.description = data.description

    this.errors = []
}

Book.prototype.isValid = function() {
    /**
     * Checks is the Book object is missing any properties.
     * @return true | array
     */
    let errors = []

    for( var key of Object.keys(this) ){
        if ( this[key].length === 0 && key != 'errors' && key != 'description' ) errors.push(key)
    }

    this.errors = errors;
    return ( errors.length === 0 )
}

function showErrors( errors ){
    let html = ''

    errors.forEach( id  => {
        html += '<li>' + id + " is required" + '</li>';

        document.getElementById( id ).classList.add( 'error' );
    });

    document.getElementById('errors').innerHTML = html;
}

function clearErrors( form ){
    inputs = form.querySelectorAll('input')
    console.log( inputs )


    inputs.forEach( input  => {
        console.log( input )
        input.classList.remove( 'error' );
    });
}

Library.init();