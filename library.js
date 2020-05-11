const Library = {
    myShelf: [],

    wrapper: document.getElementById('library'),
    shelf: document.getElementById('shelf'),
    form: document.getElementById('add-new-book'),
    errors: document.getElementById('errors'),
    submitButton: document.getElementsByClassName('submit')[0],

    init: function(){
        this.render()
        this.submitButton.addEventListener( 'click', this.addBook )
    },

    addBook: function( ){
        let form = this.form
        clearErrors( form )

        let data = Object.fromEntries(new FormData(form).entries());
        let book = new Book( data )

        if( book.isValid() ){
            Library.addToShelf( book )
            Library.render()
        } else { 
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
        return JSON.parse( localStorage.getItem('shelf') );
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
        let inputs = this.form.querySelectorAll('input');
        inputs.forEach( input => {
            input.value = ''
        } );

        let textarea = this.form.querySelectorAll('textarea');
        textarea[0].value = ''

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
     * Highlights and adds description list item to ul#errors 
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