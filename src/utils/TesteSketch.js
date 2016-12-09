import APIClient from "./TesteSketchAPI";

var Sketchfab = function ( version, target ) {
    this._target = target;
    this._version = version || '1.0.0';
    this._url = 'https://sketchfab.com/models/XXXX/embed';
    this._client = undefined;
    this._options = undefined;
};

Sketchfab.prototype = {

    getEmbedURL: function ( urlid, options ) {

        var url = this._url + '?api_version=' + this._version + '&api_id=' + this._client.getIdentifier();

        if ( options ) {

            Object.keys( options ).forEach( function ( key ) {

                // filter options
                if ( options[ key ] === undefined ||
                    options[ key ] === null ||
                    typeof options[ key ] === 'function' ) {
                    return;
                }

                url += '&' + key.toString() + '=' + options[ key ].toString();

            } );
        }

        return url.replace( 'XXXX', urlid );
    },

    init: function ( urlid, options ) {

        this._options = options;
        this._client = new APIClient( this._target.contentWindow );
        this._target.addEventListener( 'load', function () {

            // load
            this._client.use( this._version, function ( err, api ) {

                if ( err )
                    throw err;

                this.success.call( this, api );

            }.bind( this ) );


        }.bind( this ), true );

        this._target.src = this.getEmbedURL( urlid, options );

    },

    success: function ( api ) {
        // api ready to use
        if ( this._options.success && typeof this._options.success === 'function' ) {
            this._options.success( api );
        }

    },
    error: function ( api ) {
        // api error
        if ( this._options.error && typeof this._options.error === 'function' ) {
            this._options.error( api );
        }

    }

};

export default Sketchfab;