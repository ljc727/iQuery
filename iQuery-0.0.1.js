(function( global, factory ) {
	factory(global);
})( typeof window !== "undefined" ? window : this, function(window) {

	var document = window.document;
	var version = "0.0.1",
	iQuery = function( selector, context ) {
		return new iQuery.fn.init( selector, context );
	};

	iQuery.fn = iQuery.prototype = {
		iQuery: version, 
		constructor: iQuery
	};

	iQuery.extend = iQuery.fn.extend = function() {
		var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

		if ( i === length ) {
			target = this;
			i--;
		}

		for ( ; i < length; i++ ) {
			if ( ( options = arguments[ i ] ) != null ) {
				for ( name in options ) {
					src = target[ name ];
					copy = options[ name ];
					if ( target === copy ) {
						continue;
					}

					if ( copy !== undefined ) {
						target[ name ] = copy;
					}
				}
			}
		}
		return target;
	};
 
	var rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

	init = iQuery.fn.init = function( selector, context, root ) {
		var match = rquickExpr.exec( selector );
		elem = document.getElementById( match[ 2 ] );

		if ( elem ) {  
			this[ 0 ] = elem;
			this.length = 1;
		}
		return this;
	};
	init.prototype = iQuery.fn;

	var rreturn = /\r/g;
	iQuery.fn.extend( {
		val: function( value ) {
			var hooks, ret, isFunction,
			elem = this[ 0 ];
			if ( !arguments.length ) {
				if ( elem ) {
					ret = elem.value;
					if ( typeof ret === "string" ) {
						return ret.replace( rreturn, "" );
					}
					return ret == null ? "" : ret;
				}
				return;
			}
		}
	} ); 

	window.iQuery = window._ = iQuery;

} );