export default class Service {

    _initialUrl = 'https://api.punkapi.com/v2'

    async getResource(url) {
        // будем ждать пока не получим результат от нашего сервера и когда получим результат то закинем его в res
        const response = await fetch(`${this._initialUrl}${url}`);
        // достаем тело из результата и так же будет его ждать и закинет в переменную body
        const body = await response.json();
        // возращае body
        return {
            body
        }
    }

    getAllBeers(pageNumber) {
        return this.getResource(`/beers?page=${pageNumber}&per_page=5`);
    }
}

const service = new Service();