-- CREATE DATABASE - fampay_assignment
CREATE DATABASE IF NOT EXISTS fampay_assignment;
USE fampay_assignment;
DROP TABLE IF EXISTS videos;

-- Creating a Table named videos
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