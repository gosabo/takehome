# SABO Coding Exercise
Thank you so much for taking the time to interview with us here at SABO! This is a quick **1 hour** take-home exercise for you to show off your TypeScript/React skills. It's purposefully open-ended, so try not to spend more than an hour. You'll have the chance to discuss what you would have done with more time and interesting trade-offs during our follow-up conversation, which is also our final round interview. 

### What's in here
Run `npm run dev`, go to `localhost:3000`, and open `/src/app/page.tsx` to see for yourself! This is a simple [Next.js](https://nextjs.org/) project using [Shadcn](https://ui.shadcn.com/) for a component library. I'm also using [Picsum](https://picsum.photos) for stock photos.

### Your API endpoint
You'll be fetching and displaying (potentially sorting and filtering) listings, so I've created an endpoint for you to call. Here's the documentation:

**URL**: `https://takehome-api.vercel.app/listings`  
**Method**: `GET`  
**Authentication**: No authentication is required.  
**Rate Limit**: 100 requests per 15 minutes per IP.

Retrieves a list of paginated, searchable, sortable, and filterable listings.

#### Query Parameters

- `page` (integer, optional): The page number to retrieve. Defaults to `1`.
- `limit` (integer, optional): The number of listings per page. Defaults to `10`.
- `search` (string, optional): A search query to filter listings by title, state, or city.
- `sortBy` (string, optional): The field to sort the listings by. Can be `price` or `rating`. Defaults to `price`.
- `sortOrder` (string, optional): The order to sort the listings. Can be `asc` for ascending or `desc` for descending. Defaults to `asc`.
- `activity` (string, optional): Filter listings by a specific activity. Can be `Camping`, `Fishing`, or `Hunting`.

#### Response

- `page` (integer): The current page number.
- `limit` (integer): The number of listings per page.
- `totalListings` (integer): The total number of listings that match the search and filter criteria.
- `totalPages` (integer): The total number of pages.
- `results` (array): An array of listings for the current page.

#### `Listing` Object

Each `listing` object contains the following fields:

- `id` (string): The unique identifier for the listing.
- `title` (string): The title of the listing.
- `location` (object): The location of the listing.
  - `state` (string): The state where the listing is located.
  - `city` (string): The city where the listing is located.
- `price` (integer): The price per night for the listing.
- `rating` (number): The rating of the listing (between 0 and 5, with two decimal points).
- `activity` (string): The activity available at the listing (e.g., "Camping" or "Fishing").
- `imageUrl` (string): The URL of the image representing the listing.

#### Example Request
[Live link](https://takehome-api.vercel.app/listings?page=1&limit=10&search=California&sortBy=price&sortOrder=desc&activity=Camping)

```
GET /listings?page=1&limit=10&search=California&sortBy=price&sortOrder=desc&activity=Camping
```

#### Example Response

```json
{
  "page": 1,
  "limit": 10,
  "totalListings": 100,
  "totalPages": 10,
  "results": [
    {
      "id": "1",
      "title": "Secluded Mountain Cabin",
      "location": { "state": "California", "city": "Lake Tahoe" },
      "price": 250,
      "rating": 4.8,
      "activity": "Camping",
      "imageUrl": "https://picsum.photos/600/400?random=1"
    },
    {
      "id": "2",
      "title": "Luxury Lakeside Retreat",
      "location": { "state": "California", "city": "Big Bear" },
      "price": 500,
      "rating": 4.9,
      "activity": "Camping",
      "imageUrl": "https://picsum.photos/600/400?random=2"
    }
    // More listings...
  ]
}
```

### What to do
🕐 Set a timer for an hour and don't worry about how much you get done. This is purposefully open-ended and you can pick the tasks that are most interesting to you once the listings are fetched and displayed.

- **Clone this repo** You'll be sharing your private Github repo at the end of the assignment.

- **Run the app** Just `npm run dev` and [localhost:3000](localhost:3000) 👍

- **Fetch and display listings** I've created a paginated API endpoint for you to fetch, search, sort, and filter listings. The documentation is above, but for this part of the exercise, all you need to do is fetch the listings and display them as a grid of cards on the main page. No searching, sorting, or filtering yet. You can deal with pagination here if you'd like, but it's not required if there's another task you'd rather complete.

- **Refactor `app/page.tsx`** I purposefully wrote this all as one big file. Since we're working on a greenfield project here at SABO, there are a lot of foundational decisions like what to make into reusable components. Break up my monolothic app file however you'd like 🤠

-  **Choose your own adventure** There's littered TODOs throughout the code and the interface (while the UI elements are there) is not fully-functional. Here's a few features you can choose to implement with your remaining time after you've displayed the listings from the API. All the fields necessary to implement these features are provided as part of the `/listings` API.
   - Search: *not* typeahead but search on click by title or location 
   - Filtering: filter listings by activity with multi-select dropdown
   - Pagination: add page links for navigating between pages of listings

Use any tools you want: AI, LLMs, all those acronyms are fair game. Just be prepared to discuss your work in our follow-up chat, and make sure you understand the code you copy or autocomplete!

### When you're done
- Share your private Github repo with [@ariisrael](https://github.com/ariisrael)
- Fill out [this debrief form](https://forms.gle/zkjiVcFJpWeGPsBS9) and Ari will be in touch to schedule your final interview if everything looks good 🥳

#### Deploy on Vercel (Optional)
You can [pretty easily deploy this to Vercel](https://nextjs.org/docs/deployment) if you want. This isn't required, but if you do, please include the live link in your README.
