# notinstagram

Notinstagram was created as an open-source tech demo to show I can create a fully-featured product built to a known feature and design specification. Notinstagram is a pixel perfect and minimally functional version of Instagram as it was in 2020

To view [notinstagram](https://not--instagram.herokuapp.com/) you must have a recognised mobile device. For the best experence use:
* a mobile device
* a mobile simulator from the browser developer tools [Ctrl + Shift + I]

#### notinstagram and the real Instagram side by side
<a href="https://github.com/leesavage09/notinstagram/blob/images/assets/comparison.png"><img src="https://github.com/leesavage09/notinstagram/blob/images/assets/comparison.png" width="600"></a>

# Index
  
[Planning](/README.md#planning)   

[Structure](/README.md#structure)   
* [Backend](/README.md#backend)
* [Amazon S3](/README.md#amazon-s3)   
* [Frontend](/README.md#frontend)  
* [Design](/README.md#design)

[Code Examples](/README.md#Code-Examples)   
* [Authentication bcrypt](/README.md#Authentication-bcrypt)
* [Passing of hashtags](/README.md#Passing-of-hashtags)
* [Seed data](/README.md#seed-data)   
* [Frontend state](/README.md#frontend-state)
* [Custom redux middleware](/README.md#Custom-redux-middleware)
* [React functional components](/README.md#react-functional-components)
* [React hooks](/README.md#react-hooks)
* [debounce](/README.md#debounce-Higher-order-functions)
* [Active record N+1 query's](/README.md#active-record-n1-querys)

[Screenshots](/README.md#screenshots)


## Planning

notinstagram started with a design brief located [here](https://github.com/leesavage09/notinstagram/wiki) This included interactive wireframing with figma see [here](https://www.figma.com/proto/mPN3OAnSB9bZCmVttgZLhc/notinstagram?node-id=7%3A12&scaling=scale-down)

The brief considered database designe, redux state shape and REST api design

# Structure

## Backend

notinstagrams backend consists of a JSON REST api is built with Ruby on Rails and backed by a PostgreSQL database. Ruby on Rails was chosen for its Convention over Configuration philosophy and strict (MVC) architectural pattern.

### Significatnt Backend Libraries

* [jbuilder](https://github.com/rails/jbuilder) - format JSON views
* [bcrypt](https://github.com/codahale/bcrypt-ruby) - password-hashing
* [react-rails](https://github.com/reactjs/react-rails) - help serve a react app
* [aws-sdk](https://aws.amazon.com/sdk-for-ruby/) - access to amazon s3 services
* [factory_bot_rails](https://github.com/thoughtbot/factory_bot_rails) - genorate model instances for testing and seeding of the database
* [faker](https://github.com/faker-ruby/faker) - for intresting seed data
* [rspec-rails](https://github.com/rspec/rspec-rails) - models were developed using TDD

## Amazon S3

Free Amazon S3 buckets are used to host static assets. All images are edited on the client side and sent directly to the amazon s3 bucket using a presigned URL. This massively reduces the load on the backend, reducing costs.

## Frontend

Notinstagram is a single page app built with React. React code is written entirely in the functional style to create more maintainable code. Redux was chosen for state management to keep changes predictable and traceable. The entry point is [here](https://github.com/leesavage09/notinstagram/blob/master/app/frontend/src/Index.js)
 
### Libraries
  
* [React](https://reactjs.org/)  
* [redux](https://github.com/reduxjs/react-redux) - for state managment
* [reduxjs/toolkit](https://redux-toolkit.js.org/) - after [this](/commit/6af7f80d075f52f82048061e43333232955296f9) commit notinstagram used redux toolkit to standadise best practises and DRY up code
* [redux-devtools-extension](https://github.com/zalmoxisus/redux-devtools-extension) - is intentontaly left enabled on the prodection version of notinstagram
* [redux-thunk](https://github.com/reduxjs/redux-thunk) -  for async redux actions
* [axios](https://www.npmjs.com/package/axios) - to make request to the backend api

## Design

notinstagram uses SCSS and makes use of [BEM conventions](http://getbem.com/) to create reusable styled compentets 

[style.scss](https://github.com/leesavage09/notinstagram/blob/master/app/frontend/scss/style.scss) is the entry point and includes SCSS partials

notinstagram makes use of modern CSS including flexbox. Icons are a combination of SVG and panel sprites 

# Code Examples

The following are some of the more intresting solutions used in the creation of notinstagram...

## Authentication bcrypt

When a User is created Bcrypt is used to create a hashed password, the users password is never stored.
```ruby
  attr_reader :password

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end
```

Users are authenticated using BCrypt, note usernames are validated for case insensitive uniqueness
```ruby
 def find_by_credentials(username, password)
   user = User.where("lower(username) = ?", username.downcase).first
   return user if user && BCrypt::Password.new(user.password_digest).is_password?(password)
   nil
 end
```

When a user is authenticated a session tokens is sent
```ruby
 def generate_session_token
   loop do
     token = SecureRandom::urlsafe_base64(16)
     break token unless User.where(session_token: token).exists?
   end
 end
```

The users session token is used for subsiquent requests
```ruby
 def logged_in_user
     return nil unless session[:session_token]
     @logged_in_user ||= User.find_by(session_token: session[:session_token])
 end
 ```
 
The methord `require_user_logged_in` is defind on `ApplicationController` and used to secure relevent parts of the api
```ruby
before_action :require_user_logged_in, except: [:create]
```

## Passing of hashtags

The post caption is passed hastags are created and joind with the post through the join table `taggings`
```ruby
def tag_post(post)
    hashtags = post.caption.scan(/(#\w+)/).flatten.uniq

  hashtags.each do |tag_name|
    hashtag = Hashtag.find_by(name: tag_name)

    if !hashtag
      hashtag = Hashtag.new
      hashtag.name = tag_name
      hashtag.save!
    end

    tagging = Tagging.new
    tagging.hashtag = hashtag
    tagging.post = post
    tagging.save!
  end
end
```

On the frontend the post caption is passed as an array of words. Hashtags are found and replaced with links to the hashtags page
```js
function replaceHashtagsWithLinks(words) {
    return words.map((word, idx) => {
        if (word.match(/\B\#\w\w+\b/g)) {
            return (
                <Link
                    key={word + idx}
                    className="post-feed__hashtag-link"
                    to={`/profile?hashtag_name=${word.split('#')[1]}`}
                >{word} </Link>
            )
        }
        else {
            return word
        }
    })
}
```

## Seed data

`seeds.rb` is used to create seed data for testing. The production version of notinstagram is initalised with this seed data.

The [randomuser.me](https://randomuser.me) API is used to create user accounts with avatar images

```js
url = "https://randomuser.me/api/?results=70&password=upper,lower,7-14&seed=notinsta&inc=name,email,login,picture"
uri = URI(url)
response = Net::HTTP.get(uri)
randomusers = JSON.parse(response)

randomusers["results"].each do |data|
  user = User.new
  user.name = data["name"]["first"] + " " + data["name"]["last"]
  user.email = data["email"]
  user.username = data["login"]["username"]
  user.password = data["login"]["password"]
  user.image_url = data["picture"]["large"]
  if user.save()
    @allUsers << user
  end
end
```

The `Faker` Gem is used to create post captions, comments and hashtags

```js
def create_hashtags
  Faker::Hipster.unique.words(number: 30).each do |word|
    hashtag = Hashtag.new
    hashtag.name = "#" + word
    @allHashtags << hashtag if hashtag.save()
  end
end
```

Random images are chosen for posts from a selection of seed images stored in the Amazon s3 bucket

## frontend state

Redux toolkit was introduced part way through the projcet primaraly used to standardise the state setup and create slice reducers to match the evolving set of features

## Custom redux middleware

notinstagram uses custom redux middleware `testIfAuthorized` to detect when a session token is invalid. If at any time the backend reports the session is not autorised a new action is fired to reauthenticate the user.

A typical reason why this may happen is with multiple devices, Curemtly notinstagram only suports being logged in from one device at a time. If a new device logs in the session token is reset and any previous session tokens are invalidated.

```js
const testIfAuthorized = store => next => action => {
    if (
        action.payload &&
        action.payload.response &&
        action.payload.response.data &&
        action.payload.response.data.errors &&
        action.payload.response.data.errors[0] &&
        action.payload.response.data.errors[0] === "unauthorized not logged in"
    ) {
        next(sessionActions.reauthenticate());
        return
    }
    next(action)
}
```

## React functional components 

notinstagram uses functional React components in prefernece to classes

## React hooks

useState is used in the following example, Initaly post captions and comments are truncatioed to just 10 words. The user can reveal the full text by calling `showFullText` 

```js
const [currentWords, setCurrentWords] = useState(words.slice(0, 10));
const textIsTruncated = words.length != currentWords.length

const showFullText = () => {
    setCurrentWords(words)
}
```

useEffect is used in the following example to load the feed information on the first page load
```js
useEffect(() => {
    dispatch(FeedActions.getFeed({ page: 0 }))
}, []);
```

Scrolling on this page will dispatch requests to get the next page of the feed. 
```js 
window.onscroll = no_more_posts ? null : debounce(loadMore, 50)
```

A scroll to the top of the page will only happen when the router location changes
```js
useEffect(() => {
    window.scrollTo(0, 0)
}, [props.location]);
```

## debounce (Higher-order functions)

The following Higher-order function is used around the site to add debounce to another function. You can see when it is called previous timers are cleared. if `waitTime` is 0 then it executes `func` immediately, otherwise it will run after the `waitTime` has elapsed
```js
export function debounce(func, waitTime) {
    let timeout
    return () => {
        const context = this
        const args = arguments

        clearTimeout(timeout)

        if (waitTime === 0) {
            func.apply(context, args)
        }
        else {
            timeout = setTimeout(() => {
                timeout = null
                func.apply(context, args)
            }, waitTime)
        }
    }
}
```

Here it is used on the Home feed to debounce loading of new posts on scroll
```js
window.onscroll = no_more_posts ? null : debounce(loadMore, 50)
```

When the user stops typing a search is proformed 800ms later
```js
const inputChanged = debounce(doSearch, 800)
```

## Active record N+1 query's

Rails `.includes` is used to eager load `:likes` and `:comments` for a `post`. Eager loading is used throught notinstagram where apropriate to elimitante N+1 querys
```rails
posts = Post
 .includes(:likes, :comments)
 .where(author_id: author_id)
 .order(created_at: :desc)
 .limit(limit).offset(offset)
```


## Screenshots


#### The home feed
<a href="https://github.com/leesavage09/notinstagram/blob/images/assets/notinstagram1.png"><img src="https://github.com/leesavage09/notinstagram/blob/images/assets/notinstagram1.png" width="300"></a>
#### A post page
<a href="https://github.com/leesavage09/notinstagram/blob/images/assets/notinstagram2.png"><img src="https://github.com/leesavage09/notinstagram/blob/images/assets/notinstagram2.png" width="300"></a>
#### Discover people
<a href="https://github.com/leesavage09/notinstagram/blob/images/assets/notinstagram3.png"><img src="https://github.com/leesavage09/notinstagram/blob/images/assets/notinstagram3.png" width="300"></a>
#### Modal dialog to change avatar image
<a href="https://github.com/leesavage09/notinstagram/blob/images/assets/notinstagram4.png"><img src="https://github.com/leesavage09/notinstagram/blob/images/assets/notinstagram4.png" width="300"></a>
#### Log out modal
<a href="https://github.com/leesavage09/notinstagram/blob/images/assets/notinstagram5.png"><img src="https://github.com/leesavage09/notinstagram/blob/images/assets/notinstagram5.png" width="300"></a>
#### Search for users
<a href="https://github.com/leesavage09/notinstagram/blob/images/assets/notinstagram6.png"><img src="https://github.com/leesavage09/notinstagram/blob/images/assets/notinstagram6.png" width="300"></a>
#### Edit a photo and send directly to Amazon S3 bucket
<a href="https://github.com/leesavage09/notinstagram/blob/images/assets/notinstagram7.png"><img src="https://github.com/leesavage09/notinstagram/blob/images/assets/notinstagram7.png" width="300"></a>
#### Edit user account details
<a href="https://github.com/leesavage09/notinstagram/blob/images/assets/notinstagram8.png"><img src="https://github.com/leesavage09/notinstagram/blob/images/assets/notinstagram8.png" width="300"></a>
#### The users activity/notification feed
<a href="https://github.com/leesavage09/notinstagram/blob/images/assets/notinstagram9.png"><img src="https://github.com/leesavage09/notinstagram/blob/images/assets/notinstagram9.png" width="300"></a>
#### Discover posts
<a href="https://github.com/leesavage09/notinstagram/blob/images/assets/notinstagram10.png"><img src="https://github.com/leesavage09/notinstagram/blob/images/assets/notinstagram10.png" width="300"></a>
#### The home feed
<a href="https://github.com/leesavage09/notinstagram/blob/images/assets/notinstagram11.png"><img src="https://github.com/leesavage09/notinstagram/blob/images/assets/notinstagram11.png" width="300"></a>
