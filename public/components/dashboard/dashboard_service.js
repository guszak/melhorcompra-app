App.factory('Orcamento', function ($resource, API_URL) {
	return $resource(API_URL + '/orcamento', {}, {
		methods: {
			query: { method: 'GET', isArray: false },
			get: { method: 'GET' },
			save: {	method: 'POST', isArray: true}
		}
	})
})

App.factory('Produto', function ($resource, API_URL) {
	return $resource(API_URL + '/produtos', {}, {
		methods: {
			query: { method: 'GET', isArray: false },
			get: { method: 'GET' }
		}
	})
})

