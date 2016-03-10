# PaizaQA

PaizaQA is a Open Source QA service(like StackOverflow) using MEAN stack.

This project was generated with the [Angular Full-Stack Generator](https://github.com/DaftMonk/generator-angular-fullstack) version 3.3.0.

## Blog article
The following blog article explains how to build the QA service using MEAN stack.

English: [Building a QA web service in an hour - MEAN stack development(3)](http://engineering.paiza.io/entry/2016/03/10/115345)

Japanese: [Webサービスを作りたい人に最適、たった1時間でJSベースのQAサイトを作る方法 - MEANスタック開発(3)](http://paiza.hatenablog.com/entry/meanstack_howto_3)



## Demo
[http://paizaqa.herokuapp.com](http://paizaqa.herokuapp.com)


## Getting Started

### Prerequisites

- [Git](https://git-scm.com/)
- [Node.js and npm](nodejs.org) Node ^4.2.3, npm ^2.14.7
- [Bower](bower.io) (`npm install --global bower`)
- [Ruby](https://www.ruby-lang.org) and then `gem install sass`
- [Grunt](http://gruntjs.com/) (`npm install --global grunt-cli`)
- [MongoDB](https://www.mongodb.org/) - Keep a running daemon with `mongod`

### Developing

1. Run `npm install` to install server dependencies.

2. Run `bower install` to install front-end dependencies.

3. Run `mongod` in a separate shell to keep an instance of the MongoDB Daemon running

4. Run `grunt serve` to start the development server. It should automatically open the client in your browser when ready.

## Build & development

Run `grunt build` for building and `grunt serve` for preview.

## Testing

Running `npm test` will run the unit tests with karma.
