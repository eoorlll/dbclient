import { http, HttpResponse } from 'msw'
import MOCK_DATA from './data/MOCK_DATA' 

export const handlers = [
  http.get('/db', (request) => {
    const url = new URL(request.request.url);
    const number = url.searchParams.get('number') || 20;
    const offset = url.searchParams.get('offset') || 0;
    const search = url.searchParams.get('search');

    console.log(number, offset, search);

    const items = MOCK_DATA.items;
    let filterdItems = items;

    if (search || search === "") {
      filterdItems = filterdItems.filter((item) => 
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if( offset ) {
        filterdItems = filterdItems.slice(offset);
    }

    if (number) {
        filterdItems = filterdItems.slice(0, number);
    }

    return HttpResponse.json(filterdItems)
  }),
  http.get('/db/total', (request) => {
    const url = new URL(request.request.url);
    const search = url.searchParams.get('search');

    const items = MOCK_DATA.items;
    let filterdItems = items;
    let total = filterdItems.length;

    if (search || search === "") {
      filterdItems = filterdItems.filter((item) => 
        item.name.toLowerCase().includes(search.toLowerCase())
      );
      total = filterdItems.length;
    }

    console.log(total);

    return HttpResponse.json({
      total: total,
    });
  }),
]
