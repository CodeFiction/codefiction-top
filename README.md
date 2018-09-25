# [Codefiction](https://github.com/CodeFiction) Top Application

A simple web app that helps to maintain speaking order while recording podcasts online with multiple speakers. Made with Angular 2 & Socket.io for experimental purposes.

To start the app run;

``` bash
> docker-compose build
> docker-compose up
```

This will install dependencies and run client & server. Then browse to `http://localhost:4200` from at least two separate browser tabs/instances or completely different browsers.

##### Todo

- Code review
- Tests
- Dependency clean up

Feel free to contribute!

Run this one to keep the app running on heroku for free:
`while true; do curl https://codefiction-top.herokuapp.com/topper\;sleep 1000; done;`
