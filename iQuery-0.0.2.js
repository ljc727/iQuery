(function( global, factory ) {
	factory(global);
})( typeof window !== "undefined" ? window : this, function(window) {
	
	var arr = [];
	var push = arr.push;
	var document = window.document;
	var class2type = {};
	var toString = class2type.toString;
	var version = "0.0.1",
	iQuery = function( selector, context ) {
		return new iQuery.fn.init( selector, context );
	};

	
	iQuery.fn = iQuery.prototype = {
		iQuery: version, 
		constructor: iQuery,
		pushStack: function( elems ) {
			var ret = iQuery.merge( this.constructor(), elems );
			ret.prevObject = this;
			return ret;
		},
		each: function( callback ) {
			return iQuery.each( this, callback );
		}
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
	
	
	var rootiQuery,
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,
	init = iQuery.fn.init = function( selector, context, root ) {
		
		if ( !selector ) {
			return this;
		}
		
		root = root || rootiQuery;
		
		if ( typeof selector === "string" ) {
			
			var match = rquickExpr.exec( selector );
			
			if ( match && ( match[ 1 ] || !context ) ) {
				
				elem = document.getElementById( match[ 2 ] );
				if ( elem ) {		
					this[ 0 ] = elem;
					this.length = 1;
				}
				return this;
			} else if ( !context || context.iquery ) {
				return ( context || root ).find( selector );
			}

			
		} else {
			this[ 0 ] = selector;
			this.length = 1;
			return this;
		}

	

	};
	init.prototype = iQuery.fn;
	
	rootiQuery = iQuery( document );
	
	
	iQuery.extend( {
		merge: function( first, second ) {
			var len = +second.length,
				j = 0,
				i = first.length;

			for ( ; j < len; j++ ) {
				first[ i++ ] = second[ j ];
			}

			first.length = i;

			return first;
		},
		each: function( obj, callback ) {
			var length, i = 0;

			if ( isArrayLike( obj ) ) {
				length = obj.length;
				for ( ; i < length; i++ ) {
					if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
						break;
					}
				}
			}

			return obj;
		},
		type: function( obj ) {
			if ( obj == null ) {
				return obj + "";
			}

			return typeof obj === "object" || typeof obj === "function" ?
				class2type[ toString.call( obj ) ] || "object" :
				typeof obj;
		},
		isWindow: function( obj ) {
			return obj != null && obj === obj.window;
		}
	} );
	
	
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
		},
		find: function( selector ) {
			var i, ret,
				len = this.length,
				self = this;
	
			ret = this.pushStack( [] );
	
			for ( i = 0; i < len; i++ ) {
				Sizzle( selector, self[ i ], ret );
			}
	
			return ret;
		}
	} );
	
	function Sizzle( selector, context, results, seed ) {
		var m, elem;
		results = results || [];

		if ( !seed ) {
			context = context || document;
			
			var rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/;
			match = rquickExpr.exec( selector )

			if ( (m = match[3]) && 
				context.getElementsByClassName ) {

				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}
	}
	
	function isArrayLike( obj ) {
		var length = !!obj && "length" in obj && obj.length,
			type = iQuery.type( obj );

		if ( type === "function" || iQuery.isWindow( obj ) ) {
			return false;
		}

		return type === "array" || length === 0 ||
			typeof length === "number" && length > 0 && ( length - 1 ) in obj;
	}

	window.iQuery = window.ᾩ = window._ = iQuery;

} );