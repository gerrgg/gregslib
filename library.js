const Library = {
    myShelf: [],

    wrapper: document.getElementById('library'),
    shelf: document.getElementById('shelf'),
    form: document.getElementById('add-new-book'),
    errors: document.getElementById('errors'),
    submitButton: document.getElementsByClassName('submit')[0],

    init: function(){
        // events
        this.submitButton.addEventListener( 'click', this.addBook )

        //get shelf and render
        this.myShelf = this.getShelf()
        this.render()
    },

    addBook: function( ){
        let form = this.form

        // reset errors on form
        clearErrors( form )

        // create book from form data
        let book = new Book( Object.fromEntries(new FormData(form).entries()) )

        if( book.isValid() ){
            // add to local storage
            Library.addToShelf( book )

            // display
            Library.render()
        } else { 

            // gets and displays errors
            showErrors( book.errors ) 
        }

    },

    addToShelf: function( book ){
        /**
         * Adds book to library shelf
         */
        this.myShelf.push( book )

        // add book to shelf, stringify whole thing

        localStorage.setItem('shelf', JSON.stringify( this.myShelf ) )
        this.clearForm()
    },

    getShelf: function(){
        /**
         * Gets the shelf from local storage or return empty array
         * @return array
         */
        let shelf = JSON.parse( localStorage.getItem('shelf') );

        return ( shelf == null ) ? [] : shelf
    },

    render: function(){
        /**
         * Displays all books already added to shelf
         */
        let books = this.getShelf()
        let html = ''

        books.forEach( book => {
            html += `<div class="book">
                        <h3 class="book-title">${book.title}</h3>
                        <p>By ${book.author} on ${book.year}</p>
                        <p>Pages: ${book.pages}</p>
                        <p class="description">Note: ${book.description} </p>
                    </div>`
        }  );

        this.shelf.innerHTML = html;
        // foreach books, create html and add to shelf div.
    },

    clearForm: function(){
        /**
         * Clears all inputs on successful book post
         */
        let inputs = this.form.querySelectorAll('input, textarea');
        inputs.forEach( input => {
            input.value = ''
        } );

    }

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
    /**
     * Highlights and adds error list item to ul#errors 
     * @param array
     */
    let html = ''

    errors.forEach( id  => {
        html += '<li>' + id + " is required" + '</li>';

        document.getElementById( id ).classList.add( 'error' );
    });

    document.getElementById('errors').innerHTML = html;
}

function clearErrors( form ){
    inputs = form.querySelectorAll('.required')

    inputs.forEach( input  => {
        input.classList.remove( 'error' );
    });
}

Library.init();