var API = function ( members, apiClient ) {
    // populate this with method
    members.forEach( function ( name ) {

        this[ name ] = function () {

            var requestId = apiClient._requestIdCounter++;

            var args = Array.prototype.slice.call( arguments );
            var callback;

            if ( args.length > 0 ) {

                var lastArg = args[ args.length - 1 ];

                if ( typeof lastArg === 'function' ) {
                    callback = args.pop();
                }

            }

            // no callback no need to maintain a pending request
            if ( callback )
                apiClient._pendingRequests[ requestId ] = callback.bind( this );

            apiClient._target.postMessage( {
                type: 'api.request',
                instanceId: apiClient.getIdentifier(),
                requestId: requestId,
                member: name,
                arguments: args
            }, '*' );

        };
    }, this );

    this.addEventListener = function ( name, callback ) {

        if ( !apiClient._eventListeners[ name ] )
            apiClient._eventListeners[ name ] = [];

        apiClient._eventListeners[ name ].push( callback );
    };

    this.removeEventListener = function ( name, callback ) {

        if ( !apiClient._eventListeners[ name ] )
            return;

        var index = apiClient._eventListeners[ name ].indexOf( callback );
        if ( index !== -1 ) {
            apiClient._eventListeners[ name ].splice( index, 1 );
        }
    };
};


var APIClient = function ( target ) {

    this._target = target;
    this._requestIdCounter = 0;
    this._pendingRequests = {};
    this._eventListeners = {};
    this._ready = false;

    var identifier = Math.random().toString();
    this._identifier = identifier.substr( identifier.indexOf( '.' ) + 1 );

    this.listenServer();
};


APIClient.prototype = {

    getIdentifier: function () {
        return this._identifier;
    },

    use: function ( version, callback ) {

        this._version = version;

        // we need to delay this call to be sure the server is ready
        var initializeAPI = function ( version, callback ) {

            var requestId = this._requestIdCounter++;

            // function to initialize the api when the server will answer
            this._pendingRequests[ requestId ] = function ( err, instanceId, members ) {

                if ( err ) {
                    callback.call( this, err );
                } else {
                    callback.call( this, null, new API( members, this ) );
                }

            }.bind( this );

            this._target.postMessage( {
                type: 'api.initialize',
                requestId: requestId,
                name: version
            }, '*' );

        }.bind( this );


        var callInitAPI = function () {

            initializeAPI( version, callback );

        }.bind( this );

        // if the api is ready we can execute now the initialize.
        // If not we will intialize the api after the server part is ready.
        // see the code in the message function
        if ( this._ready )
            callInitAPI();
        else
            this.initAPI = callInitAPI;
    },


    listenServer: function () {

        window.addEventListener( 'message', function ( e ) {

            if ( e.data.type !== 'api.ready' &&
                e.data.type !== 'api.initialize.result' &&
                e.data.type !== 'api.request.result' &&
                e.data.type !== 'api.event' )
                return;

            if ( e.data.instanceId !== this.getIdentifier() )
                return;

            // initialize the api only when the server is ready
            if ( e.data.type === 'api.ready' ) {

                if ( !this._ready ) {

                    this._ready = true;

                    // it's possible client has not yet called use
                    // so it means that initAPI is undefined
                    if ( this.initAPI )
                        this.initAPI();
                }
            }

            // if it's an event dont check the request
            if ( e.data.type === 'api.event' ) {

                var args = e.data.results;
                var eventName = args[ 0 ];

                // handle listener that listen all or * events
                if ( this._eventListeners[ '*' ] || this._eventListeners.all ) {
                    [ '*', 'all' ].forEach( function ( eventAll ) {

                        if ( this._eventListeners[ eventAll ] ) {
                            this._eventListeners[ eventAll ].forEach( function ( callback ) {
                                // callback is used as this to maintain a potential callback
                                // where the user would binded its own this
                                callback.apply( callback, args );
                            } );
                        }

                    }, this );
                    return;
                }

                // for localised listener ( not all events )
                var argumentsWithoutEventName = args.slice( 1 );
                if ( this._eventListeners[ eventName ] ) {

                    // execute all callback listening eventName
                    this._eventListeners[ eventName ].forEach( function ( callback ) {
                        // callback is used as this to maintain a potential callback
                        // where the user would binded its own this
                        callback.apply( callback, argumentsWithoutEventName );
                    } );

                }

            } else {

                if ( !this._pendingRequests[ e.data.requestId ] )
                    return;

                this._pendingRequests[ e.data.requestId ].apply( null, e.data.results );
            }

        }.bind( this ) );

    }

};

export default APIClient;