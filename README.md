# notinstagram

[Hosting](/README.md#Hosting)


## What is notinstagram

Notinstagram is a clone of Instagram's mobile-web UI. This differs from their desktop and native app UI's.

To view and compare [notinstagram](http://notinstagram.leesavage.co.uk) and [instagram](https://www.instagram.com/) you must have a recognised mobile User-Agent string. 

For the best experence use:
* a mobile device
* a mobile simulator from the browser developer tools 

## Structure

### Back end

notinstagrams back end consists of a JSON REST api is built with Ruby on Rails and backed by a PostgreSQL database. 

#### Significatnt Back end Libraries

* jbuilder - to format JSON views
* bcrypt - for password-hashing
* react-rails - To serve a react app at [index.html.erb](/blob/master/app/views/static/index.html.erb)
* aws-sdk - To provide access to amazon s3 services
* factory_bot_rails - To genorate instances of the models for testing and seeding of the database
* faker - TO genorate intresting realistic seed data
* dotenv-rails - For easy envrioment configuration in development only
* rspec-rails - All Rails databse models were developed using test driven developement

## Front end
 
### Libraries
  
* react - The front end is a one page app 
* redux - Initialy just vanilla redux was used
* reduxjs/toolkit - after [this](/commit/6af7f80d075f52f82048061e43333232955296f9) commit notinstagram used redux toolkit to standadise best practises and DRY up code
* redux-devtools-extension - is intentontaly left enabled on the prodection version of notinstagram
* redux-thunk -  for async redux actions
* axios - to make request to the back end api

### Styling & Design

notinstagram uses basic SCSS including a few mixins and variables, most of the SCSS is stand CSS

notinstagram makes use of [BEM conventions](http://getbem.com/) to create reusable styled compentets 

## Hosting

### Heroku

the Rails back end is hosted on the Heroku free tier. Please alow some time for the first request to process as the server may not be running. The Heroku server only serves the index.html and processes all REST API calls

### Amazon S3

Free Amazon S3 buckets are used to host all static assets. This provices speed and scalability and reduced load on the primary back end server. 

notinstagram users can uplaod an avatar photo and post as many photos as they like. Images are processed on the client side and sent directly to presigned amazon s3 buckes to reduce server costs and provide maimum proformace at minimal cost.

## Features and design chalanges

The following are some of the more intresting designe chalanges and solutions needed to create not instagram...

### Authentication bcrypt

### Passing for hashtags

### Seed data

### frontend state
redux toolkit refactor

### Functional composition 

#### debounce

#### React functional components 

#### React hooks, use effect

### Active record N+1 query's

### API rest design ????