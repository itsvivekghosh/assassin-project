# FAMPAY BACKEND ASSIGNMENT

## Project Goal

To make an API to fetch latest videos sorted in reverse chronological order of their publishing date-time from YouTube for a given tag/search query in a paginated response.

## Basic Requirements:

- Server should call the YouTube API continuously in background (async) with some interval (say 10 seconds) for fetching the latest videos for a predefined search query and should store the data of videos (specifically these fields - Video title, description, publishing datetime, thumbnails URLs and any other fields you require) in a database with proper indexes.
- A GET API which returns the stored video data in a paginated response sorted in descending order of published datetime.
- A basic search API to search the stored videos using their title and description.
- Dockerize the project.
- It should be scalable and optimised.

### How the project runs?

1. Clone the project:

```
git clone https://github.com/itsvivekghosh/assassin-project.git
```

2. Copy your API_KEY to .env file in `GOOGLE_API_KEY` variable. This can be comma seperated values such as (IMPORTANT):

```
GOOGLE_API_KEY="<GOOGLE_API_KEY1>,<GOOGLE_API_KEY2>"
```

3. Run command

```
docker-compose up
```

4. Create the database using the command in MySQL Command Line:

```
-- CREATE DATABASE
CREATE DATABASE IF NOT EXISTS fampay_assignment;

-- CREATE TABLE
CREATE TABLE IF NOT EXISTS fampay_assignment.videos (
	`id` BIGINT UNSIGNED AUTO_INCREMENT NOT NULL,
	`title` varchar(255) ,
	`channelId` text ,
	`channelTitle` text ,
	`videoId` text ,
	`description` text ,
	`publishedAt` text NOT NULL,
	`publishTime` text NOT NULL,
	`thumbnails` text,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	PRIMARY KEY (`id`))
ENGINE=InnoDB;

ALTER TABLE fampay_assignment.videos ADD FULLTEXT(`description`);
ALTER TABLE fampay_assignment.videos ADD FULLTEXT(`title`);
```

5. Install all the dependencies by `npm i` and start the application by: `npm start`.

6. Adding the postman collection in `src/postman_collection.json`. Please import to use the APIs.

> **APIs:**
>
> - `/videos` is the API that fetches the data from Youtube API and collects in the MySQL DB. There are query params such as `pageNumber(in number)` which is the current page number, `pageSize(in number)` denotes the size of the current page, `sortByOrder(desc || asc)` which denotes the order sequence and `q(in string)` is the search query for the API such as `CRICKET`.
> - `/video/getAllVideos` is the API that fetches all the videos from DB as per the sorted order, page size, page number and sortKey. Here, `sortKey` denotes the key by which the query is searched.
> - `/video/getByTitleOrDescription` is the API that fetches the data from DB as per the search query (FUZZY SEARCH) with all the above query params.

### ENJOY THE APP
