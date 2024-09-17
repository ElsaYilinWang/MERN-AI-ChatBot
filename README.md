# AI SaaS Chat Bot using MERN Stack
ref: https://www.youtube.com/watch?v=wrHTcjSZQ1Y

## Backend
- Setup Node, Express App w/ TypeScript
- Integrate MongoDB connection
- Register Login on OpenAI portal, get API keys
- Build a Secure Authentication with Tokens, and HTTP-only signed cookies

## Database Models
- User : name, email, password, chats: Chat[]

## Middleware
Middleware are functions which get executed before a request is processed.

In Node and Express, middleware can be used to check JSON body validations, tokens or cookie validations, params validations and more...

## Authentication
Authentication is where the user needs to verify the identity. The user will be given a Token after the Auth process.

## Authorization
Once the user authenticates, he is provided a token. Now to access a resource, the user needs to show a token that was sent during authentication. This ensures the user is entitled to a resource.

## JWT(JSON Web Token)
JWT is used to encrypt a payload into a signed token that has the permissions or Authorities of the user.

## Http-only Cookies
HTTP-only cookies are a type of web cookie that comes with a special security attribute that restricts cookies from being accessed by JavaScriptin the web browser. This prevents XSS attacks

## Auth Process
User Authenticates -> Sets HTTP-Only signed cookie with JWT token -> User has token

## Access Protected Resource
User sneds back the cookie 

    -> if the cookie matches and token is valid -> Process the request

    -> if the cookie doesn't match and token is invalid -> Abort the operation

# Frontend
- Vite.js
Get started: https://vitejs.dev/guide/

- Google Fonts: https://fonts.google.com/

-- Below are some dependencies to install

- Material UI > installation: https://mui.com/material-ui/getting-started/installation/
cd to your project (.\frontend\) and install

- React icon: https://www.npmjs.com/package/react-icons
cd to your project (.\frontend\) and install

- React router dom: https://reactrouter.com/en/main/start/tutorial
cd to your project (.\frontend\) and install

- React hot toaster: https://react-hot-toast.com/docs
cd to your project (.\frontend\) and install
